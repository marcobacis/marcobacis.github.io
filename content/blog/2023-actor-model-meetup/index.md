---
title: "XPUGBg March Meetup: “The Actor Model (and why an XP programmer should know it)“"
date: 2023-04-01T08:00:00+01:00
publishdate: 2023-04-01T08:00:00+01:00
tags: ["architecture", "backend", "elixir", "xpug"]
comments: true
---

Hi 👋 welcome!

This post is a short summary (with personal notes and opinions here and there) of the XPUGBg (Bergamo’s eXtreme Programming User Group) meetup I attended in March.

Actually, it’s just a bunch of notes and ideas connected together by my imagination and opinions 😂 (as I already did [here](http://marcobacis.com/blog/2022-dec-mars-rover-kata-meetup/) and [here](http://marcobacis.com/blog/2023-jan-xp-codebase-meetup/)).

This month's talk was titled “*The Actor Model and why an XP programmer should know it*” by Emanuele DelBono.

Emanuele is a Software Architect and Developer at [Codice Plastico](https://codiceplastico.com/), a software house near Brescia. He has a lot of experience and he’s always interested in experimenting with new paradigms and technologies, and right now he’s working with Elixir (the language he used during the talk).

Let’s start!

## The Actor Model

The Actor Model is a programming paradigm for concurrent and parallel computations. In this model, all computation is divided into different components called Actors.

An **Actor** is an individual unit of computation with its private state. A single actor by itself cannot do much but must work in a system of multiple, **independent** actors.

Multiple actors together can be used to perform any computation, but only if they communicate! This is done by assigning a unique **address** to each one and using messages. Each actor can receive and send messages from/to others.

One key difference between the Actor Model and any other event/message-based system is that an actor can process only **one message at a time**. This is a big constraint imposed by the model, but it makes the actor’s computation model simple to reason about. By processing one message at a time, it basically eliminates any chance of data race inside the single unit. In addition, it makes the code easily testable (send a message and check the output message and created actors; that’s it!).

The final action that an actor can do, apart from receiving and sending messages, is to create other actors.

The model just described is really similar to standard OOP. In fact, it fits perfectly with the definition given by Alan Kay, which is of multiple independent objects communicating with messages.

### Pros, Cons, and Use Cases

So, how can this paradigm be useful to us developers?

The first advantage of the Actor Model is the strong **decoupling** and **isolation** of state between different Actors. The Actors can only communicate using messages, so no one can access an Actor’s individual state.

Another pro of Actors is their extreme scalability. Depending on the Actor’s granularity (the size of each actor), there might be hundreds or even thousands of Actors at the same time in the system. Being decoupled and isolated among themselves, it’s possible to distribute the computation and the state among multiple nodes easily. This is also helped by frameworks, which handle the redistribution of Actors in the cluster automatically.

Finally, the model helps in reducing the cognitive load of the developer. By processing only one message at a time and communicating only through messages, the developer doesn’t need to think about nasty side effects or multi-object state changes. There might be a steeper learning curve at the beginning, as always when creating distributed systems, but the model helps in making it easier in the long run.

### Actor Model Implementations

After describing the actor model in theory, Emanuele showed us different languages that implement this paradigm. Some of the technologies are Erlang, Elixir, Akka (a framework used in the JVM and .NET ecosystems), Swift, and Pony.

One of the first languages to use a similar paradigm to the Actor Model is Erlang. Erlang was created in the 90s at Ericsson, and at the beginning, it was used to manage their telecommunications infrastructure (telephone switches). The main requirements it served were to allow concurrent computation, allow hot-reloading of components, and robust failure management.

Erlang supports all these scenarios by implementing a paradigm very similar to the Actor Model. The only differences are in the messaging order (incoming messages are ordered, while the Actor Model doesn’t require it) and the absence of exception management.

This last characteristic is known as “let it fail”: when an actor has an error, we don’t throw an exception, but we just let it crash and create a new one. The mechanism is a precursor to the current cloud paradigm, in which small individual components can crash and be recreated immediately (think of k8s and docker containers).

Elixir is the successor of Erlang, as it runs on the same virtual machine (BEAM), implements the actor model in the Erlang way, and is also functional. Emanuele used it for the demo.

### Demo: Pizza ordering API with Actors

Emanuele used Elixir to show us a small demo of an actor-based web service for a pizza delivery service.

The service was pretty simple, with a web API for managing the basket, time slots, and orders from the customer and the pizzeria sides.

Some considerations about the demo and the model in general:

- Elixir is functional, so the internal actor state is managed with immutable and pure functions (similar to reducers)
- We can create a lot of actors!! The demo created an actor for each user (for the basket), for each time slot (and there can be thousands of them in a year) and for each created order. They almost felt as standard objects, but all kept at runtime
- Some actors (like the ones managing the basket) didn’t save the state in persistent storage. This was an architectural choice made based on the use case (if a basket actor fails, we just lose the current basket, nothing special)
- Elixir allows both synchronous and asynchronous sending of messages and to respond to messages (e.g., to return errors to clients in the http endpoints)

### Conclusions

The meetup was really interesting. I already knew about the Actor Model (I studied a bit of Scala while in university), but this talk was a refresher on the concepts and actually showed a production-like example of how working with Actors feels.

I think the Actor Model paved the way for current technologies (microservices and containers) and that its philosophy is hidden in many current languages, so it’s an important paradigm to study. Also, it’s a great way to learn to divide a system into decoupled components, which fits well with other architectural practices (Domain-Driven Design, Event Sourcing, CQRS, and many other buzzwords) and with good software in general.

That’s it for today. I hope my short summary of Emanuele’s talk intrigued you, and that right now you’ll go watch his other talk (link right below here) and start learning the Actor Model!

As always, thanks to the [XPUGBg](https://www.meetup.com/it-IT/xpugbg/) and to [Emanuele](https://www.linkedin.com/in/emanueledb/) for the great meetup (and the pub after that 😉).

See you next time!

### Resources

* Another [talk](https://blog.codiceplastico.com/events/avanscoperta-introduzione-actor-model) given by Emanuele
* The [Cronache di Domain-Driven Design](https://www.amazon.it/Cronache-Domain-Driven-esperienze-progetti-raccontati/dp/8894255697/) book has a chapter by Emanuele on using DDD and Actors in a real-life scenario (which inspired the Talk and Demo 😛)