---
layout: post
data: 2018-03-05
title: "scrapy将数据导入到json中"
subtitle: "How to use scrapy input the data to json?"
author: "Zxy"
tags:
    - 爬虫
    - python
    - scrapy
---
**利用命令将抓来的数据导入到json文件中：**

`scrapy crawl test -o test.json -t json`

> test表示保存的json文件名

**将`item`写入JSON文件**

{% highlight python %}
import json
class JsonWriterPipeline(object):
	def __init__(self):
		line = json.dumps(dict(item)) + "\n"
		self.file.write(line)
		return item
{% endhighlight %}

`JsonWriterPipeline`的目的只是为了介绍怎样编写`item pipeline`，如果你想要将所有爬取的item都保存到同一个`JSON`文件， 你需要使用[Feed exports](http://scrapy-chs.readthedocs.io/zh_CN/1.0/topics/feed-exports.html#topics-feed-exports)。