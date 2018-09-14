---
title: "Button中的OnClick属性踩坑"
subtitle: "The OnClick attribute in Button is the footer"
layout: post
data: 2018-08-08
author: "Zxy"
tags:
    - android
---

**背景：使用ViewPager设置项目引导页，在第五个页面需要设置一个Button来实现点击进入的效果。**

由于这第五个引导页面并不是我们写的activity关联的layout，所以我们不能直接使用findViewById()来直接查找这个Button的id。

第二种方法呢，我们会想到通过IntentLayout来构建一个intentLayout对象，但是很遗憾这种方法也不行，和上一章的博客内容一样，因为你确定的是你布局中的第五个页面，而不是你实际显示的第五个页面，两者完全相同，但环境不同，所以你无法确定到实际的button中，无法构建事件监听的方法。

最后一种方法，在Button中设置OnClick()属性，通过其中的属性值来确定这个Button的位置，然后在我们的activity中，直接重写这个值的方法，就可以确定这个Button的位置。

但是需要注意的一点是，这里有个很容易踩到的坑：当我们从第四个页面进入第五个页面的瞬间，页面会发生跳转，这是因为重写OnClick中的属性方法，默认会执行一次点击操作，你可以用Toast来观察，所以我们用一个Boolean的标记为来忽略第一次系统默认的点击操作。

代码如下：

布局文件中的`ImageButton`组件：

{% highlight java %}
<ImageButton
            android:id="@+id/image_button"
            android:layout_width="150dp"
            android:layout_height="150dp"
            android:layout_gravity="center"
            android:scaleType="fitXY"
            android:onClick="buttonListener"
            android:contentDescription="@string/contentDescription"
            android:background="@drawable/image_button_background" />
{% endhighlight %}

重写的OnClick属性方法：

{% highlight java %}
    public void buttonListener(View v){
        if(button_is_clicked){
            jumpLoginActivity();
        }
        button_is_clicked = true;
    }
{% endhighlight %}

构建的`Boolean`标记位：

`private Boolean button_is_clicked = false;`