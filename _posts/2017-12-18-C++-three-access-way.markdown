---
layout: 	post
title: 		"C++三种访问关键词的区别"
subtitle: 	"C++ 3 different access keywords"
data: 		2017-12-18 00:00:00
author: 	"Zxy"
tags:
    - C++
---

## 三种访问关键词的区别

在c++中，类是`C++`在`C`的范畴上新增的特性，在类(`class`)中，通过访问关键词来限制数据成员的访问方式，其中，在类的继承中，对于访问限制的要求比较严禁。


* public
* protected
* private


{% highlight c++ %}
class Shape 
{
	public:
	   void setWidth(int w)
	   {
	      width = w;
	   }
    protected:
	   void setHeight(int h)
	   {
	      height = h;
	   }
	private:
	   int width;
	   int height;
}
{% endhighlight %}

### 对于如上的简单图形类，我们分别对三个关键词进行讨论:
- public:
  public:公有，在类本身、继承类和实例中均可进行调用。



- protected:
  protected:保护，只能在类和其继承类中调用。

- private:
 private:私有，只能在类本身中调用。
