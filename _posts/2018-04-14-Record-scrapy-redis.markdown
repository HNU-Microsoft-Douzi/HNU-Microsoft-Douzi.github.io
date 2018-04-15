---
layout: post
title: "scrapy-redis"
subtitle: "Record the process of my learning scrapy-redis"
data: 2018-04-14
author: "Zxy"
tags:
    - 爬虫
---

### scrapy-redis流程图

<img src="/assets/scrapy_redis.png">

### scrapy-redis各个组件

1.connection.py

负责根据setting中配置实例化redis连接。被dupefilter和scheduler调用，总之涉及到redis存取的都要使用到这个模块。

2.dupefilter.py

负责执行requst的去重，实现的很有技巧性，使用redis的set数据结构。但是注意scheduler并不使用其中用于在这个模块中实现的dupefilter键做request的调度，而是使用queue.py模块中实现的queue。

当request不重复时，将其存入到queue中，调度时将其弹出。

3.queue.py

其作用如II所述，但是这里实现了三种方式的queue：

FIFO的SpiderQueue，SpiderPriorityQueue，以及LIFI的SpiderStack。默认使用的是第二中，这也就是出现之前文章中所分析情况的原因（链接）。

4.pipelines.py

这是是用来实现分布式处理的作用。它将Item存储在redis中以实现分布式处理。

另外可以发现，同样是编写pipelines，在这里的编码实现不同于文章（链接：）中所分析的情况，由于在这里需要读取配置，所以就用到了`from_crawler()`函数。

5.scheduler.py

此扩展是对scrapy中自带的scheduler的替代（在settings的SCHEDULER变量中指出），正是利用此扩展实现crawler的分布式调度。其利用的数据结构来自于queue中实现的数据结构。

scrapy-redis所实现的两种分布式：爬虫分布式以及item处理分布式就是由模块scheduler和模块pipelines实现。上述其它模块作为为二者辅助的功能模块。

6.spider.py

设计这个spider从redis中读取要爬的url,然后执行爬取，若爬取过程中返回更多的url，那么继续进行直至所有的request完成。之后继续从redis读取url,循环这个过程。