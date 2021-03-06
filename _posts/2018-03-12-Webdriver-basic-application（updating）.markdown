---
layout: post
data: 2018-03-12
title: "Selenium的基础应用（随时更新）"
subtitle: "How to use selenium basic application easily?"
author: "Zxy"
tags:
    - selenium
    - python
---

在使用`python`的`selenium`包的时候，要用到游览器的驱动器`webdriver`组件，这边会更新一些关于`selenium`包的一些用法。

文本框的定位和传值：

{% highlight python %}
driver = selenium.webdriver.Chrome("chromedriver路径")
driver.find_element_by_xpath('/html/body/div[3]/div/div[1]/div/div[2]/div/input').send_keys(text)
{% endhighlight %}

**(解释一下：<span style="color:green"><b>webdriver</b></span>自带一个元素查找器<span style="color:red"><b>find_element_by_xpath(id/css/re)</b></span>进行文本框的标选，然后通过<span style="color:green"><b>send_keys()</b></span>的函数进行调用。)**

获取页面的当前链接:

{% highlight python %}
url = driver.current_url
{% endhighlight %}

(获取当前页面的链接，直接利用`chrome driver`自带的`current_url`属性)
到页面的cookies:

{% highlight python %}
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

> (获取百度页面的cookies)

结果：
	domain': u'.baidu.com', u'name': u'H_PS_PSSID', u'value': u'1454_13549_21102_22160', u'path': u'/', u'httpOnly': False, u'secure': False}, {u'domain': u'.baidu.com', u'secure': False, u'value': u'D549784C33DE00BBAD0B8FC897D40C6C:FG=1', u'expiry': 3668346962.01777, u'path': u'/', u'httpOnly': False, u'name': u'BAIDUID'}, {u'domain': u'.baidu.com', u'secure': False, u'value': u'1520863316', u'expiry': 3668346962.017901, u'path': u'/', u'httpOnly': False, u'name': u'PSTM'}, {u'domain': u'.baidu.com', u'secure': False, u'value': u'D549784C33DE00BBAD0B8FC897D40C6C', u'expiry': 3668346962.017875, u'path': u'/', u'httpOnly': False, u'name': u'BIDUPSID'}, {u'domain': u'www.baidu.com', u'name': u'BD_HOME', u'value': u'0', u'path': u'/', u'httpOnly': False, u'secure': False}, {u'domain': u'www.baidu.com', u'secure': False, u'value': u'12314353', u'expiry': 1521727315, u'path': u'/', u'httpOnly': False, u'name': u'BD_UPN'}]
	domain': u'.baidu.com', u'name': u'H_PS_PSSID', u'value': u'1454_13549_21102_22160', u'path': u'/', u'httpOnly': False, u'secure': False}, {u'domain': u'.baidu.com', u'secure': False, u'value': u'D549784C33DE00BBAD0B8FC897D40C6C:FG=1', u'expiry': 3668346962.01777, u'path': u'/', u'httpOnly': False, u'name': u'BAIDUID'}, {u'domain': u'.baidu.com', u'secure': False, u'value': u'1520863316', u'expiry': 3668346962.017901, u'path': u'/', u'httpOnly': False, u'name': u'PSTM'}, {u'domain': u'.baidu.com', u'secure': False, u'value': u'D549784C33DE00BBAD0B8FC897D40C6C', u'expiry': 3668346962.017875, u'path': u'/', u'httpOnly': False, u'name': u'BIDUPSID'}, {u'domain': u'www.baidu.com', u'name': u'BD_HOME', u'value': u'0', u'path': u'/', u'httpOnly': False, u'secure': False}, {u'domain': u'www.baidu.com', u'secure': False, u'value': u'12314353', u'expiry': 1521727315, u'path': u'/', u'httpOnly': False, u'name': u'BD_UPN'}]
	[]

第二次相对第一次补充了部分的`cookies`属性，也为我们模拟`cookies`登录提供了信息和线索，同时，使用`driver.delete_all_cookies()`可以将`cookies`属性清空，便于重新设置`cookies`。

前进后退-实现浏览器的前进后退以浏览不同的网页

{% highlight python %}
import time
from selenium import webdriver

browser = webdriver.Chrome()
browser.get('https://www.baidu.com/')
browser.get('https://www.taobao.com/')
browser.get('https://www.python.org/')
browser.back()
time.sleep(1)
browser.forward()
browser.close()
{% endhighlight %}

> (页面结果：百度->淘宝->python官网->淘宝->python官网)

交互动作，驱动浏览器进行动作，模拟**拖拽动作**，将动作附加到动作链中串行执行。

{% highlight python %}
	from selenium import webdriver
	from selenium.webdriver import ActionChains#引入动作链
	
	browser = webdriver.Chrome()
	url = 'http://www.runoob.com/try/try.php?filename=jqueryui-api-droppable'
	browser.get(url)
	browser.switch_to.frame('iframeResult')#切换到iframeResult框架
	source = browser.find_element_by_css_selector('#draggable')#找到被拖拽对象
	target = browser.find_element_by_css_selector('#droppable')#找到目标
	actions = ActionChains(browser)#声明actions对象
	actions.drag_and_drop(source, target)
	actions.perform()#执行动作
{% endhighlight %}

> (模拟游览器拖拽动作...这个功能个人认为完全使得浏览器上的所有规范性操作成为了可能，全部可以用机器模拟进行访问。)