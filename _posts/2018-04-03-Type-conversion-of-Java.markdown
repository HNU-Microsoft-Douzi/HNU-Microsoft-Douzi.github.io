---
layout: post
title: "Java的String和Int类型的相互转换"
subtitle: "Type conversion of Java"
data: 2018-04-03
author: "Zxy"
tags:
    - Java
---

### String转换为int

**你需要知道，不是什么字符串都可以转换为整形的。**

java不允许你随意转换任意的字符串为整形，你可以转换的只有全部由字符'0'-'9'构成的字符串，其余的若是要进行转换，那么必须抛出一个异常。
<br>
{% highlight java %}
String i;
number = Integer.parseInt(i);
{% endhighlight %}
<br>

所以你在使用上述代码将字符串装箱Integer中并转成int时，会报错，因为你没有在所在函数体后扔出一个异常，那么只要在你的函数体后面加上一个`throws IOException`就可以解决问题。

同样需要注意的是，当你的主函数中用了一个需要被扔出异常的函数时，你必须在主函数后面也同样抛出这个异常，这是java为了安全默认设置的模式，不这样设置的话，程序会无法跑动。

### int转String

总共有三种方法：


`String.valueOf(int i);`

`Integer.toString(int i);`

`i+""`

前两种都好理解，无非是String和Integer两种箱内方法的调用，对于第三种方法，这里牵扯到string的一些基本尝试，在int+string类型时，java会默认把int转化为string类型在加上后面的空，实际上后面的""就是相当于一个标识符，为了告诉java，我现在要做这个类型的转换，剩下的步骤都交给java完成。