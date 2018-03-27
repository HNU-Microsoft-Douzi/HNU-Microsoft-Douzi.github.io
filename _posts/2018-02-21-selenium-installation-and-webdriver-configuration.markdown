---
layout: post
data: 2018-02-21
title: "selenium的安装及webdriver的配置"
subtitle: "How to install selenium and how to configurate webdriver?"
author: "Zxy"
tags:
    - 爬虫
    - python
---

当我们需要爬虫做模拟登录的操作时，需要用到selenium这个模块。

安装selenium模块的方法是:

直接用命令:`pip install -U selenium`

然而我安装的时候遇到了一些问题，就是说通过上述方法安装`selenium`会报错，具体错误大致是无法找到`selenium`的安装路径，所以采用下面的第二种方法:

从网上下载下面这个文件：
<img src="/assets/selenium.png">

然后直接用cmd<span style="color:grey">(`我是win7的系统，直接命令行操作就好`)</span>`pip install + 文件名` 安装就好，经测试，可以成功安装。

运行代码的时候，发现系统会报出一个错误：

代码：

{% highlight python %}
import selenium
from selenium import webdriver

sel = selenium.webdriver.Chrome(r"C:\Program Files (x86)\Google\Chrome\Application\chromedriver.exe")
{% endhighlight %}

报出的错误：

Traceback (most recent call last):
  	File "C:/Users/Administrator/Desktop/spaiders/login_test1.py", line 7, in <module><br>
    sel = selenium.webdriver.Chrome(r"C:\Program Files (x86)\Google\Chrome\Application")
  	File "C:\Python27\lib\site-packages\selenium\webdriver\chrome\webdriver.py", line 68, in __init__
    self.service.start()
  	File "C:\Python27\lib\site-packages\selenium\webdriver\common\service.py", line 88, in start<br>
    os.path.basename(self.path), self.start_error_message)
	selenium.common.exceptions.WebDriverException: Message: 'Application' executable may have wrong permissions. Please see https://sites.google.com/a/chromium.org/chromedriver/home

经过检查，有下面两种解决方案：

第一种：直接在`webdriver`方法中给出`chromedriver`的绝对路径，具体实现方法如下：

{% highlight python %}
sel = selenium.webdriver.Chrome(r"C:\Program Files (x86)\Google\Chrome\Application\chromedriver.exe")
{% endhighlight %}

第二种方法：<span style="color:grey">（一劳永逸）</span>

直接在环境变量中把`chromedriver`的路径加入进去，注意加入的是`administrator`的`path`路径，并且要附带`chromedriver.exe`这个具体的程序，否则不成功，操作如下：

<img src="/assets/selenium2.png">
