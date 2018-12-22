---
layout: post
title: "Java的map集合中的TreeMap的使用demo"
subtitle: "Demo of the use of TreeMap in Java's map collection"
data: 2018-07-26
author: "Zxy"
tags:
    - java
---

Java的map集合本身是一个键-键值的关系组合，而Collections中的map子类更是封装了不同属性的map框架。

然后主要有三种：Hashtable, HashMap, TreeMap。

这三种类型的特点分别如下：

	Hashtable:底层是哈希表数据结构，不可以存入null键null值，该集合是线程同步的。jdk1.0，效率低。
	
	HashMap:底层是哈希表的数据结构，允许使用null键和null值，该集合是不同步的。Jdk1.2.效率高。
	
	TreeMap:底层是二叉树的数据结构。线程不同步，可以用与给map集合中的键进行排序。

也就是说Hashtable仅仅作为过去时代的一个替代品，用作了解就好，因为它的效率过低，足以被替代。

HashMap的底层由于使用的是哈希表的数据结构，所以它的集合本质上存入堆中的数据类型是哈希值。

而TreeMap的使用则较为普遍了，因为它本身有了排序的属性，对于可供排序的方法，会直接按照递增序进行排序，这是它的使用非常普遍。

这里先给出HashMap的官方方法的说明:

![](/assets/HashMap0.png)

![](/assets/HashMap1.png)

![](/assets/HashMap2.png)

后面有几个图片长度不够了就没有截到，不过记住有一个size()方法来取得里面元素的数量就可以了。

下面给出这个demo:

* 题目要求：给出一个任意的字符串，将这个字符串进行排序，并计算每个元素重复出现的个数。

* 方式：HashMap

{% highlight java %}

import java.util.*;

public class Set_Sort{
	
	public static void main(String[] args) {
		Sort("aacbcdeefacd");
	}
	
	public static void Sort(String str) {
		char[] arr = str.toCharArray();
		
		TreeMap<Character, Integer> im = new TreeMap<Character, Integer>();
		
		for(int i = 0; i < arr.length; i++ ) {
			Integer value = im.get(arr[i]);
			
			if(value == null) {
				im.put(arr[i], 1);
			}
			else {
				im.put(arr[i], im.get(arr[i]) + 1);
			}
		}
		
		System.out.print(im);//打印一下
	}
}

{% endhighlight %}

需要注意的就是一个TreeMap的使用，它的泛型类型必须是箱装类型，不能是箱类的子类，不然会报编译错误。

这是结果：

{% highlight java %}
{a=3, b=1, c=3, d=2, e=2, f=1}
{% endhighlight %}