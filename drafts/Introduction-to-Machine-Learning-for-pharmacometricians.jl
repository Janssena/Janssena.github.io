import Plots

using LaTeXStrings
using Distributions

Plots.default(fontfamily="Computer Modern", linewidth=1.6, axiscolor=Plots.Colors.RGBA(0,0,0,0.2), framestyle=:axes, grid=false)

f(x) = x .* 1 .+ rand.(Normal(0., 0.1))

Plots.scatter(x, f(x), color=:lightblue, markerstrokecolor=:lightblue)
Plots.fill_between!()
Plots.plot!(x, x, color=:grey)

