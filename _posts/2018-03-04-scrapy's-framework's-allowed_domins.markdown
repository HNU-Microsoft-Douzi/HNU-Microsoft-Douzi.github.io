---
layout: blog-page
data: 2018-03-04
title: "Scrapy框架中的allowed_domins属性"
subtitle: "How to understand allowed_domins of scrapy?"
author: "Zxy"
tags:
    - 爬虫
    - python
    - scrapy
---

## allowed_domins属性
关于`allowed_domins`，它的主要作用是过滤后续爬取网站中不包括`allowed_domins`值的域名，也就是说，如果爬取到某个子链接，而这个子链接中不包含`allowed_domins`的值，那么就会自动过滤该子链接，不进行爬取。

注意上面提到的是子链接，`allowed_domins`的调用过程中不会对`start_urls(起始url)`起作用。