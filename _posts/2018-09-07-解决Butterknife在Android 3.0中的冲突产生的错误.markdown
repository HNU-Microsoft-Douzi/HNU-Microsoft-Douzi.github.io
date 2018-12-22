---
layout: post
title: "解决Butterknife在Android 3.0中的冲突产生的错误"
subtitle: "Solve the error caused by Butterknife's conflict in Android 3.0"
data: 2018-09-07
author: "Zxy"
tags:
    - java
    - android
---

我们通常为了使用Butterknife的注解功能，会使用到一个叫做`Android Butterknife Zelezny`的插件，这个插件需要在配置了Butterknife的条件下就可以帮助我们方便快捷的进行findViewById()之类的标签注解，大大节省了写代码时候的时间开销。

然而添加Butterknife的时候，如果我们使用最新的8.8.1版本就会出现一个和Android 3.0版本相冲突产生的问题，方便起见，这里就不再贴出错误的类型。

这里给出Butterknife的添加步骤：

1.app的build.gradle中添加dependencies中的依赖：

{% highlight java %}
implementation 'com.jakewharton:butterknife:8.8.1'
    annotationProcessor 'com.jakewharton:butterknife-compiler:8.8.1'
{% endhighlight %}

2.在project的build.gradle中的buildscript->dependencies中添加：

{% highlight java %}
classpath 'com.android.tools.build:gradle:3.1.4'
        classpath 'com.jakewharton:butterknife-gradle-plugin:8.4.0'
{% endhighlight %}

3.repositories中的内容就不给出来了，大体都一样。