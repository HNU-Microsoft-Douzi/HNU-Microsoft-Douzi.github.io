---
layout: post
data: 2018-05-27
title: "八皇后问题（经典回溯算法）"
subtitle: "The eight queens problem is solved by backtracking algorithm"
author: "Zxy"
tags:
    - Python
    - algorithm
---

对于八皇后问题的描述如图：

<img src="eight_queen_0.jpg">

总共有八乘八为六十四个空格的棋盘，总共放置八个皇后棋子，国际象棋中，"皇后"作为最强大的棋子，她可以吃掉横行、竖行甚至斜行的棋子，所以如果我们想让一个棋盘上摆满八个皇后的话，总共有多少种摆法？给出所有的解的情况。

代码如下：

{% highlight python %}
n = 8
total = 0
c = [0 for i in range(n)]


def is_ok(row):
    global c
    for j in range(0, 10):
        if j == row:
            break
        else:
            # 对之前所有的位置皇后进行判断，横竖的和斜的不能放
            if c[row] == c[j] or row - c[row] == j-c[j] or row + c[row] == j + c[j]:
                return False
    return True


def queen(row):
    global c
    global n
    global total
    if row == n:
        # 没满足一次情况，就进行输出一次
        total += 1
        for i in c:
            print i, "",
        print ""
    else:
        for col in range(10):
            if col == n:
                break
            else:
                # 没行皇后从0开始递增，然后进行判断可以不可以，可以的话就存进去，不行的话就下一个
                c[row] = col
                if is_ok(row):
                    queen(row+1)


if __name__ == '__main__':
    # 从第0行0列开始
    queen(0)
    print total
{% endhighlight %}

对于八皇后问题，解决方案就是利用递归实现回溯。

对于每个皇后棋子，都从对应行的首位置开始向后递增，并且对所有的棋子进行一个判断，当前位置是否可以放置棋子，如果可以放置棋子，就让对应位置有一个值表示该位置皇后在位。

那么当我们的标记为等同于n的时候，对所有皇后棋子的位置进行一次输出，并让一个count计数进行加加。

若是当前位置不能进行放置的话，就让皇后棋子去下一个位置试，如果对于当前节点下的所有皇后都不能放置的话，就通过递归返回到上一层让让一层的皇后再跳到下一个位置去尝试，如此循环。
