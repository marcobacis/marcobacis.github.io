---
title: "Let's build a Load Balancer in Rust - Part 2"
date: 2024-05-22
publishdate: 2024-05-22
tags: ["meetup", "open source", "rust", "load balancer", "system programming"]
comments: true
summary: "This is the second part of the \"Build your own load balancer in rust\" series! In this post, we'll see how to implement a round-robin policy, to forward our requests to multiple backends."
--- 

{{< series key="load-balancer-rust" index="1" >}}

Hi  👋 welcome to a new post! This is the second part of the series "Let's build a Load Balancer in rust".

In the [first post](https://marcobacis.com/blog/load-balancer-rust-1/) we saw how to forward a single request to an upstream server, using [Actix](https://actix.rs/) and [Reqwest](https://docs.rs/reqwest/latest/reqwest/).

Today we'll see how to implement a round-robin policy, to forward our requests to multiple backends!

## Small fix in the handler 

In the first part, we left a (small) code smell in the handler code, because we instantiate the `reqwest` client struct on each new request received:

```rust
let client = Client::new();
```

The fix is simple: we can add the client to the shared app data, and then use it inside the handler! In this way, we won't have to istantiate the client on every request. This is also explained in reqwest [docs](https://docs.rs/reqwest/latest/reqwest/struct.Client.html): "The `Client` holds a connection pool internally, so it is advised that you create one and **reuse** it."

 I tried adding the client directly to the `LoadBalancer` struct without passing through Actix, but the compiler complained when defining the handler and I just left it as-is. If you know a better method, write a comment at the end of the post (or even better, create a PR on the [project repository](https://github.com/marcobacis/coding-challenges/tree/main/load_balancer) 😁).
## Waiting for the Load Balancer to start

Before starting with the round-robin implementation, lets tidy up a bit the code from the first part. The first thing to do is to improve the test we wrote!

In the test, we create the load balancer server and wait for it to start up with a simple `sleep´
```rust
// The class under test, the load balancer itself
let server = LoadBalancer::new(8080, vec![mock_server.uri()]);
let server_uri = server.uri();
tokio::spawn(async move { server.run().await });

// Wait for the server to be up (will fix this later)
tokio::time::sleep(std::time::Duration::from_secs(3)).await;
```

Well, let's fix this and create a function to wait for the server to start!

For now, we'll assume that the load balancer is up when the web server itself starts. To do so, we can add a healthcheck endpoint simply with actix:

```rust
// ...
HttpServer::new(move || {
	App::new()
		// Healthcheck endpoint always returning 200 OK
		.route("/health", web::get().to(HttpResponse::Ok))
		// Handler to forward request (from first part)
		.default_service(web::to(Self::handler))
		.app_data(data.clone())
	})
	// ...
```

To fix our test, we can wait for the healthcheck url to be available by trying multiple times and waiting for a 200 HTTP code. Here is an example function to do so:

```rust
pub async fn wait_server_up(client: &Client, uri: &str, max_retries: usize) {
	let health_uri = format!("{}/health", uri);
	for _ in 0..max_retries {
		let response = client.get(&health_uri).send().await;
		if response.is_ok() {
			return;
		}
		tokio::time::sleep(std::time::Duration::from_secs(1)).await;
	}
	panic!("Server didn't start...");
}
```

With this method we can now replace the old `tokio::time::sleep`. Now we're ready to go on and start spamming multiple servers with our requests!

## Creating a Round Robin Policy

It's finally time to forward our requests among multiple servers!

Up until now, we have "decided" the upstream host to which we forward our requests in the `handler` method of the load balancer, but I think we should delegate and isolate this responsibility to a different module, such as a *Routing Policy*.

While our tests are still passing, we can afford to perform some *[preparatory refactoring](https://martinfowler.com/articles/preparatory-refactoring-example.html)*. As said by [kent beck](https://x.com/KentBeck/status/250733358307500032?lang=en): "*make the change easy, then make the easy change*".

### Routing Policy Trait

What we want to obtain is a simple interface for a routing policy, which chooses the next server on every new request we receive on the load balancer, like this:

```rust
#[async_trait]
pub trait RoutingPolicy {
	async fn next(&self, request: &HttpRequest) -> String;
}
```

The `next` method takes the request reference and returns the host on which the load balancer should forward the request. We declare as `async` method, to indicate that the policy might wait for some I/O or other async operations (e.g. accessing shared data on the server, using a db/cache).

Why the `#[async_trait]` macro on top of the trait? The [async_trait](https://docs.rs/async-trait/latest/async_trait/) crate allows to use a Trait containing async methods as `dyn` (e.g. use `dyn RoutingPolicy`, as we'll be doing below) instead of having to resort on generics to embed an async Trait inside another. The explanation is a bit complex (and I don't understand it completely 😅), so refer to the crate documentation for more infos.

We can now use the policy trait inside our program (I won't bother you with all the code, just the fundamental bits):

```rust
pub type SafeRoutingPolicy = dyn RoutingPolicy + Sync + Send;

// add policy to the load balancer
struct LoadBalancer {
	//...
	data: Data<AppState>
}
// add policy to the app state
struct AppState {
	//...
	policy: Box<SafeRoutingPolicy>,
}

impl LoadBalancer {
	async fn handler(req: HttpRequest,data: web::Data<AppState>,bytes: web::Bytes) -> Result<HttpResponse, Error> {

	// Here we grab the next server host from the policy
	let server = data.policy.next(&req).await;
	
	let uri = format!("{}{}", server, req.uri());
	// ... forward the request etc
}

```

Notice the type alias `SafeRoutingPolicy`, which has also the `Send` and `Sync` trait. Why do we need them? The policy is stored in the shared app state, which may be accessed by multiple threads (actix can run the handler method on different threads).

The `actix_web::web::Data` struct is a wrapper around an `Arc`, which allows to access the structure from multiple threads. However, that doesn't mean that the fields (e.g. the policy) are thread safe! This is also recalled by the compiler, which gives us a nice error if we don't require the policy to be `Sync + Send`:

```rust
error[E0277]: `(dyn RoutingPolicy + 'static)` cannot be shared between threads safely
   --> src/lib.rs:45:25
   
	  // ... code
   
= help: the trait `Sync` is not implemented for `(dyn RoutingPolicy + 'static)`
    = note: required for `Unique<(dyn RoutingPolicy + 'static)>` to implement `Sync`
note: required because it appears within the type `Box<(dyn RoutingPolicy + 'static)>`
   
   // ..Box
   
   --> src/lib.rs:22:8
    |
22  | struct AppState {
    |        ^^^^^^^^
    = note: required for `Arc<AppState>` to implement `Send`
note: required because it appears within the type `Data<AppState>`
   
    |
90  | pub struct Data<T: ?Sized>(Arc<T>);
    |            ^^^^
note: required because it's used within this closure
   --> src/lib.rs:45:25
    |
45  |         HttpServer::new(move || {
    |                         ^^^^^^^
note: required by a bound in `HttpServer::<F, I, S, B>::new`
   --> /Users/marco/.cargo/registry/src/index.crates.io-6f17d22bba15001f/actix-web-4.5.1/src/server.rs:94:20
    |
94  |     F: Fn() -> I + Send + Clone + 'static,
    |                    ^^^^ required by this bound in `HttpServer::<F, I, S, B>::new`

// same for Sync
```

Basically, the compiler is telling us that the policy variable is not safe to move or access among multiple threads:
- `Send` means a type can be moved/sent to another thread (e.g. when we run the server by spawning the actix http handler)
- `Sync`means that the type can be shared and use between threads (e.g. by calling the policy `next` method from different threads)

This is one of the reasons I like rust: the compiler enforces us to use safe abstractions (e.g. forcing my policy to be `Sync`, a.k.a. thread safe) and explains that clearly in the compilation output! 
### Single Server Policy

To finish our preparatory refactoring, we need to implement a routing policy which allows to always return a single server (the same thing we were doing in Part 1).

Let's implement it and run the tests:

```rust
pub struct SingleServerPolicy {
	server: String,
}

impl SingleServerPolicy {
	pub fn new(server: String) -> Self {
		Self { server: server }
	}
}

#[async_trait]
impl RoutingPolicy for SingleServerPolicy {
	async fn next(&self, request: &HttpRequest) -> String {
		self.server.clone()
	}
}
```

Notice the use of `#[async_trait]` here too, as it needs to be applied also to the async trait's implementation.

We can now remove the list of servers from the LoadBalancer struct (and constructor) and move it inside the policy, and we are ready to implement our round robin policy!!

### Round Robin Policy: Test

The first thing to do is to write another test case for our load balancer, this time spawning multiple upstream servers and checking that they are called in the right order:

```rust

#[tokio::test]
async fn test_round_robin_three_servers() {
	let mocks = [
		MockServer::start().await,
		MockServer::start().await,
		MockServer::start().await,
	];
	
	Mock::given(method("GET"))
	.respond_with(ResponseTemplate::new(200).set_body_string("1"))
	.mount(&mocks[0])
	.await;
	
	// ... same for mock server 2 and 3, returning a different number
	
	let client = Client::new();
	let mock_uris: Vec<_> = mocks.iter().map(|mock| mock.uri()).collect();
	
	// Spawn load balancer
	let policy = Box::new(RoundRobinPolicy::new(mock_uris.clone()));
	let server = LoadBalancer::new(8082, policy);
	let server_uri = server.uri();
	tokio::spawn(async move { server.run().await });
	
	wait_server_up(&client, &server_uri, 3).await;
	
	// Send requests, expect to respond in round robin (1,2,3,1)
	let response = client.get(&server_uri).send().await.unwrap();
	assert_eq!(StatusCode::OK, response.status());
	assert_eq!("1", response.text().await.unwrap());
	
	let response = client.get(&server_uri).send().await.unwrap();
	assert_eq!(StatusCode::OK, response.status());
	assert_eq!("2", response.text().await.unwrap());
	
	let response = client.get(&server_uri).send().await.unwrap();
	assert_eq!(StatusCode::OK, response.status());
	assert_eq!("3", response.text().await.unwrap());
	
	let response = client.get(&server_uri).send().await.unwrap();
	assert_eq!(StatusCode::OK, response.status());
	assert_eq!("1", response.text().await.unwrap());
}

```

Right now the test doesn't even compile (we don't have a `RoundRobinPolicy`struct with a `new` method).

Let's fix that.

### Round Robin Policy: Implementation

Here is the code for the `RoundRobinPolicy`:

```rust
pub struct RoundRobinPolicy {
	servers: Vec<String>,
	idx: AtomicUsize,
}

impl RoundRobinPolicy {
	pub fn new(servers: Vec<String>) -> Self {
		Self {
			idx: AtomicUsize::new(0),
			servers: servers.clone(),
		}
	}
}

#[async_trait]
impl RoutingPolicy for RoundRobinPolicy {
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
}
```

On each new request, the policy updates the current upstream server index and returns the corresponding url.

But why is the `idx` parameter an `AtomicUsize`? As explained in the [documentation](https://doc.rust-lang.org/std/sync/atomic/struct.AtomicUsize.html), this type allows to safely share the underlying value between threads, as it can be updated atomically. In fact, we update the index with the `fetch_update` method, which allows to update the number and get the value in a single action, without risking data races and inconsistency when used by multiple threads.

The `Ordering:Relaxed`params indicate the ordering constraint to be enforced on the atomic operation. I tried to read the [book](https://doc.rust-lang.org/nomicon/atomics.html) but didn't understand it completely, so refer to that to learn more about this. For now, we're ok using `Relaxed` (we are updating a counter and nothing more).

Now we have a round robin policy and the test passes. We can also replace the `SingleServerPolicy` created earlier with our new one and remove that temporary struct used for the refactoring!

## Conclusions

This is the end of Part 2. We cleaned up the load balancer code from [Part 1](https://marcobacis.com/blog/load-balancer-rust-1/), and added a simple Round-Robin policy to balance the load among multiple upstream servers. The code for this part can be found [here](https://gist.github.com/marcobacis/477191a3b908c27fd334137cf4b5ee1d).

Still, the [coding challenge](https://codingchallenges.fyi/challenges/challenge-load-balancer) is not finished....the final step will be to periodically health check the upstream servers, in order to not forward the requests to the unavailable ones.

See you next time for Part 3!

## Resources

- [Actix Docs](https://actix.rs/docs)
- [Reqwest Docs](https://docs.rs/reqwest/latest/reqwest/)
- [Tokio Tutorial](https://tokio.rs/tokio/tutorial)
- [Send and Sync](https://doc.rust-lang.org/nomicon/send-and-sync.html)
- [Scheduling Internals](https://tontinton.com/posts/scheduling-internals/) - Tony Solomonik
- [Why async fn in traits are hard](https://smallcultfollowing.com/babysteps/blog/2019/10/26/async-fn-in-traits-are-hard/) - Niko Matsakis
- [Wrapper Types in Rust: Choosing Your Guarantees](https://manishearth.github.io/blog/2015/05/27/wrapper-types-in-rust-choosing-your-guarantees/) - Manish Goregaokar