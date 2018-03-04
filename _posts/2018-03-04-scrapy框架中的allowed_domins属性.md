---
layout: blog-page
data: 2018-03-04
title: "scrapy框架中的allowed_domins属性"
tags: 爬虫
---

<p class="h2">allowed_domins属性</p>
<p><b>关于allowed_domins，它的主要作用是过滤后续爬取网站中不包括allowed_domins值的域名，也就是说，如果爬取到某个子链接，而这个子链接中不包含allowed_domins的值，那么就会自动过滤该子链接，不进行爬取。</b></p><br>
<p><b>注意上面提到的是子链接，allowed_domins的调用过程中不会对start_urls<span style="color:grey">(起始url)</span>起作用。</b></p>