---
title: "Android数据库框架之GreenDao框架的使用"
subtitle: "The use of the GreenDao framework of the Android database framework"
layout: post
data: 2018-07-21
author: "Zxy"
tags:
    - android
---

## 关于GreenDao框架

上一篇看的是LitePal框架，那个框架很方便，可以处理的内容也很多，所以我适当的间接了内容，对于最重要的增删改查表的内容没有写，但是这一篇GreenDao的文章一方面为了记录下这个GreenDao的使用方法，一方面是它的操作也的确很简便，这些框架都有一个很大的特定：避开了SQLite繁琐的SQL语句，因为它内部都实现过了，所以非常的方便。

## 关于GreenDao的使用

### 添加依赖

`compile 'org.greenrobot:greendao:3.2.2' // add library`
`compile 'org.greenrobot:greendao-generator:3.2.2'`

### 在build.gradle下进行配置

	apply plugin: 'org.greenrobot.greendao'
	buildscript {
		repositories {
    	    mavenCentral()
  		 }
    	dependencies {
    	    classpath 'org.greenrobot:greendao-gradle-plugin:3.2.2'
    	}
	}
	
### 对build.gradle(app)进行配置

	apply plugin: 'com.android.application'
	apply plugin: 'org.greenrobot.greendao'                   《-<<<<------------------第一步
	android {
	    compileSdkVersion 26
	    buildToolsVersion "26.0.2"
	    defaultConfig {
	        applicationId "com.eightgroup.greendao"
	        minSdkVersion 15
	        targetSdkVersion 26
	        versionCode 1
	        versionName "1.0"
	        testInstrumentationRunner "android.support.test.runner.AndroidJUnitRunner"
	    }
	    buildTypes {
	        release {
	            minifyEnabled false
	            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
	        }
	    }
	    greendao {
	        schemaVersion 1
	        daoPackage 'com.eightgroup.greendao.gen'
	        targetGenDir 'src/main/java'
	    }
}

### 然后创建实体类，生成dao文件

{% highlight java %}
@Entity
public class dayStep {
    @Id
    private long id;
    private String date;
    private int step;  
    private Long sportId;
    @ToOne(joinProperty = " sportId")
    private SportInfo sportInfo;//关系表
}
{% endhighlight %}

编写完实体类以后再实体类界面下（`Make project`），程序会自动编译生成的dao文件，生成的文件一共有三个。

**配置完成后，就是使用Greendao了**

创建一个application类，再application中完成对DaoSession的初始化，避免以后重复初始化，便于使用

{% highlight java %}
 public class MyApplication extends Application {
    private DaoMaster.DevOpenHelper mHelper;
    private SQLiteDatabase db;
    private DaoMaster mDaoMaster;
    private DaoSession mDaoSession;
    //静态单例
    public static MyApplication instances;
    @Override
    public void onCreate() {
        super.onCreate();
        instances = this;
        setDatabase();
    }
    public static MyApplication getInstances(){
        return instances;
    }
 
    /**
     * 设置greenDao
     */
    private void setDatabase() {
        // 通过 DaoMaster 的内部类 DevOpenHelper，你可以得到一个便利的 SQLiteOpenHelper 对象。
        // 可能你已经注意到了，你并不需要去编写「CREATE TABLE」这样的 SQL 语句，因为 greenDAO 已经帮你做了。
        // 注意：默认的 DaoMaster.DevOpenHelper 会在数据库升级时，删除所有的表，意味着这将导致数据的丢失。
        // 所以，在正式的项目中，你还应该做一层封装，来实现数据库的安全升级。
        mHelper = new DaoMaster.DevOpenHelper(this, "sport-db", null);
        db = mHelper.getWritableDatabase();
        // 注意：该数据库连接属于 DaoMaster，所以多个 Session 指的是相同的数据库连接。
        mDaoMaster = new DaoMaster(db);
        mDaoSession = mDaoMaster.newSession();
    }
    public DaoSession getDaoSession() {
        return mDaoSession;
    }
    public SQLiteDatabase getDb() {
        return db;
    }
}
{% endhighlight %}

**Greendao操作数据库文件（增、删、改、查）**

{% highlight java %}
  /**
     * 增
     */
    public void insert()
    {
        String date = new Date().toString();
        mDayStep = new dayStep(null,date,0);//第一个是id值，因为是自增长所以不用传入
        dao.insert(mDayStep);
    }
 
 
    /**
     * 查
     */
    public void Search()
    {
        //方法一
        List<dayStep> mDayStep = dao.loadAll();
        //方法二
        //List<dayStep> mDayStep = dao.queryBuilder().list();
        //方法三 惰性加载
        //List<dayStep> mDayStep = dao.queryBuilder().listLazy();
        for (int i = 0; i < mDayStep.size(); i++) {
            String date = "";
            date = mDayStep.get(i).getDate();
            Log.d("cc", "id:  "+i+"date:  "+date);
        }
 
 
    }
 
 
    /**
     * 删
     * @param i 删除数据的id
     */
    public void delete(long i)
    {
        dao.deleteByKey(i);
        //当然Greendao还提供了其他的删除方法，只是传值不同而已
    }
 
 
    /**
     *改
     * @param i
     * @param date
     */
    public void correct(long i,String date)
    {
        mDayStep =  new dayStep((long) i,date,0);
        dao.update(mDayStep);
    }
 
 
   /**
     *修改或者替换（有的话就修改，没有则替换）
     */ 
    public void insertOrReplace(long i,String date)
  {
      mDayStep = new dayStep((long) i,date,0);
      dao.insertOrReplace(mDayStep);
    }
 
 
   /**
     *查找符合某一字段的所有元素
     */
   public void searchEveryWhere(String str)
   {
	List<dayStep> mList = dao.queryBuilder()
                .where(dao.date.eq(str)).build().listLazy();
   }

{% endhighlight %}

**然后查询数据的话就使用where**

{% highlight java %}
/**
     * 查询指定用户
     */
    public static List<UserInfo> SearchUserInfo(int id)
    {
        //惰性加载
        List<UserInfo> list =  mUserInfoDao.queryBuilder().where(UserInfoDao.Properties.Id.eq(id)).list();
        return list;
    }
{% endhighlight %}

### 多表关联

暂时没有用到，记录了这里也没什么卵用，要用的时候，就百度/google再查。

## GreenDao的注解含义

@Entity 实体标识

@nameInDb 在数据库中的名字，如不写则为实体中类名

@indexes 索引

@createInDb 是否创建表，默认为true,false时不创建

@schema 指定架构名称为实体

@active 无论是更新生成都刷新

@Id 每条数据对应的位置，必写项

@Property(nameInDb = "") 表示该属性将作为表的一个字段,其中nameInDb属性值是在数据库中对应的字段名称,可以自定义字段名,例如可以定一个跟实体对象字段不一样的字段名

@NotNull 不为null

@Unique 唯一约束   该属性值必须在数据库中是唯一值

@ToMany 一对多

@OrderBy 排序

@ToOne 一对一 关系表

@Transient 不保存于数据库

@generated 由greendao产生的构造函数或方法

## GreenDao特性

- 精简
- 高效率
- 低功耗
- 使用方便