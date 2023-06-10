---
title: "Book Summary: A Philosophy of Software Design"
date: 2023-06-10T07:00:00+01:00
publishdate: 2023-06-10T07:00:00+01:00
tags: ["architecture", "books", "notes", summary"]
comments: true
---

Hi 👋  and welcome to a new post!

Today I’ll post a summary of a book I read at the beginning of 2023, titled “*A Philosophy of Software Design*”, by *John Ousterhout*. John is a professor at Stanford, where he teaches “Operating System Principles” and “Software Design Studio”.

In the book he distills a career worth of advice, taken from his personal experience and the issues and solutions emerged while teaching his software design course.

I wrote this summary mainly for myself, to remember the concepts expressed in the book. There might be missing information and inconsistent levels of detail 😅 just a disclaimer.

Let’s start!

## It’s All About Complexity

Writing Software is one of the purest creative activities done by humans. It allows to create entire systems and world only constrained by the developers’ imagination.

However, the greatest limitation of creating software is our ability to *understand* it. Over time, complexity will inevitably increase, so we must find ways to minimise its impact. But **what** is complexity, and how can we **reduce** it? These are the goals of the book.

> Complexity is anything related to the structure of a software system that makes it hard to understand and modify the system.
> 

Complexity manifests itself with symptoms: 

- **Change Amplification**: simple changes require to modify code in many different places
- **Cognitive Load**: how much a developer needs to know to complete a task
(e.g. shorter but difficult to understand is worse than longer but easier to understand code)
- **Unknown Unknowns** (the worst): it’s not obvious which code to modify/add to complete a task

But what are the causes of complexity? The book highlights two, *dependencies* and *obscurity*, which can be reduced by making code obvious and easy to read, by encapsulating the complexity in separate modules and in general by designing the system better (easy right? 😅).

## Tactical vs Strategic Programming

To improve the quality of software, we must change out *mindset,* from **tactical** to **strategic**.

Tactical programming focuses only on working software. “If it works it’s ok, let’s go on the next task”. Thinking in terms of working code, and not quality and design, leads to incremental complexity in the long term. Code becomes more complex because every small complexity adds up. Refactoring is seen as a cost because it will slow down developers, so the design is never modified from the starting one.

Strategic programming is the solution to increasing complexity. The primary goal of strategic programming is to *produce a great design, which also happens to work*. It can be seen as an investment in the quality of software, which over time will avoid complexity and allow to ship features fast and lower development costs.

Some modern software trends (such as Agile and TDD) expose to the risk of tactical programming, by proposing an iterative approach and focusing on features instead of abstractions. When working in an iterative approach it is then important to focus on **abstractions** instead of single features/modules/methods, and outside-in design might be a possible solution (my take on the argument at least, read more [here](https://marcobacis.com/blog/2022-dec-mars-rover-kata-meetup/)).

## Modular Design

### Deep Modules

The center of the book is dedicated to modular design and its main benefits. In modular design, a software system is decomposed in a set of (relatively) independent modules. The goal while designing a modular system is to minimise the dependencies between modules.

A dependency can be formal, based on the public *interface* of a module, or informal, based on the module’s *behaviour* and side-effects. The book advocates for **deep** modules, meaning modules that have a simple interface hiding powerful functionalities. This is in contrast to **shallow** modules, with complex interfaces and simple implementations.

An example of deep module is the Unix I/O api, which exposes simple methods (open, read, write, close) to manage a really complex underlying system (filesystems, buffers, disks and so on). Examples of shallow modules are instead pass-through methods, linked lists and in general all the classes we create which don’t hide the underlying implementation.

### Information Hiding

Information hiding is the fist technique that can be used to create deep modules. It consists in encapsulating design decisions and information behind an interface which doesn’t expose it, thus hiding the underlying complexity (examples of underlying information: networking, data structures, multithreading, parsing and serialization, system and physical stuff like protocols and disks, etc..).

The opposite of information hiding is information leakage, in which the underlying design choices and implementation  “leak” from the interface. One of the causes of information leakage is **temporal decomposition**, in which the execution order of the operation is reflected in the code structure (e.g. class to read, then to modify and finally a class to write the result… they pass the underlying structure among them, leaking it outside the actual interface). The solution is actually contrary to the current best practices, which proposed to create a lot of small classes with shallow interfaces: create slightly larger classes which encapsulate more operations (still keeping levels of abstraction separated). The same thing can be done inside classes, by using information hiding and deep (private) methods to hide implementation details.

### General-Purpose Modules are Deeper

Another consideration is to think about **general-purpose** classes instead of special-purpose interfaces. A general-purpose interface is by definition deeper, as it must present a common (we hope simpler) interface to the users to deal with different cases. A special purpose interface is instead designed around the special case it is handling. The goal should be to design *somewhat general-purpose* interfaces without over-engineering the code too early (it’s an investment, but it shouldn’t block the development and risk to be useless in the future). The book proposes three questions (”What is the simplest interface for the current use?”, “In how many situations will this method be used?”, and “Is this API easy to use for my current needs?”) to discern if the class is general purpose or just over-engineered.

### Different Layer, Different Abstraction

Systems are usually designed as **layers**, each with a different level of abstraction offered. When two adjacent layers offer similar abstractions, this is a red flag. Most of the times this leads to shallow modules, which don’t hide complexity and just bloat the system.

The biggest example are pass-through methods, which just call the same method of the underlying layer. This approach doesn’t hide anything and adds complexity to the system, as it adds a similar interface without adding functionality! The book proposes three solutions:

- Expose the lower layer directly to the higher-level modules
- Redistribute functionality between classes
- Merge the two layers

In some cases, having duplicated interfaces is ok, such as in **dispatcher** and interfaces with multiple implementations (such as disk drivers). In most cases it is instead harmful.

One kind of API duplication is given by **decorators**. A decorator has always the same interface, but different implementations which are used to extend the functionality. This might lead to an explosion in the number of decorators, each for a single operation. This represents a case of *shallow* modules.

Another form of duplication is given by **pass-through variables**, which must be passed between multiple layers and it’s basically a leaked information. Think about configuration parameters and arguments that are used by lower level classes, but not by the higher levels. Pass-through variables add complexity because they force all the intermediate layers to be aware of their existence. The solutions for this problem are mostly ugly, so a compromise must be reached and it’s a design decision:

- Store the information in a global variable
- Use an already existing object related to the lower-level module in which to put the variable
- Introduce a *context* object, which presents some of the disadvantages of global variables, but allows to have multiple instances in the same process and it’s more test-friendly

### Pull Complexity Downwards

The goal of software design is to minimise complexity, thus it’s important to hide the complexity whenever it is possible. This is also valid for interfaces. It is better to make a more complex implementations, if that means a simpler interface for the users. This relates to the “investment mindset” explained at the beginning of the book.

The most important lessons is to avoid exposing configuration parameters as much as possible, and if necessary, to compute reasonable defaults if that’s the case.

Don’t take it too far however, by putting all of the code into a class or merging too many classes. Pulling down complexity:

- should simplify the interface
- should be done on functionality related to the existing one
- should result in many simplifications elsewhere in the application

### Together or Apart?

Deciding to merge or divide functionality is a fundamental question developers face. In general, the rule is to **simplify** the interfaces and to create ***deep*** modules and methods. Splitting or putting together code can help, but it’s full of compromises and choices.

Subdividing may increase complexity (it creates a higher **number** of components, additional code to manage, might lead to more dependencies and separation or duplication of cohesive functionalities. Bringing pieces of code together might help in reducing the complexity, and good indicators are:

- Shared information
- Simpler interface when merged
- Duplication of functionality

Splitting is instead indicated when there is a mixture of general and special purpose code in the same module (it might be better to separate the two) and when the functionalities inside the module are not related. In general, a method/module should **do one thing and do it completely**.

When splitting is important to still keep modules deep, while us developers have a tendency to split too much (I’m actually torn on this, given the advice from uncle bob and countless people saying to divide in minuscule, but **shallow**, methods).

Splitting can be done by:

- Extracting a subtask into a separate method (keeping the methods deep, remember!)
- Splitting in two separate methods → avoid conjoined methods, in which you cannot understand the methods/modules independently. also, avoid shallow methods

Examples of the chapter:

- Merge http reading and parsing method because they shared the http request informations
- Bring together to simplify the interface (what should be done with stream and buffers in java)
- Separate a class for logging
- Separate text-related stuff and ui operations in the editor example (general text handling vs special operations such as selection and undo)

## Error Handling

Exception handling is a huge source of complexity in software systems. An exception alters the flow of the program, and must be either handled or reported to the upper layer. In addition, code that handles exceptions tends to be verbose, complex and an additional source of exceptions itself!

Programmers tend to throw exceptions at every suspicious behaviour, but a class with a lot of exceptions is ***shallow*** and leads to further complexity. The book list 4 ways to reduce exceptions in our code.

- **Define errors out of existence**: change the code in order to handle special cases (or avoid them) without raising exceptions
- *Masking*: detecting and handling the exception at a lower level (e.g. with retries)
- ***Aggregation:*** handle many exceptions with a single piece of code at a higher level and in a more generic way
- **Crash/Abort**: to be used only for exceptions for which there is no recovery (e.g. most out-of-memory and I/O errors)

The same principles can be used to handle special cases, and not just errors, in our code. Defining special cases out of existence with general-purpose code, or handling special cases in separate internal methods and classes can help create deep modules, thus reducing complexity.

## Commenting Code

Comments are the most important form of documentation that developers can write: they help improve the design (if written before writing code), reduce cognitive load and remove unknown unknowns by capturing both high and low-level details that are not present in the code.

However, programmers tends to not write (or delay writing) comments, with main excuses being that “code should be self-documenting” (leading to smaller methods and shallow modules), that they don’t have time (it doesn’t take much), that they have seen only worthless comments (that’s why it’s important to write them correctly) and that they require constant update (that’s because they are coupled to the implementation, and they shouldn’t).

In general, comments should describe the ***what*** and **why** of the underlying code, and not the how (implementation). They shouldn’t just repeat the code, and instead **add precision** or provide the underlying **intuition** and **reasons** why the code was written in the first place (e.g. design decision, fixed bug reference, adherence to protocols and standards etc..) . An example are interface comments, which allows the user of an interface to see what it does without reading the underlying code. Implementation comments describe complex details inside the code, but they should be kept ***near*** the code they describe (e.g. not at the beginning of a method or in the interface definition). ***Cross-Module*** comments should be kept in a easily discoverable place for the developer (e.g. in a common class/file, or in extreme cases in an external doc file, even if less desirable).

Comments can also be used as a **design** **tool**, by writing them before the code. In this way, the comments will reflect the high-level overview of the implementation, will be written better and force the developer to think about the design before coding. If comments are complex or describe the implementation in too much detail, then the final design will be complex and/or shallow.

## Consistency and Clarity

The final advice of the book is that code should be **obvious**, meaning that the reader should have all the information needed to understand the code and modify it. Being obvious means having a low complexity and clear interface. This can be done by working both the design and the *consistency* of the code.

Regarding consistency, it can be enforced by:

- Following conventions and enforcing a coding style (e.g. with tools such as linters and with code review)
- Giving the right **names** (they must be precise, with a clear definition and purpose, and consistent in the entire codebase)
- Documentation (both in form of **comments** and external documentation for conventions and overall design)

In general, the code shouldn’t violate the reader’s expectation, in order to work as a cognitive leverage: if the design is consistent and obvious, once the developer learns how something is done in one place, he can use that knowledge to understand other places of the codebase which use the same approach.

## Conclusion

I really enjoyed this book. It was short (just 170 pages!), but full of insights, opinions and a ton of advice!

Some advice contained in the book made me think about current practices. For example, short methods are a cornerstone of clean coding, but the author goes against them when they make the code “shallower”. Another controversy are the chapters on commenting code, in which the author goes against the myth of “self-documenting code”. 

I must admit that I don’t always follow the advice given by the author (for example I don’t comment the code much, and sometimes consistency is not my first concern), but from now on I’ll watch out on many of the “red flags” contained in the book.

That’s it for today! I hope you enjoyed this summary. I might have skipped some concepts and chapters (e.g. the last one about “designing for performance”). I recommend this book for anyone interested in improving his development and design skills.

### Bonus

PS. The book contains a list of “red flags” to keep in mind while writing or reviewing code. Each of the red flags might represent the symptom of design issues in the system.

Here it is:

- **Shallow Module:** the interface of a class or method isn’t much simpler than its implementation
- **Information Leakage**: a design decision is reflected in multiple modules
- **Temporal Decomposition**: the code structure is based on the order in which operations are executed, not on information hiding
- **Overexposure**: an API forces callers to be aware of rarely used features in order to use commonly used features
- **Pass-Through Method**: a method does almost nothing except pass its arguments to another method with a similar signature
- **Repetition**: a nontrivial piece of code is repeated over and over
- **Special-General Mixture**: special-purpose code is not cleanly separated from general-purpose code
- **Conjoined Methods**: two methods have so many dependencies that it’s hard to understand the implementation of one without understanding the implementation of the other
- **Comment Repeats Code:** all of the information in a comment is immediately
obvious from the code next to the comment
- **Implementation Documentation Contaminates Interface:** an interface
comment describes implementation details not needed by users of the thing
being documented
- **Vague Name:** the name of a variable or method is so imprecise that it doesn’t
convey much useful information
- **Hard to Pick Name:** it is difficult to come up with a precise and intuitive name
for an entity
- **Hard to Describe:** in order to be complete, the documentation for a variable or
method must be long
- **Non-obvious Code:** the behaviour or meaning of a piece of code cannot be
understood easily