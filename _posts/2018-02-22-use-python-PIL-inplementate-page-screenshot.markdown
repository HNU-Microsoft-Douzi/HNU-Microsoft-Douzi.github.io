---
layout: post
data: 2018-02-22
title: "利用python的PIL实现页面截图"
subtitle: "How to use PIL achieve the aim of page-screenshot?"
author: "Zxy"
tags:
    - 爬虫
    - python
---
**PIL作为python强大的图像处理库，在实际的爬虫应用中可以对验证码的识别模块起到很大的作用。**

下面给出一个实例，讲解如何从互联网的页面上抓取验证码并保存到本地做识别之用。

{% highlight python %}
'''
超星系统的模拟登录（验证码识别模块-抓取验证码）
'''
import selenium
from PIL import Image
from selenium import webdriver
dr = selenium.webdriver.Chrome("C:\Program Files (x86)\Google\Chrome\Application\chromedriver.exe")
dr.get("http://passport2.chaoxing.com/login?fid=&refer=")
dr.save_screenshot("C:\Users\Administrator\Desktop\page.png")
img = Image.open("C:\Users\Administrator\Desktop\page.png")
bbox = (364, 337, 364+100, 336+40)
region = img.crop(bbox)
region.show()
region.save("C:\Users\Administrator\Desktop\IMAGE.png")
{% endhighlight %}

如上述代码所示，要从页面上抓取截图，我们首先要利用`python`的`PIL`库和，`PIL`库的下载方式自行百度，然后要利用`selenium`库来实现游览器的模拟打开，`selenium`的安装方式请详见爬虫区另外的博客内容。

在引入`PIL`库的`Image`包和`webdriver`驱动后。

首先先为这个`Chrome`的驱动构建一个对象（`因为我用的是Chrome的游览器`），该驱动会自行模拟打开给入url的页面。

然后通过`get`方法得到发送一个请求，发送请求后就用`save_screen`函数将整个模拟打开的页面进行截图。

截完图后主要有以下几个步骤：
<ul>
	<li>一、将截图保存到本地，这个很简单，因为save_screen函数本身就带了一个这样的参数可以实现这一点。</li>
	<li>二、将本地的截图根据相对的图片position来进行定位，定位对象用一个bbox来进行赋值。<span style="color:grey">（学过html相对定位的小伙伴们会对这一点很清楚。）</span></li>
    <li>三、在截图上利用Image包的crop()函数实现截图的功能，并将截得的图片赋给region对象。</li>
    <li>四、利用show()将region图片显示出来检测截得的目标图片是否正确，并进行bbox属性的相应调整。</li>
	<li>五、检查正确后，将所得图片存入给出路径。</li>
</ul>