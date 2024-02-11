---
title: My First Open Source contribution ever @ Open Source Saturday Milan
created: 2024-02-11
date: 2024-02-11
tags:
  - meetup
  - opensource
  - gleam
permalink: my-first-os-contribution
thumbnaildesc: Open Source Initiative logo
---

Hi 👋 welcome to a new post! 

Today I want to write a short post about my recent adventure with open source software, and in particular the experience at my very first [Open Source Saturday Milan](https://www.meetup.com/open-source-saturday-milano/)!

<!--more-->

Open Source Saturday is an event held once a month, organised by [Gabriele](https://github.com/gabrielelana), [Gianluca](https://github.com/fusillicode) and [Daniele](https://github.com/danielemegna). The format is simple: some nerds gather for the entire day in a specific place, and the goal is to contribute to open source!

At the beginning of the day, everyone presents himself and gives a short pitch of what he wants to do for the day. The possibilities are endless:
- ask for help on a personal project
- propose a new project to develop alone or with others
- look for projects in a specific technology/framework/paradigm
- gather along and find out what to do and get inspired (my case)

*Disclaimer*: I have never contributed to an open source project before. Yes, I have some repos online, but they are just exercises or university projects. Also, this was my first time participating in this kind of event, so I was both excited and worried at the same time.

I arrived at the location with the idea of learning Rust. In fact, in the last two weeks I was reading the online rust [book](https://rust-book.cs.brown.edu/) (again) to get a better idea about ownership and lifetimes. So, my pitch was 

> Hi! I'm Marco and I know nothing of rust, so I'm looking for a rust project to contribute to!

As always, things turn out differently form what we expect. In fact, I didn't even see a single line of rust!

As I listened to the others presenting their projects, one project in particular caught my attention: [Giacomo](https://github.com/giacomocavalieri) is a main contributor to a functional programming language called [gleam](https://gleam.run/), which had a compiler written in Rust.

This was my chance! I approached giacomo after the "standup" and started learning about Gleam and its environment. First I followed the gleam [tour](https://tour.gleam.run/) to get a glimpse of what the language was all about.

![Lucy the star, gleam mascot](./gleam_mascot.png "Gleam and its mascot, Lucy the star")

Gleam is a functional programming language focused on type safety, expressiveness and reliability. It's not a pure functional language like haskell in that it allows to write sequential instruction...but the rest is all functional and immutable 👍.

Gleam can be transpiled for two runtimes: the BEAM virtual machine of erlang, and javascript (both node and browser versions). This might be an unusual choice, but I think it can help the language spread more. After all, erlang is a **very** reliable language for large scale applications, and javascript is the ubiquitous language for the web. Targeting both worlds allows to cover the full stack, and using a FP language with a strong type system allows to get the best of both worlds (reliability and safeness, even when using a brittle language like javascript 🔥).

Instead of directly starting with the compiler (after all, a compiler is a dangerous beast, and I don't know enough about both rust and compilers to do something useful in a single day 🥲), Giacomo showed me his pretty printing library written in gleam, called [glam](https://github.com/giacomocavalieri/glam).  He then started giving a primer on how pretty printing works. I never thought about it, but printing and formatting text is not an easy task, and Giacomo's library does a great job in defining custom formatting specs.

We tried defining a pretty-printing format for json together as an exercise. It wasn't so trivial after all, and helped me get an idea of how the library worked.

After all this preparation (we already had lunch, and the end of the day was approaching fast), it was time for my first PR! I had to add a small functionality, the possibility to add "zero width strings" to the formatting specification. A zero width string is a string which doesn't impact the total line length of the formatted document. This length is used by the formatting algorithm to decide when to break a piece of output in multiple lines, so it's pretty important. An example of zero width strings are [ANSI escape codes](https://en.wikipedia.org/wiki/ANSI_escape_code), used in the console to do crazy stuff (change colorus, set the cursor position and so on). These characters do not impact the line width usually, so they are the perfect candidate for this feature.

In the end, the functionality itself was a 1-line method. I added an example and a couple of tests for the method and sent my first PR! Fortunately for me I had Giacomo side-by-side, so I didn't experience the usual async review of open source projects. Even if he later did some modifications to my PR (changing the way my test worked and other stuff) I had [my first PR ever](https://github.com/giacomocavalieri/glam/pull/12) merged!

![first github pr](./first_pr_github.png "The right kind of dopamine hit")

After merging my PR, we worked together on another issue he had for his project: creating a `debug` method to pretty-print a document specification itself. I basically watched him do all the work, but it was interesting to see some gleam features (such as pipelines, string concatenation and so on) and in the end we had a nice result.

## Conclusions

Time for some considerations.

I had a lot of fun! This was my first Open Source Saturday, and I managed to do way more than I expected. I thought I wasn't prepared, that I needed a brilliant idea to bring, that I'd make a fool of myself... but none of this was true! The important thing is to participate with an open mind and simply enjoy it.

Giacomo was a perfect mentor. He showed me the basics of gleam, brought me a project and even an issue on which to work, and in the end helped me with the review and PR process. I was basically hand-held through the process, and I think it's the perfect way to start contributing without all the fear and the bias the open source world has (for some of us at least)!

Finally, this event reminded me that there is a lot to learn, and that outside of the main languages and frameworks there's an entire world of alternative paradigms and technologies. I didn't even know gleam existed until today, or that pretty-printing algorithms were a thing 😅.

In the end....did I write this entire self-celebrating post for a 1-line method? Yes, and I'm very proud of it!

See you next time! 😜