---
layout: post
title: "python中鉴别文件编码格式的方法"
subtitle: "Using python to authenticate file-format "
data: 2018-01-31
author: "Zxy"
tags:
    - python
---
### 利用python的chardet闭包实现文件编码格式的读取。
当遇到一些有关于python的编码问题时（`比如说中文输出乱码`），就可以在充分理解`python`编码核心的情况下来查看出现问题的编码格式。

情况可如图所示：
<img src="/assets/python_check_encode.png">
