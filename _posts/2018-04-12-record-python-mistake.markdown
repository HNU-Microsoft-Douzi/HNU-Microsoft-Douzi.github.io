---
layout: post
title: "Python做题错误记录"
subtitle: "Record my python mistake!"
data: 2018-04-12
author: "Zxy"
tags:
    - python
---

**关于Python中单下划线_foo与双下划线__foo与__foo__的成员**

_xxx 不能用’from module import *’导入  （相当于protected） 

__xxx__ 系统定义名字   (系统内置的，比如关键字)

__xxx 类中的私有变量名  （privated），所以更加不能使用from module import进行导入了

**关于__new__和__init__的区别**

- __init__是当实例对象创建完成后被调用的，然后设置对象属性的一些初始值。

- __new__是在实例创建之前被调用的，因为它的任务就是创建实例然后返回该实例，是个静态方法。

即，__new__在__init__之前被调用，__new__的返回值（实例）将传递给__init__方法的第一个参数，然后__init__给这个实例设置一些参数。