---
title: "Android之Fragment的嵌套和切换"
subtitle: "Nesting and toggling of Android Fragment"
layout: post
data: 2018-08-15
author: "Zxy"
tags:
    - android
---

实际开发中，往往要应用到Fragment，而一旦涉及到Fragment的话，就不能离得开Fragment的管理，先说下它常见的两种管理对象。

- getFragmentManager()
- getChildFragmentManager()

实际上还有一个对象叫做getSupportFragment()，但是在Android的3.0的版本之后，就用getFragmentManager()来完全代替了。

而getFragmentManager()本身是用来得到所在fragment的父容器的管理器。

而getChildFragmentManager()本身是用来得到Fragment的子容器的管理器，**也就是说，getchildFragemtnManager()是用来做Fragment的嵌套管理对象使用的。**

先说下应用的场景：

通常，我们使用一个app会有侧滑栏的效果，侧滑栏会对应一个菜单栏，菜单栏中的每一个对象进行点击都会跳转到一个相应的页面，这些页面实际上就是单独的一个Fragment。

这个时候，我们通常不用activity来做跳转后的页面，因为那很不方便并且不好管理，而使用Fragment恰好解决了这一问题，我们只需要用父Fragment来嵌套子的Fragment,然后用菜单栏的对象点击实现父Fragment的关联，就可以很好的实现这样一个需求的效果。

下面来看一下步骤：

1. 我们需要在我们的layout布局中新建几个fragment的实例布局内容，如下图:

   ![](/assets/fragment_1.png)

2. 下面是其中一个fragment的内容：

{% highlight java %}	
<?xml version="1.0" encoding="utf-8"?>
<android.support.constraint.ConstraintLayout
    xmlns:android="http://schemas.android.com/apk/res/android" android:layout_width="match_parent"
    android:layout_height="match_parent">
    <TextView
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:gravity="center"
        android:text="这里是第二个fragment的内容"/>
</android.support.constraint.ConstraintLayout>
{% endhighlight %}

3. 相应的，我们要有一个父的Fragment内容来承载所有的子Fragment，这里实际上没有在布局中调用<fragment/>，因为我们会在适配器中对父Fragent内容中的ViewPager进行适配，使每个ViewPager的页面都是一个子的fragemnt，等会来看代码。

这里先给出这个父的Fragment的内容：

{% highlight java %}	
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical">

    <View
        android:id="@+id/div_tab_bar"
        android:layout_width="match_parent"
        android:layout_height="2dp"
        android:layout_above="@id/rg_tab_bar"
        android:background="@color/div_white"/>

    <android.support.v4.view.ViewPager
        android:id="@+id/vp"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:layout_above="@id/div_tab_bar"/>

    <RadioGroup
        android:id="@+id/rg_tab_bar"
        android:layout_width="match_parent"
        android:layout_height="56dp"
        android:background="#fff"
        android:layout_alignParentBottom="true"
        android:orientation="horizontal">
        <RadioButton
            android:id="@+id/rb_moon"
            style="@style/tab_menu_item"
            android:drawableTop="@drawable/tab_menu_moon"
            android:text="@string/tab_menu_moon" />

        <RadioButton
            android:id="@+id/rb_pet"
            style="@style/tab_menu_item"
            android:drawableTop="@drawable/tab_menu_pet"
            android:text="@string/tab_menu_pet" />

        <RadioButton
            android:id="@+id/rb_heart"
            style="@style/tab_menu_item"
            android:drawableTop="@drawable/tab_menu_heart"
            android:text="@string/tab_menu_heart" />

        <RadioButton
            android:id="@+id/rb_me"
            style="@style/tab_menu_item"
            android:drawableTop="@drawable/tab_menu_me"
            android:text="@string/tab_menu_me" />
    </RadioGroup>

</RelativeLayout>
{% endhighlight %}

4. 有了父的fragment的内容，我们该怎样进行调用呢？我们必须在这个侧滑栏的主页面中进行父Fragment内容的调用，那么as本身提供了一个很好的侧滑栏模版，它的layout中有一个布局对象是`app_bar_main`，在这个布局当中，它使用include来包含我们的这个父Fragment，记住这个调用的位置，在我们的Fragment切换中，会起到很大的作用。

所以，这里给出这个<include>的内容：

{% highlight java %}	
<include
        android:id="@+id/main_content"
        layout="@layout/content_main" />
{% endhighlight %}

记住侧滑栏第一个菜单项关联的父Fragment的调用位置:
	
	`app_bar_main中的id:main_content`

5. 布局的内容处理完了，我们就该处理java中的代码逻辑了。

   我们首先需要四个子类Fragment的类，一个父Fragment的类，和一个适配器（用来适配四个Fragment嵌套于父Fragment当中）。

   布局结构如下：

   ![](/assets/fragment_2.png)

6. 子fragment的内容很简单，这里贴出来一个:

{% highlight java %}	
package com.example.administrator.moonstep.main_first_page_fragment;

import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.example.administrator.moonstep.R;

public class First_MainPage_Fragment1 extends Fragment {
    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        return inflater.inflate(R.layout.fg_main_first_subpage1,null);
    }
}

{% endhighlight %}

7. 父Fragment用来承载四个子的fragment，看一下它的内容是怎样：

{% highlight java %}	
package com.example.administrator.moonstep.main_first_page_fragment;

import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.support.v4.view.ViewPager;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.RadioButton;
import android.widget.RadioGroup;

import com.example.administrator.moonstep.R;

public class First_MainPage_Fragment_Parent extends Fragment {
    private View view;
    private ViewPager viewPager;
    private RadioGroup rg_tab_bar;
    private RadioButton rb_moon;
    private RadioButton rb_pet;
    private RadioButton rb_heart;
    private RadioButton rb_me;
    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        view = inflater.inflate(R.layout.content_main, container, false);
        initView();
        return view;
    }

    @Override
    public void onActivityCreated(@Nullable Bundle savedInstanceState) {
        super.onActivityCreated(savedInstanceState);
        initDate();
    }

    public void initView(){
        viewPager = view.findViewById(R.id.vp);
        rg_tab_bar = view.findViewById(R.id.rg_tab_bar);
        rb_moon = view.findViewById(R.id.rb_moon);
        rb_pet = view.findViewById(R.id.rb_pet);
        rb_heart = view.findViewById(R.id.rb_heart);
        rb_me = view.findViewById(R.id.rb_me);
        viewPager.setCurrentItem(0);
    }

    public void initDate(){
        //通过getChildFragment得到子容器的管理器，实现Fragment的嵌套
        First_Main_Page_Adapter mAdapter = new First_Main_Page_Adapter(getChildFragmentManager());
        viewPager.setAdapter(mAdapter);
        rb_moon.setChecked(true);
        rg_tab_bar.setOnCheckedChangeListener(new RadioGroup.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(RadioGroup radioGroup, int id) {
                switch(id){
                    case R.id.rb_moon:
                        viewPager.setCurrentItem(0);
                        break;
                    case R.id.rb_pet:
                        viewPager.setCurrentItem(1);
                        break;
                    case R.id.rb_heart:
                        viewPager.setCurrentItem(2);
                        break;
                    case R.id.rb_me:
                        viewPager.setCurrentItem(3);
                        break;
                }
            }
        });
    }
}

{% endhighlight %}

对，我们在父Fragment中直接完成了子Fragment和适配器的关联，让这个父Fragment和子fragment不分彼此，然后我调用了GroupRadio，在父Fragemnt中实现了Button切换效果的优化。

8. 然后，就是适配器的写法：

{% highlight java %}	
package com.example.administrator.moonstep.main_first_page_fragment;

import android.support.annotation.NonNull;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentPagerAdapter;
import android.view.ViewGroup;

public class First_Main_Page_Adapter extends FragmentPagerAdapter {
    private final int PAGER_COUNT = 4;
    private First_MainPage_Fragment1 myFragment1 = null;
    private First_MainPage_Fragment2 myFragment2 = null;
    private First_MainPage_Fragment3 myFragment3 = null;
    private First_MainPage_Fragment4 myFragment4 = null;

    public First_Main_Page_Adapter(FragmentManager fm){
        super(fm);
        myFragment1 = new First_MainPage_Fragment1();
        myFragment2 = new First_MainPage_Fragment2();
        myFragment3 = new First_MainPage_Fragment3();
        myFragment4 = new First_MainPage_Fragment4();
    }

    @Override
    public int getCount() {
        return PAGER_COUNT;
    }

    @Override
    public Object instantiateItem(ViewGroup container, int position) {
        return super.instantiateItem(container, position);
    }

    @Override
    public void destroyItem(ViewGroup container, int position, Object object) {
        System.out.println("position Destroy" + position);
        super.destroyItem(container, position, object);
    }

    @Override
    public Fragment getItem(int position) {
        Fragment fragment = null;
        switch(position){
            case 0:
                fragment = myFragment1;
                break;
            case 1:
                fragment = myFragment2;
                break;
            case 2:
                fragment = myFragment3;
                break;
            case 3:
                fragment = myFragment4;
                break;
        }
        return fragment;
    }
}

{% endhighlight %}

9. 最重要也是最后的一步，我们要在我们的主activity中实现父Fragment之间的切换，我们需要用到getSupportFragmentManager()的一些属性方法：

为了方便起见，我们直接用一个函数来封装一下：

{% highlight java %}
    private void addFragmentToStack(Fragment fragment){
        getSupportFragmentManager().beginTransaction().replace(R.id.main_content, fragment).commit();
    }
{% endhighlight %}

使用的时候直接进行调用就可以了，我们穿进去的参数，就是我们要替换的父Fragment，注意使用的时候，不要忘了在末尾添加commit()方法。