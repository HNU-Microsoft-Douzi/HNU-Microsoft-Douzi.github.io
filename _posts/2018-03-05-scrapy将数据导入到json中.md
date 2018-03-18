---
layout: blog-page
data: 2018-03-05
title: "scrapy将数据导入到json中"
tags: 爬虫
---
<p><b>利用命令将抓来的数据导入到json文件中：</b></p>
<br>
<b>scrapy crawl test -o test.json -t json</b>
<P style="color:grey">test表示保存的json文件名</p>

<p><b>将item写入JSON文件</b></p>
{% highlight python %}
import json
class JsonWriterPipeline(object):
	def __init__(self):
		line = json.dumps(dict(item)) + "\n"
		self.file.write(line)
		return item
{% endhighlight %}
<p style="color:red">注解：</p>
<p>JsonWriterPipeline的目的只是为了介绍怎样编写item pipeline，如果你想要将所有爬取的item都保存到同一个JSON文件， 你需要使用<a href="http://scrapy-chs.readthedocs.io/zh_CN/1.0/topics/feed-exports.html#topics-feed-exports">Feed exports 。</a></p>
