---
layout: post
title: "ListView事件监听--对话框"
subtitle: "Use the List View implementation to click the pop-up dialog box"
data: 2018-06-04 16：49：30
author: "Zxy"
tags:
    - android
---

利用`List View`实现点击弹出对话框的需求。

代码附加区域：    **MainActivity**

调用事件监听的主要内容：

- 在主类的后面声明

{% highlight java %}
implements AdapterView.OnItemClickListener
{% endhighlight %}

- 在主类内部调用适配器之后调用点击监听事件

{% highlight java %}
list_animal.setOnItemClickListener(this);
{% endhighlight %}

- 复写一个Override


{% highlight java %}
public void onItemClick(AdapterView<?> parent, View view, int position, long id){
        String text = (String) ((TextView)view.findViewById(R.id.txt_aName)).getText();
        String showText = "点击第" + position + "项，文本内容为：" + text + "，ID为：" + id;
        Toast.makeText(this, showText, Toast.LENGTH_LONG).show();
    }
{% endhighlight %}

下面将附上所有部件的代码：

### MainActivity.java
{% highlight java %}
package com.example.administrator.adapterdemo;

import android.content.Context;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Adapter;
import android.widget.AdapterView;
import android.widget.LinearLayout;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;

import java.util.LinkedList;
import java.util.List;

public class MainAcitivity extends AppCompatActivity implements AdapterView.OnItemClickListener{

    private List<Animal> mData = null;
    private Context mContext;
    private AnimalAdapter mAdapter = null;
    private ListView list_animal;
    private LinearLayout ly_content;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.content_activity_main);
        mContext = MainAcitivity.this;
        list_animal = (ListView) findViewById(R.id.list_animal);

        mData = new LinkedList<Animal>();

        int count = 0;
        while(count < 10000){
            String name = "现在运行到第" + count + "项!";
            mData.add(new Animal("狗说", name, R.mipmap.ic_launcher));
            count ++;
        }

        mAdapter = new AnimalAdapter((LinkedList<Animal>) mData, mContext);
        list_animal.setAdapter(mAdapter);
        list_animal.setOnItemClickListener(this);
    }

    @Override
    public void onItemClick(AdapterView<?> parent, View view, int position, long id){
        String text = (String) ((TextView)view.findViewById(R.id.txt_aName)).getText();
        String showText = "点击第" + position + "项，文本内容为：" + text + "，ID为：" + id;
        Toast.makeText(this, showText, Toast.LENGTH_LONG).show();
    }
}
{% endhighlight %}

### Animal.java
{% highlight java %}
package com.example.administrator.adapterdemo;

public class Animal {
    private String aName;
    private String aSpeak;
    private int aIcon;

    public Animal(String aName, String aSpeak, int aIcon){
        this.aName = aName;
        this.aSpeak = aSpeak;
        this.aIcon = aIcon;
    }

    public String getaName(){
        return aName;
    }

    public String getaSpeak(){
        return aSpeak;
    }

    public int getaIcon(){
        return aIcon;
    }

    public void setaName(String aName){
        this.aName = aName;
    }

    public void setaSpeak(String aSpeak){
        this.aSpeak = aSpeak;
    }

    public void setaIcon(int aIcon){
        this.aIcon = aIcon;
    }
}

{% endhighlight %}

### AnimalAdapter.java
{% highlight java %}
package com.example.administrator.adapterdemo;
import android.content.Context;
import android.media.Image;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.ImageView;
import android.widget.TextView;
//MainAcitivity
import org.w3c.dom.Text;

import java.util.LinkedList;

public class AnimalAdapter extends BaseAdapter {

    private LinkedList<Animal> mData;
    private Context mContext;

    AnimalAdapter(LinkedList<Animal> mData, Context mContext) {
        this.mData = mData;
        this.mContext = mContext;
    }

    @Override
    public int getCount() {
        return mData.size();
    }

    @Override
    public Object getItem(int position) {
        return null;
    }

    @Override
    public long getItemId(int position) {
        return position;
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        ViewHolder viewHolder = null;
        if(convertView == null){
            viewHolder = new ViewHolder();
            convertView = LayoutInflater.from(mContext).inflate(R.layout.list_item,parent,false);
            viewHolder.img_icon = (ImageView) convertView.findViewById(R.id.img);
            viewHolder.txt_aName = (TextView)convertView.findViewById(R.id.txt_aName);
            viewHolder.txt_aSpeak = (TextView)convertView.findViewById(R.id.txt_aSpeak);
            convertView.setTag(viewHolder);
        }
        else{
            viewHolder = (ViewHolder) convertView.getTag();
        }
        //convertView = LayoutInflater.from(mContext).inflate(R.layout.list_item,parent,false);
//        ImageView img_icon = (ImageView) convertView.findViewById(R.id.img);
//        TextView txt_aName = (TextView) convertView.findViewById(R.id.txt_aName);
//        TextView txt_aSpeak = (TextView) convertView.findViewById(R.id.txt_aSpeak);
//        int id = mData.get(position).getaIcon();
//        img_icon.setBackgroundResource(mData.get(position).getaIcon());
//        txt_aName.setText(mData.get(position).getaName());
//        txt_aSpeak.setText(mData.get(position).getaSpeak());
        viewHolder.img_icon.setBackgroundResource(R.mipmap.ic_launcher);
        viewHolder.txt_aName.setText(mData.get(position).getaName());
        viewHolder.txt_aSpeak.setText(mData.get(position).getaSpeak());
        return convertView;
    }
    public class ViewHolder{
        ImageView img_icon;
        TextView txt_aName;
        TextView txt_aSpeak;
    }
}
{% endhighlight %}

### list_item.xml
{% highlight android %}
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="#d8e0e8"
    android:orientation="horizontal">

    <ImageView
        android:id="@+id/img"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:contentDescription="@string/app_name"
        android:src="@mipmap/ic_launcher" />

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:orientation="vertical">

        <TextView
            android:id="@+id/txt_aName"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:text="你好"
            android:textSize="20sp" />

        <TextView
            android:id="@+id/txt_aSpeak"
            android:layout_width="match_parent"
            android:layout_height="30sp"
            android:text="Hello！"
            android:textSize="17sp" />
    </LinearLayout>
</LinearLayout>
{% endhighlight %}

### content_activity_main.xml
{% highlight java %}
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent">
    <ListView
        android:id="@+id/list_animal"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content">
    </ListView>
</RelativeLayout>
{% endhighlight %}