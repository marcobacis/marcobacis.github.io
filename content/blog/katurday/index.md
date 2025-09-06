---
title: "The Power of Code Katas: Katurday @ XPUGBg"
date: 2023-05-14T08:00:00+01:00
publishdate: 2023-05-14T08:00:00+01:00
tags: ["journal", "meetup", "programming", ”tdd", "xpug"]
comments: true
---

Hi 👋 welcome to a new post. Today, I'm going to describe my experiences at the “Katurday” sessions held by the [XPUG Bergamo](https://www.meetup.com/it-IT/xpugbg/) group.

The events are called Katurday because we perform a kata on one Saturday morning every month. It's a great way to code and learn with other people 😃.

## What is a kata?

![Typical developer performing a kata](kata_dwight.webp)

Typical developer performing a kata

"Kata" is a term borrowed from martial arts. It refers to "a detailed choreographed pattern of movements made to be practiced alone, but can also be reviewed within groups and in unison when training" ([Wikipedia](https://en.wikipedia.org/wiki/Kata)).

Developers have adopted this term and applied it to their set of movements, which include coding, testing, and designing. A kata is a short problem/exercise meant to be practiced many times. The same kata can be practiced with different languages, approaches, and methodologies, providing a new perspective each time to learn.

In Katurday sessions, the focus is on practicing one or more katas with other people, usually by doing pair or mob programming. By practicing in a group, we step out of our comfort zone (programmers aren't the best at socializing) and receive immediate feedback from more experienced developers, while also having fun together!

# Sessions journal

Here I'll keep an updated list of the session in which I take part, so be sure to check this page every month for a new entry (and even if I'm the only one reading this, I'll keep writing it as a journal 😛).

Enjoy!

## First contact: Mob programming

In the first meetup, the main goal was to get to know each other and practice together for the first time. And the perfect opportunity to learn with others in a psychologically safe way is mob programming!

In mob programming, one person (the driver) writes the code on a PC while the others (the mob) discuss what to implement and how. The discussion is moderated by a navigator, who is the person actually telling the driver what to do.

We practiced the [Roman numerals](https://codingdojo.org/kata/RomanNumerals/) kata using mob programming and test-driven development. Given that there were too many people for a structured discussion, we used a method called *fishbowl*, in which a small group is in the mob while the rest of the audience watches (already described in [this post](https://marcobacis.dev/blog/2022-dec-mars-rover-kata-meetup/) about another XPUG meetup).

The mob members and the navigator rotate from the audience, with a set time. Basically, if anyone had something to say or discuss about the task, they “patiently” waited for their turn 😅

This experience was interesting, showing that a group of software developers can come up with a high-quality and tested solution without fighting (too much).

## Second session: Pairing and TDD

On the second meetup, we stepped out of our comfort zone. The goal this time was to practice pair programming and test-driven development. Why both practices together? Well, we had already practiced TDD in the latest session, but this time it was part of the pairing exercise itself.

How can TDD help make pair programming better? With **ping-pong** programming! One developer writes a failing test (red phase of TDD). Then, the other developer makes the test pass (green phase) and can apply some refactoring while still passing tests. Finally, they create a new failing test and give it to the first developer. This “ping-pong” between the members keeps them concentrated on the task at hand and allows them to write code as if only one person wrote it.

We practiced the [prime factors kata](https://www.codewars.com/kata/587e4b656c87d3e7f4000143) in multiple sessions, erasing the code at the end and pairing up with another person we didn't know. In this kind of exercise (as in any kata), the goal is not to finish it, but to try new ways to solve it and learn. Also, by changing partners every time, we are forced to get to know a new person (duh!), and sometimes even a new programming language/framework, tools, and in general a completely new environment (e.g. different keyboard layout and operating system). It's obvious that changing this much on every rotation doesn't always allow us to finish the kata, but that's expected.

In the end, we did two pairing sessions and a final feedback session in which we shared our views on ping-pong pairing and TDD in general. It was useful to see that other people had the same ideas and concerns as me, and also different ideas about the exercise.

## Third session: Refactoring

In this session, we tackled a difficult task: refactoring a piece of code that was intentionally made unreadable, the [tennis refactoring kata](https://github.com/emilybache/Tennis-Refactoring-Kata) by Emily Bache. The repository contains the same kata implemented (with lots of code smells) in most of the mainstream programming languages. For each project, it also contains a comprehensive test suite, making it perfect for practicing refactoring without worrying about the tests.

As in every other Katurday session, we worked in pairs and had a set time to finish. We started by choosing a language and then identified code smells, solving them by refactoring the code. In reality, my partner and I just started saying "wow, that code sucks" for every piece of code in the project and tried to refactor it with our gut feeling. The result came out nicely, but we didn't apply the rules to the letter. Nonetheless, it was still a learning experience, seeing how a comprehensive test suite helps to refactor without fear (which I cannot say about the projects I usually work on 😅).

One interesting technique we used was loop unrolling (example [here](https://www.youtube.com/watch?v=tQjUKQxFXuE)) to refactor a useless and complex loop. I had already encountered it in university to improve performance (and used it in unconventional ways for FPGA synthesis), but I never thought of it as a refactoring technique 😃.

After making our way through the refactoring, every pair shared their experience. It was useful to see many different approaches to the problem: top-down like ours (extracting and simplifying unrelated and big parts of the code) and bottom-up (refactoring a small but common part of the code at a time).

Finally, given the small amount of time remaining, we decided not to proceed with another pair/mob session, but instead watched [Gianni](https://www.linkedin.com/in/gianni-bombelli?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAAAfrrkABbUvjAiZv3U8jyjDXz1fq-gu6jBA&lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_all%3BwlZNIMK2RViUFptWfbZVKA%3D%3D) refactor a fizzbuzz exercise in Kotlin to make it more generic and expandable 🤩 a great live refactoring lesson.

## Fourth session: Object Calisthenics

After learning about TDD, pairing and refactoring, it was time to put it all together, by practicing *Object Calisthenics*.

Object Calisthenics is a set of (very strict) rules designed to "exercise" our code muscle. In particular, the rules are the following:

1. Only one level of indentation per method
1. Don't use the ELSE keyword
1. Wrap all primitives and strings (wrap primitive types in classes)
1. First-class collections (wrap collections in classes)
1. One dot per line
1. Don't abbreviate
1. Keep all entities small
1. No classes with more than two instance variables
1. No getters/setters/properties
1. All classes must have state

These rules help to effectively design code in a clean way, the same way real calisthenics helps to improve our strength without strange techniques and machines.

To practice Object Calisthenics we performed the [bowling kata](https://codingdojo.org/kata/Bowling/), in which you have to compute the score of a bowling game given the throws results.
The kata seems simple at a first view, but has a nasty responsibility separation issue, as the bonus points of a frame depends on the next throws!

The rules were pretty frustrating when I started applying them! For example, not being able to nest the code too much meant I had to continually extract methods.
Another challenge was to always give state  to objects (so avoiding value objects).

Fortunately we started applying TDD from the beginning, so it was pretty easy to refactor the code while we added test cases. A challenge I always face when doing TDD is the level at which to begin: from the outside (big comprehensive tests that stay red for some time) or from the inside (smaller components and tests which are integrated later). I tend to create big tests but I also try to solve them immediately, which brings to not follow the "little steps" rule of TDD 😅.

In general, this katurday was really interesting, showing some "strict" rules that we should instead always apply to our code to make it clean and properly designed.

## That's all!

Keep checking this post for updates on the next sessions I'll attend 🤩