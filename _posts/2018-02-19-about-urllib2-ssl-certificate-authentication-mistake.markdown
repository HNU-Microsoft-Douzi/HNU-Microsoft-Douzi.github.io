---
layout: post
data: 2018-02-19
title: "关于urllib2 ssl证书验证错误"
subtitle: "This page will introduce how to solve ssl certificate authentication error!"
author: "Zxy"
tags:
    - 爬虫
    - python
---

而当目标网站使用的是自签名的证书时就会抛出一个 `urllib2.URLError: <\urlopen error [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed (_ssl.c:581)>`的错误消息。

下面给出解决方案：

使用ssl创建未经验证的上下文，在urlopen中传入上下文参数:

{% highlight python%}
import ssl

context = ssl._create_unverified_context()
print urllib2.urlopen("https://www.12306.cn/mormhweb/", context=context).read()
{% endhighlight %}

**全局取消证书验证**
{% highlight python%}
import ssl
 
ssl._create_default_https_context = ssl._create_unverified_context()
 
print urllib2.urlopen("https://www.12306.cn/mormhweb/").read()
{% endhighlight %}
