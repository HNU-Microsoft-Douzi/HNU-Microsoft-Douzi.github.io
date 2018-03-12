---
layout: blog-page
data: 2018-03-12
title: "Selenium的基础应用（随时更新）"
tags: 爬虫
---
<p>在使用python的selenium包的时候，要用到游览器的驱动器webdriver组件，这边会更新一些关于selenium包的一些用法。</p>
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
<p>(获取当前页面的链接，直接利用chrome driver自带的current_url属性)</p><br>
<p><b>得到页面的cookies:</b></p>
{% highlight linenos %}
import selenium
from selenium import webdriver

driver = selenium.webdriver.Chrome("C:\Program Files (x86)\Google\Chrome\Application\chromedriver.exe")
driver.get('https://www.baidu.com/')
print driver.get_cookies()

driver.add_cookie({'name': 'name', 'domain': 'www.zhihu.com', 'value': 'germey'})
print driver.get_cookies()

driver.delete_all_cookies()
print driver.get_cookies()
driver.close()
{% endhighlight %}
<p>(获取百度页面的cookies)</p>
<p>结果：</p>

	domain': u'.baidu.com', u'name': u'H_PS_PSSID', u'value': u'1454_13549_21102_22160', u'path': u'/', u'httpOnly': False, u'secure': False}, {u'domain': u'.baidu.com', u'secure': False, u'value': u'D549784C33DE00BBAD0B8FC897D40C6C:FG=1', u'expiry': 3668346962.01777, u'path': u'/', u'httpOnly': False, u'name': u'BAIDUID'}, {u'domain': u'.baidu.com', u'secure': False, u'value': u'1520863316', u'expiry': 3668346962.017901, u'path': u'/', u'httpOnly': False, u'name': u'PSTM'}, {u'domain': u'.baidu.com', u'secure': False, u'value': u'D549784C33DE00BBAD0B8FC897D40C6C', u'expiry': 3668346962.017875, u'path': u'/', u'httpOnly': False, u'name': u'BIDUPSID'}, {u'domain': u'www.baidu.com', u'name': u'BD_HOME', u'value': u'0', u'path': u'/', u'httpOnly': False, u'secure': False}, {u'domain': u'www.baidu.com', u'secure': False, u'value': u'12314353', u'expiry': 1521727315, u'path': u'/', u'httpOnly': False, u'name': u'BD_UPN'}]
	domain': u'.baidu.com', u'name': u'H_PS_PSSID', u'value': u'1454_13549_21102_22160', u'path': u'/', u'httpOnly': False, u'secure': False}, {u'domain': u'.baidu.com', u'secure': False, u'value': u'D549784C33DE00BBAD0B8FC897D40C6C:FG=1', u'expiry': 3668346962.01777, u'path': u'/', u'httpOnly': False, u'name': u'BAIDUID'}, {u'domain': u'.baidu.com', u'secure': False, u'value': u'1520863316', u'expiry': 3668346962.017901, u'path': u'/', u'httpOnly': False, u'name': u'PSTM'}, {u'domain': u'.baidu.com', u'secure': False, u'value': u'D549784C33DE00BBAD0B8FC897D40C6C', u'expiry': 3668346962.017875, u'path': u'/', u'httpOnly': False, u'name': u'BIDUPSID'}, {u'domain': u'www.baidu.com', u'name': u'BD_HOME', u'value': u'0', u'path': u'/', u'httpOnly': False, u'secure': False}, {u'domain': u'www.baidu.com', u'secure': False, u'value': u'12314353', u'expiry': 1521727315, u'path': u'/', u'httpOnly': False, u'name': u'BD_UPN'}]
	[]