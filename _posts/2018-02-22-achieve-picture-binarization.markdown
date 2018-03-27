---
layout: post
data: 2018-02-22
title: "实现图片的二值化"
subtitle: "How to achieve the binarization of picture?"
tags:
    - 爬虫
    - python
---

现在来看一下怎样实现图片的二值化，网上找到的很多方法精确度有问题，因此在这里做一个记录。

先来看看代码：

{% highlight python %}
    #转化为灰度图
    img = Image.open(target_url2)  # 读入图片
    img = img.convert("L")
    #图片均值
    imgs = skimage.io.imread(target_url2)
    ttt = np.mean(imgs)
    #二值化
    WHITE, BLACK = 255, 0
    img = img.point(lambda x: WHITE if  x > ttt else BLACK)
    img = img.convert('1')
    img.save('C:\Users\Administrator\Desktop\img.png', "png")
{% endhighlight %}

我们将图片的二值化过程分为了三个步骤：

1. 转化为灰度图。
2. 然后给定一个图片的RGB均值。
3. 最后就是二值化。

**核心的原理是：通过判断RGB图像上的每一个像素点的RGB值，如果大于给定的均值时，就让它的值为黑色，反之的话，为白色，实现二值化操作。**

然后具体代码就在上面，至于每一句的含义如若不懂，请自行**百度/Google**。