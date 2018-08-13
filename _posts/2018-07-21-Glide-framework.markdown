---
title: "Android图片框架之Glide框架的使用"
subtitle: "The use of the Glide framework of the Android network framework"
layout: post
data: 2018-07-21
author: "Zxy"
tags:
    - android
---

## 一、添加依赖库

`implementation 'com.github.bumptech.glide:glide:4.4.0'`
  `annotationProcessor 'com.github.bumptech.glide:compiler:4.4.0'`

## 二、添加网络许可

`<uses-permission android:name="android.permission.INTERNET"/>`

## 三、Glide基础用法

### 从网上下载图片

{% highlight java %}
private void loadImage(){
        Glide.with(this).load(url).into(image);//Glide4的核心代码
    }
{% endhighlight %}

### 占位图的使用

*图片加载是需要时间的，所以我们有的时候需要用一张展位图来占用*

{% highlight java %}
private void loadImage_zhanwei(){
        RequestOptions options = new RequestOptions()
//                .override(100,200)//指定图片大小,参数设置为Target.SIZE_ORIGINAL代表使用图片的原始尺寸
                .placeholder(R.drawable.waitting)
                .diskCacheStrategy(DiskCacheStrategy.NONE);//禁用掉Glide的缓存功能，不然占位符可能显示不出来
        Glide.with(this)
                .load(url)
                .apply(options)
                .into(image);
    }
{% endhighlight %}

### 关于Glide的缓存机制：

	/**
     * Glide的缓存机制极强，它本身有两种缓存模块：内存缓存和硬盘缓存
     * Glide最为人性化的东西是：你不需要编写任何额外的代码，就能享受到这个极为便利的缓存功能，因为Glide默认是开启的
     * 如果你要禁用缓存功能的话，Glide对RequestOptions的对象提供了接口：skipMemoryCache(true)就行。
     * 如果你要金庸硬盘缓存的话，Glide对RequestOptions的对象提供了借口：diskCacheStrategy(DiskCacheStrategy.NONE)
     */

    /**
     * diskCacheStrategy()方法基本上是Glide硬盘缓存功能的一切，它可以接收五种参数：
     * DiskCacheStrategy.NONE： 表示不缓存任何内容。
     * DiskCacheStrategy.DATA： 表示只缓存原始图片。(默认就是这种缓存策略哦)
     * DiskCacheStrategy.RESOURCE： 表示只缓存转换过后的图片。
     * DiskCacheStrategy.ALL ： 表示既缓存原始图片，也缓存转换过后的图片。
     * DiskCacheStrategy.AUTOMATIC： 表示让Glide根据图片资源智能地选择使用哪一种缓存策略（默认选项）。
     */	

### 与此同时，Glide可以指定加载格式

*相对于Picasso而言，它本身是可以加载Gif图片的，而Picasso却不能支持这一点。*

*并且使用Glide加载GIF图并不用编写额外的代码，Glide内部会自动判断图片格式。*

{% highlight java %}
private void load_git_url(){
        Glide.with(this).load(url).into(image);
    }
{% endhighlight %}

### Glide的预加载

*直接使用preload()的话表示将会加载图片的原始尺寸*

*或者可以使用preload(x, y)来加载图片的宽高*

{% highlight java %}
private void load_preload(){
        Glide.with(this)
                .load(url)
                .preload();
    }
{% endhighlight %}

### submit()方法

*我们有的时候需要访问图片的缓存文件*

*当调用了submit()方法后会立即返回一个FutureTarget对象，然后Glide会在后台开始下载图片文件。*

*接下来我们调用FutureTarget的get()方法就可以去获取下载好的图片文件了。*

*如果此时图片还没有下载完，那么get()方法的线程就会被阻塞，一直等到图片下载完成后才有值返回。*

{% highlight java %}
public void downloadImage(){
        new Thread(new Runnable() {
            @Override
            public void run() {
                try{
                   final Context context = getApplicationContext();
                   FutureTarget<File> target = Glide.with(context)
                           .asFile()
                           .load(url)
                           .submit();
                   final File imageFile = target.get();
                   runOnUiThread(new Runnable(){
                       @Override
                       public void run(){
                           Toast.makeText(context,imageFile.getPath(),Toast.LENGTH_SHORT).show();
                       }
                   });
                }catch (Exception e){
                    e.printStackTrace();
                }
            }
        }).start();
    }
{% endhighlight %}

### 图形变换

*底层还是利用RequestOptions的transforms方法来实现*

*但是实际上，为了方便用户的使用，RequestOptions本质上封装了几个API：*

*centerCrop()、fitcenter()、circleCrop();*

{% highlight java %}
private void image_transform(){
        RequestOptions options = new RequestOptions()
                .centerCrop();
        Glide.with(this)
                .load(url)
                .apply(options)
                .into(image);
    }
{% endhighlight %}