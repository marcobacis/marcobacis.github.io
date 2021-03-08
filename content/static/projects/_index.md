---
title: "Projects"
author: "Marco Bacis"
aliases:
    - "/projects"
---

In this page you can find a list of the projects (with a brief description) in which I am/was involved.

## BlastFunction

BlastFunction is the project I developed for my master thesis at Politecnico di Milano.
Given the recent growing interest for heterogeneous computing and custom hardware accelerators, there have been a lot of work integrating FPGAs and cloud environments.
However, these devices are still treated as separate entities in the current scenario, meaning that they are used in conjunction with Virtual Machines, but are kept out of container and serverless applications. 
BlastFunction targets this opportunities, by offering a distributed FPGA sharing system for the acceleration of microservices and serverless applications in cloud environments.

I will write more on this project when the corresponding paper (accepted at the [DATE2020](https://www.date-conference.com/) conference) and patent will be published!

## [CONDOR](/static/projects/condor)

CONDOR (Convolutional neural network Dataflow Optimization using Reconfigurable hardware) is a framework to automatically derive an FPGA-based hardware accelerator starting from a high-level description of a pre-trained CNN.
The resulting accelerator exploits the dataflow computational pattern and inherent parallelism of convolutions and creates a pipeline between the layers of the CNN.
The framework aims to make FPGA more accessible to deep learning users offering a quick and automated way to deploy CNNs on reconfigurable hardware.

## [BEye](/static/projects/beye)

BEye is an application for retinal vessels segmentation running on FPGAs.
The project has been carried out during my last year of bachelor, was a finalist in the [2016](http://www.openhw.eu/2016-finalists.html) Xilinx Open Harware Competition, and brought to a [publication](https://ieeexplore.ieee.org/document/8037052/) to the 2017 EMBC conference.
The submitted source code and designs can be found on the [public repository](https://bitbucket.org/necst/beye-src).

## DiSPosE

Dispose is a distributed stream processing engine, developed for the Distributed Systems course's project at Polimi.
It supports count-based windows and numeric operations, along with a centralized checkpointing and recovery mechanism. ([github](https://github.com/marcobacis/dispose)).


## [Others](/static/projects/misc)
Other projects (mostly small university projects).