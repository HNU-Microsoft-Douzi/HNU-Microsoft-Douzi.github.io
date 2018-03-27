---
layout: post
title: "Image Pipeline的用法记录"
subtitle: "Now,let me show you the way of using Image-Pipeline"
data: 2018-03-14
author: "Zxy"
tags:
    - 爬虫
    - python
---

最近涉及到了`scrapy`的框架，然后在练习的时候发现该框架用来下载图片很方便，但是一开始的时候因为用的Scrapy自带框架，所以出了很多问题，所以在这里记录以下。

## 一、定义items.py

{% highlight python %}
import scrapy 
class Item(scarpy.Item):
	image_urls = scrapy.Field()
	imges = scrapy.Field()
	image_paths = scrapy.Field()
{% endhighlight %}

然后这里主要需要声明的一点是，这里必须要声明一个固定字段`image_urls`，因为在`Image Pipeline`的声明中，图片的路径一定要被存储在`image_urls`这个字段中，它才能检索到并进行下载。

## 二、定义pipelines.py

{% highlight python %}
class YourImagePipeline(ImagePipeline):
{% endhighlight %}

注意，这里定制你的`Image Pipeline`的管道文件，这个继承类尤其重要，它继承自`ImagesPipeline`这个类，然后因此可以在类的内部对两个函数进行重载:

1. `get_media_requests(self, item, info)`目的是用该函数获得图片的链接，也就是说，你可以将所有的链接存在`item['image_urls']`当中，然后在该函数中对每个单独的元素取出并进行返回。
2. `item_completed(results, items, info)`目的是在该函数中返回每个图片对象的存储路径。
3. 如果你不想对函数进行重载，采用默认的设置也可以。

## 定义settings文件

在settings文件中，需要配置的有如下:

**IMAGE_STORE = ""** #用来存储图片存储的路径

> 如果你要设置item中的image_paths的话，可以直接这样写：
> **IMAGE_STORE = "image_paths"**

{% highlight python %}
ITEM_PIPELINES = {
	'文件名.pipelines.pipeline类名':300,
}
{% endhighlight %}

ps:这个地方很容易出错,因为你继承的`Image pipeline`实际上还是一个`scrapy`的管道，所以不需要像其它blog上定义的那样要写成`~.image.ImagePipeline`的形式。

实际证明，那样的形式并不能正常的使得`Image pipeline`工作。

如果你要下载的不单单是图片，还要设置其它的管道文件，那么你可以同时在`ITEM_PIPELINE`中加上另外的管道文件并设置优先级即可。

在`settings`的文件中，你还可以设置图片压缩的选项。

{% highlight python %}
IMAGES_THUMBS = {

’small’: (50, 50),

’big’: (270, 270),

}
{% endhighlight %}

> 就像上面这样

同样，你同样可以过滤图片，方法如下：

{% highlight python %}
IMAGES_MIN_HEIGHT = 110

IMAGES_MIN_WIDTH = 110
{% endhighlight %}