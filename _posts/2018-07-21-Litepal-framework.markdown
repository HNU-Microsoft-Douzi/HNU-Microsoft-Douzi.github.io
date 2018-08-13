---
title: "Android数据库框架之LitePal框架的使用"
subtitle: "The use of the Litepal framework of the Android database framework"
layout: post
data: 2018-07-21
author: "Zxy"
tags:
    - android
---

## 关于LitePal本身

本来学习Android的各种框架的时候，到数据库框架这块儿，是从众多框架中选定了两个：LitePal和GreenDao，这两个框架有个很显著的特性，就是操作起来尤其简单和方便，尤其是LitePal，在操作性的简便上的确有其独到性，但是凡事都是相对的，有好的一面就有差的一面，去看几种数据库框架的各方面性能分析，发现LitePal的性能的确是很差，但是谁让它是懒人框架呢？就适合我这样的懒人咯！

---

## 一、引入Jar包或依赖

`implementation 'org.litepal.android:core:1.5.0'`

## 二、添加网络许可

`<uses-permission android:name="android.permission.INTERNET"/>`

## 配置litepal.xml

在assets目录下创建一个litepal.xml文件，复制以下代码进去：

{% highlight xml %}
<?xml version="1.0" encoding="utf-8"?>  
<litepal>  
    <dbname value="数据库名" ></dbname>  
  
    <version value="数据库版本号，用于更新数据库" ></version>  
  
    <list>
        <!--这里是类映射-->  
    </list>  
</litepal>

## 配置LitePalApplication

*如果你的项目中没有自定义APP，直接在清单文件中进行下列配置：*

{% highlight java %}
<manifest>  
    <application  
        android:name="org.litepal.LitePalApplication"  
        ...  
    >  
    ...  
    </application>  
</manifest>
{% endhighlight %}

*如果你的项目中有继承Application的自定义APP*

①把extends Application换成extends LitePalApplication

②在清单文件中使用你自定义的APP,如自定义的APP为MyApplication:

{% highlight java %}
<manifest>  
    <application  
        android:name="com.example.MyApplication"  
        ...  
    >  
    ...  
    </application>  
</manifest>
{% endhighlight %}

## 重点来了！！！利用LitePal建表

1.创建一个实体类

{% highlight java %}
public class News {  
      
    private int id;  
      
    private String title;  
      
    private String content;  
      
    private Date publishDate;  
      
    private int commentCount;  
      
    // 自动生成get、set方法  
    ...  
}
{% endhighlight %}

> 这里的News就是一个新的表，然后里面的各项私有数据就是这个表中的表项。

2、修改assets目录下的litepal.xml文件

{% highlight java %}
<?xml version="1.0" encoding="utf-8"?>  
<litepal>  
    <dbname value="demo" ></dbname>  
  
    <version value="1" ></version>  
  
    <list>  
        <mapping class="com.example.databasetest.model.News"></mapping>  
    </list>  
</litepal>
{% endhighlight %}

## 使用LitePal升级表

升级表的场景：

- 增加表
- 修改表结构

1.增加一张表

> 比如说要对上述的News这个表的基础上再增加一个评论表的话，那么就要继续创建一个实体类

{% highlight java %}
public class Comment {  
  
    private int id;  
      
    private String content;  
      
    // 自动生成get、set方法   
    ...  
}  
{% endhighlight %}

然后需要修改assets目录下的litepal.xml文件

> 实际上就是将list中的一个节点增加了一个（maping节点）

2.修改之前的表结构

比如说要增加表的一个单独的表项：

{% highlight java %}
public class Comment {  
      
    private int id;

    private String content;  
      
    private Date publishDate;  //多了一个表示发布时间的属性
      
    // 自动生成get、set方法   
    ...  
}
{% endhighlight %}

> 实际上就是在这个描述表的实体类中，增加了一个私有属性而已：`Date publishDate`

然后只需要更新assets目录下的litepal.xml文件就可以了

{% highlight java %}
<litepal>  
    <dbname value="demo" ></dbname>  
  
    <version value="3" ></version>  
    ...  
</litepal>  
{% endhighlight %}

## 然后就是使用LitePal建立表关联

1.一对一：
比如，每篇新闻都对应着一个简介，一个简介就对应着一篇新闻

①简介类

{% highlight java %}
public class Introduction {  
      
    private int id;  
      
    private String guide;  
      
    private String digest;  
      
    // 自动生成get、set方法  
}
{% endhighlight %}

② 新闻类(持有简介类)

{% highlight java %}
public class News {  
    ...  
    private Introduction introduction;  //一篇新闻对应着一个简介
      
    // 自动生成get、set方法  
}  
{% endhighlight %}

然后修该litePal.xml中的版本号，加入新表就实体类的引用，更新数据库

{% highlight xml %}
<?xml version="1.0" encoding="utf-8"?>  
<litepal>  
    <dbname value="demo" ></dbname>  
  
    <version value="4" ></version>  
  
    <list>  
        <mapping class="com.example.databasetest.model.News"></mapping>  
        <mapping class="com.example.databasetest.model.Introduction"></mapping>  
    </list>  
</litepal>
{% endhighlight %}

> 这种联系的关系还存在多对多和多对一的关系，用到的时候再进行补充。

## 使用LitePal的存储操作

因为LitePal可以通过一个普通的实体类把对应的表创建出来或者对表升级，所以没有要求继承制钉的类或实现指定的接口。但是，如果要对表进行存储操作，则就有一个要求了，那就是这些实体类必须继承`DataSupport`

1.让实体类继承DataSupport

2.使用save()对单个实体数据进行保存

例如：对一篇新闻进行保存

{% highlight java %}
News news = new News();

news.setTitle("这是一条新闻标题");

news.setContent("这是一条新闻内容");

news.setPublishDate(new Date());

news.save();

{% endhighlight %}

- save()是不会抛出异常的，并且返回的是boolean

3.使用saveThrows()对单个实体数据进行保存

例子：对一篇新闻进行保存

{% highlight java %}
News news = new News();
news.setTitle("这是一条新闻标题");  
news.setContent("这是一条新闻内容");  
news.setPublishDate(new Date());  
news.saveThrows();
{% endhighlight %}

- 需要注意的是这个saveThros本身是会抛出异常的

4.异步保存（saveAsync()）

{% highlight java %}
News news = new News();  
news.setTitle("这是一条新闻标题");  
news.setContent("这是一条新闻内容");  
news.setPublishDate(new Date()); 
news.saveAsync().listen(new SaveCallback() {
    @Override
    public void onFinish(boolean success) {

    }
});
{% endhighlight %}

5.如何检验数据是否保存成功呢？

当实例对象被保存成功的时候，对象中的id会被赋值

{% highlight java %}
News news = new News();  
news.setTitle("这是一条新闻标题");  
news.setContent("这是一条新闻内容");  
news.setPublishDate(new Date());  
Log.d("TAG", "news id is " + news.getId());  
news.save();  
Log.d("TAG", "news id is " + news.getId());
{% endhighlight %}

## 修改表中的数据

## 使用LitePal的查询

**上述两项内容太多，这里就不做总结了，详细的东西可以用的时候查官方文档或者博客**

这里附上一篇博客[Android的数据库框架LitePal的使用](https://www.jianshu.com/p/bc68e763c7a2)