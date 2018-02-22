---
layout: blog-page
data: 2018-02-21
title: "selenium的安装及webdriver的配置"
tags: 爬虫
---

<p><b>当我们需要爬虫做模拟登录的操作时，需要用到selenium这个模块。</b></p><br>
<p><b>安装selenium模块的方法是:</b></p>
<p><b>直接用命令:pip install -U selenium</b></p><br>
<p>然而我安装的时候遇到了一些问题，就是说通过上述方法安装selenium会报错，具体错误大致是无法找到selenium的安装路径，所以采用下面的第二种方法:</p>
<p><b>从网上下载下面这个文件：</b></p><br>
<img src="/assets/selenium.png"><br>
<p><b>然后直接用cmd<span style="color:grey">(我是win7的系统，直接命令行操作就好)</span>pip install + 文件名 安装就好，经测试，可以成功安装。</b></p>

<p>运行代码的时候，发现系统会报出一个错误：</p><br>
<p><b>代码：</b></p><br>
{% highlight linenos %}
import selenium
from selenium import webdriver

sel = selenium.webdriver.Chrome(r"C:\Program Files (x86)\Google\Chrome\Application\chromedriver.exe")
{% endhighlight %}<br>
<p><b>报出的错误：</b></p><br>
<p sytle="color:red">Traceback (most recent call last):<br>
  File "C:/Users/Administrator/Desktop/spaiders/login_test1.py", line 7, in <module><br>
    sel = selenium.webdriver.Chrome(r"C:\Program Files (x86)\Google\Chrome\Application")<br>
  File "C:\Python27\lib\site-packages\selenium\webdriver\chrome\webdriver.py", line 68, in __init__
    self.service.start()<br>
  File "C:\Python27\lib\site-packages\selenium\webdriver\common\service.py", line 88, in start<br>
    os.path.basename(self.path), self.start_error_message)<br>
selenium.common.exceptions.WebDriverException: Message: 'Application' executable may have wrong permissions. Please see https://sites.google.com/a/chromium.org/chromedriver/home</p>
<br>
<p><b>经过检查，有下面两种解决方案：</b></p><br>
<p>第一种：直接在webdriver方法中给出chromedriver的绝对路径，具体实现方法如下：</p>
{% highlight linenos %}
sel = selenium.webdriver.Chrome(r"C:\Program Files (x86)\Google\Chrome\Application\chromedriver.exe")
{% endhighlight %}<br>
<p>第二种方法：<span style="color:grey">（一劳永逸）</span></p>
<p>直接在环境变量中把chromedriver的路径加入进去，注意加入的是administrator的path路径，并且要附带chromedriver.exe这个具体的程序，否则不成功，操作如下：</p>
<img src="/assets/selenium2.png">
