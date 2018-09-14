---
title: "NavigationView的子布局中的setText()无效问题"
subtitle: "SetText () in the NavigationView's sublayout is invalid"
layout: post
data: 2018-08-06
author: "Zxy"
tags:
    - android
---

NavigationView作为DrawableView中重要的左侧滑栏，也就是三部分中的第二部分，也不是说非必须使用NavigationView，而是使用Fragment也可以，然后这里使用NavigationView的时候会出现一点问题。

{% highlight java %}
    <android.support.design.widget.NavigationView
        android:id="@+id/nav_view"
        android:layout_width="wrap_content"
        android:layout_height="match_parent"
        android:layout_gravity="start"
        android:fitsSystemWindows="true"
        app:headerLayout="@layout/nav_header_main"
        app:menu="@menu/activity_main_drawer" />
{% endhighlight %}

{% highlight java %}
    <LinearLayout
        android:id="@+id/user_inf_text"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_gravity="center"
        android:orientation="vertical">
        <TextView
            android:id="@+id/name"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:paddingTop="@dimen/nav_header_vertical_spacing"
            android:text="@string/nav_header_title"
            android:textAppearance="@style/TextAppearance.AppCompat.Body1" />

        <TextView
            android:id="@+id/race"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="@string/nav_header_subtitle" />
    </LinearLayout>
{% endhighlight %}

如上述代码所述，如果我想要改变NavigationView中的nav_header_main中的TextView属性，该怎么办呢？

这似乎听起来不想一个高深度的问题。

我们通常直接在UI主线程中进行更新，或者通过子线程向Handler的对象传递Message消息的方式来更新UI，但是这些都不重要，重要的是你需要明白，这不是一个简单布局，而是多重布局复合而成的一个单一的Activity，如此一来，必须要指定实例的布局才行。

我们一般会通过LayoutInflater来创建一个对象来直接关联layout布局nav_header_main，然而如下:

{% highlight java %}
LayoutInflater inflater = (LayoutInflater)getSystemService(Context.LAYOUT_INFLATER_SERVICE);
nav_header_main = inflater.inflate(R.layout.nav_header_main,(LinearLayout)findViewById(R.id.user_inf_text));(R.id.nav_view);
name = (TextView)nav_header_main.findViewById(R.id.name);
race = (TextView)nav_header_main.findViewById(R.id.race);
{% endhighlight %}

你觉得这样可以吗？

答案是：**不能**

因为通过这种方式不能让TextView发生实际性的改变。

不论在AS中怎样进行调试，它实际上输出的内容的确是改变以后的值，但为什么这样不行呢？猜想应该是AS内部对于布局的调用机制有关，这种方法直接调用了一个未曾与主Activity关联的无关布局，所有属性全部存在，可以设置，但是实际上不是显示在真机上的nav_header_main，也就是说此非彼。

**那么想要找到与主Activity关联的nav_header_main怎么办呢？**

方法如下：
{% highlight java %}
NavigationView navigationView = findViewById(R.id.nav_view);
View nav_header_main = navigationView.getHeaderView(0);
{% endhighlight %}

直接在主布局中调用NavigationView本身的方法可以建立关联，实现setText()的作用。