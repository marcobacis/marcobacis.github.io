---
title: "CONDOR"
aliases:
    - "/projects/condor"
---

CONDOR (Convolutional neural network Dataflow Optimization using Reconfigurable hardware) is a project started in Novmber 2016 and that I left in May 2018, which aims at creating a scalable and easy-to-use framework to accelerate convolutional neural networks using FPGAs in the cloud.

## Abstract

From the last published paper (May 2018):

"The recent years have seen a rapid diffusion of deep learning algorithms as *Convolutional Neural Networks*, and as a consequence, an intensification of industrial and academic research focused on optimizing their implementation.
Different computing architectures have been explored, and among all of them, **FPGAs** seem to be a very attractive choice, since they can deliver sustained performance with high power efficiency, as CNNs can be directly mapped onto hardware, and still offer flexibility thanks to their programmability.

**CONDOR** is an end-to-end framework to implement CNNs using a *dataflow* acceleration methodology.
The resulting spatial accelerator can be scaled in size if enough resources are available and can exploit both intra- and inter- layers parallelism.
We integrate the proposed framework with the deep learning engine *Caffe*, meaning that we are able to generate the accelerator starting from a Caffe model.
We also provide cloud integration of such framework, enabling users to synthesize and deploy the accelerator on the *Amazon F1 instances*."

## Methodology

The framework's main architecture consists of three main components: *frontend*, *core logic* and *backend*.


The *frontend* component collects the network configuration (e.g. the prototxt from Caffe) and the hardware specs (e.g. board name/chip such as *"xc7vx485tffg1761-2"*), embeds them in a common JSON used as internal representation and forwards them to the core logic.

The *core logic* uses the internal json to create the network accelerator IP core.
Each layer is mapped to a predefined IP core template in C++ (for now Convolutional, Pooling and Fully-Connected).
The code is then synthesized using Vivado HLS, to create the layer IP core.
Finally, the layers are connected together and grouped in order to create the final accelerator IP core.

The *backend* is the component which synthesizes the accelerator IP core and integrates it with the given deployment options.
As of now, the framework supports on-premise deployment (using SDAccel) or AWS F1 (creating the AFI to be used on the online instance).

## Media and Contacts

#### Papers

IPDPS Workshop RAW 2018 - [ieee](https://ieeexplore.ieee.org/document/8425400/)

ISVLSI 2017 - [ieee](https://ieeexplore.ieee.org/document/7987594/)

IPDPS Workshop RAW 2017 - [ieee](https://ieeexplore.ieee.org/document/7965030/)

#### Contacts

Marco Bacis - marco.bacis@mail.polimi.it

Niccolò Raspa - niccolo.raspa@mail.polimi.it

Giuseppe Natale - giuseppe.natale@polimi.it

Marco D. Santambrogio - marco.santambrogio@polimi.it

#### Slides

Below, you can find a slide deck shown while traveling to Silicon Valley (this particular talk was given at Oracle Labs): 

{{< slideshare JrA0Of0JIBmbwj >}}