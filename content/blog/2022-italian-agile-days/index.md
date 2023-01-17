---
title: "My Experience at the Italian Agile Days 2022: Talks and Reflections"
date: 2023-01-17T18:00:00+01:00
publishdate: 2023-01-17T18:00:00+01:00
tags: ["conference", "talks", "summary", "agile", "programming", "architecture"]
comments: true
---

Hi 👋

Today’s post is about my experience at the [Italian Agile Days 2022](https://www.agileday.it/), which I attended in October 2022. I know, it’s way too late to write this, but I still think that remembering the talks I watched will be useful for others 😃.

The Italian Agile Days is a 2-day free conference held in a different city every year, in which people interested in agile practices (programmers and business people alike) gather to talk about agile and development practices.

This year, the conference was held on the Brescia University campus. It was my first in-person conference in 3 years, and seeing live talks and talking with people with the same interests was refreshing and inspiring!

I mostly watched technical talks about programming, but some of the ones you’ll find below drift from pure programming into the realm of philosophy (and psychology), and they were the most interesting.

Enjoy!


## Talks

*Disclaimer: most talks were in Italian. The videos are available [online](https://vimeo.com/showcase/9957525), here I’ll just post a brief summary and my opinions on the talks.*

### Keynote: Myth busting in agile Scaling (en) - Nigel Thurlow
[Video](https://vimeo.com/767786361)

Nigel has been the first ever Chief of Agile at Toyota, and while there he created “The Flow System”, a flow-based approach to delivering value built on the Toyota system.

In his keynote, he debunks myths and tries to solve the “format war” between agile practices. The talk is packed full of considerations and stories about agile…so full that I cannot summarise it here without writing everything Nigel says. Please go check it out!

### Event Sourcing + CQRS: a light introduction (en) - Paolo Banfi
[Video](https://vimeo.com/768885882)

In this talk, the speaker introduces two important concepts that allow to easily change and add functionalities to our systems: event sourcing and CQRS. 

To explain them, he presents an example based on a shopping cart, showing that by just saving the current state of the system (as we usually do with databases) we lose information that could be useful to the business. By using event sourcing and CQRS strategies, we employ a more generic model that allows using these pieces of information without making the system much more complex than before.

Paolo does a great introduction to both arguments. Even if I never used event sourcing and CQRS before, I now feel like I should use them in all my future projects!

### Diamo una chance a una codebase legacy? (it) - Nicola Mincuzzi
“Let’s give a legacy codebase a chance”

[Video](https://vimeo.com/768879474)

Working with legacy codebases is a dread. Legacy systems are unstable, and every change to their code or structure leads to bugs and unknown issues, given their lack of tests.

In his talk, Nicola shows a project on which he worked, and describes how he “attacked” the legacy monster by using harnesses and a lot of testing. He basically followed the advice in Michael Feather’s “Working Effectively With Legacy Code" which was effective for real!

Given that this was his first talk, it was great. I’m also working on a nasty legacy project, and seeing other people's (successful) experiences is inspiring and comforting at the same time.

### I’ve done TDD wrong all the time (it) - Luca Giuberti

[Video](https://vimeo.com/768875860)

In this talk, Luca expresses a common concern that we all think about while writing tests - Am I testing too much the implementation? Do the tests reflect the **what** (the business need), or do they represent the **how** (implementation)?

Luca shows a more sustainable way to test, in a **coarse-grained** fashion. I find this more in line with how I usually test, by testing the behaviour of multiple/larger modules and not of the single classes and methods (with a lot of mocking). 

The definition of “unit” is quite confusing. Some of us end up testing single classes or methods in isolation, by mocking every external dependency. Luca’s talk advocates for a coarser grain, like testing multiple (cohesive) classes for their external behaviour. It might seem like integration testing, but it’s not, and I think is a more sound approach.

### L’arte dello sviluppatore (it) - Marco Fracassi
“The software developer art”

[Video](https://vimeo.com/768873513)

In this philosophical (and humorous) talk, Marco talks about the role of creativity (and how to get creative) in software development.

Software developers are a creative species, despite the stereotypes that others associate with the role (and we get a huge list in the talk). Practices such as pair programming, TDD and DDD are indeed quite creative and, at the time of their definition, were revolutionary.

Software development is a social activity in addition to technical practices, and in this regard, creativity can help us solve problems better. Marco presents a lot of ways to increase creativity personally and in the workplace (by increasing psychological safety) and what tends to stop it (ignorance, hyper-specialization, fear, vanity etc..).

In the end, the talk was very inspiring and showed that there’s a lot of “art” in our practice as software developers.

### Dal carbone al software: i sistemi socio-tecnici (it) - Ferdinando Santacroce
“From coal to software: socio-technical systems”

[Video](https://vimeo.com/768881541)

Agile is not just for programmers, and Ferdinando shows us why in his talk. He tells a story set in post-war England, when a technological innovation (the “longwall”) was introduced but didn’t improve productivity, all because of social issues.

The researchers found out that this innovation disrupted (in a bad way) the current social organisation of the mines. From autonomous, cross-functional and trusted teams, the longwall brought hyper-specialisation, control and loss of autonomy and ownership, leading to lower productivity.

This story serves as a reminder that all techniques and practices we see today in agile (such as lean, kanban, XP etc..) didn’t start with programming, but are way older. In addition, we cannot only think about the technical aspects of the organisation, because the social ones are way more important!

## Conclusion

I really enjoyed attending this conference!

Each talk explored an argument which I didn’t know and wanted to know more about. I also got to meet new people in a community near me (Brescia is right next to Bergamo and Milan) and I also got gadgets 🤩. In addition, I bought two books from Avanscoperta: “Cronache di Domain-Driven Design” (DDD Chronicles) and “Decision-Making for Software Development Teams”. I hope to read them soon!

That’s all for today. I hope you enjoyed this short summary of my experience at IAD2022, and I hope to attend and write about next year’s conference (and some workshops? 😇).