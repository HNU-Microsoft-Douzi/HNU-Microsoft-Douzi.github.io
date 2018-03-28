---
layout: post
data: 2018-03-27
title: "java的输入"
subtitle: "How to input like c++/python in java?"
author: "Zxy"
tags:
    - Java
---

在`java`中，我们并不能找到一个直接的函数实现我们的输入操作，这一点比起`c++、python`来都不是很方便，想了一下，大概是因为`java`始终秉持对象的思想，所以它的输入模式也以对象的方式呈现。

总共有三种方式，我个人认为没有必要都掌握，熟记一种就好了，然后，自我感觉这种比较简单，就简单说下这种模式的输入。

下面先给出一个实例程序,写了一个学生成绩类:

{% highlight java %}
import java.util.Scanner;
public class input_test {
	public static void main(String[] args){
		Scanner sc = new Scanner(System.in);
		System.out.println("请输入你的名字：");
		String name = sc.nextLine();
		System.out.println("请输入你的数学成绩：");
		int math = sc.nextInt();
		System.out.println("请输入你的语文成绩:");
		int chinese = sc.nextInt();
		System.out.println("请输入你自认为的加权平均成绩:");
		float face = sc.nextFloat();
		System.out.println("实际加权平均数为:"+(math + chinese)/2);
		
	}
}
{% endhighlight %}

这里我们用到了`Scanner`这个对象，它的使用要请求到`java.util.Scanner`这个包，然后在主函数中用`Scanner`申请一个对象，这个对象我们可以把它简单的看成输入的对象，它内部封装了我们要用到的所有的输入函数，比如`nextLine()、nextInt()、nextFloat()`等，用这个对象可以实现我们的输入操作。