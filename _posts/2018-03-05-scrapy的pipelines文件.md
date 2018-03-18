---
layout: blog-page
data: 2018-02-08
title: "scrapy的pipelines文件"
tags: 爬虫
---
<p class="h2">Scrapy的Pipelines</p>
<p>一般来说，当我们使用scrapy框架的时候，首先利用scrapy startproject "文件夹名"来生成一个scrapy文件夹，里面会自动带有一个名为pipelines的文件，今天就来说一下这个文件内容的写法。</p>
<br>

<p><b>一般来说，把里面的内容分作三个部分：</b></p>
{% highlight python %}
def open_spider(self, spider):
def process_item(self, item, spider):
def close_spider(self, spider):
{% endhighlight %}
<br>
<p><b>这三个函数构成了pipelines文件的大体框架，对于第一个函数<span style="color:red">open_spider(self, spider)</span>一般在spider开始的时候执行，这个函数中，一般会连接数据库，为数据存储做准备。<br>对于第二个函数<span style="color:blue">process_item(self, item, spider)</span>一般会在捕捉到item的时候执行，我们会在这里做数据过滤并把数据存入数据库。
<span style="color:orange">(给出详细的方法：)在process_item中，我们通常会先将item中的子链接取出，并利用open函数创建文件，利用write写入，最后将文件关闭。)</span>详细代码如下：</b></p>
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
<br>
<p><b>最后一个<span style="color:green">close_spider(self, spider)</span>在spider结束的时候执行，一般用来断开数据库链接或者做数据收尾工作。</b></p>

<br><br><br>
<p>一般而言，若要将数据储存在json文件中，有如下操作：</p>
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

<p style="color:red">注意：若要成功调用pipelines文件，则必须在settings构建pipelines的优先级信息：</p>
{% highlight python %}
ITEM_PIPELINES = {
	'文件夹名.pipeline文件名.pipeline类名': 300
}
{% endhighlight %}
<p>右侧的数据，表示pipelines文件的优先级，1~1000,越小越优先执行，一般写300就差不多。</p>