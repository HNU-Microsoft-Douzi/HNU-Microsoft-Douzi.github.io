---
layout: post
data: 2018-04-22
title: "gdb反汇编调试"
subtitle: "Debugging with GDB disas!"
author: "Zxy"
tags:
    - Linux
---

**在利用gdb调试的时候，我们发现，有时可以通过查看它的汇编代码进行汇编级别的调试，并通过观察寄存器内值的变化来推测机器内部层次的操作，更好的理解程序在机器内部的运行，这里就给出gdb上查看汇编代码的手段。**

`(gdb) disas main`用来查看main函数的汇编代码，这个时候没有加任何的参数，显示出来就是单纯的main函数全部的汇编代码。

`(gdb) disas /m main`依旧用来查看main函数的汇编代码，但是这个时候会将所有的代码也一起映照到上层，推荐这种写法。

通过b设置完断点以后，通过r开始运行，当运行到第一个断点停止的时候，利用`display /i $pc`指令进行设置

`(gdb) si`通过si指令单步跟踪一条机器指令

`(gdb) i r`使用i r指令查看所有寄存器的值

使用x/na %esp查看堆栈的变化。