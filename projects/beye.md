---
layout: page
title: BEye Project
---

BEye was a project developed during my last year of bachelor at Politecnico di Milano, together with Lara Cavinato and Irene Fidone.
It consists in an FPGA-accelerated application for retinal vessels segmentation, which aims at improving the performance (speed) of screening tests.

## Context
**Diabetic Retinopathy (DR)** is an eye disorder due to diabetes compensation, and consists in the rapid growth of new anomalous vessels in the retina micro-circulation and the creation of micro-aneurysm and exudates or hemorrhages.
It is a degenerative diseases that pass through three stages:
* **Non-proliferative** with symptoms (such as edemas, micro aneurysms and a mild loss of sight/blurring) which can be detected by using *screening tests*

* **Proliferative** stage, characterized by abnormal new blood vessels (neovasculari- sation) and bursted/bleeding and blurred vision with the presence of vitreous hemorrhages. In this phase, the situation gets more complicated and even the cures become more intrusive.

* **Blindness**

The percentage of people who suffer from this pathology is more and more increasing, and screening tests are the best way to detect the disease before the proliferative stage.
However, the algorithms used to identify DR are either too slow or costly to be extensively used.
Here comes the opportunity tackled by BEye.

The project aims at making screening tests easy and fast, by using an embedded FPGA board with a fast vessels segmentation algorithm synthesized on it.
Even if the work done by us was just a prototype of the algorithm synthesized on FPGA, it represents a good use case for FPGAs, and makes us think about its applications.
For example, the FPGA could be associated with a high-speed camera to obtain a live segmentation and to check it with the previous images (or other similar patients). A mobile device like this would make screening tests easy to perform even where there aren't near ophtalmologists and vision centers. 

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



## Media and Contacts

Xilinx Open Hardware 2016 Finalists - [link](http://www.openhw.eu/2016-finalists.html)

Source Code, designs etc... - [Bitbucket](https://bitbucket.org/necst/beye-src)

Some videos explaining the project - YouTube [playlist](https://www.youtube.com/playlist?list=PLewc2qlpcOueh9xMhoDR7G93k6ZZ3pDrO)


<br/>


Marco Bacis - marco.bacis@mail.polimi.it

Lara Cavinato - lara.cavinato@mail.polimi.it

Irene Fidone - irene.fidone@mail.polimi.it

Marco D. Santambrogio - marco.santambrogio@polimi.it

<br/>

And here are a few slides showing the project (presented at the Stanford TTO office in May 2018):

<div class="grid mt-5 mb-5">
  <div class="cell cell--2 cell--md-0 cell--sm-0"></div>
  <div class="cell cell--8 cell--md-12 cell--sm-12">
      <div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 75.0019%; padding-top: 38px;">
        <iframe src="https://www.slideshare.net/slideshow/embed_code/key/DvdxmrKlkBa3U" style="border: 0; top: 0; left: 0; width: 100%; height: 100%; position: absolute;" allowfullscreen scrolling="no"></iframe>
        </div>
  </div>
  <div class="cell cell--2 cell-md-0 cell--sm-0"></div>
</div>