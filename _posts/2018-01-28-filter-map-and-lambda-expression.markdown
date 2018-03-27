---
layout: post
title: "python的filter表达式，map表达式和lambda表达式"
subtitle: "Distinguish the function of filter,map and lambda"
data: 2018-01-28
author: "Zxy"
tags:
    - python
---

<img src="/assets/python's lambda.png">

如上图所示，展示了python的filter表达式和map表达式，lambda表达式的用法。

### filter函数
**filter(function or None, iterator)**

`filter`有两个参数，第一个参数可以为方法可以为空，第二个参数给了一个迭代器，可以给出一个范围。当第一个参数为`None`时，`filter`的作用就是返回一个`iterator`中全`true`的对象，然后用`list`将对象转化为列表就可以show在屏幕上了。

### map函数
**map(function or None, iterator)**

`map`也有两个参数，但它表示的是映射的关系，它对于给定的迭代器`iterator`返回的是所有符合`funtion`的一个对象，然后用`list`转化为列表就可以show在屏幕上了。 

### lambda表达式
`lambda`表达式的存在极大程度的精简了py的语句，也一定程度上增强了可读性。

一般的函数构造方法:
{% highlight python %}
>>> def add(x, y)
...		return x + y
>>> add(3,5)
>   8
{% endhighlight %}

下面是lambda表达式的实现方法：

{% highlight python %}
>>>g = lambda x, y: x + y
>>>g(3,5)
>  8
{% endhighlight %}