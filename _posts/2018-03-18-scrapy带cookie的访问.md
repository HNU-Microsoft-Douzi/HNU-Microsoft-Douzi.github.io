---
layout: blog-page
data: 2018-03-18
title: "scrapy带cookie的访问"
tags: 爬虫
---
<p>一般模拟登录有三种办法：</p>
<p><b>①、selenium模拟登录，启用webdriver在主机页面上模拟操作。</b></p>
<p><b>②、form表单提交登录</b></p>
{% highlight python %}
def start_requests(self):
	 return scrapy.FormRequest(
	         formdata={'username': '***', 'password': '***'},
	         callback=self.after_login
	     )
{% endhighlight %}
<p><b>③、cookie模拟登录：</b></p>
<p>了解过HTTP协议的话，就会知道所有网站的页面登陆的核心实际上就是对面服务器检查之前传递过来的cookies的过程，所以模拟cookie有个好处：不需要知道登录url, 不需要知道登录表单的字段名，以及还需要哪些其他参数。</p>
<p>我觉得可以被称作暴力登录，但是缺点也是显而易见的，你必须先登录上去才能拿到cookies，在碰到多ip分配任务时，cookies登录就显得捉襟见肘了,下面我们来看cookie模拟登录的方式。</p>
{% highlight python %}
def start_requests(self):
	yield Request(url=urls, cookies=cookie, callback=self.parse)
{% endhighlight %}
<p>需要注意的是，在settings.py中进行配置：</p>
<p style="color:red"><b>ROBOTSTXT_OBEY=False</b></p>
<br>
<p><b>但是有scrapy的官方文档进行查阅后可知：</b></p>
<p>可以在scrapy的spider下面直接附加request_with_cookies参数，比如：</p>
{% highlight python %}
request_with_cookies  =  请求（url = “http://www.example.com” ，
                               cookies = { 'currency' ： 'USD' ， 'country' ： 'UY' }）
{% endhighlight %}
or<br>
{% highlight python %}
request_with_cookies  =  Request （url = “http://www.example.com” ，
                               cookies = [{ 'name' ： 'currency' ，
                                        'value' ： 'USD' ，
                                        'domain' ： 'example.com' ，
                                        'path ' ： '/ currency' }]）
{% endhighlight %}
<p>后一种形式允许自定义domain和path Cookie的属性。这仅在cookie被保存用于以后的请求时才有用。</p>