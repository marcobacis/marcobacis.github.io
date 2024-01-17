---
title: "XPUGBg January meetup: “eXtreme Collaborative Codebase”"
date: 2023-02-03T07:00:00+01:00
publishdate: 2023-02-03T07:00:00+01:00
tags: ["meetup", "tdd", "talks", "xpug", "summary"]
comments: true
---

Hi 👋 welcome to a new post!

Today I’m going to post a little summary of my experience at the [XPUGBg meetup](https://www.meetup.com/xpugbg/events/290690004/) I attended at the end of January. This time, the talk was “eXtreme Collaborative Codebase” by Alessio Coser.

## What is a collaborative codebase?

Alessio started his talk with a question: what does it mean to collaborate in a codebase for you? What does it take to do it? What are the practices we can use to “work well”?

For him, it all comes down to optimising the work flow by accepting continuous change. In order to be more productive it’s important to reduce the work in progress, make small changes and reduce the feedback loop.

<!--![XP feedback cycles](https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Extreme_Programming.svg/500px-Extreme_Programming.svg.png)-->

Regarding feedback, agile practices tend to work at the highest levels, that of release, iteration, acceptance and so on (as in the above picture). But what about the lower levels of feedback, down to the codebase itself? How do you “accelerate” the feedback loop on all levels, from code to release?

In the talk, Alessio explains why doing trunk-based devlopment brings the best collaboration on the codebase, by improving the feedback loop, making WIP evident and allowing to ship faster and with  higher quality.

## What is trunk-based development?

Trunk-based development is a practice in which developers collaborate on the codebase in a single branch (the main/master/trunk). Instead of opening a feature branch and then do a pull/merge request to master (with the corresponding code review I hope), the developer commits directly to the main branch.

Trunk-based development goes hand in hand with [continuous integration](https://martinfowler.com/articles/continuousIntegration.html) and [continuous delivery](https://martinfowler.com/bliki/ContinuousDelivery.html). In fact, by committing to the main branch and keeping it always **releasable**, it’s possible to deliver value to the business continuously.

There are variations to trunk-based development. A notable one is **scaled** trunk-based, used when the team size increases. In scaled trunk-based development, the developers work with **short-lived** (less than 1 day) feature branches. The same practices (pair programming, TDD and XP in general) are still valid, together with the constraint to keep the main branch always releasable and deployable at any time.

## Advantages of trunk-based development

In the talk, Alessio highlighted the **impact** that trunk-based development has on the codebase and on the team/business itself.

The first “advantage” is that it allows to have **frequent integration** (better yet, **continuous**) of all the changes in the codebase. In this way, conflicts that arise during development are immediately identified (and corrected), without waiting until the code is reviewed in a pull request.

By making all changes on the same branch (main), there is a unique source of truth. As every change is immediately integrated and tested, the codebase is always updated, and there’s no conflict over which version of the code is the correct one (the answer is: the one on the main branch!).

Given that the team is working on the same branch, everyone can see all the current work in progress. In addition, by not using long feature branches, and being forced to integrate with main frequently, it’s more difficult to keep multiple features in progress.

The possibility to make small, deliverable changes forces us to **refactor** into small steps, and not create too many changes and conflicts. Also, by doing this with a continuous review (e.g. by pairing), we have the freedom to refactor into small steps with confidence.

Finally, trunk-based increase the **collaboration** between team members. If what I’m working on at the moment conflicts with another developer, I’m more eager to work together to merge it, and this is done (again) immediately, and not at merge time.

## A change of mentality

To work with trunk-based development properly, we need to embrace a (sometimes radical) change of mentality. The change reflects both in social and technical practices.

From the social side, trunk-based development requires:

- **Teamwork**, as everyone is working on the same codebase at the same time
- Constructive and frequent **feedback**, and being open to it
- **Trust**, in the team members and in the code itself. This can be helped with XP practices such as TDD and pairing

From a technical standpoint, the most important practices are:

- **Small**, incremental changes (in contrast to big, breaking changes and long parallel branches)
- Attention to **quality** (because the main branch must always be releasable, and every commit we push could be directly deployed in production!)
- Separation between **build, deploy and release**

A strong rule is that the code should always be deployable! This is the basis for frequent releases, which allows getting faster feedback from the business and the customers.

#### How to deploy while the work is in progress?

While talking about technical practices and their impact, Alessio explained how keeping build, release and deploy separate is fundamental to a collaborative codebase. But how do we keep the code “deployable” even while we are currently implementing new features?

The first way is to do **dark launching:** release the new feature, but without exposing the new/changed API (or expose it only to a subset of users, e.g. developers and internal users).

A second way is to use **branch by abstraction**: put the current api under an abstraction layer, then start to implement the new functionality in another compatible class/module. While implementing the new feature, migrate the old feature clients to the new (compatible, remember!) one, and finally remove the old module. All of this should keep the system working even when the feature is not finished yet.

The last way to not release in-progress work is to put the new feature behind feature toggles/flags. The toggles can be static or dynamic, but they should be short-lived (if used while developing and not for mere configuration) and removed when the feature has been released and is stable. Feature flags are also a way to decouple deploy and release of the features. In addition, they make WIP evident (as any feature toggle of that type represents a work-in-progress feature).

## Considerations/Discussions

The characteristic I like the most in meetups is the discussion with all the participants. Alessio encouraged the audience to ask questions and express their opinions, and here are some considerations of what came out of the discussion after the talk.

The first thing to take care of before and while doing trunk-based development is that of **ownership**: who is the owner of the code? Trunk-based development works best with **cohesive** teams working on a **product**, as the code is owned by the entire team (which makes the decisions). If the code is not owned by the developer, as in some consultancy projects or in open source, then it might be better to work with other branching models (such as feature-based, git flow or github flow).

Another consideration is that of software **versioning**. Trunk-based development expects a continuous integration of the code, and this means that there is only one version of the code (the current one). If the product needs multiple versions, and separate maintenance of the versions (e.g. because some customers don’t want to pay for the newer version, but still expect bugfixes on the version they own), then there should be release branches in addition to the main branch.

During the discussion, someone complained that with trunk based development changes are not evident. I agree in part with this, as using a separate branch would show the entire diff, while splitting the change in multiple commits would not show the entire feature at once. However, the point of trunk-based development is to make small changes, so the features should be separated in small stories, each with its own commit (or short lived branch). This improves the reliability of the team, allowing it to ship faster and estimate better.

A final consideration is about **conflicts**. While in feature branching conflicts are identified only when merging, in trunk-based all the conflicts arise during development. To keep the build releasable and stable the conflict needs to be fixed immediately, and this might seem to slow down the development of new features. 

To avoid integration headaches, it’s important to communicate with the team and avoid conflicts in the first place. Also, it's better to catch conflicts and fix them immediately than to wait for a big bang merge. In my opinion, if there is a lot of churn/conflicts in some modules, it means that the architecture should be improved (by splitting the functionality into smaller modules with clear responsibilities).

## Conclusions

The conclusion of the talk was “*embrace change*”, which is the fundamental principle of eXtreme Programming. I agree with this quote, as change is inevitable in software development (and in life in general).

I never had a collaborative codebase in the way described by Alessio (with trunk based, tdd, pairing and all the other practices), but I think that every team should strive to follow the same principles and practices.

That’s it for today! I hope you liked this short summary. If you want to go deeper into the topic, I left down here some resources (will be updated while I discover more of them). Also, reach out [Alessio](https://www.linkedin.com/in/alessiocoser) and the [XPUGBG](https://meetu.ps/c/4s0GZ/zWszn/a)!

## Other Resources

- [Trunk-based development](https://trunkbaseddevelopment.com/)
- [Why I love trunk-based development](https://medium.com/@mattia.battiston/why-i-love-trunk-based-development-641fcf0b94a0)
- [Feature Toggles](https://martinfowler.com/articles/feature-toggles.html)