# Introduction to "*Machine Learning*" for pharmacometricians



Recently, there has been quite some interest in exploring the use of machine learning tools for problems in pharmacometrics. More and more publications discuss how such methods can be used for hypothesis generation or as a model-agnostic approach to analyzing pharmacokinetic (PK) or pharmacodynamic (PD) data. The annual *Population Approach Group Europe* (PAGE) meeting has even introduced an *AI/Machine learning* poster category since 2020 (although that specific meeting was postponed by you-know-who). There is no doubt that these novel methods of analysis hold exciting possibilities for the flexible analysis of clinical data and for extracting meaningful information from complex data.

Along with this rise in interest, there have also been approaches that might not be as successful as they might seem from the study in which they are presented. Research into novel algorithms in the field of computer science is evolving at such an rapid pace that it might be difficult for pharmacometricians to know and understand all the intricacies of machine learning algorithms, and possibly to prevent making errors in their interpretation. Still I think this enthousiasm is a good thing; it shows that pharmacometrics is not a rigid field, not sporting only methods from the 1980s [1]. However, there might be a potential benefit in an improved education of the field in the context of machine learning.

I've recently written a review about machine learning methods that show potential in four stages of the model building process in pharmacometrics. In the paper, my coauthors and I have also provided our opinion on approaches that might be most effective for typical problems during data analysis. During the writing of this paper I've found many articles with approaches that likely are not as worthwhile to pursue, often because their design works only for simulated data, and would never provide real benefits in actual clinical practice. You can check out the review [here](https://www.mdpi.com/1999-4923/14/9/1814/htm) if you are interested. 

In the review, I had assumed that the reader already had some knowledge about machine learning. I do realize that this might not be the case for a large portion of the community. In this series (suitably named "Machine learning for pharmacometricians"), I will make an attempt at providing to the common pharmacometrician an introduction into machine learning. I will be discussing the main algorithms, how they work, cases where they don't, and how to interpret what they are doing. I hope this will push the field forward, involve more research into how these tools can be used to modernize pharmacometric research, and result in more successfull applications of algorithms for this purpose.

## So what is Machine Learning anyway?



Let's try our hand at one of the definitions of machine learning from Wikipedia: 

> Machine learning algorithms build a model based on data in order to make predictions or decisions "*without being explicitly programmed to do so*".

Machine learning is widely considered to be a sub field of "Artificial Intelligence", and although the above quote seems to make a lot of sense, it is a horribly broad definition. It even sparks some internet outrage as this definition includes approaches such as the LASSO and ridge regression (more on them later), which are seen by the elitist machine learning enthousiast as horrendously simple linear methods and non-worthy of the title of atrificial intelligence/machine learning algorithm.

In general, I find the terms artificial intelligence and machine learning not that useful. Essentially, non-linear mixed effects models can also be viewed as machine learning. And so do many linear methods. However, when we are often speaking of machine learning, we are generally reffering to a set of algorithms that are complicated black box models that we cannot readily interpret when looking at their parameters or structure. In general, we are thus referring to algorithms such as the random forest or neural network. As we move forward I will use this rough definition of what I mean by machine learning. It is commonly these types of algorithms where we see most of the problems with respect to their incorrect implementation or erroneous interpretation of their results.



## Starting from the basics: the LASSO and ridge regression



To start of this series with a first bit of actual content rather than just semantics, let's start with some linear methods. Linear models are often portrayed as follows:

$y = f(\mathbf{x}) = \mathbf{x}^T\beta + \epsilon$

This is essentially the most basic prediction model: our dependent variable $y$ is a linear combination of covariate vector $\mathbf{x}$ and regression coefficients $\beta$, and an estimate of noise $\epsilon$. The noise can either be homoscedastic (the same for all values of $\mathbf{x}$, i.e. $\epsilon \sim \mathcal{N}(0, \sigma)$) or heteroscedastic (as a function of $\mathbf{x}$, for example $\epsilon \sim \mathcal{N}(0, f(\mathbf{x})\sigma)$, i.e. proportional error for the attentive reader).

One question some might have is what does this actually look like? (I'm sorry I like math so I'll be showing some matrix calculus). Both $\mathbf{x}$ (note: bold fonts in math refer to the quantity being a vector) and $\beta$ are vectors: single dimensional arrays of numbers:

$\mathbf{x} = \begin{bmatrix}x_1 \\ x_2 \\ \vdots \\ x_n \end{bmatrix}$ and $\beta = \begin{bmatrix}\beta_1 \\ \beta_2 \\ \vdots \\ \beta_n \end{bmatrix}$

Note that the variables in these vectors run from top to bottom; they are so-called columns vectors. A simple product of these two quantities as-is is not defined, we need to take the transpose (represented by $T$) of the first vector (creating a row vector) in order to produce an inner product. Let's see an example where both vectors have a size of 3:

$\mathbf{x}^T\beta = \mathbf{[}x_1\ x_2\ x_3\mathbf{]} \begin{bmatrix}\beta_1 \\ \beta_2 \\ \beta_3 \end{bmatrix} = \sum{\begin{bmatrix} x_1 \beta_1 \\ x_2 \beta_2 \\ x_3 \beta_3 \end{bmatrix}} = \hat{y}$

We usually denote the model prediction by $\hat{y}$. The dot product of two vectors is not simply the element-wise product of its contents, it is also their sum as we can see from the above equation. This also means that $\hat{y}$ is a single number.

How do the LASSO and ridge regression expand on the concept of the basic linear model? Both introduce a penalty for preventing overfitting. Overfitting is the phenomena where the model parameters are so specifically tuned to the training data, such that model predictions contain (substantial) bias when new data is presented. In addition, the LASSO and ridge regression can be used to mitigate the problem of collinearity, by shrinking the size of the regression coefficients of correlated covariates.

### Ridge regression

In many regression problems the sum of squared errors (or the mean of squared errors; MSE) is minimized in order to find a estimate of the regression coefficients $\hat{\beta}$ that results in the smallest predictive error. In ridge regression the sum of squared errors is minimized along with a weighted squared sum of $\beta$:

$\hat{\beta} = \min_\beta{\{ \lVert y-\mathbf{x}\beta \lVert_2^2 + \lVert \lambda\beta \lVert_2^2 \}}$, where $\lVert \mathbf{x} \lVert_2^2 = x_1^2 + x_2^2 + \dots + x_n^2$, i.e. a sum of squares.

When $\lambda = aI$ (where $I$ is the identity matrix) this type of penalty is called the $\ell^2$-norm. It penalizes larger values of the regression coefficients and it pushes the coefficients of unimportant covariates towards zero (but not exactly zero). The importance of this penalty is weighted by $\lambda$, where larger values result in smaller regression coefficients.

### The LASSO

Instead of penalizing the squared sum of the regression coefficients, the LASSO employs the $\ell^1$-norm, which takes the absolute sum of $\beta$:

$\hat{\beta} = \min_\beta{\{ \lVert y-\mathbf{x}\beta \lVert_2^2 + \lvert \lambda\beta \lvert \}}$, where $\lvert \beta \rvert = \beta_1 + \beta_2 + \dots + \beta_n$

This way, the coefficients of unimportant covariates are shrunk to exactly zero. Again $\lambda$ can be used to weight the importance of the penalty. 

### How to choose a value for $\lambda$?

This might partly be the reason why the LASSO and ridge regression are called machine learning methods; although we understand the model definition, we are often unable to understand the reason for why a certain value of $\lambda$ is "optimal". We could still see this problem as a black box problem. 







#### References

[1]	      Beal SL, Sheiner LB. Estimating population kinetics. Critical  Reviews in Biomedical Engineering. 1982 ;8(3):195-222. PMID: 6754254.    