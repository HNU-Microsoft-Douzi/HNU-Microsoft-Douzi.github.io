---
layout: post
data: 2018-02-08
title: "爬虫入门实战-小说下载器"
subtitle: "Crawler combat - novel download"
author: "Zxy"
tags:
    - 爬虫
    - python
---
## 爬虫实战-小说下载器
在讲述代码之前，我还是要着重先说一下自己的感慨，哈哈！这大概是接触爬虫的第四天吧，然后前两天基本上是用来"磨刀"了，所谓磨刀不误砍柴工吧，用了两天的时间，看完了网上很多的关于`python`爬虫经常用的库的说明，尤其是官方文档和某些`CSDN`的博客写的非常简介明了，比如`requests`库，`lxml`包，和`Beatuiful`的介绍以及`lxml`的特点和`xpath`的所有基础内容。

然后了解完上述的内容后，正式开始写爬虫，第一次写了一个很丑的东西，用来爬下4399的游戏库名。

<img src="/assets/spaider-4399.png">

如上图，开始的很多东西都不明白，然后网上一句一句去找注释，找每个函数的意思和理解及用法，然后就慢慢写出了这短短几行代码，也成功做成了第一个简单的小蜘蛛。

虽然很简单，但是作为入门的话，确是最好的选择，然后第三天开始自己动手写一个小说下载器。

这里给出为什么这样做的理由：一方面是受到了网上一个博主的启发，第二个是自己看小说的时候（`对，我会经常看小说，因为幻想中的世界会带来很多现实中难以体会到的对人生的理解和思考，嗯，扯远了~`）很多小说网并不能提供良好的下载方式，结合爬虫本身的特性，便有了这个想法！

说下感慨:说老实话，这个东西写了我很长时间，写了差不多整整两天，第一天自己写完都要放弃，因为不管怎么跑都没有跑出来正确的结果，但是第二天又看了下别人的博客，发现静态网站爬完差不多就该要去爬动态网站了，所以晚上又想了想，第二天一早起来开始工作，就把前一天写的几个代码全部扔掉，然后从头开始重写，这回没有像之前一样套用python的面向对象，因为还不是很熟练，所以直接用了函数的方式，果不然其然，不懈的努力下，成功写出，便有了这一次的记录。

下面给出详细的代码，并对代码做诠释:

{% highlight python %}
#!usr/bin/env python
# _*_coding: UTF-8 _*_

import requests,os
from lxml import html

urls = []
titles = []
nums = 0
def get_urls():
    global nums, urls
    server = "http://www.biqukan.com"
    target = "http://www.biqukan.com/10_10502/"
    req = requests.get(target)
    page = html.fromstring(req.text)
    child_urls = page.xpath('//dd/a/@href')
    nums = len(child_urls[12:])
    for i in child_urls[12:]:
        urls.append(server + i)

def get_titles():
    global titles
    target = "http://www.biqukan.com/10_10502/"
    req = requests.get(target)
    page = html.fromstring(req.text)
    child_titles = page.xpath('//dd/a/text()')
    for i in child_titles[12:]:
        titles.append(i)

def get_contents(url):
    contents = []
    req = requests.get(url)
    page = html.fromstring(req.text)
    content = page.xpath('//div[@class="showtxt"]/text()')#.split('        ')
    for i in content:
        contents.append(i[8:] + '\n')
    return contents

def download():
    global titles, nums
    f = open("极品神医姐夫".encode('gbk') + ".txt",'a')
    for i in range(nums):
        f.write(titles[i] + '\n')
        f.writelines(get_contents(urls[i]))
        f.write('\n\n')
        print u"正在下载".encode('gbk'), u"极品神医姐夫:".encode('gbk')
        print u"已下载:".encode('gbk')
        print ("%.3f"% (float(i)/float(nums)))
        os.system('cls')
    print u"极品神医姐夫下载完成".encode('gbk')
    f.close()

if __name__ == '__main__':
    get_urls()
    get_titles()
    download()
    os.system("pause")
{% endhighlight %}

如代码可见，我是将整个整体分做了五个模块：四个函数体和一个主函数，函数体主要实现的功能分别是：获得urls、获得文章标题、获得文章内容和下载本身。

三个全局变量，为了用来实现值的传递，但是如果写成类的话就不用这样去做。

这里特别要注意的是`python`本身的编码问题，`python`这个语言的编码问题我百思不得其解，它本身其实可以处理的更好但不知道为什么没有进行处理，所以我单独的对每个函数体进行了测试确保能够正确输出以后才整个拼接到一起实现一个完整的程序，但是最后还是有一个问题没有解决，因为在实际运行的时候，`python`的命令行不断刷新（`因为我不知道如何对单独的一行进度条进行刷新，想来应该是要自己写一个刷新的函数的，因为与本文主题无关，所以这里不再多加探讨`），看起来非常不舒服。

不过最终还是成功的进行了输出，这里以笔趣阁的"极品神医姐夫"为例，可见成功在运行目录中成生了一个"极品神医姐夫.txt"的文件，成功爬下了小说网站的内容。

**然后这里涉及一下每个函数的核心内容：**
一、建立请求

{% highlight python %}
#同过requests的内置方法构建访问的方式（get）的一个对象，以此来建立请求。
req = requests.get(url)
{% endhighlight %}

二、页面解析

{% highlight python %}
#通过lxml包的内置函数作为我们请求对象的解析器
page = html.fromstring(req.text)
{% endhighlight %}

三、xpath路径/节点选取

{% highlight python %}
#xpath的节点选取
content = page.xpath('//div[@class="showtxt"]/text()')
{% endhighlight %}
