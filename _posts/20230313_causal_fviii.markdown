---
layout: post
title:  "A generative and causal population pharmacokinetic model for FVIII"
date:   2023-03-13 17:00:00 +0530
categories: Causality MachineLearning
---



## Introduction 

Several population pharmacokinetic (PK) models have been developed for recombinant factor VIII (rFVIII) concentrates used to treat haemophilia A patients. Most of these PK models should only be used for specific rFVIII concentrates, as there might be differences in the PK between each product. Aside from these differences, models also differ in their parameterization or included covariates. 

Most of these models were build using step-wise covariate selection methods, and did not focus on including causal relationships only. As a result, model parameterization might be sensitive to the data used to train the model, which is supported by some studies reporting on varying accuracy of these models independent data sets.

As an alternative we can focus on implementing a causal model, where the covariate relationships included in the PK model have a known causal relationship to drug clearance or volume of distribution. For this we need to design a directed acyclic graph (DAG) where nodes represent the covariates and causal relationships are represented by edges. Such DAGs can be based on prior biological knowledge and should exhaustively consider counterfactuals that might explain part of the observed responses.

Based on an extensive review of the literature, we have defined the following DAG to represent the causal effects of several covariates on the clearance and distribution volume of rFVIII:

 <img src="assets/20230313_figure_1.svg">

**Figure 1.** *Causal relationships for predictive model.*

## Federated learning

To do.



```julia
import DifferentialEquations


```
