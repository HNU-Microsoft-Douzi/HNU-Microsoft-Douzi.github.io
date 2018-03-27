---
layout: post
data: 2018-03-02
title: "python中文编码问题_致新手"
subtitle: "This is a page to some young who don't know how to solve python's chinese question"
tags:
    - python
---

很多新手最初开始学习`python`的时候，都会遇到中文乱码的问题，这是因为：

`Python`中默认的编码格式是 `ASCII` 格式，在没修改编码格式时无法正确打印汉字，所以在读取中文时会报错。

解决办法如下：

1. 在开头加入：`# _*_ coding: UTF-8 _*_`或者`#coding=utf-8`就行了。
2. 开头不要加字符编码的一行命令，而是直接在`pycharm`的右下角改变编码方式就可以了。

<img src="/assets/chinese_encode.jpg">

**注意：如果写了字符编码的一行命令，那么pycharm的右下角将变成灰色，无法点击。**

**特别注意:**
`python2.x` 脚本加上 `# -*- coding: UTF-8 -*-` 或者 `#coding=utf-8` 后`windows` 命令提示符下输出中文字符串还会出现乱码。

**解决方法**需要先使用 `decode("utf-8")` 转换成 `utf-8` 编码，然后使用 `encode("gbk")` 转换成 `gbk` 编码，才能在 windows 命令提示符下正常输出中文。

例如：

{% highlight python %}
# -*- coding: UTF-8 -*-
s="我是中文 "
print s.decode("utf-8").encode("gbk")
{% endhighlight %}

原因是`windows` 命令提示符的显示编码为 `gbk` 编码。

在命令提示符下使用 `chcp` 查询编码。

- "活动代码页：936" 代表命令提示符的编码为 "gbk"

- "活动代码页：65001" 代表命令提示符的编码为 "utf-8"
