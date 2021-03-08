---
title: "Projects"
aliases:
    - "/projects"
---

# Past Research Projects

These projects have been developed (and, as all master student research projects, never continued after first completion) during my MSc years at Politecnico di Milano.

## BlastFunction

BlastFunction is the project I developed for my master thesis at Politecnico di Milano.
Given the recent growing interest for heterogeneous computing and custom hardware accelerators, there have been a lot of work integrating FPGAs and cloud environments.
However, these devices are still treated as separate entities in the current scenario, meaning that they are used in conjunction with Virtual Machines, but are kept out of container and serverless applications. 
BlastFunction targets this opportunities, by offering a distributed FPGA sharing system for the acceleration of microservices and serverless applications in cloud environments.

I will write more on this project when the corresponding paper (accepted at the [DATE2020](https://www.date-conference.com/) conference) and patent will be published (update: paper and patent published but I forgot to write anything here, I promise I'll describe this project).

## [CONDOR](/static/projects/condor)

CONDOR (Convolutional neural network Dataflow Optimization using Reconfigurable hardware) is a framework to automatically derive an FPGA-based hardware accelerator starting from a high-level description of a pre-trained CNN.
The resulting accelerator exploits the dataflow computational pattern and inherent parallelism of convolutions and creates a pipeline between the layers of the CNN.
The framework aims to make FPGA more accessible to deep learning users offering a quick and automated way to deploy CNNs on reconfigurable hardware.

## [BEye](/static/projects/beye)

BEye is an application for retinal vessels segmentation running on FPGAs.
The project has been carried out during my last year of bachelor, was a finalist in the [2016](http://www.openhw.eu/2016-finalists.html) Xilinx Open Harware Competition, and brought to a [publication](https://ieeexplore.ieee.org/document/8037052/) to the 2017 EMBC conference.
The submitted source code and designs can be found on the [public repository](https://bitbucket.org/necst/beye-src).


# Past University projects

Just if you want to have fun of my university course projects, I'll leave them here with a short summary.
In case you are interested, the source code for these projects is hosted on my github [profile](https://github.com/marcobacis). 

## DiSPosE

Dispose is a distributed stream processing engine, developed for the Distributed Systems course's project at Polimi.
It supports count-based windows and numeric operations, along with a centralized checkpointing and recovery mechanism. ([github](https://github.com/marcobacis/dispose)).

In this page I just give a list of other small projects that don't need an entire page to be explained. They are just small projects developed for university courses. 

## Parallel graph matching algorithm ([link](https://github.com/marcobacis/parallel_graph_matching))
Project developed for the 2017 course on "Advanced Algorithms and Parallel programming".
It consists in the implementation and parallelization of a graph matching algorithms using OpenMP and OpenMPI.
The algorithm is composed of two main phases: a similarity-based computation using the graphs matrices, and an auction-based matching phase.

## Flights queries using Hadoop and Spark ([link](https://github.com/marcobacis/mw_spark_bigdata))
Big Data query and visualization using Hadoop, Spark and a jupyter notebook with Holoviews.
The query are run over a flights database from 1994 to 2008. 

## Indoor positioning using Contiki-ng ([link](https://github.com/marcobacis/mw_iot_person_detection))
IoT project for the "Middleware Technologies for Distributed Systems" course, consisting of an IPv6-based presence detection system using MQTT using Contiki-ng and TI-CC2650 boards (and a sensors launchpad).
The position is at room-level, using the room RPL router address to identify the position and an accelerometer to update the location only when the user is standing still for some time.

## Stack size estimation using LLVM ([link](https://github.com/marcobacis/llvm_stacksize))
Project developed for the Advanced Computer Architecture course.
It consists in a series of LLVM passes to estimate the stack size of an application in a target-independent way.
The pass gives two estimates: pessimistic and optimistic.
The optimistic estimate is computed by simulating the register allocation, thanks to a user-given register file.
We tested the pass on the polybench suite, and found out stack sizes for different architectures (X86, ARM and NVIDIA).