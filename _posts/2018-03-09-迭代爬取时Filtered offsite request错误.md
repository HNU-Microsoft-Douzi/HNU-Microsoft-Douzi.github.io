---
layout: blog-page
data: 2018-03-09
title: "迭代爬取时Filtered offsite request错误"
tags: 爬虫
---
<p>在最近一次的爬取任务中，迭代爬取页面数据，报出错误<span style="color:red">“Filtered offsite request”</span>，经过查找，给出如下结论及解决方案。</p><br>
<p>报错原因：</p>
<p><b>spider程序中的allowed_domins属性将后序的跟进url进行了过滤，因为allowed_domins的作用是用来过滤不包含其内属性的urls，所以后序页面实际上不是没有被查找到，而是查找到并且被过滤了。</b></p>
<br>
<p style="color:red"><b>解决方案：去掉allowed_domins属性即可。</b></p>