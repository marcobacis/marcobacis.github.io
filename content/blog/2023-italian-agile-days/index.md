---
title: "My Experience at the Italian Agile Days 2023"
date: 2024-01-16
publishdate: 2024-01-16
tags: ["agile", "conference", "iad", "programming", "summary"]  
comments: true
---

Hi 👋 and welcome to a new post!

Today I’m writing a summary of my experience at the Italian Agile Days 2023.

I already wrote about the 2022 edition [here](https://marcobacis.com/blog/2022-italian-agile-days/) and, just like last time, I’m writing this summary 2 months after the event…but let’s not worry about this short delay.

This year, the event was organised at the Politecnico di Milano campus. I graduated there about 4 years ago, so it was a great occasion to return there! I got to see how the campus changed, and I met some old friends (at [NECSTLab](https://necst.it/)) who stayed for their PhD.

Let’s start 💪

## First Day - Unconference

The first day was dedicated to the unconference. An unconference (also called open space) is an event in which the agenda and the sessions are decided by the participants at the beginning of the day.

This was the second unconference I ever attended (after SoCraTes, which I described [here](https://marcobacis.com/blog/socrates-2023/)), and I must admit that I’m starting to get addicted! They are a great way to get inspired and they cover a lot of themes and topics (less $$$ spent attending distinct conferences 😜).

![](./iad_unconference_marketplace.png "Friday’s unconference agenda")

Here is a summary of the sessions I was able to attend. 

*A little disclaimer: I didn’t take many notes (and I’m writing these summaries after 2 months 😅), so even remembering the title is enough… you’ll notice during which session I took notes and which I did not 😂.*

*In addition, I skipped some sessions and just went along with some other groups during the day. That’s the best part of unconferences: conversations just happen, and there are no limits to the discussions outside of the event itself!!*

### Unicorns - Evolving Systems, where to find them? - [Alberto Acerbis](https://www.linkedin.com/in/aacerbis/)

In his session, Alberto gave an overview of how we can tackle the complexity of software design using Evolutionary Architectures.

When designing a system, we try to find a model that “fits” the problem we are trying to solve. However, the real world is complex (and sometimes chaotic), while software developers try to fit it into a clean, deterministic and simple model. 

The guiding principle of Evolutionary Architecture is to perform guided, incremental, non-breaking changes across multiple dimensions (e.g. application and operations). Alberto then gave some links and concepts related to evolutionary architectures, such as:

- Modularity (low coupling and high cohesion)
- Using fitness functions to guide the evolution of the architecture
- The tradeoff between DRY and WET software (is it always better to reduce duplication?)
- Using different tools for different problems (no silver bullet)
- Least Responsible Moment (delaying decisions when you have enough information)
- “Laws” such as *Postel’s* and *Conway’s*

After his session, I had a lot to process (I just highlighted some of the arguments he explained), and it was a great overview of software architecture principles!

### How to stop writing unit tests and be happy - [Franco Lombardo](https://www.linkedin.com/in/francolombardo/)

Franco gave a session on how ATDD (Acceptance Test-Driven Development) can help make us happier by writing easier tests.

ATDD is a flavour of TDD in which we develop a feature by starting with acceptance tests instead of standard unit tests. ***Acceptance tests*** are tests written from the perspective of the user and with the language used by the user/business. They are useful because when the test is green, then the user/business (and us) is happy and the functionality is implemented as specified (at least that’s how it should be).

In his session, Franco showed us that doing ATDD is easier than ever. He argued that testing with the real storage (db engine) is easy if the system is designed simply (e.g. without triggers, stored procedures or other complex stuff) and that persistence is not an “implementation detail” after all.

ATDD is not for everyone and every project, and he showed us the cases in which it shouldn’t be used (e.g., inexperienced developers, greenfield projects, UI-heavy applications, or projects too small or too big). In general, ATDD is a tool we can leverage in addition to the others.

I usually develop my tests using a similar approach (from the API controller to the DB, either in memory or in a small container) and find it useful, so Franco’s session confirmed my approach 👍 (even if there were a lot of discussions afterwards). 

### Legacy Code, theory and practice - [Andrea Francia](https://www.linkedin.com/in/andreafrancia/)

Andrea gave a lecture (a real one, with a blackboard and in a university campus!) on how to work with legacy code. In the end, he gave a very straightforward summary of the “Working Effectively with Legacy Code” book!

First, he started with some definitions of legacy code, such as:

- Code without tests, or badly written tests (e.g. fragile, driven by the underlying implementation)
- Code we are afraid to touch and modify

After defining the enemy, Andrea showed us how to fight it. The way to do it is, of course, to add tests. But how do you add tests when the code doesn’t help (cannot refactor without test, cannot test without refactor)? We can use some techniques such as **characterisation tests**.

Basically, to test a legacy system we treat the system as a black bock driven by its I/Os (disk, DBs, network, external APIs etc..), and drive the I/O with tests to cover the piece of code we need to modify for the feature we have to develop. After covering the legacy code with enough tests, we can finally refactor it and start to develop the new feature.

Andrea told us about some cases that happened to him, such as testing using the log outputs to check that the system was behaving correctly. He also debunked the myth that we cannot use the debugger while doing TDD…with legacy code, everything is possible (and accepted).

Of the entire session I still remember a phase Andrea said: “Tests are like bets”. I think this sums up pretty well how I feel about tests and TDD in general. Every time I write a test, I’m betting that the system will behave in a certain way, and then correct my assumption (when doing characterisation tests) or the underlying implementation (during normal TDD) based on the test output.

### TDD Training for devs working full time - [Matteo Vaccari](https://www.linkedin.com/in/matteovaccari/)

Matteo is a Technical Principal at ToughtWorks, and in his session, he presented a problem he currently has: how do I train developers in how to use TDD, if they are already working full-time on different projects? I must admit I arrived late at this session, but just by watching the drawings there were a lot of ideas 😜

### Pair Programming discussion - [Angelo Ceccato](https://www.linkedin.com/in/angeloceccato/)

Angelo proposed an open discussion about pair programming. In a small group, we discussed what pair programming means for us, if and how we are using it at work and what are the advantages, disadvantages and common issues with it. I don’t pair often (and never in the “canonical” way at least), and hearing the stories of other developers was interesting, from people who do it every day and for more than half of their workday, to others who are sceptic about some of its implementation, and to others (like me) who never did it apart from emergencies and workshops.

## Second Day - Conference

The second day was a standard conference, held in a single Polimi building (n. 3 to be precise). 

After arriving at the main campus and finding the entrance (on Saturday all secondary entrances are closed it seems 🤔), it was time to grab the goodies bag, buy the conference T-shirt and finally attend the main event!

Here is the usual (incomplete) list of talks I watched (and some notes when I took them).

### E non ci indurre in tentazione, ma liberaci dal bug - [Marco Fracassi](https://www.linkedin.com/in/marco-fracassi/)

In his talk, Marco explained how emergent design can help keep a codebase clean, maintainable and close to the domain of the business.

He started with a definition of emergent design and its advantages (e.g. non-speculative, working in small steps, refactoring and simple design), then he went on showing how legacy code has little to none of that!!

Most legacy code contains recurrent (anti)patterns that push it far away from the domain:

- Layered architecture (code divided by layer instead of features)
- Anaemic objects
- Big Services doing everything
- Dependency Injection with a lot of scattered containers (10+ parameters constructors anyone?)
- Behaviour separate from the data (which is caused by all the above)

In the long run, these issues affect most legacy systems and lead to unmaintainable code. To make it worse, the problem is not caused by the framework or language (and we love so much to blame the language!).

To solve these issues, Marco proposed some solutions, such as:

- Introducing repositories to separate domain and persistence
- Extracting (domain-based) use cases from big services, to separate responsibilities and make a set of smaller, cleaner functionalities
- Bringing data and behaviour closed by using domain objects (again, bringing code away from big services)
- Splitting read and write procedures (usually removing useless use cases, most of all in the read part)
- Writing tests and add coverage (remembering that coverage itself is not fundamental, but tests can act as a “parachute”)
- “contamination”, through pair/mob programming and shared learning

The main takeaway from his talk is that the design can emerge if we work in small steps, keeping the domain as central in the application and bringing data and behaviour close together (as in DDD).

Marco just started his YouTube channel [ImprovingCode](https://www.youtube.com/@ImprovingCode) (in Italian) in which he talks about these (and other) topic, check it out!! 

### BDD: Molto più che testing - [Fabio Cocchi](https://www.linkedin.com/in/fabiococchi/)

Gathering requirements for a feature or a product is always difficult. We can write all the specifications we want, but then, as developers, we are left alone to implement them.

BDD (Behavior-Driven Development) is an agile methodology that enables customers and developers to collaborate on the requirements process. It involves writing a verifiable specification that can be used as acceptance criteria.

Fabio introduced us to this world and its main principles and ingredients. In particular, he described the process of using **behaviours** to model the system requirements and how it helps in delivering value to the business more quickly and with fewer iterations. By writing acceptance criteria using a shared language, developers and customers can communicate effectively and understand the domain together, resulting in higher quality and faster delivery.

### TDD e il mito del 100% code coverage - [Gianni Bombelli](https://www.linkedin.com/in/gianni-bombelli/), [Manuela Munaretto](https://www.linkedin.com/in/manuelamunaretto/)

Gianni and Manuela staged a great theatrical show, in which two developers discuss a bug they found in their team codebase.

The twist is that the buggy code has 100% test coverage! How is it possible?

During their session, Gianni and Manuela showed that code coverage isn’t the best metric to follow when writing tests, and that it’s more important to write proper tests (asserting the behaviour of the system, and not only blinding covering lines…).
I didn’t take any notes because I couldn’t stop laughing during the session 😂 it was great, and in the end, they were able to find and fix the bug (and then they lived happily ever after).

### Just Commit to master, please - How to actually implement CI - [Daniele Scillia](https://www.linkedin.com/in/daniele-scillia/)

Daniele showed ***why*** and ***how*** to implement Continuous Integration the right way, using Trunk-Based Development. I like how he compared the usual pull-request model with trunk-based development and why they have different use cases (open source software the first, usual product development the latter).

I didn’t take notes, so I’ll just give you a link to Daniele’s [website](https://danthedev.carrd.co/).

I also highly recommend his newsletter, [Learn Agile Practices](https://learnagilepractices.substack.com/), in which he explains agile practices (technical and not),  each week. I’ve been following him since the beginning of 2023, and every new post was great 👍.

### Building a culture of SW Craftsmanship - [Michele Brissoni](https://www.linkedin.com/in/michelebrissoni/)

In his talk, Michele presented the [SW Craftmanship Dojo](https://swcraftsmanshipdojo.com/), a platform in which he teaches the principles and techniques of software craftmanship with a holistic approach.

The dojo trains students by using techniques taken from the world of martial arts (of which Michele himself is a very expert practitioner). Students learn eXtreme Programming concepts (all the *DDs out there), DevOps and Infrastructure/SRE stuff and also product-related topics, making theme all-around professional software craftsmen.

His talk was really interesting and showed that I still have A LOT to learn in order to be a real  professional 😅

### In between talks…

While taking a break, I decided to not follow any talk and just roam around the conference. 

While wandering around my old university halls, I stumbled upon some people from [QMates](https://qmates.tech/) ([linkedin](https://www.linkedin.com/company/qmates/)) who just took an empty lecture room as hostage and started doing the [bank kata](https://github.com/sandromancuso/Bank-kata) on the small desks used by students.

It was a great moment, as I watched a mob discussing the proper way to develop and test REST endpoints for a fake bank account service in a university room… it couldn’t get better 😁

These are exactly the reasons why I prefer in-presence conferences to their online version…

### Come funziona il cevello di un programmatore quando impara e affronta nuovi problemi? - [Pietro Roversi](https://www.linkedin.com/in/pietro-roversi-61070527/) ([slides](https://www.slideshare.net/PietroRoversi3/come-funziona-il-cervello-di-un-programmatore-quando-impara-e-affronta-nuovi-problemipdf))

How does our brain work, and how can we exploit it to work with code better?

Pietro introduced us to the magical world of our brain. He talked about memory, cognitive load, knowledge and flow, and how everything impacts our work as developers.

For example, short-term and working memory are essential to keep a flow state, and we can improve our flow by learning the syntax and some of the documentation of our languages and frameworks (which we never do 😂). This also allows to reduce interruptions (google searches which become a rabbit-hole of surfing the web in various ways) .

Another interesting fact is that working memory is involved in a process called chunking (dividing and storing information in chunks), and with more experience comes better chunking… so, reading more code (and having more experience) allows senior developers to remember it better than the juniors 🤯.

Pietro’s talk was full of these insights, and I enjoyed the explanation behind how our brain works! 

### Navigando nel mondo del software, tra modelli e realtà - [Ferdinando Santacroce](https://www.linkedin.com/in/ferdinandosantacroce/), [Marco Massarotto](https://www.linkedin.com/in/massama/)

The last talk I attended was given by Marco and Ferdinando. Together, they explored the difference between models and the reality of software development.

In their talk they linked various arguments and topics (from User Stories to technical debt and the definition of Ubiquitous Language in DDD) to highlight that we operate in a world of approximations.

I enjoyed this session (as I did with Ferdinando’s session [last year](https://vimeo.com/768881541)) because it reached full circle with the first session I attended the day before (given by Alberto Acerbis, see above) in showing the importance of modelling and facing approximations in our job as developers.

## Conclusions

The conference was great!

Last year was my first time and I had some trouble meeting people and just enjoying the event.

This time, after participating in the community a bit more, I was able to attend the conference with a different mindset and just enjoy it.

The fact that the conference was held on the Politecnico campus was the cherry on top: I was finally able to visit the campus again after 4 years and sink into the memories (both good…and bad 😅) of my university years.

I can’t wait to see what next year brings in terms of events, and to keep learning!

See you next time!