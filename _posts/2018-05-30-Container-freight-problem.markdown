---
layout: post
title: 集装箱货运问题"
subtitle: "It's the difficult question which I have met!"
data: 2018-05-30
author: "Zxy"
tags:
    - python
    - algorithm
---

**任务概述**

集装箱货运是国际货物运输的主要方式之一，在进行码头运货时，会先将不同类型的物品都装入集装箱，然后再统一运送。

集装箱通常有统一的规格。本关挑战是需要你设计算法，要求将码头已有的多种类型的货物使用给定规格的集装箱进行组合装箱，并使得集装箱的载重和空间利用率尽可能的高。

**数据说明**

假设货运码头仅有一种规格的集装箱，其体积是56立方米，最多能放入重量为128千克的物品。该码头支持运输的物品有7种类型，各种类型物品的具体规格尺寸等信息如下：


	类型	体积(立方米)	重量(千克)
	
	type1		2		2
	
	type2		2		8
	
	type3		4		16
	
	type4		8		32
	
	type5		16		16
	
	type6		16		32
	
	type7		16		64

**挑战任务**

现在，该码头有多个不同类型的物品（具体物品的类型和数量由程序输入给定）需要全部装入多个该规格的集装箱进行运输。集装箱可以选择多个，没有数量限制，但是在选择物品装箱时要考虑装箱物品的总重量和总体积不能够超过单个箱子的重量和体积。

请你设计一种方法，将给定数量的多个不同种类的物品放入集装箱中，使得集装箱的利用率最高。利用率计算方式是体积和重量利用率各占一半。

其中,

VRes_i表示第 i 个物品的体积资源
WRes_i表示第 i 个物品的重量资源
VBox_j表示放置的第 j 个箱子的体积总资源
WBox_j 表示放置的第 j 个箱子的重量总资源。

**编程要求**

请补充完善右侧代码区域中的put_things(box_info,input_lines)函数，实现物品装箱计算，并将最终装箱组合结果存入result数组。 其中，

box_info为集装箱的信息数值，具体格式如下：

  [体积，重量]
例如：

  [56, 128]
input_lines为要放置的物品，物品种类以及数量数值为元组类型，具体格式如下：

[(‘type1’,数量), (‘type2’,数量), (‘type3’,数量)…(‘type7’,数量)]
例如：

  [('type1',1), ('type2',2), ('type3',2), ('type4',1), ('type5',2), ('type6',2), ('type7',2)]
result为物品装箱组合结果数组，数组的长度即集装箱个数，每一个数组元素为某个集装箱中放置的物品和物品个数。具体格式如下：

['物品1 物品1的个数 物品2 物品2的个数', '物品3 物品3的个数 物品5 物品5的个数']
例如，

result = ['type4 1 type2 2 type3 2 type5 2 type1 1', 'type7 1 type6 2', 'type7 1']
评测说明
测试样例为：
测试输入：

box_info = [56, 128] 
input_lines = [('type1',255), ('type2',213), ('type3',248), ('type4',232), ('type5',76), ('type6',281), ('type7',30)]
测试输出格式如下：

return = ['物品1 物品1的个数 物品2 物品2的个数', '物品3 物品3的个数 物品5 物品5的个数'...]
计分规则：
本次挑战总分500分，最终得分根据集装箱利用率进行换算。具体换算方法如下：

score = Usage * 500


---

这道题目是背包问题的改版，我直接用的贪心法求的解，最后得分是430+，不是最优解，可能中间的数据有哪个部分处理的不是很好，不过，就目前而言，这确实算是我遇到的最难的问题了。

处理单纯的背包问题不难，递归或者贪心都可以，这道题目用递归我总感觉不是很好处理，就直接用的贪心，然后最让我觉得复杂的一点是对于重量和体积这两者的平衡，体积满足的情况下，要考虑重量是否满足，重量不满足，就要求出重量满足的最小情况，并改写对应的lines数组的数据，然后随着体积的变化，要关顾剩余重量的变化，本来问题就不是很容易，再兼顾这么多因素，我只想说我要原地爆炸，并且代码我感觉有点问题，平衡二者关系的时候，我的解决方案肯定不是最优的，但是目前而言，只能这样处理，等我算法更进一步，再回头来改进。

直接上代码：

{% highlight python %}
#!usr/bin/env python
# _*_coding: UTF-8 _*_

def is_ok(arr):
    for i in arr:
        if i != 0:
            return False
    return True


def put_things(box_info, input_lines):
    result = []

    '''**********BEGIN***********'''
    volume = box_info[0]


    weight = box_info[1]
    t_volume = [2, 2, 4, 8, 16, 16, 16]
    t_weight = [2, 8, 16, 32, 16, 32, 64]

    lines = []  # 存储input_lines的数字数据
    for i in input_lines:
        lines.append(i[1])

    while is_ok(lines) == False:
        string = ""  # 用来记录每个count对应的result的元素
        spare = volume  # 用来表示当前剩余空间的
        spare_weight = weight # 用来表示当前剩余重量的
        for i in range(7):  # 6- i 为当前操作的下标索引
            current = 6 - i
            if spare >= t_volume[current]:
                num = int(spare / t_volume[current])  # 看到底能容下几个
                if num * t_weight[current] > spare_weight:
                    num = int(spare_weight/t_weight[current])

                if num >= lines[current]:
                    if lines[current] != 0:
                        if string != "":
                            string = input_lines[current][0] + " " + str(lines[current]) + " " + string
                        else:
                            string = input_lines[current][0] + " " + str(lines[current]) + string
                        spare -= lines[current] * t_volume[current]
                        lines[current] = 0
                        spare_weight -= num * t_weight[current]
                else:
                    if num!= 0:
                        if string != "":
                            string = input_lines[current][0] + " " + str(num) + " " + string
                        else:
                            string = input_lines[current][0] + " " + str(num) + string
                        spare -= num * t_volume[current]
                        lines[current] -= num
                        spare_weight -= num * t_weight[current]
        result.append(string)
    '''***********END************'''

    return result

{% endhighlight %}

短小而精悍，哈哈，我就不解释了，对于关键语句都有注释，那就这样...