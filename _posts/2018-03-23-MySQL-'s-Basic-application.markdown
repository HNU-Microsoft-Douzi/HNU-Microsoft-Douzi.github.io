---
layout: post
data: 2018-03-23
title: "MySQL的基本用法"
subtitle:   "How to grasp MySQL's basic application?"
tags: MySQL
---
### MySQL连接
使用mysql二进制方式连接：

{% highlight sql %}
mysql -u root -p#利用root帐号连接mysql服务器
{% endhighlight %}

退出mysql命令窗口：
{% highlight sql %}
mysql>exit
{% endhighlight %}

### 使用mysqladmin创建数据库
使用普通用户，你可能需要特定的权限来创建或者删除MySQL数据库。

所以这里使用root来登录，拥有所有权限。

{% highlight sql %}
mysqladmin -u root -p create RUNOOB
Enter password:
{% endhighlight %}

> 通过上述命令创建MySQL的数据库RUNOOB。

### 使用mysqladmin删除数据库
同上，利用root账户进行数据库的删除操作。

{% highlight sql %}
mysqladmin -u root -p drop RUNOOB
Enter password:
{% endhighlight %}

从命令提示窗口中选择MySQL数据库

{% highlight sql %}
[root@host]# mysql -u root -p
Enter password:******
mysql > use RUNOOB;
Database changed
{% endhighlight %}

执行上述命令后，你就已经成功选择了RUNOOB数据库，后序的操作中都会在RUNOOB数据库中执行。


### 启动关闭MySQL服务
命令行模式：

service mysql start<span style="color:red">#启动`mysql`服务</span>
service mysqld start<span style="color:red">#启动`mysqld`服务</span>
service mysqld stop<span style="color:red">#关闭`mysql`服务</span>
service mysqld stop<span style="color:red">#关闭`mysqld`服务</span>

### Insert添加用户
可能会报错：
ERROR <span style="color:blue">1364</span> (HY000): <span style="color:purple">Field</span> <span style="color:green">'ssl_cipher'</span> doesn't have a default value

my-default.ini中有一条语句：

制订了严格模式，为了安全，严格模式禁止通过insert这种形式直接修改mysql库中的user表进行添加新用户。

{% highlight sql %}
sql_mode=NO_ENGINE-SUBSTITUTION,STRICT_TRANS_TABLES
{% endhighlight %}

将STRICT_TRANS_TABLS删除掉之后即可使用insert添加

### 查看MySQL用户权限
查看当前用户（自己权限）：

{% highlight sql %}
show grants;
{% endhighlight %}

查看其他MySQL用户权限：

{% highlight sql %}
show grants for datebase@localhost;
{% endhighlight %}

### 撤销已经赋予给MySQL用户权限的权限

{% highlight sql %}
grand all on *.* to datebase@loacalhost;
revoke all on *.* from datebase@locakhose;
{% endhighlight %}

### MySQL grand/revoke用户权限注意事项
1. `grant,revoke`用户权限后，该用户只有重新链接MySQL数据库，权限才能生效。

2. 如果想让授权的用户，也可以将这些权限grand给其他用户，需要选项`grand option`

{% highlight sql %}
grant select on testdb.* to datebase@localhost with grant option;
{% endhighlight %}

**注：实际中，数据库全新啊最好由DBA来统一管理。**

**创建完成后需要执行`FLUSH PRIVILEGES`语句。**

## MySQL数据类型
MySQL支持多种类型，大致可以分为三类：数值、日期/时间和字符串（字符）类型。

**数值类型**

TINYINT小整数值

SMALLINT大整数值

MEDIUMINT大整数值

INT或INTEGER大整数值

BIGINT极大整数值

FLOAT单精度浮点数值

DOUBLE双精度浮点数值

DECIMAL小数值

**日期和时间类型**

DATE日期值

TIME时间值或持续时间

YEAR年份值

DATETIME混合日期和时间值

TIMESTAMP混合日期和时间值，时间戳

**字符串类型**
CHAR定长字符串

VARCHAR变长字符串

TINYBLOB不超过255个自负的二进制字符串

TINYTEXT短文本字符串

BLOB二进制形式的长文本数据

TEXT长文本数据

MEDIUMBLOB二进制形式的中等长度文本数据

MEDIUMTEXT中等长度文本数据

LONGBLOB二进制形式的极大文本数据

LONGTEXT极大文本数据

### 创建数据表
创建MySQL数据表需要以下信息：

- 表名

- 表字段名

- 定义每个表字段

创建MySQL数据表的通用语法

{% highlight sql %}
CREATE TABLE table_name (column_name column_type);
{% endhighlight %}

以下例子中我们将在RUNOOB数据库中创建数据表runoob_tbl;

{% highlight sql %}
CREATE TABLE IF NOT EXISTS `runoob_tbl`(
   `runoob_id` INT UNSIGNED AUTO_INCREMENT,
   `runoob_title` VARCHAR(100) NOT NULL,
   `runoob_author` VARCHAR(40) NOT NULL,
   `submission_date` DATE,
   PRIMARY KEY ( `runoob_id` )
)ENGINE=InnoDB DEFAULT CHARSET=utf8;
{% endhighlight %}

实例解析：

&nbsp&nbsp&nbsp如果你不想字段为NULL可以设置字段的属性为NOT NULL，在操作数据库时如果输入该字段的数据为NULL,就会报错。

&nbsp&nbsp&nbspAUTO_INCREMENT定义列为自增的属性，一般用于主键，数值会自动加1。

&nbsp&nbsp&nbspPRIMARY KEY关键字用于定义列为主键。 您可以使用多列来定义主键，列间以逗号分隔。

&nbsp&nbsp&nbspENGINE 设置存储引擎，CHARSET 设置编码。

### 通过命令提示符创建表
{% highlight sql %}
root@host# mysql -u root -p
Enter password:*******
mysql> use RUNOOB;
Database changed
mysql> CREATE TABLE runoob_tbl(
   -> runoob_id INT NOT NULL AUTO_INCREMENT,
   -> runoob_title VARCHAR(100) NOT NULL,
   -> runoob_author VARCHAR(40) NOT NULL,
   -> submission_date DATE,
   -> PRIMARY KEY ( runoob_id )
   -> )ENGINE=InnoDB DEFAULT CHARSET=utf8;
Query OK, 0 rows affected (0.16 sec)
mysql>
{% endhighlight %}

### MySQL删除数据表
<p style="color:red">操作MySQL的删除数据表的操作时，需要注意，一旦将数据表删除，其内的数据会全部消失。

**语法**

{% highlight sql %}
DROP TABLE table_name;
{% endhighlight %}

**实例：**

{% highlight sql %}
root@host# mysql -u root -p
Enter password:
mysql> use RUNOOB;
Datebase changed
mysql > DROP TABLE runnob_tbl
Query OK, 0 rows affected (0.8 sec)
{% endhighlight %}

使用细节：

删除表内数据，用**delete**.格式为:

{% highlight sql %}
delete from 表名 where 删除条件;
{% endhighlight %}

实例：删除学生表内姓名为张三的记录。

{% highlight sql %}
delete from student where T_name = "张三";
{% endhighlight %}

清除表内数据，保存表结构，用**truncate**.格式为：

{% highlight sql %}
truncate table 表名;
{% endhighlight %}

实例：清除学生表内的所有数据。

{% highlight sql %}
truncate table student;
{% endhighlight %}

删除表用**drop**，就是啥都没了.格式为：

{% highlight sql %}
drop table 表名;
{% endhighlight %}

实例：删除学生表

{% highlight sql %}
drop table student;
{% endhighlight %}

1. 当你不再需要该表时，用drop;
2. 当你仍要保留该表，但要删除所有记录时，用**truncate**;
3. 当你要删除部分记录时，用delete

### MySQL插入数据
**语法**

{% highlight sql %}
INSERT INTO table_name ( field1, field2,...fieldN )
                       VALUES
                       ( value1, value2,...valueN );
{% endhighlight %}

**实例**

以下实例中我们将向runnob_tbl表插入三条数据;

{% highlight sql %}
root@host# mysql -u root -p password;
Enter password:
mysql> use RUNOOB;
Database changed
mysql> INSERT INTO runnob_tb1
    -> (runoob_title, runoob_author, submission_date)
    -> VALUES
    -> ("学习PHP", "菜鸟教程", NOW());
Query OK, 1 rows affected, 1 warnings (0.01 sec)
mysql> INSERT INTO runoob_tbl
    -> (runoob_title, runoob_author, submission_date)
    -> VALUES
    -> ("学习 MySQL", "菜鸟教程", NOW());
Query OK, 1 rows affected, 1 warnings (0.01 sec)
mysql> INSERT INTO runoob_tbl
    -> (runoob_title, runoob_author, submission_date)
    -> VALUES
    -> ("JAVA 教程", "RUNOOB.COM", '2016-05-06');
Query OK, 1 rows affected (0.00 sec)
mysql>
{% endhighlight %}

**读取数据表：**

{% highlight sql %}
select * from runoob_tb1;
{% endhighlight %}