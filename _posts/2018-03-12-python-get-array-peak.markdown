---
layout: post
title: "求数组峰值的算法"
subtitle: "Using algorithm to get the peak of array!"
data: 2018-03-10
author: "Zxy"
tags:
    - python
    - algorithm
---

在峰值求解问题当中，我们知道数组的峰值有且有不止一个，那么取得其中之一便是我们要拿到的结果。

如何在保证最小时间复杂度的情况下求出其中任意一个峰值呢，先看第一种O(n)的写法：

{% highlight python %}
int find_Peak1(vector<int> A) {  
    // write your code here  
    for(int i = 1; i < A.size()-1; i++){  
        if(A[i] > A[i-1] && A[i] > A[i+1]){  
            return i;  
        }  
    }  
    return -1;  
}  
{% endhighlight %}

这是已知的时间复杂度代价最大的算法，对每个元素进行遍历，那么时间复杂度便是O(n)，但是好处是这样可以求出所有的峰值。

第二种写法，如何在保证时间代价最小的情况下求出峰值呢：
{% highlight python %}
int find_pink(int a[])
{
	if(a.size() < 3) return -1;//如果输入数组的元素个数小于3的话，此时不存在一个峰值
	else
	{
		int start = 0;
		int end = a.size() - 1;
		while(start <= end)
		{
			int middle = start + (end - start) / 2;
			if(a[middle] < a[middle-1]) end = middle - 1;
			else if(a[middle] > a[middle+1]) start = middle + 1;
			else
			{
				return middle;
			}
		}	
	} 
}
{% endhighlight %}

这种写法叫做二分法，通过二分法将所求数组范围不断折半，然后得到峰值的时间复杂度只有（logn），这是求峰值最节省时间开销的算法，但是相对上面一种，代价是显而易见的，它没有遍历完所有的元素，目的只有一个，求出任一峰值，所以它不能得到所有的峰值结果。

> 换而言之的话，算法都是相对的，不是说哪种好哪种坏，要根据实际的情况具体进行选择。