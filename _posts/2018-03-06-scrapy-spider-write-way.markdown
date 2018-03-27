---
layout: post
data: 2018-03-06
title: "scrapy的spider写法详细解析"
subtitle: "I'll introduce the way of making scrapy's spider!"
author: "Zxy"
tags:
    - 爬虫
    - python
---
## 分布解析scrapy中spider的写法:

{% highlight python %}
对于scrapy中的spider的写法：
class Test(self.Spider):
	name = ""#爬虫的名字，用来在命令行中用scrapy crawl name进行调用
	allowed_domains = [""]#用来过滤urls，详情在爬虫栏其它目录中有详细解释
	start_urls = [""]#爬虫的开始爬取的第一个页面，相当于蛛网的网心，所有的东西都由这个中心进行展开

	def parse(self, response):#一般而言，爬取大型网站时，它有一个主页面，我们通过这个主页面获取到需要部分的链接，比如大类的titles和urls，由此构建目录文件夹
		{
			#在parse内部，一般要做的是申请一个存item数据的序列
			items = []
			#下一步就是抓取到各个item属性的数据，并在申请完item对象后将item通过尾添加入items的序列中
			#最后一步，就是通过yield将每个item通过回调函数调用给下一个函数处理
		}

	def second_parse(self, response):#第二个函数作为第一个函数的回调函数，用来处理parse返回的每一个子链接，并抓取所有子链接内的链接内容
 		{
			#回调函数第一步，一般要通过meta的赋值获得parse传递的meta数据，如：meta_1 = response.meta("meta_1")
			#然后下一步要做的和parse一样，只不过有些数据的调用开始通过meta字典的方式进行调用
		}
	def detail_parse(self, reponse):#作为second_parse的回调函数，用来处理second_parse中返回的子链接，并从中抓取到想要的数据进行存储
		{
			#直接抓取到想要的数据之后，将数据存入item中
			yield item
			#最后返回了item对象后，scrapy会自动调用pipelines.py文件进行存储
		}
{% endhighlight %}

详细的解析写在了代码的注释里面，这里就不多加复述，想必看代码的话可以理解的更加透彻。

这里附上一条，如果要得到当前页面的链接的话，就直接用`response.url`即可。