---
title: "Let's build a Load Balancer in Rust - Part 3"
date: 2024-06-02
publishdate: 2024-06-02
tags: ["open source", "rust", "load balancer", "system programming"]
comments: true
summary: "Third and last part of the \"Build your own load balancer in rust\" series! In this last part, we implement a healthcheck procedure to avoid forwarding requests to unavailable nodes."
--- 

{{< series key="load-balancer-rust" index="2" >}}


Hi  👋 welcome to a new post!

This is the third (and last?) part of the series "let's build a load balancer in rust".

In the [first post](https://marcobacis.dev/blog/load-balancer-rust-1/) we saw how to forward a single request to an upstream server, using [Actix](https://actix.rs/) and [Reqwest](https://docs.rs/reqwest/latest/reqwest/). Then, we implemented a simple round-robin strategy in the [second post](https://marcobacis.dev/blog/load-balancer-rust-2/) . 

In this last part, we are going to integrate a simple health check into our load balancer, to avoid sending requests to unavailable upstream servers!

## Simplifying the Round-Robin policy

As already done in part 2, let's start with some small chores in our code from the previous post. I hope this shows that even when writing and being careful during development, there's always room for improvement.

The small refactoring we are going to do is related to the round-robin policy code, in particular how we increment the counter. In the previous post, I implemented the policy update in this way:

```rust
async fn next(&self, _request: &HttpRequest) -> String {
	// Read servers list
	let servers = &self.servers;
	let max_server_idx = servers.len() - 1;
  
	// Update index
	let idx = self
	.idx
	.fetch_update(Ordering::Relaxed, Ordering::Relaxed, |idx| match idx {
		x if x >= max_server_idx => Some(0),
		c => Some(c + 1),
	})
	.unwrap_or_default();

	// Return next server to forward the request to
	servers.get(idx).unwrap().clone()
}
```

The code is complex, requires to know about atomics, the `fetch_update` method and has two different `Ordering` parameters. We can make it simpler, by using a simple `fetch_add` and using the modulo operator to stay between 0 and the number of available backends:

```rust
async fn next(&self, _request: &HttpRequest) -> String {
	let idx = self.idx.fetch_add(1, Ordering::Relaxed);
	self.servers.get(idx % self.servers.len()).unwrap().clone()
}
```

The `fetch_add` method allows to increment an `AtomicUsize` value in an atomic way, but it's simpler than the `fetch_update` used earlier (e.g. has only 1 ordering parameter and directly returns the new value without a possible `None`).

## Introducing our Load Balancer configuration

Up till now, we have used a `Vec<String>` to represent the load balancer configuration. It's now time to introduce some new parameters, and to wrap our simple string in a more suitable `struct`:

```rust
#[derive(Clone)]
pub struct Backend {
    pub url: String,
    pub healthcheck_path: String,
}

#[derive(Clone)]
pub struct Config {
    pub backends: Vec<Backend>,
    pub health_check_interval_secs: usize,
}
```

Each backend now has the url (host) and a path through which the load balancer can check the health of the upstream server. If the given endpoint doesn't respond or returns an error, the corresponding upstream server will be considered unavailable.

The other parameter we introduce is a simple interval (in seconds) after which we should check the availability of the upstream servers. We will use it later.

## Acceptance Test

It's now time to finally start implementing our healthcheck! As always, let's start with a (failing) acceptance test:

```rust
#[tokio::test]
async fn test_health_check_simple() {
	let mocks = create_mocks(2).await;

	// Mock 1 answers on all paths
	Mock::given(method("GET"))
		.respond_with(
			ResponseTemplate::new(200).set_body_string("1")
		)
		.mount(&mocks[0])
		.await;

	// Mock 2 answers only on /, not on /health
	Mock::given(method("GET"))
		.and(path('/'))
		.respond_with(
			ResponseTemplate::new(200).set_body_string("2")
		)
		.mount(&mocks[1])
		.await;

	// Start server
	let config = build_config(&mocks);
	let policy = Box::new(RoundRobinPolicy::new(&config));
	let server = LoadBalancer::new(8082, &config, policy);
	let server_uri = server.uri();
	tokio::spawn(async move { server.run().await });

	let client = ClientBuilder::new()
		.timeout(Duration::from_secs(2))
		.build()
		.unwrap();
	wait_server_up(&client, &server_uri, 3).await;

	// Expect only mock[1] to respond to 2 consecutive requests
	let response = client.get(&server_uri).send().await.unwrap();
	assert_eq!(StatusCode::OK, response.status());
	assert_eq!("1", response.text().await.unwrap());

	let response = client.get(&server_uri).send().await.unwrap();
	assert_eq!(StatusCode::OK, response.status());
	assert_eq!("1", response.text().await.unwrap());
}
```

In the test, we are setting up two mock servers. The first one responds on every path, while the second doesn't respond on the `/health` endpoint that we expect for health monitoring.
We expect the load balancer to forward requests only to the "healthy" upstream server, which responds with "1".

## Implementing the Health Check procedure

The healthcheck implementation will be split in 3 parts:
- Checking the health of all the upstream servers periodically
- Adding the health check results to the round-robin policy
- Integrating the two parts together

Let's start by checking which servers are available:

```rust
pub struct HealthResult {
    pub backend: Backend,
    healthy: bool,
}

async fn get_healthy_backends(client: &Client, backends: &Vec<Backend>) -> Vec<HealthResult> {
    // Check all backends for the health endpoint
    let results = join_all(backends.iter().map(|b| {
        client
            .get(format!("{}{}", &b.url, &b.healthcheck_path))
            .send()
    }))
    .await;

    // Map responses to simple boolean to match to backends
    let results = results.iter().map(|res| match res {
        Ok(response) => response.status().is_success(),
        Err(_) => false,
    });

    // Match result and backend together
    zip(backends, results)
        .map(|(backend, healthy)| HealthResult {
            backend: backend.clone(),
            healthy,
        })
        .collect()
}
```

The `get_healthy_backends` gets the list of servers we want to interrogate, and checks that their corresponding healthcheck endpoints are reachable and return a success code (HTTP 200). 

I read an interesting post from Nicole Tietz-Sokolskaya ([here](https://ntietz.com/blog/rusts-iterators-optimize-footgun/)) about the footguns presented by using rust iterators with async code. I didn't use her solution for waiting multiple futures, because I wanted to also collect all the results of the operations. Instead, I found the useful [join_all](https://docs.rs/futures-preview/latest/i686-pc-windows-msvc/futures/future/fn.join_all.html) method in the futures crate, which is exactly what I needed for the task!

The `join_all` method receives a collection of futures and polls them, returning either the results of all the futures (in order) or an error if any future fails.

## Extending the policy with healthchecks

With all the healthcheck results collected, we can now extend our Round-Robin policy to update the available backends:

```rust
#[async_trait]
pub trait RoutingPolicy {
    async fn next(&self, request: &HttpRequest) -> String;
	
	// The new method we introduce
    async fn health_results(&self, results: Vec<HealthResult>);
}
```

We need to test that the policy will be affected by the results of our healthcheck loop. Given that our acceptance test will fail until we perform real HTTP requests and integrate multiple components, let's write a smaller test just for the policy:

```rust
#[tokio::test]
async fn round_robin_policy_with_healthcheck() {
	let backends = vec![
		Backend {
			healthcheck_path: "/health".into(),
			url: "test_url_1".into(),
		},
		Backend {
			healthcheck_path: "/health".into(),
			url: "test_url_2".into(),
		},
		Backend {
			healthcheck_path: "/health".into(),
			url: "test_url_3".into(),
		},
	];
	let config = Config {
		health_check_interval_secs: 3,
		backends: backends.clone(),
	};
	let policy = RoundRobinPolicy::new(&config);
	let request = test::TestRequest::default().to_http_request();

	assert_eq!("test_url_1", policy.next(&request).await);
	assert_eq!("test_url_2", policy.next(&request).await);
	assert_eq!("test_url_3", policy.next(&request).await);
	assert_eq!("test_url_1", policy.next(&request).await);

	policy
		.health_results(vec![
			HealthResult {
				backend: backends[0].clone(),
				healthy: false,
			},
			HealthResult {
				backend: backends[1].clone(),
				healthy: true,
			},
			HealthResult {
				backend: backends[2].clone(),
				healthy: true,
			},
		])
		.await;

	assert_eq!("test_url_2", policy.next(&request).await);
	assert_eq!("test_url_3", policy.next(&request).await);
	assert_eq!("test_url_2", policy.next(&request).await);
	assert_eq!("test_url_3", policy.next(&request).await);
}
```

Here we are checking that the policy works as inteded in a round-robin fashion (the first assertions) as it was in part 2. Then, we send a healthcheck result saying that the first server is not available, and expect to only get the second/third servers in return.

Let's make this test pass! 

```rust
pub struct RoundRobinPolicy {
    backends: RwLock<Vec<String>>,
    idx: AtomicUsize,
}

#[async_trait]
impl RoutingPolicy for RoundRobinPolicy {
    async fn next(&self, _request: &HttpRequest) -> String {
        let idx = self.idx.fetch_add(1, Ordering::Relaxed);

        // Get read lock and return the correct server
        let servers = self.backends.read().await.clone();
        servers.get(idx % servers.len()).unwrap().clone()
    }

    async fn health_results(&self, results: Vec<HealthResult>) {
        // Get write lock and overwrite the servers list
        let mut servers = self.backends.write().await;
        *servers = results
            .iter()
            .filter(|r| r.is_healthy())
            .map(|r| r.backend.url.clone())
            .collect();
    }
}
```

What is the difference from the implementation we did last time? 

While in part 2 the `backends` variable was readonly (initialised at the beginning of the program), now the list of available servers can change at runtime, based on the healthcheck results. But our policy might be used concurrently, and rust doesn't allow concurrent access to `Vec` (also, our vector was immutable).

A [RwLock](https://doc.rust-lang.org/std/sync/struct.RwLock.html) allows us to read and mutate the backends vector in a thread-safe way. It does so by keeping a lock on the resource (the `Vec<Backend>`) but in an *asymmetric* way. In fact, it's possible to have multiple readers at the same time, but whenever a writer wants to mutate the resource (e.g. us, when we receive the healthcheck results), it gets exclusive access.

### Integrating everything together

Now that we have both the polling mechanism and the upgraded policy, it's time to integrate the two and finally make the acceptance test pass!

What we need to do is to periodically call the `get_healthy_backends` method and forward its results to the policy.

I wanted to have a nice discussion on how to use [channels](https://doc.rust-lang.org/rust-by-example/std_misc/channels.html) to communicate among multiple tasks/thread, but I ended up simplifying the code and using a single task 🥲 here it is: 

```rust
pub async fn run(&self) {
	// Start health check task
	let config_clone = self.config.clone();
	let data_clone = self.data.clone();
	tokio::spawn(async move {
		let mut interval = interval(Duration::from_secs(
			config_clone.health_check_interval_secs as u64,
		));
		let client = Client::new();
		loop {
			let healthy_backends = get_healthy_backends(&client, &config_clone.backends).await;
			data_clone.policy.health_results(healthy_backends).await;
			interval.tick().await;
		}
	});
	
	// Start http server
	let data_clone = self.data.clone();
	HttpServer::new(move || {
		App::new()
		...
```

When the http server starts, we also start a concurrent task for the healthcheck procedure. The task runs on the interval we configure through the config struct, checks the availability of the backends and send the results to the policy.

That's all! Now the test pass, and we have just added a healthcheck procedure to our load balancer.

## Conclusions

We have implemented a simple HTTP load balancer, with a round-robin policy and healthcheck procedure.

What's missing?

For the sake of brevity, I didn't include config management, command line arguments and error management. All of this is left as exercise for the reader (you can find the entire project on the [repo](https://github.com/marcobacis/coding-challenges/tree/main/load_balancer)).

I didn't implement other features needed by HTTP load balancers, such as [X-Forwarded-For](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Forwarded-For) and all additional headers. Finally, I don't know which version of HTTP this balancer supports (probably 1.1? I don't know). Basically, this was a nice exercise with async rust, but cannot be considered in any way to be production (or even test) ready!

I hope you still had fun and found the articles interesting. I certainly learned a lot in implementing this simple challenge, and hope to do more in the future!

Thanks a lot, and see you next time 👋
## Resources

- [Actix Docs](https://actix.rs/docs)
- [Reqwest Docs](https://docs.rs/reqwest/latest/reqwest/)
- [Tokio Tutorial](https://tokio.rs/tokio/tutorial)
- [Send and Sync](https://doc.rust-lang.org/nomicon/send-and-sync.html)
- [Scheduling Internals](https://tontinton.com/posts/scheduling-internals/) - Tony Solomonik
- [Why async fn in traits are hard](https://smallcultfollowing.com/babysteps/blog/2019/10/26/async-fn-in-traits-are-hard/) - Niko Matsakis
- [Wrapper Types in Rust: Choosing Your Guarantees](https://manishearth.github.io/blog/2015/05/27/wrapper-types-in-rust-choosing-your-guarantees/) - Manish Goregaokar
- [Rust's iterators optimize nicely—and contain a footgun](https://ntietz.com/blog/rusts-iterators-optimize-footgun/)