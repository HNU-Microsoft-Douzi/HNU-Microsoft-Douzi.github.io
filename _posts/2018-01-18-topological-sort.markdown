---
layout: post
title: "拓扑排序"
subtitle: "The topological sort"
data: 2018-01-18
author: "Zxy"
tags:
    - C++
    - 数据结构
---
## 拓扑排序概述
需要注意的是，拓扑排序只适用于有向无环图（`DA`G），而非`DAG`图则没有拓扑排序这一说。

拓扑排序有以下两个条件:

1. 每个顶点出现且只出现一次。
2. 若存在一条从顶点 A 到顶点 B 的路径，那么在序列中顶点 A 出现在顶点 B 的前面。
> (通常来讲，一个有向无环图可以有一个或多个拓扑排序序列)

## 拓扑排序流程图：
<img src="/assets/topological1.png">

①如图，第一步先找到没有前驱的节点，发现V5正好满足条件，于是有:

拓扑序列：V5

<img src="/assets/topological2.png">

②，将与顶点V5相连的边全部删除，然后继续寻找第二个没有前驱的节点，发现V1满足条件，于是有:

拓扑序列：V5->V1

<img src="/assets/topological3.png">

③重复步骤②<br>拓扑序列：V5->V1->V4

<img src="/assets/topological4.png">

④重复步骤②<br>拓扑序列：V5->V1->V4->V2

<img src="/assets/topological5.png">

⑤直到最后一步将剩下的一个节点取出加入到拓扑序列的后一位，有向五环图的拓扑排序算法便结束了。

拓扑序列：V5->V1->V4->V2->V3
