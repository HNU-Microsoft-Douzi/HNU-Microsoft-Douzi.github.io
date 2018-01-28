---
layout: blog-page
title: "python的filter函数，map函数和lambda函数"
data: 2018-01-28
tag: python
---
<img src="/assets/python的lambda.png"><br>
<p>如上图所示，展示了python的filter函数和map函数，lambda函数的用法</p>
<p class="h1">filter函数</p>
filter(function or None, iterator)<br>
filter有两个参数，第一个参数可以为方法可以为空，第二个参数给了一个迭代器，可以给出一个范围。当第一个参数为None时，filter的作用就是返回一个iterator中全true的对象，然后用list将对象转化为列表就可以show在屏幕上了。<br>
<p class="h1">map函数</p>
map(function or None, iterator)<br>
map也有两个参数，但它表示的是映射的关系，它对于给定的迭代器iterator返回的是所有符合funtion的一个对象，然后用list转化为列表就可以show在屏幕上了。 
<br>
<p class="h1">lambda函数</p>
lambda函数的存在极大程度的精简了py的语句，也一定程度上增强了可读性。<br>
一般的函数构造方法:
{% highlight linenos %}
>>> def add(x, y)
...		return x + y
>>> add(3,5)
>   8
{% endhighlight %}
下面是lambda函数的实现方法：
{% highlight linenos %}
>>>g = lambda x, y: x + y
>>>g(3,5)
>  8
{% endhighlight %}