---
layout: post
data: 2018-03-09
title: "迭代爬取时Filtered offsite request错误"
subtitle: "Iterative crawl filtered offsite request error!"
author: "Zxy"
tags:
    - 爬虫
    - python
---

在最近一次的爬取任务中，迭代爬取页面数据，报出错误**“Filtered offsite request”**，经过查找，给出如下结论及解决方案。

报错原因：
`spider`程序中的`allowed_domins`属性将后序的跟进`url`进行了过滤，因为`allowed_domins`的作用是用来过滤不包含其内属性的`urls`，所以后序页面实际上不是没有被查找到，而是查找到并且被过滤了。

**解决方案：去掉allowed_domins属性即可。**