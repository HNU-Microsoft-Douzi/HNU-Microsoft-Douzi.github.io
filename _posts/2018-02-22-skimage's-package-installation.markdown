---
layout: post
data: 2018-02-22
title: "skimage包的安装"
subtitle: "How to install skimage package?"
tags:
    - 爬虫
    - python
---

在破解网页验证码的过程中，对验证码的二值化看了很多博客，写了很多结果却不怎么好，然后总算是找到一个好的方式，精确度很高，奈何要用到skimage这个包，然后这个包本身的安装不能用`pip install skimage`这个命令，查了很多资料，总算是知道它本身有三个依赖的组件，所以不是直接下载这个包，因为找不到正确的路径（`或者说根本就不存在`）。

下面给出具体的解决方案：

你只需要`pip install` 下面的这三个组件就好。

`scipy-1.0.0-cp27-cp27m-win_amd64.whl`

`scikit_image-0.13.1-cp27-cp27m-win_amd64.whl`

`numpy-1.14.1+mkl-cp27-cp27m-win_amd64.whl`

`cp-python`版本号:`win-?`表示你的系统位数，下载地址:

请点击[这里](https://www.lfd.uci.edu/~gohlke/pythonlibs/#scipy)，下载时请选择与自己主机对应的版本。

