---
layout: post
data: 2018-05-27
title: "Dijkstra算法找最短路径"
subtitle: "Use Dijkstra-algorithm to find the shortest path!"
author: "Zxy"
tags:
    - python
    - algorithm
---

> 先来看一下题目，给定一个图,利用Dijkstra算法找出给定源点到其它顶点的最短路径，也就是说单源最短路径问题。

直接上代码，代码是用python写的，注释都在里面，这里就不详细再分步进行解释了。

{% highlight python %}
import time
INF = 999
G = {
    1: {3: 10, 5: 30, 6: 100},
    2: {3: 5},
    3: {4: 50},
    4: {5: 20, 6: 10},
    5: {4: 20, 6: 60},
    6: {}}

# G = {
#     1: {2: 4, 3: 2, 4: 5},
#     2: {5: 7, 6: 5},
#     3: {6: 9},
#     4: {5: 2, 7: 7},
#     5: {8: 9},
#     6: {10: 6},
#     7: {9: 3},
#     8: {10: 7},
#     9: {10: 8},
#     10: {}}
tr = []
# for k in G.keys():
#     for i in G[k]:
#         print i,
#     print ""


def transform(list):
    global tr
    for i in list:
        if type(i) != type (3):
            transform(i)
        else:
            tr.append(i)


if __name__ == '__main__':
    begin = time.clock()
    origin = 1
    T = []
    path = [[] for i in range(len(G))]  # 构建路径二维数组
    dis = [INF for i in range(len(G))]

    # 初始化dis数组
    for i in G[origin]:
        dis[i-1] = G[origin][i]

    # 初始化源点数据
    dis[origin-1] = 0

    #初始化最小节点
    minv = origin

    T.append(minv)
    # 检验数据的正确性
    # print dis

    # 利用while循环对T进行循环，如果T中元素个数不等于G，则一直进行循环
    while len(T) != len(G):
        for i in G[minv]:
            if dis[minv-1] + G[minv][i] < dis[i-1]:
                # 对每个节点的值进行更新，通过对相连节点的值进行比较，如果小于的话，就更新dis数组的内容
                dis[i-1] = dis[minv-1] + G[minv][i]

                # 如果当前节点的值被更新了，则对当前节点的路径进行更新，通过拷贝另一个节点的最短路径加上自己本身构成新的路径
                path[i-1] = []
                path[i-1].append(path[minv-1])

        # 为了找到下一个要存入的最小节点
        Min = INF
        for j in dis:
            if dis.index(j)+1 in T:
                continue
            elif Min > j:
                Min = j
        if Min in dis:
            minv = dis.index(Min)+1

        T.append(minv)
        if len(T) == 1:
            continue
        else:
            if dis[minv-1] != INF and minv in T:
                path[minv - 1].append(minv)
    print "最小路径长度为:", dis
    print "最小路径为:"
    for i in range(0, len(path)):
        # print path[i]
        tr = []
        transform(path[i])
        tr.reverse()
        tr.append(1)
        tr.reverse()
        path[i] = tr
        print path[i]

    end = time.clock()
    print "耗费的时间为:%f s"%(end-begin)
{% endhighlight %}