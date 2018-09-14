---
title: "Android之在Fragment中溢出式菜单和三点菜单同时出现问题"
subtitle: "Android has a problem in both the spillover and three-point menus at Fragment"
layout: post
data: 2018-08-28
author: "Zxy"
tags:
    - android
---

我们有时会碰到这样一种场景：在fragment中需要使用到toolbar来设置标题栏，但是我们fragment所在的activity却不能有这个标题栏，因此我们就要自定义标题栏了。

我们通常会在layout中声明一个toolbar.xml：
{% highlight java %}
<android.support.v7.widget.Toolbar xmlns:android="http://schemas.android.com/apk/res/android"
        xmlns:app="http://schemas.android.com/apk/res-auto"
        android:id="@+id/toolbar"
        app:theme="@style/ThemeOverlay.AppCompat.ActionBar"
        android:layout_width="match_parent"
        android:layout_height="58dp"
        android:minHeight="50dp"
        android:elevation="20dp"
        android:layout_alignParentTop="true">
        <com.example.administrator.moonstep.custom_textView.CustomTextView
            android:id="@+id/titleName"
            android:layout_width="wrap_content"
            android:layout_height="match_parent"
            android:text="荣誉称号"
            android:layout_gravity="center"
            android:gravity="center"
            android:textColor="@color/white"
            android:textSize="20sp"/>
    </android.support.v7.widget.Toolbar>
{% endhighlight %}

然后我们还需要设置一个context_menu.xml：

{% highlight java %}
<menu xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto">

    <item
        android:id="@+id/context_menu"
        android:title="@string/click_back"
        android:icon="@drawable/settings_button"
        android:orderInCategory="100"
        app:showAsAction="always"/>
</menu>

{% endhighlight %}

然后我们就要在我们的fragment中进行toolbar的初始化了：

{% highlight java %}

    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        mActivity = this.getActivity();
        setHasOptionsMenu(true);//在Fragment要想让onCreateOptionsMenu生效必须先调用setHasOptionsMenu的方法
    }

{% endhighlight %}

**这里最重要的一点是要想在fragment中使onCreateOptionsMenu方法生效的话，必须先在onCreate()方法中设置setHasOptionsMenu(true)的方法**

{% highlight java %}

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        initView();
    }

 	@SuppressLint("ClickableViewAccessibility")
    public void initView() {
        initToolbar();
        initMenuFragment();
	｝
{% endhighlight %}

然后要对我们的Toolbar和菜单栏进行初始化。

{% highlight java %}
private void initToolbar() {
        Toolbar mToolbar = view.findViewById(R.id.toolbar);
        TextView mToolBarTextView = view.findViewById(R.id.titleName);
        ((AppCompatActivity)mActivity).setSupportActionBar(mToolbar);
        if (((AppCompatActivity)mActivity).getSupportActionBar() != null) {
            ((AppCompatActivity)mActivity).getSupportActionBar().setHomeButtonEnabled(true);
            ((AppCompatActivity)mActivity).getSupportActionBar().setDisplayHomeAsUpEnabled(true);
            ((AppCompatActivity)mActivity).getSupportActionBar().setDisplayShowTitleEnabled(false);
        }
//        mToolbar.setNavigationIcon(R.drawable.back_button);
//        mToolbar.setNavigationOnClickListener(new View.OnClickListener() {
//            @Override
//            public void onClick(View v) {
//                onBackPressed();
//            }
//        });
        mToolBarTextView.setText("Samantha");
    }

    private void initMenuFragment() {
        MenuParams menuParams = new MenuParams();
        menuParams.setActionBarSize((int) getResources().getDimension(R.dimen.tool_bar_height));
        menuParams.setMenuObjects(getMenuObjects());
        menuParams.setClosableOutside(false);
        mMenuDialogFragment = ContextMenuDialogFragment.newInstance(menuParams);
        mMenuDialogFragment.setItemClickListener(this);
        mMenuDialogFragment.setItemLongClickListener(this);
    }
{% endhighlight %}

### 最重要的一点来了

我们都知道要让toolbar的menu生效的话，必须要设置onCreateOptionsMenu()和onOptionsItemSelected()两个方法;

我们通常在Activity中都会这样进行设置：

{% highlight java %}
    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
		MenuInflater inflater = getMenuInflater();
        inflater.inflate(R.menu.menu_main, menu);
        return true;
    }
{% endhighlight %}

在fragment中会这样写：

{% highlight java %}
    @Override
    public void onCreateOptionsMenu(Menu menu, MenuInflater inflater) {
        mActivity.getMenuInflater().inflate(R.menu.context_menu, menu);
        super.onCreateOptionsMenu(menu, inflater);
    }
{% endhighlight %}

问题来了，这样写当然没有问题，但是会出现如下图的这样一种情况：

![](/assets/fragment_3.png)

溢出菜单和三点菜单同时出现，这是为什么呢？

这是因为:

这个多余出来的三点菜单图标，点击一下会出来一个`settings`的菜单，它实际上不是属于我们的fragment,而是属于我们的activity，这里没有去看源码了，但是我猜想activity即使设置了noActionbar主题的话，依旧会存在着actionbar的属性，所以知道了根源，就好办了，我们只需要在给fragment添加菜单之前，给当前的menu进行一次清空就好办了。

所以终极代码我们这样写：

{% highlight java %}
    @Override
    public void onCreateOptionsMenu(Menu menu, MenuInflater inflater) {
        //一旦不设置menu.clear()属性，就会导致activity的的menu和fragment的menu一起显示出来，展示的效果会变成三个点加menu的菜单
        menu.clear();
        mActivity.getMenuInflater().inflate(R.menu.context_menu, menu);
        super.onCreateOptionsMenu(menu, infl
{% endhighlight %}

改进后的图示：

![](/assets/fragment_4.png)

> 有部分理解来自于下面这个博客，讲的非常详细。

![](https://www.cnblogs.com/mengdd/p/5590634.html)