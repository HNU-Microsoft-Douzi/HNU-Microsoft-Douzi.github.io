---
layout: post
data: 2018-03-18
title: "scrapy带cookie的访问"
subtitle: "Access with cookie in scrapy"
author: "Zxy"
tags:
    - 爬虫
    - python
    - scrapy
---
一般模拟登录有三种办法：

1. selenium模拟登录，启用webdriver在主机页面上模拟操作。
2. form表单提交登录

{% highlight python %}
def start_requests(self):
	 return scrapy.FormRequest(
	         formdata={'username': '***', 'password': '***'},
	         callback=self.after_login
	     )
{% endhighlight %}

**cookie模拟登录：**
了解过HTTP协议的话，就会知道所有网站的页面登陆的核心实际上就是对面服务器检查之前传递过来的cookies的过程，所以模拟cookie有个好处：不需要知道登录url, 不需要知道登录表单的字段名，以及还需要哪些其他参数。

我觉得可以被称作暴力登录，但是缺点也是显而易见的，你必须先登录上去才能拿到cookies，在碰到多ip分配任务时，cookies登录就显得捉襟见肘了,下面我们来看cookie模拟登录的方式。

{% highlight python %}
def start_requests(self):
	yield Request(url=urls, cookies=cookie, callback=self.parse)
{% endhighlight %}

需要注意的是，在settings.py中进行配置：
**ROBOTSTXT_OBEY=False**

但是有scrapy的官方文档进行查阅后可知：

可以在scrapy的spider下面直接附加`request_with_cookies`参数，比如：

{% highlight python %}
request_with_cookies  =  请求（url = “http://www.example.com” ，
                               cookies = { 'currency' ： 'USD' ， 'country' ： 'UY' }）
{% endhighlight %}

{% highlight python %}
request_with_cookies  =  Request （url = “http://www.example.com” ，
                               cookies = [{ 'name' ： 'currency' ，
                                        'value' ： 'USD' ，
                                        'domain' ： 'example.com' ，
                                        'path ' ： '/ currency' }]）
{% endhighlight %}

后一种形式允许自定义`domain`和`path Cookie`的属性，这仅在cookie被保存用于以后的请求时才有用。