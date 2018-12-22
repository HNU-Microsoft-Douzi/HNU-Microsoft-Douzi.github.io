---
layout: post
title: "Java中的Collections体系"
subtitle: "Collections in Java"
data: 2018-07-26
author: "Zxy"
tags:
    - java
---

先说一下Collections和Collection的区别：

Collections:

此类仅由静态方法组合或返回集合。 它包含对集合进行操作的多态算法，“包装器”，返回由指定集合支持的新集合，以及其他一些可能的和最终的。

Collection:

集合层次结构中的根界面 。 集合表示一组被称为其元素的对象。 一些集合允许重复元素，而其他集合不允许。 有些被命令和其他无序。 JDK不提供此接口的任何直接实现：它提供了更具体的子接口的实现，如Set和List 。 该界面通常用于传递集合，并在需要最大的通用性的情况下对其进行操作。 

然后有了两个模块的概述后，差别就显而易见了：

Collection本身是各种集合结构的父接口。

Collections包含有关各种集合操作的静态方法。

然后如果去查Collections的官方API文档的话，就会发现它内部封装的所有函数全部都是静态函数，也就是说，你可以直接通过Collections.方法名来实现调用机制。


### Collections下的静态方法

![](/assets/Collection0.png)

![](/assets/Collection1.png)

![](/assets/Collection2.png)

![](/assets/Collection3.png)

很多静态方法很好用，比如说:

Collections.sort()

Collections.max()

Collections.min()

... ...

有需要的直接查表就好。