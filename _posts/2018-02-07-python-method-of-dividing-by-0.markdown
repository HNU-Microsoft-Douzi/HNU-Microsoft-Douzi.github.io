---
layout: post
title: "python整数相除得0保留小数的方法"
subtitle: "python's method of dibiding by 0"
data: 2018-02-07
author: "Zxy"
tags:
    - python
---
## python整数相除得0保留小数的方法
<img src="/assets/python_division_1.png">

如上图所示，假若给定一个值`a = 1`, `b = 1000`，进行了格式化保留三位小数的操作后，得出的结果仍然为`0.000`。与实际不符，是什么原因导致的呢？

经过详细的思考，导致这种问题出现的关键原因在于事先给定`a,b`的时候都是一个整数，在做运算的时候是将其作为整数进行了除法运算，因而得出的结果为`0`，再对`0`进行格式化，得到的结果就变成了`0.000`。

正确的操作步骤如下图：
<img src="/assets/python_division_2.png">

这样做的关键就在于可以先将a,b转换为float型，然后再进行格式化操作，解决了冲突先后的矛盾，问题迎刃而解。