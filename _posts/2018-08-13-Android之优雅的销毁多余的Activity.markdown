---
title: "Android之优雅的销毁多余的Activity"
subtitle: "Android elegantly destroys excess Activity"
layout: post
data: 2018-08-13
author: "Zxy"
tags:
    - android
---

在写实际的项目中，我们往往需要对多余的Activity进行销毁，通常的方法是我们在经过跳转的Activity中直接对要进行销毁的Activity进行.finish()操作，这样的话就可以结束掉。

但是这样做有两个问题：

- 第一个就是你需要在前面的那个Activity中声明它自己的一个对象，必须是static修饰的，这样的话存在着一定内存泄漏（OOM）的风险。
- 第二个就是如果有多个Activity的话，这样的方法显然无法适用了。

**所以，这里介绍一种优雅的方式来帮助我们在不同的情况下来销毁不用的Activity**

- 第一种：当我们的Activity栈中存在A、B、C三个Activity的时候，我们需要从C跳转到D,然后销毁A、B、C怎么办呢？就好比我们在应用引导页跳转到登录页面，却又不能在登录页面的时候点了一下返回键就返回到引导页，显然会影响到用户的体验。**方法是：利用intent本身的FLAG_ACTIVITY_CLEAR_TASK标记配合FLAG_ACTIVITY_NEW_TASK使用。**

{% highlight java %}
Intent intent = new Intent(this, Login_activity.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TASK);
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        startActivity(intent);
{% endhighlight %}

- 第二种：当我们的Activity栈中存在A、B、C三个Activity的时候，我们需要从C跳转到A，然后销毁B、C怎么办呢？就好比我们在登录页面点击注册页面进行了注册，点击了返回键返回到登录页面，我们必须要对注册页面进行销毁，不然再次点击返回键的时候会返回到注册页面。**方法是：利用intent本身的FLAG_ACTIVITY_CLEAR_TOP和FLAG_ACTIVITY_NEW_TASK使用。**

{% highlight java %}
Intent intent = new Intent(this, Login_activity.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        startActivity(intent);
{% endhighlight %}


