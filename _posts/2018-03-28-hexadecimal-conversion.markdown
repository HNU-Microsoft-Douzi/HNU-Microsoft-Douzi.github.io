---
layout: post
title: "python实现十进制和二进制的互相转换"
subtitle: "Hexadecimal conversion"
data: 2018-03-28
author: "Zxy"
tags:
    - python
    - algorithm
---

#### 利用python实现的纯手工进制转换方法
实现的是二进制和十进制的相互转换，没有用python本身的bin和int方法，自己从内部进行实现。

{% highlight python %}
#!usr/bin/env python
# _*_coding: UTF-8 _*_

if __name__ == '__main__':
    print "1、十进制转二进制 2、二进制转十进制"
    a = input("请输入进制转换的方式：")
    if a == 1:
        num = raw_input("请输入一个十进制数字: ")
        result = []
        if "." in num:
            num1, num2 = num.split(".")
            num1 = int(num1)
            shang = num1 / 2
            yu = num1 % 2
            if shang == 0:
                result.append(yu)
            while num1 != 0:
                result.append(yu)
                num1 /= 2
                yu = num1 % 2
            result.reverse()

            num2 = float("0." + num2)
            result1 = []
            while num2 < 1:
                num2 *= 2
                result1.append(int(num2))
            result = "".join(str(each) for each in result) + "." + "".join(str(each) for each in result1)
        else:
            num = int(num)
            shang = num / 2
            yu = num % 2
            if shang == 0:
                result.append(yu)
            while num != 0:
                result.append(yu)
                num /= 2
                yu = num % 2
            result.reverse()
        print "转换后的二进制为:", "".join( str(each) for each in result)

    elif a == 2:
        num = raw_input("请输入一个二进制数字：")
        result = 0
        if "." in num:
            num1, num2 = num.split(".")
            count = len(num1)
            for each in num1:
                count -= 1
                result += int(each)*2**count
            for each in num2:
                count -= 1
                result += float(each)*2**count
        else:
            count = len(num)
            for each in num:
                count -= 1
                result += int(each)*2**count

        print "转换后的十进制为:", result
    else:
        print "您输入的数据不合法，请重新输入！"
{% endhighlight %}

因为我懒，所以进制转换的方法请自行百度，这里只提供代码！