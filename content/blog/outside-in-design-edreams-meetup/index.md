---
title: "A Case for Outside-In Design: Sandro Mancuso @ Tech Talks by eDreams ODIGEO"
date: 2023-01-25T22:00:00+01:00
publishdate: 2023-01-25T22:00:00+01:00
tags: ["meetup", "tdd", "talks", "architecture", "notes", "summary"]
comments: true
---

Hi 👋 and welcome to a new post!

In my 2022 review, I said that one of my goals for 2023 was to participate more in communities (meetups, conferences and so on). Well, as a first step to achieving that goal, I attended a meetup hosted by eDreams ODIGEO ([here](https://www.eventbrite.com/e/tech-talks-by-edreams-odigeo-milan-hub-inauguration-special-edition-tickets-493515075877)) on January 24th.

For the inauguration of their Milan Hub, eDreams hosted Sandro Mancuso for his talk “A Case for Outside-In Design”, in which he proposes a set of practices and techniques to make business and technology meet when designing and extending a system.

You may already have heard of “Outside-In Design” on this blog [before](https://marcobacis.dev/blog/2022-dec-mars-rover-kata-meetup/). Sandro’s talk follows the same philosophy and extends it not only to code but to the entire business and product decisions made before coding even begin.

*Disclaimer: I will share some notes/brief recap of the talk given by Sandro. It’s by no means a complete transcription and may contain my own interpretation of what was said. Go watch his past talks (e.g. [here](https://www.youtube.com/watch?v=VSkDu5YgAh4)) for the real deal!*

### Developer Biases and The Inside/Outside perspective

The talk started with a list of biases (most of the time we call them “practices”) that affect software developers. They include:

- Structural biases (procedural, oop, functional, services, event-based)
- Design biases (all architectural design patterns such as SOA, Actor model, Hexagonal arch, Microservices and so on..)
- Design Direction biases (starting from the persistence, domain, UI, and lastly **incremental outside-in**, the topic of this talk)

Most of the time we tend to work led by our biases: a backend developer will start working on the domain model and then implement the details (infrastructure, application); frontend will start working from the design of the UI down to the actual implementation. However, in this way, we end up with a discrepancy between the systems, and this leads to ugly adapter layers to adapt the API exposed by the backend and the data the frontend needs to work.

This behaviour extends also at a higher level, that of business and product design. Technology and product work in parallel tracks, and then need to somewhat meet at the intersection: the top of the backlog. At that moment, it’s more difficult to align the product decisions needed to create value for the company and the system design.

Software design should **serve** the business, and its value should be measured by how much it impacts the business value. Thus, we need to align the two perspectives, inside (technology) and outside (business).

To solve this issue, Sandro proposes a different approach, in which we start from the product and then define lower and lower level abstractions of the system, contrary to the standard inside-out design approach.

### Outside-In Design

The first thing to do when designing a new system or a set of features for the business is to create a birds-eye view (**product box**) in which we put the main features that bring value, and the main functional areas involved.

Then, we proceed to do **Impact Mapping**, in which we identify the high-level bounded contexts and architecture. Starting from the main goals of the system, we identify its actors and the different impacts they have, on the deliverables (features). Sandro showed an example using mind maps, refining the different levels (actor → impact → feature) on every iteration.

After impact mapping, with **Functional Mapping,** we identify the business flows, the external (and internal) users and systems and connect them, in a way similar to sequence diagrams but using bounded contexts instead of classes. It allows to decide which systems are external and which are internal, and which should become public APIs or internal services. Sandro gave some examples, one in which only one service (the catalogue) was public-facing, and another (checkout) in which all services were public and called by the frontend.

**User Interaction via Mockups** is the step in which we see some UI (finally!!). Sandro does the mockups with Balsamiq, as it allows the creation of dynamic wireframes. It’s better to do them with UX experts, in order to have a basic wireframe both for the UX/UI team and the development team (by designing the APIs and the data needed by the frontend).

Finally, we get into the actual software design and implementation with the method we prefer (Inside-Out or Outside-In TDD for example 😏).

All these steps might seem long, but Sandro explained that they are actually short (e.g. product box can be done in an afternoon!) and need to be performed at different intervals (6/12 months for the highest level, then 3/4 months, monthly, 1/2 weeks and finally daily for the actual coding practices).

### That’s it!

As you can see, I just wrote a quick summary of Sandro’s talk. The meetup also included a panel with Sandro and three people from eDreams ODIGEO (the CTO Carsten Bernhard, Milan’s Hub Director Luca Pivotto and Agile Director Brett Ansley), in which they continued the argument brought by the talk and expanded with other content (e.g. how to tackle and measure technical debt, what is value and much more). I didn’t include it in this post as I didn’t take notes 😅.

Overall, the meetup was really interesting. The outside-in perspective is (as in the last meetup I attended) a great way to meet the tech side of the business (working on the nitty-gritty details and implementation) and the product side (concerned with value, customers and overall functionality of the system).

I think that this could be really useful in both big companies (to iterate on new features) and in startups (to design the first system in an extensible and “growable” way). During the talk, Sandro mentioned a book that is on my “to read” bookshelf, “[Team Topologies](https://teamtopologies.com/book)”. Employing an outside-in perspective allows in the end to define these topologies in advance, allowing the system to grow organically and without breaking everything on each iteration.

That’s all for today’s post! Thank you for reading (if anyone is reading this 🤔) and see you next time!

### Additional Resources

Some other places to find Sandro’s talk:

- [Blog Post](https://www.codurance.com/publications/2017/10/23/outside-in-design)
- 2019 [Talk](https://www.youtube.com/watch?v=bvie9vl7X6A)
- 2018 [Talk](https://www.youtube.com/watch?v=rbSDGr-_UwY) and [Slides](https://www.slideshare.net/sandromancuso/a-case-for-outsidein-design) (don’t know if they are the same exact version)