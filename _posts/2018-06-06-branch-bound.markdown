---
layout: post
title: "分支限界法实验（单源最短路径）python实现"
subtitle: "Branch bound method"
data: 2018-06-06
author: "Zxy"
tags:
    - python
    - algorithm
---

## 问题描述

给定下列所示有向图，利用分支限界法的思想，计算并输出其单源最短路径。

![](/assetc/branch_bound_0.png)

如上图所示，给出一个单源有向图，要找出其中由节点1到节点10的最短距离和路径。

![](/assets/branch_bound_1.png)

{% highlight python %}
#!usr/bin/env python
# _*_coding: UTF-8 _*_

INF = 999               # 无穷远
MIN = 0                 # 最短路径的值
origin = 1              # 源点
final = 10              # 终点
G = {
    1: {2:4, 3:2, 4:5},
    2: {5:7, 6:5},
    3: {6:9},
    4: {5:2, 7:7},
    5: {8:4},
    6: {10:6},
    7: {9:3},
    8: {10:7},
    9: {10:8},
    10: {}
}

short = {               # 用来标示源点到任意节点的最短路径内容
    1: INF,
    2: INF,
    3: INF,
    4: INF,
    5: INF,
    6: INF,
    7: INF,
    8: INF,
    9: INF,
    10: INF
}

if __name__ == '__main__':
    list = []                                 # 用来存储每个节点的扩展节点
    flag = [0 for i in range(1, len(G) + 1)]  # 用来标记树的删除位置，对于冲突的情况，需要对相应的子节点找到上一次的写入位置将其删除

    if origin not in G.keys():
        print "输入的数据非法，请重新输入!"
        exit()

    tree = [[] for i in range(len(G))]

    for i in G[origin]:# 初始化：向list中加入源点的相连点
        list.append(i)
        short[i] = G[origin][i]
        tree[origin-1].append(i)
        flag[i-1] = origin

    # print flag # 检验flag的正确性

    while list != []:                        # 当列表不为空的话就一直持续循环直到列表为空
        cnode = list[0]                      # 用来表示当前处理的节点
        del list[0]                          #把当前要处理的节点进行删除
        child_nodes = G[cnode].keys()        #预备对list进行更新
        for i in child_nodes:
            if i not in list:
                list.append(i)
                tree[cnode - 1].append(i)
                flag[i-1] = cnode            #对flag赋值为当前节点的子节点
                if G[cnode][i] + short[cnode] < short[i]:
                      short[i] = G[cnode][i] + short[cnode]  # 初始化short中的数据，只有当对应节点不存在于list列表中的时候，就让short的对应节点值等于当前距离
            else:
                if G[cnode][i] + short[cnode] > short[i]:
                    pass
                else:
                    short[i] = G[cnode][i] + short[cnode]    # 更新最短路径中的内容
                    temp = flag[i-1]                         # 找到冲突节点的上一个节点，比如说有两个6，第二个6的距离比较大，然后第二个6的上层节点是3，所以就删除3下的6这个节点
                    del tree[temp-1][tree[temp-1].index(i)]
                    tree[cnode - 1].append(i)

    MIN = short[final]
    for i in range(len(tree)):      # 如果最后一个节点存在的话，对最后一个节点的删除
        for j in tree[i]:
            if j == final:
                if short[i+1]+G[i+1][final] != MIN:
                    del tree[i][tree[i].index(final)]
    # print tree                    # 用来查看路径树的变化

    print "图本身为:",G
    print "最短路径为:",short

    path = []
    while 1:
        for i in range(len(tree)):  # 对最后一个节点的删除
            for j in tree[i]:
                if j == final:
                    path.append(i+1)
                    final = i+1
                    if final == origin:
                        path.reverse()
                        print "最短路径为:",path  # 一旦存储完成，找到结束条件，立刻强制终止程序以终止while循环
                        exit(0)
{% endhighlight %}

过程比较复杂，代码中都做了详细的解释，对于分支限界法百度上有详细的解释，这里不再提及，但是网上没有关于该算法求单源最短路径的`python`代码，所以这里顺便补充一下。

程序可能存在某些bug，没有用更多的特殊数据进行验证，如果使用的话，发现bug请自行更正，程序逻辑绝对没有问题，如果出现结果与预期结果不符的情况，可能是代码中有些细节出了问题，还是那句话，请自行`debug`。

