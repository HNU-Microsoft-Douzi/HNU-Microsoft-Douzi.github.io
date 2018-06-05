---
layout: post
title: "List View点击删除的事件"
subtitle: "Use List View to make the event of click to delete!"
data: 2018-06-05
author: "Zxy"
tags:
    - android
---

## 如何构造List View的点击对话框呢？

通过在`onItemClick中`复写一个对话框的方法，来实现点击删除的操作。

当使用`onItemClick`的时候，要注意它本身是`OnItemClickListener`的一个函数，对其要进行复写的话，要在activity后面加上`implements AdapterView.OnItemClickListener`就不会报错了。

然后整个对话框实际上是`AlterDialog`的一个对象，所以直接利用它的`Builder`构建一个对象，然后对这个对象进行赋值操作就好了。

下面是对`onItemClick`这个方法的复写：

{% highlight java %}
public void onItemClick(AdapterView<?> parent, View view, final int position, long id) {
        final AlertDialog.Builder builder = new AlertDialog.Builder(this);
        builder.setIcon(R.mipmap.ic_launcher);
        builder.setTitle("对话框");
        builder.setMessage("你确定要删除该项内容吗？");
        builder.setPositiveButton("确定", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                Toast.makeText(MainAcitivity.this, "确定", Toast.LENGTH_LONG).show();
                mData.remove(position);
                mAdapter.notifyDataSetChanged();
            }
        });
        builder.setNegativeButton("取消", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                Toast.makeText(MainAcitivity.this, "取消", Toast.LENGTH_LONG).show();
            }
        });
        builder.show();
    }
{% endhighlight %}

注意，我这里实现了点击删除，然后对数据进行删除以后要注意的是将这个改变告诉我们的适配器，让它了解我们改变了数据集，不然的话，进行下一步的操作，就会出现app崩溃的问题。

**那么如何通知我们的适配器呢？**

只要用下面一句语句就可以了。

`mAdapter.notifyDataSetChanged();`