---
layout: post
title: "python 字符编码问题"
subtitle: "How to solve python character encode question"
data: 2018-02-06
author: "Zxy"
tags:
    - python
---

## python对unicode编码的字符串的处理

{% highlight python %}
#!usr/bin/env python
# _*_coding: UTF-8 _*_

import requests
from lxml import html
url = "http://www.4399.com"
page = requests.session().get(url)
tree = html.fromstring(page.text)
result = tree.xpath('//a/text()')
print result
{% endhighlight %}
结果：
{% highlight linenos %}
[u'\xca\xd5\xb2\xd84399', u'\xb1\xa3\xb4\xe6\xb5\xbd\xd7\xc0\xc3\xe6 ', u'\xb8\xe3\xd0\xa6\xcd\xbc\xc6\xac', u'\xb5\xc7\xc2\xbc']...
{% endhighlight %}

我以一个简单的爬虫为例，可以看见不对编码进行处理时，得到的结果就是Unicode编码。

处理的方式有两种：

1. encode('raw_unicode_escape') 
2. encode('latin1') 

用这两种译码方式可以解决上述编码问题。

这里以第一种方法为例给出结果。

{% highlight python %}
#!usr/bin/env python
# _*_coding: UTF-8 _*_

import requests
from lxml import html
url = "http://www.4399.com"
page = requests.session().get(url)
tree = html.fromstring(page.text)
result = tree.xpath('//a/text()')
for _ in result:
    print _.encode('raw_unicode_escape')
{% endhighlight %}

结果：

{% highlight python %}
收藏4399
保存到桌面 
搞笑图片
登录
注册
我玩过的
猜你喜欢
... ...
{% endhighlight %}