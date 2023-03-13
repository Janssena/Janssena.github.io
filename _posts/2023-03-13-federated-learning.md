---
layout: post
title:  "Federated learning: keeping your data private while contributing to model development"
date:   2023-03-13 17:00:00 +0530
categories: MachineLearning
---

*"A guide on contributing and training the open source rFVIII causal model through federated learning."*

## Introduction 

Data is often considered to be a valuable commodity best kept private. Many 
research groups have invested money and time in order to collect pharmacokinetic 
data to develop population PK models. It is natural that most groups are reluctant 
to give away this data for free. For rare diseases such as haemophilia A, it is 
almost impossible for a single treatment center to collect the large data sets 
in order to produce a PK model that is truly universal; one that can be used for 
any rFVIII product, while also adjusting for assay discrepancies or differences 
between patient populations.

There is a solution to this problem: federated learning. Here, instead of sharing 
data with a central entity that pools the data and performs model development, 
only the model code is shared and researchers all over the world can train the 
model locally. With *offline* training, there is not need to share patient 
data with other centers, also meaning that it is easier to adhere to 
international and local privacy laws. 

In this article we describe how to download and train the causal rFVIII model, 
and how pre-trained models can be used to impute missing data in your local data 
set(s). After training the model, its parameters can be uploaded to a database of 
trained models, building the model ensemble to improve the prediction of rFVIII 
levels.  After uploading trained weights, the model is validated on a pool of 
testing examples and credit is given to the researcher for contributing to the 
model ensemble.

<!-- ## Downloading and running the model -->