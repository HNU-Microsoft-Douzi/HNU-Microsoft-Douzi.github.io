zui---
layout: blog-page
data: 2018-01-23
title: "python3的nonlocal声明"
tags: python
---

今天学的东西是关于<span style="color:blue">nonlocal</span>的声明的：<br>
举个例子：
{% highlight linenos %}
def Fun1():
x=5
def Fun2():
nonlocal x
x *=  x
return x
return Fun2()

Fun1()
{% endhighlight %}
结果:<br>
{% highlight linenos %}
25
{% endhighlight %}
<p>显示的结果表示出在python3中，通过<span style="color:blue">nonlocal</span>对变量的声明，可以使在闭包中直接改变外部局部范围的变量值。</p>