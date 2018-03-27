---
layout: post
title: "huffman编码"
subtitle: "Huffman encoding tree!"
data: 2018-01-18
author: "Zxy"
tags:
    - C++
    - 数据结构
---
## 一、huffman编码树概述
huffman编码是一种可变长编码<span style="color:green">（`VLC：variable length coding`）</span>方式，于1952年由huffman提出。依据字符在需要编码文件中出现的概率提供对字符的唯一编码，并且保证了可变编码的平均编码最短，被称为最优二叉树，有时又称为最佳编码。

## 二、如何构造一颗huffman编码树
### 构造huffman树的哈夫曼算法如下：
* （1）n节点的权值`｛w1、w2、·····，wn｝`构成n棵二叉树集合`F=｛T1，T2，···，Tn｝`，每棵二叉树Ti只有一个带权为Wi的根节点，左右孩子均空。
* （2）在F中选取两棵根节点权值最小的作为树的左右孩子构造一棵新的二叉树，且置根节点的权值为左右孩子权值之和，在F中删除这两棵树，新二叉树之于F中.
* （3）重复（2），直到F中只有一棵树为止，这棵树就是huffman树。

上面就是以abcd四个节点构造huffman树的过程。

下面给出示例图：

<img src="/assets/huffman编码树构建图.png">

如果要得到相应的huffman编码只需要在每个节点的左右子树上分别标0和1就可以了。
> （如果还有不明白的，请自行去面壁~）