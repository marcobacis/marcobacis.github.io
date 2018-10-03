---
layout: article
title: Projects
aside:
    toc: true
---

In this page you can find a list of the projects (with a brief description) in which I am/was involved.

## BEye

BEye is an application for retinal vessels segmentation running on FPGAs.
The project has been carried out during my last year of bachelor, was a finalist in the [2016](http://www.openhw.eu/2016-finalists.html) Xilinx Open Harware Competition, and brought to a [publication](https://ieeexplore.ieee.org/document/8037052/) to the 2017 EMBC conference.
The submitted source code and designs can be found on the [public repository](https://bitbucket.org/necst/beye-src).

## CONDOR

CONDOR (Convolutional neural network Dataflow Optimization using Reconfigurable hardware) is a framework to automatically derive an FPGA-based hardware accelerator starting from a high-level description of a pre-trained CNN.
The resulting accelerator exploits the dataflow computational pattern and inherent parallelism of convolutions and creates a pipeline between the layers of the CNN.
The framework aims to make FPGA more accessible to deep learning users offering a quick and automated way to deploy CNNs on reconfigurable hardware.

## DiSPosE

Dispose is a distributed stream processing engine, developed for the Distributed Systems course's project at Polimi.
It supports count-based windows and numeric operations, along with a centralized checkpointing and recovery mechanism. ([github](https://github.com/marcobacis/dispose)).