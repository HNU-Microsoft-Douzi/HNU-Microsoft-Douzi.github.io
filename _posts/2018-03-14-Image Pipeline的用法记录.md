---
layout: blog-page
title: "Image Pipeline的用法记录"
data: 2018-03-14
tags: 爬虫
---
<p><b>最近涉及到了scrapy的框架，然后在练习的时候发现该框架用来下载图片很方便，但是一开始的时候因为用的Scrapy自带框架，所以出了很多问题，所以在这里记录以下。</b></p>
<br>
<p class="h2">一、定义items.py</p>
{% highlight linenos %}
import scrapy 
class Item(scarpy.Item):
	image_urls = scrapy.Field()
	imges = scrapy.Field()
	image_paths = scrapy.Field()
{% endhighlight %}
<p>*然后这里主要需要声明的一点是，这里必须要声明一个固定字段<span style="color:red"><b>image_urls</b></span>，因为在Image Pipeline的声明中，图片的路径一定要被存储在<span style="color:red"><b>image_urls</b></span>这个字段中，它才能检索到并进行下载。</p>
<br>

<p class="h2">二、定义pipelines.py</p>
{% highlight linenos %}
class YourImagePipeline(ImagePipeline):
{% endhighlight %}
<p>*注意，这里定制你的Image Pipeline的管道文件，这个继承类尤其重要，它继承自ImagesPipeline这个类，然后因此可以在类的内部对两个函数进行重载:<br>
①get_media_requests(self, item, info)目的是用该函数获得图片的链接，也就是说，你可以将所有的链接存在item['image_urls']当中，然后在该函数中对每个单独的元素取出并进行返回。<br>
②item_completed(results, items, info)目的是在该函数中返回每个图片对象的存储路径。</p>
<p style="color:blue">如果你不想对函数进行重载，采用默认的设置也可以。</p>
<br>

<p class="h2">定义settings文件</p>
<p>在settings文件中，需要配置的有如下:<br>
<span style="color:green">IMAGE_STORE = ""</span> #用来存储图片存储的路径<br>
(如果你要设置item中的image_paths的话，可以直接这样写：<span style="color:green">IMAGE_STORE = "image_paths"</span>)
<br>

ITEM_PIPELINES = {
	'文件名.pipelines.pipeline类名':300,
}
<br>
ps:这个地方很容易出错,因为你继承的Image pipeline实际上还是一个scrapy的管道，所以不需要像其它blog上定义的那样要写成~.image.ImagePipeline的形式
<br>实际证明，那样的形式并不能正常的使得Image pipeline工作。<br>
如果你要下载的不单单是图片，还要设置其它的管道文件，那么你可以同时在ITEM_PIPELINE中加上另外的管道文件并设置优先级即可。
</p>
<p><b>在settings的文件中，你还可以设置图片压缩的选项。</b></p>
{% highlight linenos %}
IMAGES_THUMBS = {

’small’: (50, 50),

’big’: (270, 270),

}
{% endhighlight %}
<p>(就像上面这样)</p>
<p><b>同样，你同样可以过滤图片，方法如下：</b></p>
{% highlight linenos %}
IMAGES_MIN_HEIGHT = 110

IMAGES_MIN_WIDTH = 110
{% endhighlight %}