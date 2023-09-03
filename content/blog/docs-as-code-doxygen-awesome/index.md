---
title: "Documentation-as-Code with Doxygen (Awesome)"
date: 2023-09-03T08:00:00+01:00
publishdate: 2023-09-03T08:00:00+01:00
tags: [".net", "cpp", "css", "documentation", "frontend", "programming"]
comments: true
unsplash: "Oaqk7qqNh_c"
thumbnailby: "impatrickt"
---

Hi 👋 and welcome to a new post.

I recently had to improve the documentation for a project, and collected some ideas and tools along the way, so I'll share here what I learned 😃.

<!--more-->

## We don’t talk enough about documentation

Documentation is one of the most important elements of software. It allows to collect all the tribal knowledge about a product/project into a shared space. It also avoids the creation of “knowledge silos”, of “tribal knowledge” and in general allows to share the knowledge among the team members, avoiding the so called “bus factor” of a team (if a team member leaves or cannot work on the project anymore, who are going to remember all the nooks and crannies?).

Unfortunately, documentation is also the most dreaded task for us developers…. we hate writing it! For many developers the code should be “self-documenting”, meaning that clean abstractions and names should allow to understand the code and the product at a glance. Unfortunately, the reality is quite different: architectural choices and business decisions cannot be embedded easily in the code, and it's necessary to keep a separate place to document them.

In addition, we must not forget about *external* documentation for the interfaces that our product serves, both in terms of UI and features, and in terms of external API. In general, we owe the documentation to our team and to our users.

In the last months, I worked for a startup in which the product was in need of documentation. The product includes a central application, and some related SDKs to communicate with the application and a hardware device. With an incoming release date, the last thing needed was the software documentation, which until now was kept in word documents…. so I started researching for alternatives. I wanted an easy to use technology that would allow us to ship the documentation easily and without messing up with tools (word, latex, slides 🤢 or other stuff like this..). I remembered watching a talk at [FOSDEM](https://fosdem.org/) about documentation-as-code, and delved deeper into the topic. Here is what I found. 

*Disclaimer: all the opinions expressed in this post are mine and not of my employer, and this post is not a tutorial or a guide… just me listing some tools and describing what I chose for the project!*

## Documentation-as-Code

Documentation-as-Code is a simple concept, which can be summarised as “keep and manage your documentation like your code”.

Basically, documentation should be treated like code, and as such should be kept near it, ideally in the same repository. This brings multiple advantages:

- Makes it easier to keep the documentation updated while the software evolves
- Provides a centralised space to keep the documentation, without the fragmentation given by other solutions (e.g. word documents on dropbox 😏)
- Allows to automate the documentation release along with the software (CI/CD for docs 😍)

These are just some of the advantages of treating documentation as code. This methodology is also a better fit with modern software development, as it employs the same versioning and release tools we usually use to develop software.

Another advantage of docs-as-code is that, by keeping the documentation alongside the code, we can improve the documentation itself by generating parts of it directly from the code! This is the approach we took with the SDKs for example.

## Documentation-as-Code Tools

When choosing a tool to manage and generate the documentation for our project, I looked for 3 main characteristics:

- Is it a SaaS (Software-as-a-Service) or a SSG (Static Site Generator) tool?
- Can it generate the documentation from code comments? In particular, for our project we were targeting a C# and C++ codebase, so the tool should have supported both
- Does it allow to export the documentation (e.g. as pdf?). This might be useful for offline browsing

Here's a short list of the tools I considered. First, the SaaS products:

- [GitBook](https://www.gitbook.com/) - Allows to manage your documentation online, with support for authorisation, public and private pages and custom domains
- [ReadTheDocs](https://about.readthedocs.com/) - Based on sphinx, allows to host projects documentation (free for open source projects)

Then, some static site generators:

- [ReType](https://retype.com/) - Fast and easy to use, with export to pdf features, but with paid license over a certain number of pages
- [Docusaurus](https://docusaurus.io/) - Generates a website using MDX and React components. Beautiful, but without generation from code comments and native export to pdf features
- [Sphinx](https://www.sphinx-doc.org/en/master/) - Great tool with export features (html, latex, pdf and so on), extensible with community plugins and themes
- [DocFx](https://dotnet.github.io/docfx/) - Generates a documentation websites from .NET Code, assemblies and XML comments. Supports only .NET/C#
- [Doxygen](https://www.doxygen.nl/) - Old but gold! Generate documentation from code comments and markdown files. Support for a lot of languages

Most of the tools I looked for can be used create or host a website for the documentation, but only two of them (doxygen and docfx) allowed to generate most of the documentation from the code itself. Maybe this feature has gone out of fashion (code should be self-describing!! no comments!!), but I find it quite relevant, and more so if I need to document a public library distributed to customers.

## Solution with Doxygen + Markdown

In the end, given the requirements I listed above, I chose to generate the documentation using doxygen, and to integrate it with markdown files and a nice css template.

Doxygen is an open source tool to generate a (pretty ugly) static website entirely from the project code, using special annotations and comments. In addition to that, it allows to add markdown pages for more prosaic documentation. I used this last feature for the user manual of the application, while the SDK documentation was mainly generated directly from the comments in the code.

The only disadvantage of doxygen is its “old-style” output, for which I found a great solution called “Doxygen Awesome”.

[Doxygen Awesome](https://jothepro.github.io/doxygen-awesome-css/) is a custom css and javascript template which gives doxygen a more “modern” look. It has some nice features, like light/dark theme, mobile usability, code blocks with a copy button and many others. You can refer to the [website](https://jothepro.github.io/doxygen-awesome-css/) to see it in action, and the [github repo](https://github.com/jothepro/doxygen-awesome-css) for the code.

The basic theme and repo was almost perfect for the project. I started adding code comments and markdown files to it and tweaking the Doxyfile for my purposes.

In the end I even tweaked the template code a bit. Here you can find some of the changes I made to the template (I might publish them somewhere to be reused some day…).

### Video embedding and dark mode

The first change I made was to add a class to embed videos, as the basic template inverted all colours whenever the dark theme was toggled. This basically rendered the embedded videos in negative!

Very cool, but not very effective when reading documentation.

To fix this issue, I added this class to the doxygen-awesome css:

```css
/* Manage responsive video */
.rwd-video {
    filter: none; /* Remove dark mode issues */
    overflow: hidden;
    width: 80%;
    margin: auto;
    aspect-ratio: 16 / 9;
}
.rwd-video iframe,
.rwd-video object,
.rwd-video embed {
    height: 100%;
    width: 100%;
}
```

While adding a video to a markdown file can be done with this snippet (which can also be added as alias to the doxyfile):

```markdown
\htmlonly
<div class="rwd-video">
    <iframe src="https://www.youtube.com/embed/aqz-KE-bpKQ" title="Big Buck Bunny" frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen></iframe>
</div>
\endhtmlonly
```

There are still issues with this approach. For example, videos can only be shown in the html output and not in others (e.g. latex/pdf). In the future I might create a command/alias to show the video or an alternate picture/thumbnail for non-interactive outputs.

### Light/Dark mode logo

Doxygen allows to set a logo for the project, which will be shown in the top-left/right corner of the page. This presented an issue with doxygen awesome: while the standard css shipped with doxygen-awesome inverts every component’s hue when dark mode is toggled, we wanted the logo to look good in both modes (and not just to look as a negative of the original). To do it, I just changed the content of the logo image based on the dark/light mode class:

```css
/* Manage logo in dark and light mode */
html.dark-mode #projectlogo img {
    content: url("./logo_light.png")
}

html.light-mode #projectlogo img {
    content: url("./logo_dark.png")
}
```

Both logo pictures are added in the ***img*** directory and to the Doxyfile.

### Content Pictures zoom on click

The final touch I gave to the documentation website was a modal to zoom on images when they are clicked. This allows to keep the pictures small when inside the documentation, but also to show them at full resolution when the user needs it.

I won’t show here the code (I basically copied code from stack overflow 😅 not a clean solution). In short: after loading the page, a js snippet looks for all pictures and adds a *onClick* to each, which shows the clicked picture in a modal window.

## Conclusions

That’s all!

In this post I showed how writing and managing documentation as code leads to a better documentation and improved processes. I also described the latest Docs-as-Code solution I found for a project and small tweaks and improvements I made to make it more effective.

Even if I didn’t show any of the results (you can watch a sample directly on [doxygen awesome documentation](https://jothepro.github.io/doxygen-awesome-css/), no need to see my project code 😛), I hope this post inspired you to get into the world of documentation-as-code (you can find some links in the “Resources” section below and scattered inside the post).

Thanks, and see you next time! 👋

PS. If you want to see the final results, [here](https://weart.it/docs/sdkcpp/) is the documentation for the startup's C++ SDK, while [here](https://weart.it/developer-guide/) are all the other resources and documentation outputs

## Resources

- [Doxygen](https://www.doxygen.nl/)
- [Doxygen Awesome documentation](https://jothepro.github.io/doxygen-awesome-css/)
- [Docs like Code](https://www.docslikecode.com/about/)
- [How To Automate Documentation Workflow For Developers](https://fosdem.org/2023/schedule/event/how_to_automate_documentation_workflow_for_developers/) - Talk by Portia Burton @ FOSDEM 2023
- [Proper Documentation](https://members.vadimkravcenko.com/proper-documentation/?ref=cto-newsletter) - Vadim Kravcenko