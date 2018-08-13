---
layout: post
data: 2018-07-15
title: "二叉搜索树的后序遍历检测"
subtitle: "Binary search tree after sequence traversal detection"
author: "Zxy"
tags:
    - python
    - algorithm
---

> 前序：好久没有写过算法题，感觉都要荒废了，然后打算在十月份之前写够500道算法题目，差不多先把近两年出的面试题刷完吧

## 二叉搜索树的后序遍历检测

**题目：输入一个整数数组，判断该数组是不是某二叉搜索树的后序遍历的结果。如果是则输出Yes,否则输出No。假设输入的数组的任意两个数字都互不相同。**

简单来说，就是判断一个数组是不是二叉搜索树后续遍历的结果

**思路：思路很简单，先写一个二叉搜索树，然后把它后序遍历的结果写下来，去观察有着怎样的规律，我直接说我观察出来的结果：它的最后一个元素一定是整棵树的根节点的值，那么对应的，在根的前面会把整个数组划分为相连的两部分，一部分是比这个根小的一部分，另一部分是比这个根大的一部分，很显然，如果这两个部分中出现了违反这个规律的元素，那么就直接返回False，反之就是True，思路很清晰，但是里面有几个特例需要注意一下，所以算是用了枚举+递归来解这道题，题目不算很难，但调试起来很麻烦。**

{% highlight python %}
class Solution:
    p = 1

    def solve(self, left, right, root):
        if left:
            for i in left:
                if i > root:
                    self.p = 0
                    return False
        if right:
            for j in right:
                if j < root:
                    self.p = 0
                    return False

        limit = 0
        flag = 0
        if len(left) > 1:  # 处理左子树
            for i in range(0, len(left) - 1):
                if left[i] < left[-1] and left[i + 1] > left[-1]:
                    limit = i + 1
                    flag = 1
                    break
            if flag:    self.solve(left[:limit], left[limit:-1], left[-1])

        flag = 0
        if len(right) > 1:  # 处理右子树
            for i in range(0, len(right) - 1):
                if right[i] < right[-1] and right[i + 1] > right[-1]:
                    limit = i + 1
                    flag = 1
                    break
            if flag:   self.solve(right[:limit], right[limit:-1], right[-1])

    def VerifySquenceOfBST(self, sequence):
        if not sequence:
            self.p = 0
            return False

        root = sequence[-1]
        left = []
        right = []
        limit = 0
        for i in range(0, len(sequence) - 1):
            if sequence[i] < root and sequence[i + 1] > root:
                limit = i + 1
                break
        left = sequence[:limit]
        right = sequence[limit:-1]
        if limit == 0 and sequence[0] < root:
            left = right
            right = []
        self.solve(left, right, root)
        if self.p == 0: return False
        if self.p == 1: return True
{% endhighlight %}