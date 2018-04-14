---
layout: post
title: "scrapy中的持久化"
subtitle: "Persistence in scrapy！"
data: 2018-04-13
author: "Zxy"
tags:
    - 爬虫
---

### 什么是爬虫中的持续性呢？

指的是spider第一次工作ctrl+c停止后，继续运行爬虫，记录保留，按照上次的断层持续工作。

### scrapy启动爬虫的持续性操作

scrapy中通过命令的方式来控制spider的持续性:

`scrapy crawl somespider -s JOBDIR=crawls/somespider-1`

命令施行后，你就可以在任何安全地时候停止爬虫（Ctrl + C 或者发送一个信号）

这样的话，爬虫断掉后，再次启动就会接着上次的url跑。

### 如何不让命令中显示Debug信息呢？

`scrapy crawl spider -L WARNING`

不打印Debug信息，可以清楚地看到运行过程。

