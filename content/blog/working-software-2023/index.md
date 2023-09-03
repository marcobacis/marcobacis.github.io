---
title: "Working Software Conference 2023"
date: 2023-07-02T18:00:00+01:00
publishdate: 2023-07-02T18:00:00+01:00
tags: [".net", "agile", "backend", "conference", "summary", "tdd", "refactoring"]
comments: true
---

Hi 👋 and welcome to a new post!

Last Friday I attended the 2023 [Working Software Conference](https://www.agilemovement.it/workingsoftware/) in Milan. The Working Software Conference is an event organised by the [Italian Agile Movement](https://agilemovement.it), focused on the second principle of the [agile manifesto](https://agilemanifesto.org):

> *Working software over comprehensive documentation*
> 

<!--more-->

The meaning of this principle is that we should focus on delivering value (the working software) to the user instead of writing extensive specification documents (a.k.a. “wasting time”, as all the requirements and documentation will need to be adapted to change in a very short time).

The conference contained a mixture of front sessions and workshops.
In particular, I attended two workshops, one in the morning and one in the afternoon. In this post I present a small summary and comment of the two workshops, with some considerations at the end.

Enjoy!

### “Affoghiamo i microservizi nella birra” - Christian De Simone and Alberto Acerbis

*“Let’s drown microservices in beer”*

The first workshop I attended was held by [Alberto Acerbis](https://www.linkedin.com/in/aacerbis/) and [Christian De Simone](https://www.linkedin.com/in/desimonechristian/), and was about how a monolith can deliver value to the customer in a fast way, and without compromising its future extension and scalability.

The first part was a small exercise: we had to design and start implementing a couple of services (purchases and warehouse) for a small brewery. We divided in groups, and in my team we immediately started splitting the two domains in separate micro services communicating with an external broker. We hadn’t even started to implement the system (just coded the first purchases endpoint) that it was time for a discussion with the other teams.

Every team used a different approach: serverless, microservices, monolith and so on…. in the end, Alberto and Christian discussed the different pros and cons of our solutions, and then presented a way to deliver value to the customer without creating unneeded complexity and costs: a **Modular Monolith**.

Alberto showed an example [solution](https://github.com/BrewUp/WorkingSoftware-2023), with the two different domains implemented as projects inside the same solution. Every domain was separated from the other (and the separation checked with [ArchUnit](https://archunitnet.readthedocs.io/en/latest/) tests) and communicated with a common broker implemented with the [MediatR](https://github.com/jbogard/MediatR) library. This kind of architecture has the pros of both monolith (fast iterations for a small team and small product) and modular and event-based applications, allowing further extensibility in the future, **if** and when the business will grow.

After seeing the implementation of a modular monolith, a question remained: how do we deploy it? And how do we keep costs to a minimum doing it? Different solutions exist:

- Monolith executable deployed on a VM
- Docker container deployed using docker compose or k8s
- Serverless solutions such as container-as-a-service or function-as-a-service

Christian showed us a possible solution: given that the first implementation of the system is a simple monolith, it’s possible to keep costs low by taking advantage of managed serverless solutions, and using docker allows to still be prepared for future extensions to the system (e.g. in a Kubernetes cluster).

Our task for the second half of the workshop was to “dockerize” the simple endpoint we developer earlier and push it to a GitHub repository. He then showed us a way of deploying docker containers in production, by using a managed service offered by [scaleway](https://www.scaleway.com/en/serverless-containers/).

Finally, it was time to show off how we could deploy to Kubernetes, in case our brewery would grow a lot!! Christian set up a small Kubernetes cluster (always on scaleway) in which to deploy our services when they were pushed on a GitHub repository. He also explained a useful tool for deploying on Kubernetes, called [helm](https://helm.sh), which allows to define “charts” (parametrised templates of k8s resources and deployments) that can be deployed as a single unit. Helm is useful both for our projects and to deploy external dependencies (he deployed a MongoDb instance with a click).

Alberto and Christian explained the Modular monolith concept in a easily understandable way, and we were able to gain some concepts and understand the pros and cons of it. In addition, the live code explanation and live deploy to Kubernetes were amazing 😃. I also discovered some tools (MediatR, ArchUnit and helm) that I didn’t know yet, and will try for sure in my projects!


### “Faccio prima il refactor o i tests?” - Gianni Bombelli

*“Should I do refactoring or tests first?”*

In the afternoon, I participated in a workshop held by [Gianni Bombelli](https://www.linkedin.com/in/gianni-bombelli/) and focused on testing and refactoring a (small) piece of legacy code.

We started the workshop with a great ice breaker: Gianni gave us a roll of toilet paper and asked each participant to draw as much paper as we usually use…. then, for each square of paper, each one had to say something about him/herself. Even before coding, I learned something 😂 to use less paper…

The workshop exercise was to work in pairs, testing and refactoring a small piece of code (you can find it already solved by Gianni in his [repository](https://github.com/bombo82/workshop-ws-2023)) themed around the “Another brick in the wall” song by Pink Floyd (obviously, Gianni was wearing a “The Wall” t-shirt 😃). I paired with Christian (from the morning workshop, see above) we started to write a small test for the already implemented method we found in the repo, and….. it threw a “NotTestableCallException”!

Some quick notes about the exercise:

- We couldn’t use external dependencies and libraries
- No Mocks
- The code worked in production, even if we encountered difficulties in testing it! So, we should have touched it with care

The exception we found was a simple example of what we could find in real production code: a static method to get the logged in user (e.g. taken from spring or from .NET authentication modules), which would work when deployed but not on our local setup.

To continue testing this code we should have removed the exception. But how to remove it without changing the production code and without testing it first? How could we test without refactoring first, and refactor without tests?

Gianni solved this dilemma for us: we could leverage some minimal and automated refactoring (available in most IDEs) to “clean” the code enough to write some tests. In our case, this meant extracting the untestable method in a separate method, and extending the class under test to override the extracted method! 

Using an overridden method in a class used only for testing is similar to mocks and stubs, but in this case the “trick” (and the smell) was quite visible (in the tested and the test classes) as a remainder for us to clean this code afterwards.

We used this method for most of the workshop, extracting problematic code from the tested method and using this for our purposes. In particular, we focused on:

- Static/Singleton objects and methods out of our control
- System calls (e.g. the use of DateTime.Now for equality)
- Possibile side effects given by external dependencies

After covering all the code with tests, we were finally able to refactor it easily. We tried by ping-ponging refactoring pieces of code between me and Christian, and finished in no time!

A last issue we encountered was how to refactor a possible side effect given by the use of a DAO (Data Access Object). Gianni helped us by explaining that in these cases, the issue can be solved with an in-memory structure to mimic the underlying object without using the real dependency.

In the end, we finally refactored the code to our liking, and ended up the workshop with a discussion on what we had learned.

So, what comes first, refactoring or testing? Here's the solution: first, apply the minimum set of “safe” refactoring to make the code testable. Then, cover the code with tests. Only after that you can refactor the code “properly”! In most cases it will be an iterative process of refactor → test → refactor.

Gianni was a great instructor. He let us bang our heads against the code, and only after he showed us how to work with it. His explanations were on point and, most of all, he encouraged us to discuss with him and the other pairs. I learned some neat tricks to work with untested (and untestable) code and it was great!

## The End!

The Working Software Conference was a great event to meet new people and learn new technologies and ways to work as a software developer. I only attended two workshops, but I would have wanted it to go on for way more than a single day! All the instructors were prepared and engaging, and I learned a lot during the day. I hope to attend other events like this in the near future!

That's all for today. Thanks, and see you next time! 👋



PS.  At the end of the conference there were some prizes, and I won a curved monitor… a great ending for an already great day 😄. Thanks to [Intrè](https://www.intre.it) for the monitor, and all the other sponsors, organizers and participants for the great conference!

![My new setup after the conference](new_setup.png)