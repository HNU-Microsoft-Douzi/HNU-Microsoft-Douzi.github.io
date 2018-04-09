---
layout: post
title: "GET方法和POST方法"
subtitle: "GET way and POST way"
data: 2018-02-03
author: "Zxy"
tags:
    - HTML
    - python
---
### 什么是HTTP?
超文本传输协议（`HTTP`）的设计目的是保证客户机与服务器之间的通信。

`HTTP`的工作方式是客户机与服务器之间的请求-应答协议。

`web`浏览器可能是客户端，而计算机上的网络应用程序也可能作为服务器端。

举例：

- 客户端（浏览器）向服务器提交 HTTP 请求:

- 服务器向客户端返回响应。响应包含关于请求的状态信息以及可能被请求的内容。

### 两种 HTTP 请求方法：GET 和 POST
在客户机和服务器之间进行请求-响应时，两种最常被用到的方法是：GET 和 POST。
- GET - 从指定的资源请求数据。
- POST - 向指定的资源提交要被处理的数据.

#### GET 方法
有关`GET`请求的一些注释：（`标准来自于w3c`）

- GET 请求可被缓存
- GET 请求保留在浏览器历史记录中
- GET 请求可被收藏为书签
- GET 请求不应在处理敏感数据时使用
- GET 请求有长度限制
- GET 请求只应当用于取回数据

#### POST 方法
有关POST请求的一些注释：（`标准来自于w3c`）

* POST 请求不会被缓存
* POST 请求不会保留在浏览器历史记录中
* POST 不能被收藏为书签
* POST 请求对数据长度没有要求

比较GET与POST

<img src="/assets/GET_POST.png" alt="图片路径错误，请重新选择！">