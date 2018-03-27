---
layout: post
data: 2018-02-19
title: "关于urllib2 503错误"
subtitle: "How to solve urllib2 503 error?"
author: "Zxy"
tags:
    - 爬虫
    - python
---

在写爬虫抓去网页`cookies`并存入本地文件时遇到的错误:

{% highlight python %}
Traceback (most recent call last):
  File "C:/Users/Administrator/Desktop/spaiders/cookie_test.py", line 22, in <module>
    urllib2.urlopen(request)
  File "C:\Python27\lib\urllib2.py", line 154, in urlopen
    return opener.open(url, data, timeout)
  File "C:\Python27\lib\urllib2.py", line 429, in open
    response = self._open(req, data)
  File "C:\Python27\lib\urllib2.py", line 447, in _open
    '_open', req)
  File "C:\Python27\lib\urllib2.py", line 407, in _call_chain
    result = func(*args)
  File "C:\Python27\lib\urllib2.py", line 1241, in https_open
    context=self._context)
  File "C:\Python27\lib\urllib2.py", line 1198, in do_open
    raise URLError(err)
urllib2.URLError: <urlopen error Tunnel connection failed: 503 Service Unavailable>
{% endhighlight %}

经过各方面的资料查找，最终得出结论，并不是因为代码的语法问题，而是服务器那边响应的时候检测了你的"`User-Agent`"，因此拒绝了你的请求，因而我们便有了解决的措施，只要将发送的请求附带上我们抓取的`headers`中的`User-Agent`信息，就可以瞒过服务器的检测。

用urllib2的写法如下：

{% highlight python %}
opener.addheaders = [('User-Agent', 'xxxxxxxxxxxxxxxxxxxxxxxxxxxx')]
{% endhighlight %}

如果用`requests`的方法来写的话，就直接构造一个简单的`headers`，里面包含`User-Agent`的信息，然后在加上这个`param`就可以了。

{% highlight python %}
headers = {
	'User-Agent':"xxxxxxxxxxxxxxxxxxxxxxxx"
}
req = requests.get(url="https://www.baidu.com", headers=headers)
{% endhighlight %}