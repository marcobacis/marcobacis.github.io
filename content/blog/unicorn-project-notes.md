---
title: Notes on "The Unicorn Project" 
date: 2025-08-27
tags:
  - book
  - summary
  - devops
permalink: unicorn-project-notes
comments: "true"
---

Hi! 👋  long time no see!

The blog has been on hiatus for months, mostly because I didn't find find the time and energy (and ideas!) to post frequently. Even if no one reads it, I promise I'll write more here, maybe shorter posts and snippets. I've already started on changing the blog's layout to encourage this (e.g. making the list flat and without images, so I don't have to choose them anymore!).

Now, let's go back to today's topic.

I have a strange habit: when I'm on vacation, I tend to read essays and technical books 😅.

This time it happened in June. While on a holiday in japan, I read *The Unicorn Project: A novel about Developers, Digital  Disruption, and Thriving in the Age of Data*, by Gene Kim. The book is a sequel to Kim previous book, "*The Phoenix Project*", and the two share the setting and the characters, following *Parts Unlimited* IT department during a technological and business transformation.

The book is a *business-y* book (it takes inspiration from *The Goal*, in fact the Phoenix Project was heavily influenced by it!), so it was not exactly a recreational book. I read it like an essay on software development, trying to extract and learn new concepts from it.

I didn't take many notes, but in this post I'd like to present my comment on it and the major points the book tries to bring home.

Let's start!

## Book  in a nutshell

"The Unicorn Project" is a sequel to Gene first book, *The Phoenix Project*. In the first book we follow Bill Palmer, the newly promoted VP of Operations at *Parts Unlimited*, dealing with the the most important (and disorganised) project for the company. Thanks to lean and devops principles, Bill is able to transform operations from a mess into a well-oiled machine.

The story inside *The Unicorn Project* runs parallel to the first book. This time we meet Maxine, a senior developer and architect who has been exiled to The Phoenix Project after a payroll outage. As soon as she enters the project, she begin noticing all sort of issues inside the project: no build scripts, big-bang integrations, no tests, and in general a lot of silos inside the department. The same thing is happening throughout the wider organisation: missed launches, a project too big to fail and teams not communicating.

Maxine is able to join the "rebellion", create a cross-functional team and attack a small part of the system: the centralised data hub. We follow the rebellion through an "organisational civil war", in which devops and agile practices overcome business, communication and personal issues to finally win, and save the company from being bought by a private equity.

## Main Concepts
### The Five Ideals

The Five Ideals are introduced by Erik, former IT executive turned bartender. In the book, he acts as the mentor to both Bill and Maxine. In *The Phoenix Project* he gave Bill insights into *the three ways* and the *theory of constraints*. Here, instead, Erik shows Maxine *the five ideals*, principles to follow to grow and maintain a system organically.

Here they are, along with my opinions:

#### Locality and Simplicity

The first ideal concerns cohesion and coupling. The more coordination a change requires, the slower development will be. So, components should be decouples to not need multi-team coordination, and simple to be easy to change.

The opposite of this ideal is *complection*, when the system becomes more complex over time and developers work slows down to a halt because of it. It's a mix of technical and business debt.

#### Focus,  Flow and Joy

These three words go together. Basically, a system should be a joy to work with, allowing developers to have focused work (thus, flow). 

The main characteristic needed for this to become reality is one: *fast, early feedback*. A system with fast feedback (e.g. tests, customer communication) allows developers to focus on the job in an incremental way and in a state of flow, becoming more productive over time. 

All of this falls under the umbrella of "developer experience". A clean and modular architecture, great tooling, continuous integration, WIP limits and many other XP and DevOps practices allow developers to work with joy, doing their best and improving the system.
#### Improvement of Daily Work

Continuous Improvement is the cornerstone of agile methodologies, and stems from the Toyota lean production system. Improving the work, the processes and the system daily is an incremental investment which will bring its fruit in the future: faster iteration, less bugs, happier developers.

As an extreme proposal, if we need to choose between implementing features or improving processes and tools, we should prefer the latter. Doing it enables exponential productivity in what matters in the future.

#### Psychological Safety

Psychological safety is a predictor of team performance, and it ties to all the other ideals. It's a prerequisite to continuous improvement and feedback! If people feel empowered to propose changes to the system or highlight constraints and issues, then the system will improve over time. Otherwise, it will get worse as no one will tackle technical debt and cultural debt.

The ways to improve psychological safety are shown in the book:
- Treat the team as the smallest unit (both for assigning tasks and for measuring performance)
- Run **blameless** pre/post mortems to identify what to improve after incidents 
- Accept bottom-up initiatives from the teams who are directly working with the systems 

#### Customer Focus

The last ideal is straight out from the agile manifesto (and from extreme programming). The main goal of a business, and the developers working in it, is to give *value* to the customers of that business.  Developers should then be focused on how the customer uses the system and how to improve its experience, more than internal politics and technology (the architects council, anyone?). Every change and improvement in the system should bring value to the customers.

This also ties to the other concepts introduced in the book (most of all to the core/context division in the system) and is what actually matters to the company.
In the book, Maxine's work starts to count only when she follows the in-store training and sees what actually counts for customers (and in turn to the business).

### The Three Horizons

The concept of the "three horizons" is introduced later in the book (again, by Erik) and concerns product thinking and how to choose which initiatives to start, invest on and keep in a company in the short and long term.

#### First Horizon: Cash Cow

The fist horizon represents the main source of money for the business, the main line of products produced/served by the company.
These types of businesses are the most stable and predictable, thanks to their long history and optimisation through time.

Given their success and stability, they are also under constant attack by competitors, so the company shouldn't take them for granted. The competition might invent new business that makes horizon 1 products obsolete, bringing the company to failure.

#### Second Horizon: Growth and Stability

The second horizon is the future of the company: previously validated products and initiatives that are now growing to profitability.

Horizon 2 are the alternatives to the more stable and tenured horizon 1 businesses, and represent a bet to find new markets and growth areas.
The goal of a horizon 2 business is to later grow to become horizon 1.

#### Third Horizon: Experiments and Learning

Horizon 3 business are experiments and prototypes, in their validation phase. They are the innovation engine for the company, a way to find new products and business lines to keep the company innovative (and not fail in the long run, when competitors catch up).

They require all the ideals discussed before, and most of all a culture of learning, fast and continuous feedback and the capacity to quickly respond to change (basically, they thrive when the company and the teams work in an agile way).

Most of horizon 3 initiatives are destined to fail (given their market, business or technical risks and challenges). The ones standing will become horizon 2 projects, entering in their growth phase.

The book shows how a company might create horizon 3 projects by creating a contest and providing funding and space to develop new ideas. They also help keeping the morale up, upskilling the employees and giving a "relief valve" when working on horizon 1/2 projects (which are more stable, "boring").

## Some comments

I liked this book! It was a good complement to *The Phoenix Project*. When I read the first book, I understood its principles, but seeing them applied in my field (development, and not IT ops) helped in internalising them. 

The five ideals are great principles that can be applied also outside of software development, and the three horizons are a simple introduction to the world of product development and how we should always keep the business in mind in our job.

Obviously, devops principles and techniques are the main focus (or at least, I saw them as more central) of the book. The author put a lot of emphasis on developer experience (testing, continuous integration) and on agile practices (cross-functional teams, customer on-site, team dynamics and so on).

I really liked two concepts:
- Complection -> how software becomes more complex over time (entangled, coupled) without proper care
- Core and context, and how they relate to product development, but also to DDD and other design techniques (e.g. [Wardley Map](https://en.wikipedia.org/wiki/Wardley_map))

The only negative note I have is: everything was too perfect! CEO backing the project, a cross-functional team of super-senior developers, a perfect manager serving the team, and a great success at the end. I know that it's a novel, but it felt too much like a dream.

That was it! I hope to have piqued your interest in *The Unicorn Project*, and if not, at least you learned some of the main DevOps principles.

See you next time!!

---

Resources
- [The Three ways](https://itrevolution.com/articles/the-three-ways-principles-underpinning-devops/) (from *The Phoenix Project*)
- [The Five Ideals](https://itrevolution.com/articles/five-ideals-of-devops/)
- [Three Horizons](https://itrevolution.com/articles/evolving-the-it-funding-model/)
- [Core and Context](https://blog.while-true-do.io/devops-core-and-context-work/)