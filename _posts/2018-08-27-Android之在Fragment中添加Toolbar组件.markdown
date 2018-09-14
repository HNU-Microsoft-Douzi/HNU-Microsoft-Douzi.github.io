---
title: "Android之在Fragment中添加Toolbar组件"
subtitle: "Android adds Toolbar groups to Fragment"
layout: post
data: 2018-08-27
author: "Zxy"
tags:
    - android
---

**背景：在Fragment+ViewPager+RadioButton的类微信页面实现中，我需要在其中一个页面设置Toolbar导航栏，但是其余的几个页面都不需要，这样的话会出现一个矛盾：我必须先对fragment依赖的activity设置成为NoActionBar的主题，这样的话，我必须在我需要设置toolBar的fragment中动态的允许这个导航栏的出现。**

看一下下面这个函数对于toolbar在fragment中的初始化方式：

{% highlight java %}
private void initToolBar(){
        //关联toolbar
        toolbar = view.findViewById(R.id.toolbar);
        toolbar.inflateMenu(R.menu.context_menu);

        // Logo
//      toolbar.setLogo(R.mipmap.my_photo);

        // 主标题
        toolbar.setTitle("");

        // 副标题
        toolbar.setSubtitle("");

        //设置toolbar
        ((AppCompatActivity) getActivity()).setSupportActionBar(toolbar);

        //左边的小箭头（注意需要在setSupportActionBar(toolbar)之后才有效果）
//        toolbar.setNavigationIcon(R.drawable.back_button);

        //菜单点击事件（注意需要在setSupportActionBar(toolbar)之后才有效果）
        toolbar.setOnMenuItemClickListener(onMenuItemClick);

        //设置Overflow按钮图标
        toolbar.setOverflowIcon(mContext.getResources().getDrawable(R.drawable.settings_button));
    }
{% endhighlight %}

注意：要在fragment中显示这个toolbar的时候，不能忘记在onCreate中调用这个函数:

{% highlight java %}
setHasOptionsMenu(true);
{% endhighlight %}

然后我们来复写fragment中初始化toolbar的最重要的两个函数：

{% highlight java %}
    @Override
    public void onCreateOptionsMenu(Menu menu, MenuInflater inflater) {
        inflater.inflate(R.menu.context_menu, menu);
        super.onCreateOptionsMenu(menu, inflater);
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        int id = item.getItemId();
        return super.onOptionsItemSelected(item);
    }
{% endhighlight %}
