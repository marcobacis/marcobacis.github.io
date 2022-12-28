---
title: "XPUGBg December meetup: “Mars Rover Kata, an outside-in approach”"
date: 2022-12-28T08:00:00+01:00
publishdate: 2022-12-28T08:00:00+01:00
tags: ["meetup", "tdd", "agile", "xpug", ".net"]
comments: true
---

Hi! 👋

Today I will write about a meetup I attended this December, hosted by XPUGBg (Extreme Programming User Group Bergamo). The [XPUGBg](https://www.meetup.com/it-IT/xpugbg/) is an association promoting and organizing events related to extreme programming in the Bergamo region.

In this meetup, the guests (Marco Consolaro and Alessandro Di Gioia from [Alcor Academy](https://alcor.academy/)) performed a live mob programming session with the audience, to solve the [mars rover kata](https://github.com/makomweb/mars-rover). We learned how to do mob programming, and how the Outside-In TDD approach works.

## What is Extreme Programming?

Extreme programming (XP) is a set of values, principles and practices introduced by Kent Beck at the end of the 1990s. Its goals are to improve the software quality and the team's responsiveness to requirements changing during development. I might write my opinions on this methodology in a new blog post, but for now, I’ll redirect you to the [book](https://www.amazon.com/Extreme-Programming-Explained-Embrace-Change/dp/0321278658), which definitely explains it better than I do 😉.

I discovered extreme programming later this year while attending the XPUG meetups. I also read Kent Beck’s book and I’m actively trying to introduce some practices (like TDD and pair programming) into my current team, but I’m still far from a full XP practitioner. Still, the argument is really interesting.

How does it apply to this meetup? We followed a practice called **mob programming**, in which there are:

- a **driver** (Alessandro), the developer actually writing code on the editor
- the **navigator**, which instructs the driver on what to write (and sometimes also how)
- the **mob**, other members of the team which can discuss with the navigator to improve the code, find possible issues and so on

during the meetup, Marco and Alessandro proposed an extended approach (called **fish bowl**), in which the mob is composed of 5 members of the audience, which rotate after some time. So, in addition to the standard mob, we have:

- the **facilitator** (Marco) guiding the mob and the navigator and deciding when to rotate roles and members
- the **audience**, watching it all. Anyone can then enter the fish bowl when he thinks he can give something to the discussion

## What is a Kata?

“Kata” is a term borrowed from martial arts. It is “a detailed choreographed
 pattern of movements made to be practised alone. It can also be reviewed within groups and in unison when training” ([Wikipedia](https://en.wikipedia.org/wiki/Kata)).
Developers have taken this term and applied it to their set of movements, which are coding, testing and designing. A kata is a short problem/exercise meant to be practised a lot of times. The same kata can be practised with different languages, approaches and methodologies, giving each time a new perspective.

In our case, in this meetup, we practised the mars rover kata, and the twists were to practice it with **mob programming** and **outside-in TDD**. Double trouble!

In the mars rover kata, you have to implement a rover moving on the surface of mars. You are given the initial coordinates of the rover (x, y) and the initial orientation (N, S, E, W). Then, you are given the commands:

- L → rotate left by 90°
- R → rotate right by 90°
- M → move forward one grid point, maintaining the same position

Your program should output the position of the rover after applying the commands (X, Y coordinates and direction).

During the meetup (because of lack of time and a lot of discussions) we were able to implement only the simplest version, with the rotate left and move forward commands, and without the I/O translation code (from a text file to actual commands and positions). This doesn't mean that the kata was a failure. On the contrary, it was very useful to see different opinions and approaches to the problem at hand.

## Outside-In approach

**Outside-in** is an approach to develop software in tandem with TDD. It works by starting from the outer layer (”outside”) and, guided by tests, creating the underlying layers (”in”) of the software.

In practice, the mob started (guided by marco) with the acceptance tests, the outermost layer of testing. These tests should be in a language understandable by the business, as they indicate whether the problem is solved from the business perspective. The first consideration is that the acceptance tests used the actual input and output strings to test the behaviour of the system (see [here](https://github.com/makomweb/mars-rover) for the example). This meant that the code needed a sort of “translator” to translate the inputs to domain objects, and the domain objects to outputs.

The outside-in approach turned out to be difficult to assimilate because it turned my perception of the design upside-down. Starting from the acceptance tests, it was difficult to turn the tests green, and we had to dive deeper and create a lot of code (first the rover controller, then the rover, then the position with coordinates and direction, and so on) before passing our first test.

In addition, we had to use mocks immediately to avoid writing the translator. Marco presented this to us as a challenge: most of the business value and complexity actually resides in the rover code, not the I/O, so it was a good way to concentrate on the core features of the kata.

In the end, we were able to turn our first test green, and it was already time to head to the pub, so… the rest was left as an exercise for the viewers 😇.

## Conclusions

The meetup was really interesting, and it helped me learn new concepts. Even if I didn’t participate in the mob but just watched, I exercised my “design muscles” during the session and my brain was always comparing alternatives and thinking about the code.

Marco and Alessandro are great teachers: Marco was a great facilitator and guided the mob to the right solution, while Alessandro was a thoughtful driver with opinions, also helping the mob to cooperate.

The outside-in approach was new for most of the audience, and even experienced developers discussed how to design the solution and how to proceed. They created a lot of classes seemingly “doing nothing” at the moment, but later it all made sense. This is quite different from standard TDD, in which you just write the code needed to pass the tests and then refactor. Outside-In helps to reduce the refactoring stage, which always leads to rewriting big chunks of the code.

Finally, I never tried practising a kata. I think it is a really useful technique to learn new concepts with a known problem, and I’ll use it more in the future.

That's all for now 🎉. Thank you for reading and see you next time!.
