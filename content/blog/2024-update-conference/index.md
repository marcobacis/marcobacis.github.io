---
title: "Update Conference 2024 Journal"
tags:
  - conference
  - summary
  - dotnet
  - architecture
permalink: 2024-update-conference
created: 2024-12-01
date: 2024-12-01
comments: true
---

Hi! Welcome to a new post 👋 .

It's been a while since the last time I wrote on the blog (June  🥶). I had a lot to do during the summer (had to organise my wedding 💍) and didn't find inspiration to write. I promise I'll be more active from now on 😁.

BTW, let's get right into business.

I just got back from [Update Conference](https://www.updateconference.net/) in Prague! Update is a conference focused on .NET and related technologies (all in Microsoft salsa).

<!--more-->

The idea to go there came to my Tech Leader ([Omar](https://www.linkedin.com/in/omarmuscatello/)) even before joining [Zupit](https://www.zupit.it/) last year. Given that we use .NET a lot, we decided to go there with the entire team! This served both as a learning experience, and as a way to get together. Working remotely can feel lonely sometimes, so why not have a beer in Prague, and learn something at the same time?

Here's a summary of my experience in Prague.

### Day One

Day one started with a great breakfast offered by the conference organisers. In general, food was plenty for the entirety of the event (breakfast, lunch and even an happy hour included!).

I had a lot for breakfast, then the talks started. Here they are!

#### Entire Stack C# ([Al Rodriguez](https://programmeral.com/))
Al showed the audience how it's possible to build, deploy and test (e2e) an application using (mostly) .NET, in a real "full" stack scenario! 

We are now used to building full-stack applications in .NET (at least, some people do...not me 😅), but Al showed us how to extend the stack to include even DevOps tasks (build, deploy and test). The industry standard is to use multiple tools which use yaml...but yaml is an ugly language, so why don't we use our strongest skill (.NET) to configure and run them?

During the talk, Al created a sample application in .NET (using Minimal API and Blazor). He then used [cake](https://cakebuild.net/) and [nukebuild](https://nuke.build/) to build the project, [Pulumi](https://www.pulumi.com/) to deploy its infrastructure and [Playwright](https://playwright.dev/dotnet/) to test the deployed application.

I really liked the concept behind the talk, even if I don't agree with using .NET on the entire stack. I think that having diverse tools and a clear separation between them is better than doing everything in the same environment (looking at you, javascript!). In fact, in Zupit we decided to use terraform instead of Pulumi for exactly this reason.

#### Basic Designs and How We Got Them Wrong ([Adam Furmanek](https://adamfurmanek.pl/))

In his talk, Adam started from basic constructs of programming languages and design patterns, and destroyed them!

First, he started with the Liskov Substitution principle. He explained it, then drilled down on the example that Wikipedia gives (which is slightly wrong w.r.t the definition). Basically, the Liskov principle seems to be applied to properties of a **type**, but instead we should intend it applied to the **behaviour** of a component! Adam insisted that we should document this in contracts (in particular in documentation). I agree, and I add that this properties should be specified and enforced in unit tests!

After that, he listed a lot of constructs we use daily, and proceeded to destroy them: he talked about dependency inversion, inheritance, DRY principles and, most of all, function *coloring* and async. He mostly showed examples using C#, but the opinions can be extended to any language employing these patterns.

#### Interlude: table soccer and talking with people

This is not a talk summary 😁

The great thing about in-presence events is the opportunity to meet and talk with people you don't know, and wouldn't even have the chance to meet when at home or at the office. This was the case for me at this conference!

Right after lunch, we started playing the table soccer (kindly offered by one of the sponsors, [Riganti](https://www.riganti.cz/en)). After enjoying our time there, we had the chance to stop at the Microsoft booth, and met [Vlad Zarytovskii](https://www.linkedin.com/in/vzaritovsky/).

Vlad is lead the F# compiler and tooling team lead. He introduced us to the Microsoft team in Prague (with some italians, like [Marco](https://www.linkedin.com/in/marcorossignoli/)) and we talked about work in Prague, how Microsoft participates in developer events, and I discovered he worked on some rust projects at Microsoft 🤩. Definitely a great person to know.

This was a nice encounter during the talks, and for me that's why it's worth to participate at this kind of events, even if they seem expensive and useless for some companies. I skipped some talks, but got something even better in exchange.
 
#### Closing the loop: instrumenting your applications with OpenTelemetry ([Alex Thissen](https://github.com/alexthissen))

In the aftrenoon, I was able to attend only one session, and Alex gave a great introduction to OpenTelemetry in .NET. OpenTelemetry is a protocol to expose observability signals from our services.

Alex explained the main signals that we can expose from an application (traces, logs and metrics) and showed how the OpenTelemetry libraries allows to expose these signals easily from our .NET application. I already knew about logs and metrics (used prometheus some time ago), and really liked the introduction to tracing and how easily we can add it to .NET (in a transparent way too!).

### Day Two

Time for day two! This time, I tried to eat less for breakfast 😅. Strong from the previous day of talks, the goal was to attend most of them without playing at the table soccer in the break room.

Let's go!

#### .NET Aspire: The new way to be cloud native with .NET ([Isaac Levin](https://www.isaaclevin.com/))

To start the second day, I attended an introduction on [.NET Aspire](https://learn.microsoft.com/en-us/dotnet/aspire/get-started/aspire-overview) by Isaac Levin. In his talk, he showed what Aspire is, how to run a small project with it, and the wonders of the aspire dashboard.

Aspire is a set of "developer productivity" tools, allowing to ease the development of distributed applications. In particular, it allows to orchestrate multiple services *locally* (e.g. developing an application which uses PostgreSQL, Redis and other services) and to deploy them *remotely* (for now on Azure) using only .NET. 

One thing I found interesting from Isaac's talk is the Aspire Dashboard, which allows to collect telemetry signals and monitor our application and related services in a single click with a pre-configured container.

I still think that it's better to keep deployment tools and languages separated from the application code (see the talk above) to keep responsabilities separated, and to enable collaboration among teams with different tech stacks.

Anyway, Aspire was interesting. I think it might be useful as a scaffolding tool for new projects, as it allows to run locally an entire distributed application with fewer lines of code.

#### Let none survive! How to test our unit tests with mutation testing ([Stefan Polz](https://github.com/Flash0ver))

Testing is a fundamental practice in software development (even more if done before writing production code...TDD anyone?). But how can we be sure that our tests are working correctly, that our code is thoroughly tested?

Enter the world of Mutation testing!! Stefan showed how mutation testing works, and how we can easily integrate it in our application development using [Stryker](https://stryker-mutator.io/docs/stryker-net/introduction/).

I really liked the introduction to mutation testing, and even more the live demo he gave on a sample code. I think mutation testing is a valid addition to our projects. For most applications it might be overkill  (at least in projects I worked on), but it can be useful for "safety critical" environments (e.g. firmware, medical, defence, aerospace and so on) and for library code, which might be used in wildly different scenarios.

#### 15 years of insights from a TDD practicioner ([Dennis Doomen](https://www.dennisdoomen.com/))

Dennis gave a lot of advice on how to make TDD work for you, given his 30 of experience in the field (he's the author of [FluentAssertions](https://fluentassertions.com/), which is widely used to write tests afterall!).

I wrote down all his bullet points on a paper notebook, but I'm not going to write all of them here, just some concepts I found interesting.

The first is the concept of *Unit*. In most books and courses, unit testing refers to unit as the single class which should be put under test. Dennis instead recommends to test the outside behaviour of the system (which in some cases is called contract testing), so the unit is usually wider than a single class! The scope of a test should be an entire module (or slice in the case of vertical slicing).

Another interesting advice is to make tests explicit, as they represent the "specification" of our software. As the agile manifesto says, "working code over comprehensive documentation". In the case of TDD, the code is most of the documentation and specification (if it's not written on a test, then it shouldn't happen!), so tests should emphasize the behaviour of the system. Here he talked about naming, expressivity and structure of the tests.

Finally, Dennis recommended to expand the scope of the tests outside the core business logic, integrating the database (without touching it directly from the tests, be aware!) and not employing mocks more than necessary, to test the entire behaviour of the system from the perspective of the user. I agree with his reccomendation, even if sometimes I would like to write smaller tests for some logic of my applications (testing the entire API and database can sometimes be really slow, both in development and in build times).

As always when talking about processes and methodologies, most of the advice has to be taken in the context of each project and team. Most of the bullet points he discussed where contrasting. As developers, it's our work to find the right tradeoffs, while sometimes we can be more "dogmatic" if we think something is important (e.g. we cannot skip testing at all, but at least we can play with the definition of what a "unit" is).

#### Let's design a new C# language feature ([Jared Parsons](https://blog.paranoidcoding.org/))

Jared is the C# compiler lead at Microsoft, so he's the real deal when talking about C# features. In his (first, for today) talk, he told the story of a "simple" C# feature: variable length argument with `IEnumerable` instead of an array.

Basically, for most of .NET history, if you wanted a variable number of arguments to a method, you would do so by defining an array with the `params` modifier, like this:

```csharp
void method(params string[] multipleParams) {}
```

But why does the param needs to be an array, and not any other collection type?

Jared explained why, and how they were finally able to add this feature in .NET 9. Most of the time the feature was low priority (because of the difficulty of implementing it, keeping the compiler retro-compatible and without real users concerns). In the end, the right moment came with the introduction of `Span<T>` and [Params collections](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/proposals/csharp-13.0/params-collections) in C# 12, which made the feature "trivial" to implement (somewhat).

The story told by Jared highlighted how most of the times what technical people want is not aligned with what the business (and clients) want, but with a happy ending this time!! He also explained how the C# compiler team always thinks about developer experience (for example, why is `Select` at the end and not at the beginning of a LINQ expression? To allow intellisense to work out the type of the collection and suggest the right methods and types afterward!).

Finally, watching someone talk about language design and compiler features is always interesting, even if I don't understand most of it 😅.

#### Exploring Source Generators in .NET ([Jared Parsons](https://blog.paranoidcoding.org/))

The final talk I watched was again from Jared. This time, he gave an introduction to [source generators](https://learn.microsoft.com/en-us/dotnet/csharp/roslyn-sdk/#source-generators).

Source generators leverage the C# compiler api to allow *compile-time metaprogramming*, based on the source code informations given by the compiler. The system is also integrated with IDEs, so it allows to seamlessly compile generated code without the developer intervention. They are really useful and are mostly used in frameworks for mapping, serialization and other boilerplate code (e.g. ORMs).

Jared highlighted the main advantages of source generators w.r.t. systems previously based on msbuild (e.g. razor, wpf, vsix and so on) which need to use intermediate projects/assemblies to work. Source generators allow to work without these limitations, but introduce additional complexity given the incremental nature of modern compilers (e.g. can only generate new files, cannot interact with other generators and are not applied with a given order/priority).

I really enjoyed this talk, as it shows a feature most of us won't directly use in our projects, but are already using without realizing it!

## The End

That's all for this conference! I really enjoyed my time in Prague. We had fun, got updated on the latest .NET features, discovered new ways of working (e.g. with Aspire, Source Generators and with mutation testing) and most of all, met new people.

I never attended a conference solely centered around .NET, and I think that specialized conferences can be a good source of knowledge and a great way to know people in the (not so small) community of your favourite programming language or framework.

That said, I hope to attend next year event, so see you there!
