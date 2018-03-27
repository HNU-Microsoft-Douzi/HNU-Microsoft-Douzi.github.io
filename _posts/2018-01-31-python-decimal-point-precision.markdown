---
layout: post
title: "python小数点精度问题"
subtitle: "Solve the question of decimal point precision"
data: 2018-01-31
author: "Zxy"
tags:
    - python
---

这里只给出最佳解法:

`'%.nf' % a`

这里n代表小数点后保留的数字位数，a表示要保留小数的那个对象。

下面给出实例图:
<img src="/assets/python_decimal_precision.png>