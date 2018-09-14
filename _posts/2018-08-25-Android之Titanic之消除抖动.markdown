---
title: "Android之Titanic之消除抖动"
subtitle: "Remove the jitter of Android Titanic"
layout: post
data: 2018-08-25
author: "Zxy"
tags:
    - android
---

在使用TitanicTextView这个开源TextView的抖动库以后，出现了一个问题，就是出现了不协调的抖动视觉效果。

给一张动图来展现它的效果是怎样的：

![](/assets/titanic0.gif)

可以清晰的看到，出现一种波浪上的抖动，影响了本来的协调感，非常的让人感受到不和谐。

问题是什么呢：

{% highlight java %}
ObjectAnimator maskXAnimator = ObjectAnimator.ofFloat(textView, "maskX", 0, 200);
{% endhighlight %}

在我们的tiantic的start函数中有上述这么一句代码，它里面设置的横向浮动大小为200，正是这句话导致的抖动的产生。

解决的方法很简单，我们只要改变这个横向浮动的范围大小就可以改变它的效果，我们只要将它改为400就可以保证平滑的效果。

改进效果如下：

![](/assets/titanic1.gif)