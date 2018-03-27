---
layout: post
title: "python连续输入"
subtitle: "Python's continues input way"
data: 2018-02-01
author: "Zxy"
tags:
    - python
---

### python如何实现连续输入?

方法：利用input()

	a,b,c = raw_input().split(" ")
	print a,b,c

实际上'raw_input'是读取一行并作为字符串存入缓存的函数，通过raw_input读取一行字符串（`注意，此时字符串是包含空格的`），所以我们再利用分块函数以空格为分隔符作为划分将整个字符串划分后返回一个列表。