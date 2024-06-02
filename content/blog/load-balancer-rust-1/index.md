---
title: "Let's build a Load Balancer in Rust - Part 1"
date: 2024-05-11
publishdate: 2024-05-11
tags: ["meetup", "open source", "rust", "load balancer", "system programming"]
comments: true
summary: "Hi 👋 welcome to a new post! This will be the first of a short series of posts, in which I explain my poor attempt at creating a simple HTTP load balancer in Rust. In this first part, we create a simple HTTP forwarder to a single upstream server."
--- 

{{< series key="load-balancer-rust" index="0" >}}

Hi 👋 welcome to a new post!

This will be the first of a short series of posts, in which I explain my poor attempt at creating a simple HTTP load balancer in Rust.

Why a load balancer, and why rust?

I came across this challenge on the [Coding Challenges](https://codingchallenges.fyi/) newsletter. I had already completed the first challenges (implementing `wc` and `cut`), and I thought it was time for a more complex project.

A load balancer provides tons of challenge and can be approached at different levels. From a simple round-robin strategy, to weights, connection pools, asynchronous I/O and much more! 

Why Rust? Well, I've been tinkering with rust for the past year, mostly by solving advent of code problems. It's a high performance, low level language with a mixture of features (e.g. statically typed, not garbage collected, borrow checker, pattern matching and other functional stuff, and zero-cost abstractions) that make it a "different" language from the ones I usually use at work (C# and a bit of Typescript).

It also sits on a "lower" level from my usual projects (it's mostly used as a system programming language and in infrastructure), and I think it's cool to learn about the technology which keep my stuff running under the hood!

Also, it's a hyped language 😎, and why shouldn't I try it? Following trends shouldn't always be bad .

A side note: I developed part of the load balancer during the [Open Source Saturday Milan](https://www.meetup.com/it-IT/open-source-saturday-milano/) meetup, with the help of [Marco Ieni](https://github.com/MarcoIeni). Marco is a rust expert and author of many rust crates and projects (e.g. his [release-plz](https://github.com/MarcoIeni/release-plz) crate, which is fantastic) and he was of great help during the day. Without him, I would have taken a lot more time to setup the project and learn about Arc, Mutex and other async and multithread stuff! Thanks Marco for the help.

## Load Balancer basics

A load balancer is an application which sits in front of a group of servers, and routes the connection/requests across the servers in the group. By routing the requests to multiple backends, it allows to maximise availability (when a server goes down, requests can be redirected to the other servers in the pool) and utilisation (trying to use all servers at their maximum while keeping the latency low).

A load balancer can operate on different levels of the [OSI model](https://en.wikipedia.org/wiki/OSI_model) (e.g. level 7, the application level, or level 4, the transport layer) with their advantages, disadvantages and numerous nuances. 

In my case, the challenge was to create a simple load balancer working at the application level, forwarding HTTP requests. In this first post, we'll see a basic application forwarding HTTP requests to a single server.

## Project setup and a first test 

Let's start the challenge by creating the basic project in rust and writing a simple test. At first I started by coding the simplest application possible without any tests, but Marco showed me how to setup a simple (unit? integration? I  don't know) test for it, so let's do it the proper way 😅. 

*Disclaimer: the snippets I post here won't compile most of the time, if you want the complete and updated code (with spoilers) see the [repository](https://github.com/marcobacis/coding-challenges/tree/main/load_balancer)*

First, let's create the project with cargo:
```bash
cargo new lb
```

A common practice is to create a lib inside the crate, in order to extract common behaviour and keep the binary clean. This is a first version of the `cargo.toml`file: 

```toml
[package]
name = "lb"
version = "0.1.0"
edition = "2021"

[lib]
name = "lb"
path = "src/lib.rs"

[[bin]]
name = "lb"
path = "src/bin.rs"

[dependencies]
actix-web = "4.5.1"
clap = "4.5.2"
reqwest = "0.11.25"
tokio = { version="1.36.0", features = ["macros", "rt-multi-thread"] }

[dev-dependencies]
wiremock = "0.6.0"
```

as you can see, right now I'm using `actix-web` as http framework to receive requests, and `reqwest` to forward them. I decided to not go too deep (managing sockets and http parsing) at the beginning, given that I'm not familiar with rust frameworks and libraries yet. 

Time for the first test!

```rust
#[tokio::test]
async fn test_get_root() {
	// Setup a mock upstream server, to test 
	// that the request gets forwarded to it
	let mock_server = MockServer::start().await;
	Mock::given(method("GET"))
		.respond_with(
			ResponseTemplate::new(200)
			.set_body_string("backend")
		)
		.expect(1)
		.mount(&mock_server)
		.await;
	
	let client = Client::new();

	// The class under test, the load balancer itself
	let server = LoadBalancer::new(8080, vec![mock_server.uri()]);
	let server_uri = server.uri();
	tokio::spawn(async move { server.run().await });

	// Wait for the server to be up (will fix this later)
	tokio::time::sleep(std::time::Duration::from_secs(3)).await;

	// Check that we receive response from the mock backend
	// (and not from the load balancer)
	let response = client.get(server_uri).send().await.unwrap();
	assert_eq!(StatusCode::OK, response.status());
	assert_eq!("backend", response.text().await.unwrap());
}
```

 In this first step, all we care is that the load balancer is able to forward the request to a single upstream server. We create a mock server (using the `wiremock`crate, thanks to Marco's advice) to check that the request gets forwarded to it, then instantiate the load balancer and send a simple GET to it.
 
 In pure (A)TDD style, this test doesn't even compile at first. Let's create at least the struct and the method required.

```rust
struct LoadBalancer {
	port: u16,
	servers: Vec<String>,
}
	
impl LoadBalancer {
	
	pub fn new(port: u16, servers: Vec<String>) -> Self {
		LoadBalancer { port, servers }
	}
	
	pub fn uri(&self) -> String {
		format!("http://127.0.0.1:{}", self.port)
	}

	pub async fn run(&self) {}
}
```

Obviously, the test is still failing, giving a "Connection refused" error. We'll get a failing test until the end of this post :P

## Creating a HTTP forwarder

Now, let's open a connection and listen to requests on the port we passed to the load balancer. For now, we'll return a 200 on every request. How can we do it? [Actix](https://actix.rs/) is a powerful framework for creating web services with rust. It relies on some concepts like extractors and handlers (better explained in their [documentation](https://actix.rs/docs/getting-started) than here) that allow to easily create http endpoints. 

Let's setup a simple server to respond to every request:

```rust
impl LoadBalancer {
	/// ... previous methods
	
	pub async fn run(&self) {
		HttpServer::new(move || App::new()
			.default_service(web::to(handler))
		)
		.bind(("127.0.0.1", self.port))
		.unwrap()
		.run()
		.await	
		.unwrap();
	}
}

async fn handler(req: HttpRequest) -> HttpResponse {
	HttpResponse::Ok().body("hello!")
}
```

In the `run` method of our load balancer, we instantiate an Http server which receives any request and returns "hello!". The `default_service` in actix is a catch-all method which receives any request not handled by other services. We use the `web::to` helper function to create a generic any-method handler (accepting any HTTP method such as GET, POST, PUT etc...). 

Now, let's add some behaviour to the handler. We want it to forward the request to the (only) server we configured in our test. To do so, a first way is to just get the request, copy it and send it to the server, using `reqwest`. As I already said at the beginning of the post, my goal now is to create a simple proxy, without caring much about performance or functionality.

But how can we use the upstream server url in our request handler? Actix allows to share data between handlers using a concept called [web::Data](https://actix.rs/docs/application/#shared-mutable-state). It's a struct encapsulating an `Arc` (a thread-safe reference counting pointer) in which we can put data that must be shared (immutably or mutably) among handlers and requests.

First, let's define the data we want to share (the servers urls) and add it to the application.

```rust
struct AppState {
	servers: Vec<String>,
}

pub async fn run(&self) {
	let data = web::Data::new(AppState {
		servers: self.servers.clone(),
	});
	
	HttpServer::new(move || {
		App::new()
			.default_service(web::to(Self::handler))
			// We add the initial instance of our shared app state
			.app_data(data.clone())
	})
	// as above, bind and run ...
})
```

Then, we can use the shared data inside the handler using an [extractor](https://actix.rs/docs/extractors), a parameter used in the function to access parts of the request, or the application state in this case:

```rust

async fn handler(req: HttpRequest, data: web::Data<AppState>) -> HttpResponse {
	let server = data.servers[0].clone();

	// do stuff with server url now
	
	HttpResponse::Ok().body("hello")
}

```

Finally, it's time to forward the request! The code below is not so performant (it instantiates a reqwest client on every request, clones the headers betweeen the input and forwarded request, and so on..), but it works:

```rust

async fn handler(
	req: HttpRequest,
	// Extractor used to get the shared application state
	data: web::Data<AppState>,
	// Extractor used to get the request payload as raw bytes
	bytes: web::Bytes,
) -> Result<HttpResponse, Error> {

	// Get the address to which to forward the request
	let server = data.servers[0].clone();
	let uri = format!("{}{}", server, req.uri());

	// Create the request
	let client = Client::new();
	let request_builder = client
		.request(req.method().clone(), uri)
		.headers(req.headers().into())
		.body(bytes);

	// Forward the request
	let response = request_builder.send().await?;

	// Get the response and send it back to the client
	let mut response_builder = HttpResponse::build(response.status());
	for h in response.headers().iter() {
		response_builder.append_header(h);
	}
	let body = response.bytes().await?;
	
	Ok(response_builder.body(body))
}

```

After this, the test passes, and we're all set! I left out the implementation of the `Error`  struct (it takes the `reqwest::Error` and stores it inside the struct, along with the implementation of the `From<reqwest::Error>` and `ResponseError` traits).

You can find the code of this simple HTTP forwarder [here](https://gist.github.com/marcobacis/4ba9d0885862239d9ed7482983047472). Also, I keep a repository to all the solutions I came up for coding challenges, [here](https://github.com/marcobacis/coding-challenges).

See you next time for part 2, in which we add a simple round-robin policy and transform our simple Proxy in a real (almost) LoadBalancer!

## Resources

- [Actix Docs](https://actix.rs/docs)
- [Reqwest Docs](https://docs.rs/reqwest/latest/reqwest/)
- [Coding Challenges Website](https://codingchallenges.fyi/)
- [What is Load Balancing?](https://www.nginx.com/resources/glossary/load-balancing/)