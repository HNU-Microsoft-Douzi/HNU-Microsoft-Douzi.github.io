---
layout: blog-page
data: 2018-03-04
title: "scrapy的meta数据"
tags: 爬虫
---
<p><b>Request中meta参数的作用是传递信息给下一个函数，使用过程可以理解成：</b></p><br>
<p>把需要传递的信息赋值给这个叫做meta的变量，但meta只接收字典类型的赋值，因此，要把待传递的信息改成"字典"的形式，即：</p>
<p>meta={'key1':value1, 'key2':value2}</p>
<br>

<p>如果想在下一个函数中取出value1,只需得到上一个函数的meta['key1']即可，因为meta是随着Request产生时传递的，下一个函数得到的Response对象中就会有meta,即response.meta，取value1则是value = response.meta['key1']</p>
<br>

<p>这些信息可以是任意类型的，比如值、字符串、列表、字典......的值，分析见如下语句（爬虫文件）:</p>
{% highlight linenos %}
作者：小伙
链接：https://www.zhihu.com/question/54773510/answer/146971644
来源：知乎
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

class example(scrapy.Spider):
    name='example'
    allowed_domains=['example.com']
    start_urls=['http://www.example.com']
    def parse(self,response):
           #从start_urls中分析出的一个网址赋值给url
           url=response.xpath('.......').extract()
           #ExamleClass是在items.py中定义的,下面会写出。
           """记住item本身是一个字典"""
           item=ExampleClass()
           item['name']=response.xpath('.......').extract()
           item['htmlurl']=response.xpath('.......').extract()
           """通过meta参数，把item这个字典，赋值给meta中的'key'键（记住meta本身也是一个字典）。
           Scrapy.Request请求url后生成一个"Request对象"，这个meta字典（含有键值'key'，'key'的值也是一个字典，即item）
           会被“放”在"Request对象"里一起发送给parse2()函数 """
           yield Request(url,meta={'key':item},callback='parse2')
     def parse2(self,response):
           item=response.meta['key']
           """这个response已含有上述meta字典，此句将这个字典赋值给item，
           完成信息传递。这个item已经和parse中的item一样了"""
           item['text']=response.xpath('.......').extract()
           #item共三个键值，到这里全部添加完毕了
           yield item
{% endhighlight %}
<p>items.py中语句如下:</p>
{% highlight linenos %}
class ExampleClass(scrapy.Item):
	name = scrapy.Field()
	htmlurl = scrapy.Field()
	text = scrapy.Field()
{% endhighlight %}