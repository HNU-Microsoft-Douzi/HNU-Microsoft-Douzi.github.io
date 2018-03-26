---
layout: post
data: 2018-03-23
title: "MySQL的基本用法"
subtitle:   "How to grasp MySQL's basic application?"
tags: MySQL
---
<p class="h3">启动关闭MySQL服务</p>
<p>命令行模式：</p>
<p>service mysql start<span style="color:red">#启动mysql服务</span></p>
<p>service mysqld start<span style="color:red">#启动mysqld服务</span></p>
<p>service mysqld stop<span style="color:red">#关闭mysql服务</span></p>
<p>service mysqld stop<span style="color:red">#关闭mysqld服务</span></p>
<br><br>
<p class="h3">Insert添加用户</p>
<p>可能会报错：</p>
<p>ERROR <span style="color:blue">1364</span> (HY000): <span style="color:purple">Field</span> <span style="color:green">'ssl_cipher'</span> doesn't have a default value</p>
<p>my-default.ini中有一条语句：</p>
<p>制订了严格模式，为了安全，严格模式进制通过insert这种形式直接修改mysql库中的user表进行添加新用户</p>
{% highlight sql %}
sql_mode=NO_ENGINE-SUBSTITUTION,STRICT_TRANS_TABLES
{% endhighlight %}
<p>将STRICT_TRANS_TABLS删除掉之后即可使用insert添加</p>
<br><br>
<p class="h3">查看MySQL用户权限</p>
<p>查看当前用户（自己权限）：</p>
{% highlight sql %}
show grants;
{% endhighlight %}
<p>查看其他MySQL用户权限：</p>
{% highlight sql %}
show grants for datebase@localhost;
{% endhighlight %}
<br>
<p class="h3">撤销已经赋予给MySQL用户权限的权限</p>
{% highlight sql %}
grand all on *.* to datebase@loacalhost;
revoke all on *.* from datebase@locakhose;
{% endhighlight %}
<br><br>
<p class="h3">MySQL grand/revoke用户权限注意事项</p>
<p>1.grant,revoke用户权限后，该用户只有重新链接MySQL数据库，权限才能生效。</p>
<p>2.如果想让授权的用户，也可以将这些权限grand给其他用户，需要选项grand option</p>
{% highlight sql %}
grant select on testdb.* to datebase@localhost with grant option;
{% endhighlight %}
<p style="color:red">*注：实际中，数据库全新啊最好由DBA来统一管理。</p>
<p style="color:red">*创建完成后需要执行<b>FLUSH PRIVILEGES</b>语句。</p>
<br><br>
<p class="h3">MySQL连接</p>
<p>使用mysql二进制方式连接：</p>
{% highlight sql %}
mysql -u root -p#利用root帐号连接mysql服务器
{% endhighlight %}
<p>退出mysql命令窗口：</p>
{% highlight sql %}
mysql>exit
{% endhighlight %}
<br><br>
<p class="h3">使用mysqladmin创建数据库</p>
<p>使用普通用户，你可能需要特定的权限来创建或者删除MySQL数据库。</p>
<p>所以这里使用root来登录，拥有所有权限。</p>
{% highlight sql %}
mysqladmin -u root -p create RUNOOB
Enter password:
{% endhighlight %}
<p>通过上述命令创建MySQL的数据库RUNOOB</p>
<br><br>
<p class="h3">使用mysqladmin删除数据库</p>
<p>同上，利用root账户进行数据库的删除操作。</p>
{% highlight sql %}
mysqladmin -u root -p drop RUNOOB
Enter password:
{% endhighlight %}
<br>
<p>从命令提示窗口中选择MySQL数据库</p>
{% highlight sql %}
[root@host]# mysql -u root -p
Enter password:******
mysql > use RUNOOB;
Database changed
{% endhighlight %}
<p>执行上述命令后，你就已经成功选择了RUNOOB数据库，后序的操作中都会在RUNOOB数据库中执行。</p>
<br><br>
<p class="h2">MySQL数据类型</p>
<p>MySQL支持多种类型，大致可以分为三类：数值、日期/时间和字符串（字符）类型。</p>
<p><b>数值类型</b></p>
<p>TINYINT小整数值</p>
<p>SMALLINT大整数值</p>
<p>MEDIUMINT大整数值</p>
<p>INT或INTEGER大整数值</p>
<p>BIGINT极大整数值</p>
<p>FLOAT单精度浮点数值</p>
<p>DOUBLE双精度浮点数值</p>
<p>DECIMAL小数值</p>
<br>
<p><b>日期和时间类型</b></p>
<p>DATE日期值</p>
<p>TIME时间值或持续时间</p>
<p>YEAR年份值</p>
<p>DATETIME混合日期和时间值</p>
<p>TIMESTAMP混合日期和时间值，时间戳</p>
<br>
<p><b>字符串类型</b></p>
<p>CHAR定长字符串</p>
<p>VARCHAR变长字符串</p>
<p>TINYBLOB不超过255个自负的二进制字符串</p>
<p>TINYTEXT短文本字符串</p>
<p>BLOB二进制形式的长文本数据</p>
<p>TEXT长文本数据</p>
<p>MEDIUMBLOB二进制形式的中等长度文本数据</p>
<p>MEDIUMTEXT中等长度文本数据</p>
<p>LONGBLOB二进制形式的极大文本数据</p>
<p>LONGTEXT极大文本数据</p>
<br><br>
<p class="h3">创建数据表</p>
<p>创建MySQL数据表需要以下信息：</p>
<p>&nbsp&nbsp&nbsp表名</p>
<p>&nbsp&nbsp&nbsp表字段名</p>
<p>&nbsp&nbsp&nbsp定义每个表字段</p>
<p>创建MySQL数据表的通用语法</p>
{% highlight sql %}
CREATE TABLE table_name (column_name column_type);
{% endhighlight %}
<p>以下例子中我们将在RUNOOB数据库中创建数据表runoob_tbl;</p>
{% highlight sql %}
CREATE TABLE IF NOT EXISTS `runoob_tbl`(
   `runoob_id` INT UNSIGNED AUTO_INCREMENT,
   `runoob_title` VARCHAR(100) NOT NULL,
   `runoob_author` VARCHAR(40) NOT NULL,
   `submission_date` DATE,
   PRIMARY KEY ( `runoob_id` )
)ENGINE=InnoDB DEFAULT CHARSET=utf8;
{% endhighlight %}
<p>实例解析：</p>
<p>&nbsp&nbsp&nbsp如果你不想字段为NULL可以设置字段的属性为NOT NULL，在操作数据库时如果输入该字段的数据为NULL,就会报错。</p>
<p>&nbsp&nbsp&nbspAUTO_INCREMENT定义列为自增的属性，一般用于主键，数值会自动加1。</p>
<p>&nbsp&nbsp&nbspPRIMARY KEY关键字用于定义列为主键。 您可以使用多列来定义主键，列间以逗号分隔。</p>
<p>&nbsp&nbsp&nbspENGINE 设置存储引擎，CHARSET 设置编码。</p>
<br>
<p class="h3">通过命令提示符创建表</p>
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
<br><br>
<p class="h3">MySQL删除数据表</p>
<p style="color:red">操作MySQL的删除数据表的操作时，需要注意，一旦将数据表删除，其内的数据会全部消失。</p>
<p><b>语法</b></p>
{% highlight sql %}
DROP TABLE table_name;
{% endhighlight %}
<p><b>实例：</b></p>
{% highlight sql %}
root@host# mysql -u root -p
Enter password:
mysql> use RUNOOB;
Datebase changed
mysql > DROP TABLE runnob_tbl
Query OK, 0 rows affected (0.8 sec)
{% endhighlight %}
<br>
<p>使用细节：</p>
<p>删除表内数据，用<b>delete</b>.格式为:</p>
{% highlight sql %}
delete from 表名 where 删除条件;
{% endhighlight %}
<p>实例：删除学生表内姓名为张三的记录。</p>
{% highlight sql %}
delete from student where T_name = "张三";
{% endhighlight %}
<p>清除表内数据，保存表结构，用<b>truncate</b>.格式为：</p>
{% highlight sql %}
truncate table 表名;
{% endhighlight %}
<p>实例：清除学生表内的所有数据。</p>
{% highlight sql %}
truncate table student;
{% endhighlight %}
<p>删除表用<b>drop</b>，就是啥都没了.格式为：</p>
{% highlight sql %}
drop table 表名;
{% endhighlight %}
<p>实例：删除学生表</p>
{% highlight sql %}
drop table student;
{% endhighlight %}
<p>1、当你不再需要该表时，用drop;</p>
<p>2、当你仍要保留该表，但要删除所有记录时，用<b>truncate</b>;</p>
<p>3、当你要删除部分记录时，用delete</p>
<br><br>
<p class="h3">MySQL插入数据</p>
<p><b>语法</b></p>
{% highlight sql %}
INSERT INTO table_name ( field1, field2,...fieldN )
                       VALUES
                       ( value1, value2,...valueN );
{% endhighlight %}
<p><b>实例</b></p>
<p>以下实例中我们将向runnob_tbl表插入三条数据;</p>
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
<p style="color:red"><b>读取数据表：</b></p>
{% highlight sql %}
select * from runoob_tb1;
{% endhighlight %}
