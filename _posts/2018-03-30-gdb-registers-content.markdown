---
layout: post
data: 2018-03-30
title: "gdb编译查看寄存器内容"
subtitle: "How to use gdb know the register's content!"
author: "Zxy"
tags:
    - Linux
---
## 查看寄存器的值

`gdb`支持查看被调试进程当前常用寄存器的值，命令如下：

{% highlight sql %}
(gdb)info registers[REGISTER]
{% endhighlight %}

如果不加任何参数，则显示所有寄存器的值。如果只想看某个寄存器的值，则可以在参数中指定。

例如：

{% highlight sql %}
(gdb)info registers#查看当前所有寄存器当前的值
(gdb)info registers pc#只查看PC寄存器当前的值
{% endhighlight %}

前面的命令只会显示常用的寄存器值，而如果想查看所有寄存器的值（包括浮点寄存器），则用如下命令：

{% highlight sql %}
(gdb)info all-registers
{% endhighlight %}

同样可以使用print命令来访问寄存器的情况，只需要在寄存器名字前加一个$符号就可以了。

{% highlight sql %}
(gdb)print $REGISTER
{% endhighlight %}

例如：

{% highlight sql %}
(gdb)print $pc#同样查看PC寄存器当前的值
{% endhighlight %}
