---
layout : page
title : Misc Projects
---

In this page I just give a list of other small projects that don't need an entire page to be explained. They are just small projects developed for university courses. In case you are interested, the source code for these projects is hosted on my github [profile](https://github.com/marcobacis). 


### Parallel graph matching algorithm ([link](https://github.com/marcobacis/parallel_graph_matching))
Project developed for the 2017 course on "Advanced Algorithms and Parallel programming".
It consists in the implementation and parallelization of a graph matching algorithms using OpenMP and OpenMPI.
The algorithm is composed of two main phases: a similarity-based computation using the graphs matrices, and an auction-based matching phase.

### Flights queries using Hadoop and Spark ([link](https://github.com/marcobacis/mw_spark_bigdata))
Big Data query and visualization using Hadoop, Spark and a jupyter notebook with Holoviews.
The query are run over a flights database from 1994 to 2008. 

### Indoor positioning using Contiki-ng ([link](https://github.com/marcobacis/mw_iot_person_detection))
IoT project for the "Middleware Technologies for Distributed Systems" course, consisting of an IPv6-based presence detection system using MQTT using Contiki-ng and TI-CC2650 boards (and a sensors launchpad).
The position is at room-level, using the room RPL router address to identify the position and an accelerometer to update the location only when the user is standing still for some time.

### Stack size estimation using LLVM ([link](https://github.com/marcobacis/llvm_stacksize))
Project developed for the Advanced Computer Architecture course.
It consists in a series of LLVM passes to estimate the stack size of an application in a target-independent way.
The pass gives two estimates: pessimistic and optimistic.
The optimistic estimate is computed by simulating the register allocation, thanks to a user-given register file.
We tested the pass on the polybench suite, and found out stack sizes for different architectures (X86, ARM and NVIDIA).