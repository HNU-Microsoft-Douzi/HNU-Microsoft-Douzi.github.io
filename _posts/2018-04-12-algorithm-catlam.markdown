---
layout: post
title: "下厨房（算法）"
subtitle: "Catlam!"
data: 2018-04-12
author: "Zxy"
tags:
    - java
    - 算法
---

**题目描述**

牛牛想尝试一些新的料理，每个料理需要一些不同的材料，问完成所有的料理需要准备多少种不同的材料。

**输入描述：**

每个输入包含 1 个测试用例。每个测试用例的第 i 行，表示完成第 i 件料理需要哪些材料，各个材料用空格隔开，输入只包含大写英文字母和空格，输入文件不超过 50 行，每一行不超过 50 个字符。

**输出描述**

输出一行一个数字表示完成所有料理需要多少种不同的材料。

**示例1**

输入:

`BUTTER FLOUR`

`HONEY FLOUR EGG`

输出:

`4`

先附上自己的代码:

{% highlight java %}
import java.util.HashSet;
import java.util.Scanner;

public class Main{
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        HashSet<String> set = new HashSet<String>();
        while(sc.hasNext()){
            String str = sc.nextLine();
            String arr[] = str.split(" ");
            for(String i:arr){
                set.add(i);
            }
        }
        System.out.println(set.size());
        set.clear();
    }
}
{% endhighlight %}

下面来说一下思路，这道题目最难的点有两个，一个是没有告诉什么时候结束，也就是结束是由人为判断的。

所以这里用`Scanner.class.hasNext()`函数来进行判断，该函数返回boolean类型的值，当键盘手动输入结束时才会返回false，window环境下使用ctrl + z结束输入循环，linux环境下使用ctrl + d结束输入循环。

第二个难点，就是数据的去重处理，这里直接使用了HashSet进行操作。

为了使用哈希集合，我们需要先创建一个哈希集合的对象:

`HashSet<String> set = new HashSet<String>();`

有了这个对象，我们就可以用通过set调用一些内置的方法属性，比如集合的添加.add()和集合的大小.size()，直接ac这道水题。