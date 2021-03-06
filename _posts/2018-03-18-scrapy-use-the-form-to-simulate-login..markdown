---
layout: post
data: 2018-03-18
title: "scrapy使用表单模拟登录"
subtitle: "Using form to simulate login all kinds of websites"
author: "Zxy"
tags:
    - 爬虫
    - python
    - scrapy
---

### 使用FormRequest.from_response()方法模拟用户登录

通常网站通过<span style="color:red"> <input type="hidden"> </span>实现对某些表单字段（如数据或是登录界面中的认证令牌等）的预填充。 使用Scrapy抓取网页时，如果想要预填充或重写像用户名、用户密码这些表单字段， 可以使用 <span style="color:green">FormRequest.from_response() </span>方法实现。下面是使用这种方法的爬虫例子:

{% highlight python %}
import scrapy

class LoginSpider(scrapy.Spider):
    name = 'example.com'
    start_urls = ['http://www.example.com/users/login.php']

    def parse(self, response):
        return scrapy.FormRequest.from_response(
            response,
            formdata={'username': 'john', 'password': 'secret'},
            callback=self.after_login
        )

    def after_login(self, response):
        # check login succeed before going on
        if "authentication failed" in response.body:
            self.logger.error("Login failed")
            return

        # continue scraping with authenticated session...
{% endhighlight %}