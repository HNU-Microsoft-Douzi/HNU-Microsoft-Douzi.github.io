---
layout: blog-page
data: 2018-03-12
title: "Webdriver的基础应用（随时更新）"
tags: 爬虫
---
<p>在使用python的selenium包的时候，要用到游览器的驱动器webdriver组件，这边会更新一些关于驱动器的一些用法。</p>
<br>
<p><b>文本框的定位和传值：</b></p>
{% highlight linenos %}
driver = selenium.webdriver.Chrome("chromedriver路径")
driver.find_element_by_xpath('/html/body/div[3]/div/div[1]/div/div[2]/div/input').send_keys(text)
{% endhighlight %}
<p>(解释一下：<span style="color:green"><b>webdriver</b></span>自带一个元素查找器<span style="color:red"><b>find_element_by_xpath(id/css/re)</b></span>进行文本框的标选，然后通过<span style="color:green"><b>send_keys()</b></span>的函数进行调用。)</p>
<br>
<p><b>获取页面的当前链接:</b></p>
{% highlight linenos %}
url = driver.current_url
{% endhighlight %}
<p>(获取当前页面的链接，直接利用chrome driver自带的current_url属性)</p>