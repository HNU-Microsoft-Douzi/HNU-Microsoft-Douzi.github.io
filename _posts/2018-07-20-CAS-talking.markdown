---
layout: post
title: "CAS方法详解"
subtitle: "talking something about CAS way"
data: 2018-07-20
author: "Zxy"
tags:
    - java
    - 高并发
---

## 无锁中的CAS

在高并发的编程中，面对多线程，前有有锁阻塞，后有无锁CAS，这里想要对cas的一个方法做个详解。

关于CAS的概念，百度上的博客文章很多，就不再多做解释。

这里先给出关于cas的函数名及参数:

{% highlight java %}
	money.compareAndSet(expectedReference, newReference, expectedStamp, newStamp)
{% endhighlight java %}

在如上述的函数中，money本身作为一个Atomic~的对象，也不再给出。

在多线程的编程中，我们通过比较一个旧值和`expectedReference`的值是否相等，若是相等，说明此时没有其它线程对当前值进行改变，那么我们就让旧值等同于`newRefernce`，这样的话旧值和预期值便不再相等，相当于我们想要进行的操作，只进行了一次，下一次值不等，那么`compareAndSet`本身返回了`false`，也什么都不再执行，并且后面的两个参数本质上是为了解决CAS的ABA问题。

下面来谈一下关于CAS的ABA问题的事项，对于CAS而言，它本身对于旧值和预期值进行检测，若是两个值相等的话，就进行新值的原子赋值操作，那么如果出现这样一种情况：旧值从`**A->B->A**`的时候，这样的改变并不能被CAS所察觉到，如果这个过程对程序造成什么样的影响的话，显然这样的忽视效果不是我们想要的，但是如果有后两个参数，只要对每个参数设置一个版本，我们就可以进行区分，那么这个版本我们该怎样设置呢？答案就是时间戳！