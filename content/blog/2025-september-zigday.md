---
title: First time using Zig @ Zigday
date: 2025-09-22
tags:
  - meetup
  - open source
  - zig
permalink: 2025-september-first-zigday
comments: false
---

Hi! 👋 Welcome to a new post. 

It's time to get back to "journal" style posts, talking about my experience at cool programming events. Last time was last year for [Update Conference](/blog/2024-update-conference/), and I really miss writing this kind of posts! To keep my writing muscle active, I will start writing more of these 😁. I'm doing it for selfish reasons, but if I can reach more people and have them discover new events, then I've reached my goal. 

Today I want to talk about my first time at [ZigDay](https://zig.day/), an event similar to [Open Source Saturday](https://www.meetup.com/it-IT/open-source-saturday-milano/), but all about Zig!!

The event was organized by [Coding Bunker](https://www.codingbunker.it/) (in particular by [Francesco](https://inge.4pr.es/) and [Claudio](https://github.com/omissis)) and hosted by [Mollie](https://www.mollie.com/) in their new Milan office.

### Zig?

What is Zig?

> Zig is a general-purpose programming language and toolchain for maintaining robust, optimal, and reusable software.    

Zig is basically C... but simpler, more powerful, and I would say prettier too. It sits alongside other low-level languages such as Rust and Go, with a simpler philosophy for control flow, memory management, and project structure.

See the [official website](https://ziglang.org/) to know more (I wanted to include a sample zig program showcasing all the main features, but I don't know it enough 😅 not even to force a LLM to create it for me).

### Event Journal

This is how the day unfolded:

I arrived at the Mollie office at 9:30 AM. We had a short breakfast, then [Francesco](https://www.linkedin.com/in/francescogualazzi/) introduced the event. Each of us introduced ourselves and shared what we wanted to do that day. 

Being the first time I used Zig, I proposed to see what others were doing and learn using [ziglings](https://codeberg.org/ziglings/exercises/#ziglings) (like rustlings, but for Zig). 

Other participants had different plans: some contributed to their own projects in Zig (e.g., a JSON schema parser and generator), others experimented with Vulkan/GPUs, played with RISC-V boards, and someone even started [writing an OS in 1000 lines](https://operating-system-in-1000-lines.vercel.app/en/).... the usual stuff developers have fun with on a Saturday morning, after all.

During the first hour and a half, [Loris](https://kristoff.it/) showed us how to install Zig and how a Zig project is structured. 

I learned about modules, packages, and how the build system works. The Zig build system is quite powerful: you can define custom commands, modules, and targets, all in Zig itself! It's useful to define custom compilation steps or jobs that have to run during the build. The great feature is that it's not limited to Zig only: you can incorporate C/C++ workflows and linking to work with existing libraries.

Another feature Loris showed us was how Zig manages memory. 

Zig is a low-level language that makes memory management explicit, so it has allocations, deallocation, pointers, heap and stack, and many other concepts. The difference between Zig and existing low-level languages such as C and C++ is that it makes memory allocation explicit, but without compromising the robustness of the software itself! 

Whenever a method allocates memory, it needs to be given an `allocator`, and in most places, the code must handle allocation errors explicitly: this allows for robust programs. 

Using custom allocators makes the language more versatile (e.g., an allocator for embedded systems behaves differently from one for desktop). This also helps in writing performant tests: the testing allocator can detect memory leaks automatically and allows tracking, showing, and debugging memory allocation.

After the Zig crash course, I started playing with [ziglings](https://codeberg.org/ziglings/exercises/#ziglings). Ziglings are a series of small exercises that introduce Zig features step-by-step. Each exercise is a program with small missing pieces or errors that we must solve to progress. They are a great way to learn the main features of the language, in small steps, and have fun in the process!

I did the first 39 exercises, and these are some of the things I learned:
- Arbitrary bit-width integers
- Error handling (`try`, `catch`, union types, and the `?` operator)
- The `defer` and `errdefer` keywords (useful to handle memory deallocation, logging, and error handling)
- The `unreachable` keyword (useful in switch and if statements)
- Standard control structures, with Zig's own quirks (e.g., continue expressions)
- Optionals and nice ways to assign "no value" (in particular, I like how `undefined` works, which is different from other languages I'm used to)

I still missed a lot of features that I'm going to explore next (e.g., `slices`, `comptime`, `async/await`, and the entire standard library), but I think that for my first day of Zig, there was enough!

At the end of the day, we shared our impressions. Some people gave demos, others shared their opinions or talked about their current projects. At the end, Loris showed us a project he's currently working on: [SuperHTML](https://github.com/kristoff-it/superhtml), an LSP for HTML! I discovered how much I DON'T know about HTML, and that the web stack is a dark, incoherent platform...

So... that was my Saturday. I hope to have more Saturdays like this 😀

See you next time!