---
layout: post
data: 2018-02-08
title: "Scrapy的pipelines文件"
subtitle: "How to understand pipelines of scrapy?"
author: "Zxy"
tags:
    - 爬虫
    - python
    - scrapy
---
## Scrapy的Pipelines
一般来说，当我们使用`scrapy`框架的时候，首先利用`scrapy startproject` "文件夹名"来生成一个`scrapy`文件夹，里面会自动带有一个名为`pipelines`的文件，今天就来说一下这个文件内容的写法。

一般来说，把里面的内容分作三个部分：

{% highlight python %}
def open_spider(self, spider):
def process_item(self, item, spider):
def close_spider(self, spider):
{% endhighlight %}

这三个函数构成了`pipelines`文件的大体框架，对于第一个函数**open_spider(self, spider)**一般在`spider`开始的时候执行，这个函数中，一般会连接数据库，为数据存储做准备。

对于第二个函数**process_item(self, item, spider)**一般会在捕捉到`item`的时候执行，我们会在这里做数据过滤并把数据存入数据库。

详细的解释：

在`process_item`中，我们通常会先将`item`中的子链接取出，并利用`open`函数创建文件，利用`write`写入，最后将文件关闭。

详细代码如下：
{% highlight python %}
def process_item(self, item, spider):
    sonUrls = item['sonUrls']

    # 文件名为子链接url中间部分，并将 / 替换为 _，保存为 .txt格式
    filename = sonUrls[7:-6].replace('/','_')
    filename += ".txt"

    fp = open(item['subFilename']+'/'+filename, 'w')
    fp.write(item['content'])
    fp.close()

    return item
{% endhighlight %}

最后一个`close_spider(self, spider)`在`spider`结束的时候执行，一般用来断开数据库链接或者做数据收尾工作。

一般而言，若要将数据储存在`json`文件中，有如下操作：

{% highlight python %}
class MyPipeline(object):
    def __init__(self):
        #打开文件
        self.file = open('data.json', 'w', encoding='utf-8')
    #该方法用于处理数据
    def process_item(self, item, spider):
        #读取item中的数据
        line = json.dumps(dict(item), ensure_ascii=False) + "\n"
        #写入文件
        self.file.write(line)
        #返回item
        return item
    #该方法在spider被开启时被调用。
    def open_spider(self, spider):
        pass
    #该方法在spider被关闭时被调用。
    def close_spider(self, spider):
        pass
{% endhighlight %}

**注意：若要成功调用pipelines文件，则必须在settings构建pipelines的优先级信息：

{% highlight python %}
ITEM_PIPELINES = {
	'文件夹名.pipeline文件名.pipeline类名': 300
}
{% endhighlight %}

右侧的数据，表示`pipelines`文件的优先级，1~1000,越小越优先执行。