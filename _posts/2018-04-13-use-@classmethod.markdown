---
layout: post
data: 2018-04-13
title: "python的classmethod修饰符"
subtitle: "I'll tell you how to use @classmethod in python class"
tags:
    - python
---

### python的classmethod修饰符

**描述：**

对于python的classmethod来讲，它不需要被实例化，也就是说不需要self参数，但是第一个参数必须是自身类的cls参数，可以用来调用**类的属性，类的方法和实例化的对象**。

**语法：**

`@classmethod`

并用cls参数记性属性、方法和实例化对象的调用。

**实例：**

{% highlight python %}
@classmethod
def from_crawler(cls, crawler):
    return cls(
        user_agent=crawler.settings.get('MY_USER_AGENT')
    )
{% endhighlight %}

这里返回cls的一个类方法。

{% highlight python %}
#!/usr/bin/python
# -*- coding: UTF-8 -*-
 
class A(object):
    bar = 1
    def func1(self):  
        print ('foo') 
    @classmethod
    def func2(cls):
        print ('func2')
        print (cls.bar)
        cls().func1()   # 调用 foo 方法
 
A.func2()               # 不需要实例化
{% endhighlight %}

输出结果：

{% highlight python %}
func2
1
foo
{% endhighlight %}