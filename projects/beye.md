---
layout: page
title: BEye Project
---

BEye was a project developed during my last year of bachelor at Politecnico di Milano, together with Lara Cavinato and Irene Fidone.
It consists in an FPGA-accelerated application for retinal vessels segmentation, which aims at improving the performance (speed) of screening tests.

## Context
**Diabetic Retinopathy**

## Vessels Segmentation Algorithm

The algorithm for vessels segmentation performs a series of steps, each one implemented by a 2D filter on the input image.

The first phase is the preprocessing of the image with a 3x3 median blur, in order to remove *salt and pepper* noise which could impact on the next edge detection filters.

The vessel detection filter is instead implemented by performing a parallel filter of the image with 13 different kernels (16x16 sliding windows), taking the maximum value and then giving the output to a 9x9 adaptive threshold filter.

False positives are removed by employing a simple blob detection filter, implemented as a two-pass 2D filter over the image (takes the down and right pixels and get the maximum size connected component of black pixels).

Finally, the results are filtered for a last time with a 11x11 adaptive threshold.

![Algorithm flow](/assets/beye/algorithm.png){:.image.image--article}

## Why FPGA?

As explained in the preceding description, the algorithm is composed of a series of 2D-filtering steps.
This means that, for each output pixel, the CPU would have to access the central and neighboring pixels each time.

An FPGA allows to arrange the on-chip fast memories (BRAMs) in order to create a hardware sliding window and avoid jumps into memory.

Also, its reconfigurability means that the design can be changed when the algorithm is updated, which happens often for biomedical applications.

## Architecture

## Media / Contacts

BEye is an application for retinal vessels segmentation running on FPGAs.
The project has been carried out during my last year of bachelor, was a finalist in the [2016](http://www.openhw.eu/2016-finalists.html) Xilinx Open Harware Competition, and brought to a [publication](https://ieeexplore.ieee.org/document/8037052/) to the 2017 EMBC conference.
The submitted source code and designs can be found on the [public repository](https://bitbucket.org/necst/beye-src).

<div class="grid">
  <div class="cell cell--2 cell--md-0 cell--sm-0"></div>
  <div class="cell cell--10 cell--md-12 cell--sm-12">
      <div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 75.0019%; padding-top: 38px;">
        <iframe src="https://www.slideshare.net/slideshow/embed_code/key/DvdxmrKlkBa3U" style="border: 0; top: 0; left: 0; width: 100%; height: 100%; position: absolute;" allowfullscreen scrolling="no"></iframe>
        </div>
  </div>
  <div class="cell cell--2 cell-md-0 cell--sm-0"></div>
</div>