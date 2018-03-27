---
layout: post
title: "python3的nonlocal声明"
subtitle: "Bring you to go the world of python!"
data: 2018-01-23
author: "Zxy"
tags:
    - python
---

今天要说的是关于<span style="color:blue">`nonlocal`</span>的声明的：

举个例子：

{% highlight python %}
def Fun1():
x=5
def Fun2():
nonlocal x
x *=  x
return x
return Fun2()

Fun1()
{% endhighlight %}

结果:

{% highlight python %}
25
{% endhighlight %}

显示的结果表示出在python3中，通过<span style="color:blue">`nonlocal`</span>对变量的声明，可以使在闭包中直接改变外部局部范围的变量值。