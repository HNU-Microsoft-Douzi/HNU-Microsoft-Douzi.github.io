---
title: "findViewById()出现空指针异常"
subtitle: "The NullPointException of findViewById()"
layout: post
data: 2018-08-05
author: "Zxy"
tags:
    - android
---

我们在activity中尝尝需要动态的改变xml布局中的一些结构数据，通常的做法是通过findViewById()方法来找到相应的布局模块。

但是今天在使用的时候出现了空指针异常。

至今为止遇到的空指针异常有两种情况：

- 声明了变量，却没有给分配空间，往往会导致空指针的异常，但是在android中，所有的布局模块全部作为View的子类，不需要对其进行分配空间，它仅仅是作为一个引用，所以不需要分配空间。
- 第二种情况，就是声明这个findViewById()赋值的对象世纪上被放在了setContentView()的前面，这里需要说明一下，我们的activity在onCreate()之前并灭有生成相应的布局结构，这时候还没有将activity加入activity栈中，也就找不到对应的布局中的id模块，所以会出现NullPointException。

**最后一种情况**

今天遇到的问题，查了很久，最后才明白过来，findViewById()它的本质实际上是this.findViewById()，这里的this,就是我们之前在setContentView()中设置的布局View。

所以当出现这样一种**情况**：

当你把一个布局页面拆成几份写成几个不同的xml文件的时候，就必须要在查找id时，赋予对应的实例化view,不然它只能在你设置的setContentView()中进行查找，就会出现空指针异常的情况。

这种情况的解决办法如下：

{% highlight java %}
    inflater=(LayoutInflater)getSystemService(LAYOUT_INFLATER_SERVICE);

	View view=inflater.inflate(R.layout.myview, null);

    ImageView view=(ImageView)findViewById(R.id.imageview);
{% endhighlight %}