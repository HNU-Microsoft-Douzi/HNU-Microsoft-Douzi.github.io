---
layout: post
title: "利用join将列表转换为字符串"
subtitle: "Teaching you to use join reform the list to string!"
data: 2018-03-28
author: "Zxy"
tags:
    - python
---

## 利用join方法将列表转换为字符串
### 描述
Python join()方法用于将序列中的元素以指定的字符连接生成一个新的字符串。

### 语法
join()方法语法：
str.join(sequence)

**实例**

{% highlight python %}
a = ["1", "2", "3", "4", "5"]
print a
b = "".join(a)
print b
{% endhighlight %}

结果:

{% highlight python %}
['1', '2', '3', '4', '5']
12345
{% endhighlight %}

**但是，需要注意的是，join执行的对象列表的每个元素必须都是字符类型，不然的话，会爆出下面一个错误：**

{% highlight python %}
TypeError: sequence item 0: expected string, type found
#这里的type指的是你列表中不是字符串的类型
{% endhighlight %}

**解决方法：**"".join(str(each) for each in sequence)

解释：直接将列表中的每个元素转化为字符串形式就可以了。

