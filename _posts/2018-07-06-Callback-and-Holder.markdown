---
layout: post
title: "android的回调和Holder之间的关系"
subtitle: "The connection of Callback and Holder in android"
data: 2018-07-06
author: "Zxy"
tags:
    - android
---

> 前记：好久都没有更新过微博了，这一段时间一直在学习安卓开发，python爬虫的事情暂且先告一段落，反正该学的很多知识点已经学完了，剩下的只是部分的实践而已，可以放到有项目的时候再进行实践。然后就关于安卓这一方面，确实内容很多，要练习的东西也很多，它需要的基础不是很高，但也不是很低，所以在学习过程中的很多项目都放到了我的github上，详情可以点击这里[我的android项目](https://github.com/HNU-Microsoft-Douzi/android)来查看我的各种android的demo.

**好了，我们开始进入正题吧，先说一下到底什么是回调呢?**

顾名思义，回调在大部分情况下就是程序在运行到需要一个函数（但是它本身没有）,具体该怎么理解呢？百度上有一点说的很透彻：回调函数不是由该函数的实现方直接调用，而是在特定的时间或条件发生时有另一方调用的，用于对该时间或条件进行响应。

也就是说：是一种间接调用。

**然后我们来看一下主题：回调和Holder的关系**

这里借用网上的一个例子：A人有能力做某件事但是现在不用他去做，所以他去等级一下自己的能力，到了需要用到他的时候，就会有人叫他去做，到程序里面就是A人能做`surfaceCreated/Changed/Destroyed`3件事情，他去等急了，并且有个统称就叫做SurfaceHolder.Callback，而在此程序中需要做的3件事，所以会Callback。而Holder是什么呢？它就好比这个过程中的开发商，用View相当于一个建房子计划的负责人，他知道要首先要找到开发商，所以mHolder = getHolder()相当于找开放商，而开发商就找到能够有建房能力的这个人A，就是回调他登记的信息mHolder.addCallback(this)