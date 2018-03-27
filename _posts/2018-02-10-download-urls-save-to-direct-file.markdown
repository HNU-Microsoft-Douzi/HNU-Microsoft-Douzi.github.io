---
layout: post
title: "下载式urls保存到指定文件"
subtitle: "download urls to aim-file"
data: 2018-02-10
author: "Zxy"
tags:
    - 爬虫
    - python
---
> (本篇文章摘自python requests的官方文档，如需查看官方文档，可以[click here]("http://docs.python-requests.org/zh_CN/latest/user/quickstart.html")

## 原始响应内容
在罕见的情况下，你可能想获取来自服务器的原始套接字响应，那么你可以访问 <span style="color:blue">r.raw。</span>如果你确实想这么干，那请你确保在初始请求中设置了 `stream=True`。具体你可以这么做：

{% highlight python %}
>>> r = requests.get('https://github.com/timeline.json', stream=True)
>>> r.raw
<requests.packages.urllib3.response.HTTPResponse object at 0x101194810>
>>> r.raw.read(10)
'\x1f\x8b\x08\x00\x00\x00\x00\x00\x00\x03'
{% endhighlight %}

但一般情况下，你应该以下面的模式将文本流保存到文件：

{% highlight python%}
with open(filename, 'wb') as fd:
    for chunk in r.iter_content(chunk_size):
        fd.write(chunk)
{% endhighlight %}

使用 `Response.iter_content` 将会处理大量你直接使用 `Response.raw` 不得不处理的。 当流下载时，上面是优先推荐的获取内容方式。 

Note that chunk_size can be freely adjusted to a number that may better fit your use cases.