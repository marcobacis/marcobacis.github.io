---
title: "Publications"
author: "Marco Bacis"
date: 2021-03-07T00:00:00.000Z
lastmod: 2021-03-07T15:40:00.000Z

description: ""

tags:
    - publications
    - academia

aliases:
    - "/publications"
---

During my bachelor and master, I published some paper while "working" at [NECSTLab](https://necst.it/), a laboratory inside [Politecnico di Milano](https://www.polimi.it/en/) which focuses on systems (OS and hardware design) and security.

I mostly worked on the acceleration of algorithms (for computer vision, such as filtering and CNNs), and in the end did a thesis on distributed systems and serverless acceleration using FPGAs.

I don't do research anymore (didn't pursue a PhD afterall), but here you can find all links to my previous works.

## Master Thesis
[***BlastFunction: an FPGA-as-a-Service system for accelerated serverless computing***](/papers/blastfunction_master_thesis.pdf)

For my master thesis I developed a distributed system for enabling the acceleration of serverless functions using FPGAs.
The project included:
- a custom OpenCL implementation for executing workloads on remote nodes
- a module for interacting with Altera's FPGAs using the remote OpenCL library above, deployed on every node in the cluster
- a kubernetes operator for allocating FPGAs to serverless functions (using OpenFAAS) in order to share the same FPGA between multiple functions (using the same hardware module)

I learned a lot on low-level programming (interacting with shared memory and threads to allow OpenCL remoting) and kubernetes.
The most rewarding aspect was seeing the project working on a 3-nodes Kubernetes cluster, in which multiple serverless functions used the same FPGAs concurrently to share the workload, improving the overall throughput of the system!

## Articles

{{< pubTable >}}

## Patents
[***An FPGA-As-A-Service System for Accelerated Serverless Computing***](/papers/WO2020234792A1.pdf) \
**International Publication Number**: WO2020234792A1 \
**Authors**: Marco Bacis, Rolando Brondolin, Marco Domenico Santambrogio

