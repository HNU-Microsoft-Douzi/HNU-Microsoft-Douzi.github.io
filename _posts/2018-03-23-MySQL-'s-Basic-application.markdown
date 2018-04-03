---
layout: post
title: "MySQL的基本用法"
subtitle: "How to grasp MySQL's basic application?"
data: 2018-03-25
author: "Zxy"
tags:
    - MySQL
---
### MySQL连接
使用mysql二进制方式连接：

{% highlight sql %}
mysql -u root -p#利用root帐号，连接mysql服务器
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

### 从命令提示窗口中选择MySQL数据库
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

{% highlight sql %}
$ mysql> insert into mysql.user(Host,User,Password) values("localhost","test",password("1234"));
{% endhighlight %}

可能会报错：
ERROR <span style="color:blue">1364</span> (HY000): <span style="color:purple">Field</span> <span style="color:green">'ssl_cipher'</span> doesn't have a default value

`my-default.ini`中有一条语句：

制订了严格模式，为了安全，严格模式禁止通过insert这种形式直接修改mysql库中的user表进行添加新用户。

{% highlight sql %}
sql_mode=NO_ENGINE-SUBSTITUTION,STRICT_TRANS_TABLES
{% endhighlight %}

将`STRICT_TRANS_TABLS`删除掉之后即可使用insert添加

### 查看MySQL用户权限
查看当前用户（自己权限）：

{% highlight sql %}
show grants;
{% endhighlight %}

查看其他MySQL用户权限：

{% highlight sql %}
show grants for database@localhost;
{% endhighlight %}

### 撤销已经赋予给MySQL用户权限的权限
实例：

{% highlight sql %}
grand all on *.* to database@loacalhost;

revoke all on *.* from database@locakhost;
{% endhighlight %}

### 删除数据表
语法：

{% highlight sql %}
DROP TABLE table_name ;
{% endhighlight %}

### MySQL插入数据
MySQL表中使用INSERT INFO SQL语句来插入数据。
你可以通过mysql>命令提示窗口中向数据表中插入数据。

语法：

{% highlight sql %}
INSERT INTO table_name ( field1, field2,...fieldN )
                       VALUES
                       ( value1, value2,...valueN );
{% endhighlight %}

**实例**

{% highlight sql %}
root@host# mysql -u root -p password;
Enter password:*******
mysql> use RUNOOB;
Database changed
mysql> INSERT INTO runoob_tbl 
    -> (runoob_title, runoob_author, submission_date)
    -> VALUES
    -> ("学习 PHP", "菜鸟教程", NOW());
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

**<span style="color:red">读取数据表：</span>**
{% highlight sql %}
select * from runoob_tbl;
{% endhighlight %}

### MySQL grand/revoke用户权限注意事项
1. `grant,revoke`用户权限后，该用户只有重新链接MySQL数据库，权限才能生效。

2. 如果想让授权的用户，也可以将这些权限grand给其他用户，需要选项`grand option`

{% highlight sql %}
grant select on testdb.* to database@localhost with grant option;
{% endhighlight %}

**注：实际中，数据库最好由DBA来统一管理。**

**创建完成后需要执行`FLUSH PRIVILEGES`语句。**

### MySQL查询数据
MySQL数据库使用SQL SELECT语句来查询数据。

**语法**

{% highlight sql %}
SELECT column_name,column_name
FROM table_name
[WHERE Clause]
[LIMIT N][ OFFSET M]
{% endhighlight %}
<br>
- 查询语句中你可以使用一个或者多个表，表之间使用逗号(,)分割，并使用WHERE语句来设定查询条件。


- SELECT 命令可以读取一条或者多条记录。


- 你可以使用星号（*）来代替其他字段，SELECT语句会返回表的所有字段数据。


- 你可以使用 WHERE 语句来包含任何条件。


- 你可以使用 LIMIT 属性来设定返回的记录数。


- 你可以通过OFFSET指定SELECT语句开始查询的数据偏移量。默认情况下偏移量为0。

### MySQL WHERE子句

利用where语句可以读取从表中选择性的读取数据。

**语法**

{% highlight sql %}
SELECT field1, field2,...fieldN FROM table_name1, table_name2...
[WHERE condition1 [AND [OR]] condition2.....
{% endhighlight %}

- 查询语句中你可以使用一个或者多个表，表之间使用逗号, 分割，并使用WHERE语句来设定查询条件。
- 你可以在WHERE子句中指定任何条件。
- 你可以使用 AND 或者 OR 指定一个或多个文件。
- WHERE子句也可以运用于SQL的DELETE或者UPDATE命令。
- WHERE子句类似于程序语言中的if条件，根据MySQL表中的字段值来读取指定的数据。

**如果在WHERE 后面加了BINARY，代表查询的数据是区分大小写的，这个时候应该特别注意。**

**实例**

{% highlight sql %}
SELECT * from runoob_tbl WHERE BINARY runoob_author = "AbCDe";
{% endhighlight %}

### 创建数据表
创建MySQL数据表需要以下信息：

- 表名

- 表字段名

- 定义每个表字段

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
<p style="color:red">操作MySQL的删除数据表的操作时，需要注意，一旦将数据表删除，其内的数据会全部消失。</p>

**语法**

{% highlight sql %}
DROP TABLE table_name;
{% endhighlight %}

**实例：**

{% highlight sql %}
root@host# mysql -u root -p
Enter password:
mysql> use RUNOOB;
database changed
mysql > DROP TABLE runnob_tbl
Query OK, 0 rows affected (0.8 sec)
{% endhighlight %}

使用细节：

删除表内数据，用<b>delete</b>格式为:

{% highlight sql %}
delete from 表名 where 删除条件;
{% endhighlight %}

实例：删除学生表内姓名为张三的记录。

{% highlight sql %}
delete from student where T_name = "张三";
{% endhighlight %}

清除表内数据，保存表结构，用<b>truncate</b>格式为：

{% highlight sql %}
truncate table 表名;
{% endhighlight %}

实例：清除学生表内的所有数据。

{% highlight sql %}
truncate table student;
{% endhighlight %}

删除表用<b>drop</b>，就是啥都没了.格式为：

{% highlight sql %}
drop table 表名;
{% endhighlight %}

实例：删除学生表

{% highlight sql %}
drop table student;
{% endhighlight %}

1. 当你不再需要该表时，用drop;

2. 当你仍要保留该表，但要删除所有记录时，用<b>truncate</b>;

3. 当你要删除部分记录时，用delete

### MySQL UPDATE查询

修改或更新MySQL中的数据

**语法**

{% highlight sql %}
UPDATE table_name SET field1=new-value1, field2=new-value2
[WHERE Clause]
{% endhighlight %}

- 你可以同时更新一个或多个字段。


- 你可以在WHERE子句中指定任何条件。


- 你可以在一个单独表中同时更新数据。


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

<b>读取数据表：</b>

{% highlight sql %}
select * from runoob_tb1;
{% endhighlight %}
<br>
### MySQL LIKE子句

利用`WHERE`可以由<b>=</b>来判断完整的字段进行数据的选择。

但有时我们判断不能单单由完整的表段进行判断，还需要更细化的判断其内的具体内容，比如：

我们需要获取runoob_author字段中含有"COM"字符的所有记录，这时我们就需要在WHERE子句中使用SQL LIKE子句。

SQL LIKE子句中使用百分号`%`字符来表示任意字符，类似于UNIX或正则表达式中的星号*。

- 你可以在WHERE子句中指定任何条件。


- 你可以在WHERE子句中使用LIKE子句。


- 你可以使用LIKE子句代替等号 = 。


- LIKE通常与 % 一同使用，类似于一个元字符的搜索。


- 你可以使用AND或者OR制定一个或多个条件。


- 你可以在DELETE或UPDATE命令中使用WHERE...LIKE子句来指定条件。

**语法**

{% highlight sql %}
SELECT field1, field2, ..., fieldN
FROM table_name
WHERE field1 LIKE condition1 [AND [OR]] field2 = 'somevalue'
{% endhighlight %}

<b>实例</b>

{% highlight sql %}
mysql> use RUNOOB;
Database changed
mysql> SELECT * from runoob_tbl  WHERE runoob_author LIKE '%COM';
+-----------+---------------+---------------+-----------------+
| runoob_id | runoob_title  | runoob_author | submission_date |
+-----------+---------------+---------------+-----------------+
| 3         | 学习 Java   | RUNOOB.COM    | 2015-05-01      |
| 4         | 学习 Python | RUNOOB.COM    | 2016-03-06      |
+-----------+---------------+---------------+-----------------+
2 rows in set (0.01 sec)
{% endhighlight %}
<br>
**如果没有百分号`%`，LIKE子句与等号`=`的效果是一样的。**

**在实际操作中，runoob_title不可以被分开选择，否则会查找不到，runoob_author可以被切割，submission_date是纯粹的日期而不是字符串，判断的时候可以直接用`>`或`<`进行日期的比对进行选择。**
<br>
### MySQL UNION操作符

MySQL UNION操作符用来连接两个以上的SELECT语句的结果组合到一个结果集合中。多个SELECT语句会删除重复的数据。

**语法**

{% highlight sql %}
SELECT expression1, expression2, ..., expression_n
FROM tables
[WHERE conditions]
UNION [ALL | DISTINCT]
SELECT expression1, expression2, ..., expression_n
FROMtables
[WHERE CONDITIONS]; 
{% endhighlight %}
<br>
- expression1, expression2, ... expression_n: 要检索的列。


- tables: 要检索的数据表。


- WHERE conditions: 可选， 检索条件。


- DISTINCT: 可选，删除结果集中重复的数据。默认情况下 UNION 操作符已经删除了重复数据，所以 DISTINCT 修饰符对结果没啥影响。


- ALL: 可选，返回所有结果集，包含重复数据。

**在SELECT中选择了几个参数之后产生的表就有几列。**

**UNION没有加ALL的话，默认为选择两表中选择的数据以集合的形式合成一个新的表。**

**UNION加了ALL的话，默认为两表中选择的数据合成一个新的表，但这个新的表中会有重复元素的出现。**

### MySQL排序

如果我们需要对读取的数据进行排序，就可以使用MySQL的**ORDER BY**子句来设定你想按哪个字段哪种方式进行排序，再返回搜索结果。

**语法**

{% highlight sql %}
SELECT field1, field2,...fieldN table_name1, table_name2...
ORDER BY field1, [field2...] [ASC [DESC]]
{% endhighlight %}
<br>
- 你可以使用任何字段来作为排序的条件，从而返回排序后的查询结果。


- 你可以设定多个字段来排序。


- 你可以使用ASC或DESC关键字来设置查询结果是按升序或降序排列。默认为升序排列。


- 你可以添加WHERE...LIKE子句来设置条件。

### MySQL GROUP BY语句
GROUP BY语句根据一个或多个列对结果集进行分组。

在分组的列上我们可以使用COUNT，SUM，AVG，等函数。

**GROUP BY语法**

{% highlight sql %}
SELECT column_name, function(column_name)
FROM table_name
WHERE column_name operator value
GROUP BY column_name;
{% endhighlight %}

**实例**

将下列数据导入RUNOOB下的表employee_tbl中
{% highlight sql %}
    INSERT INTO `employee_tbl` VALUES ('1', '小明', '2016-04-22 15:25:33', '1'), ('2', '小王', '2016-04-20 15:25:47', '3'), ('3', '小丽', '2016-04-19 15:26:02', '2'), ('4', '小王', '2016-04-07 15:26:14', '4'), ('5', '小明', '2016-04-11 15:26:40', '4'), ('6', '小明', '2016-04-04 15:26:54', '2');
    COMMIT;
{% endhighlight %}
<br>
导入成功后，得到表如下：

{% highlight sql %}
    +----+--------+---------------------+--------+
    | id | name   | date                | singin |
    +----+--------+---------------------+--------+
    |  1 | 小明 | 2016-04-22 15:25:33 |      1 |
    |  2 | 小王 | 2016-04-20 15:25:47 |      3 |
    |  3 | 小丽 | 2016-04-19 15:26:02 |      2 |
    |  4 | 小王 | 2016-04-07 15:26:14 |      4 |
    |  5 | 小明 | 2016-04-11 15:26:40 |      4 |
    |  6 | 小明 | 2016-04-04 15:26:54 |      2 |
    +----+--------+---------------------+--------+
{% endhighlight %}
<br>
接下来我们使用 GROUP BY 语句 将数据表按名字进行分组，并统计每个人有多少条记录：

{% highlight sql %}
    mysql> SELECT name, COUNT(*) FROM   employee_tbl GROUP BY name;
    +--------+----------+
    | name   | COUNT(*) |
    +--------+----------+
    | 小丽 |        1 |
    | 小明 |        3 |
    | 小王 |        2 |
    +--------+----------+
    3 rows in set (0.01 sec)
{% endhighlight %}
<br>
**使用 WITH ROLLUP**

WITH ROLLUP 可以实现在分组统计数据基础上再进行相同的统计（SUM,AVG,COUNT…）。

例如我们将以上的数据表按名字进行分组，再统计每个人登录的次数：

{% highlight sql %}
    mysql> SELECT name, SUM(singin) as singin_count FROM  employee_tbl GROUP BY name WITH ROLLUP;
    +--------+--------------+
    | name   | singin_count |
    +--------+--------------+
    | 小丽 |            2 |
    | 小明 |            7 |
    | 小王 |            7 |
    | NULL   |           16 |
    +--------+--------------+
    4 rows in set (0.00 sec)
{% endhighlight %}

如果要改变NULL的名称，则利用coalesce(a,b,c)方法:
    
select coalesce(a,b,c);

参数说明:

如果a==null,则选择b；如果b==null,则选择c；如果a!=null,则选择a；如果a b c 都为null ，则返回为null（没意义）。

以下实例中如果名字为空我们使用总数代替：

{% highlight sql %}
mysql> SELECT coalesce(name, '总数'), SUM(singin) as singin_count FROM  employee_tbl GROUP BY name WITH ROLLUP;
+--------------------------+--------------+
| coalesce(name, '总数') | singin_count |
+--------------------------+--------------+
| 小丽                   |            2 |
| 小明                   |            7 |
| 小王                   |            7 |
| 总数                   |           16 |
+--------------------------+--------------+
4 rows in set (0.01 sec)
{% endhighlight %}
<br>
### MySQL连接的使用

从多个数据表中读取数据。

JOIN 按照功能大致分为如下三类：

- **INNER JOIN（内连接，或等值链接）**:获取两个表中字段匹配关系的记录。


- **LEFT JOIN(左连接)**：获取左表所有记录，即使右表没有对应匹配的记录。


- **RIGHT JOIN（右连接）**：与LEFT JOIN相反，获取右表所有记录。 

实例见[这里](http://www.runoob.com/mysql/mysql-join.html)

个人理解：INNER JOIN就是将多个表连接起来，从两个表中找出共同的信息并展示成一个新的表。

LEFT JOIN会以左边的表为参照，结果会列出左边表单的所有数据，如果右边表单中没有与之对应的，则列出NULL。

Right JOIN的理解与上面的LEFT JOIN相反。

### MySQL NULL 值处理
MySQL中若是要查找值为NULL的数据，单纯的`==NULL`和`!=NULL`是没有效果的，这样查询的话，返回的结果一定是空，由于这个原因，MySQL提供了两个函数和一个比较符作为解决办法。

- **IS NULL**: 当列的值是 NULL,此运算符返回 true。


- **IS NOT NULL**: 当列的值不为 NULL, 运算符返回 true。


- **<=>**: 比较操作符（不同于=运算符），当比较的的两个值为 NULL 时返回 true。

### MySQL事务处理的两种办法：
1、用BEGIN,ROLLBACK,COMMIT来实现。

- **BEGIN**开始一个事务


- **ROLLBACK**事务回滚


- **COMMIT**事务确认

2、直接用SET来改变MySEL的自动提交模式

- **SET AUTOCOMMIT=0**禁止自动提交


- **SET AUTOCOMMIT=1**开启自动提交

### MySQL ALTER命令

当我们需要修改数据表名或者修改数据表字段时，就需要使用到MySQL ALTER命令。

**删除，添加或修改表字段**

如下命令使用了 ALTER 命令及 DROP 子句来删除以上创建表的 i 字段：

{% highlight sql %}
mysql> ALTER TABLE testalter_tbl  DROP i;
{% endhighlight %}

> 如果数据表中只剩余一个字段则无法使用DROP来删除字段

i 字段会自动添加到数据表字段的末尾。

{% highlight sql %}
mysql> ALTER TABLE testalter_tbl ADD i INT;
{% endhighlight %}

**查看当前表的信息**

{% highlight sql %}
sql> SHOW COLUMNS FROM testalter_tbl;
{% endhighlight %}

#### 修改字段类型及名称

如果需要修改字段类型及名称，你可以在ALTER命令中使用MODIFY或CHANGE子句。

例如，把字段c的类型从CHAR(1）改为CHAR(10)，可以执行以下命令：

{% highlight sql %}
mysql> ALTER TABLE testalter_tbl MODFY c CHAR(10);
{% endhighlight %}

**CHANGE**的语法与**MODIFY**有所不同，如下:

{% highlight sql %}
mysql> ALTER TABLE testalter_tbl CHANGE i j BIGINT;
{% endhighlight %}

指定字段 j 为 NOT NULL 且默认值为100。

{% highlight sql %}
mysql> ALTER TABLE testalter_tbl 
    -> MODIFY j BIGINT NOT NULL DEFAULT 100;
{% endhighlight %}

### 修改表名

如果需要修改数据表的名称，可以在 ALTER TABLE 语句中使用 RENAME 子句来实现。

尝试以下实例将数据表 testalter_tbl 重命名为 alter_tbl：

{% highlight sql %}
mysql> ALTER TABLE testalter_tbl RENAME TO alter_tbl;
{% endhighlight %}

### MySQL复制表

命令：**INSERT　INTO...SELECT**

MYSQL复制表的两种方式：

**一、只复制表结构到新表**
{% highlight sql %}
create table 新表 select * from 旧表 where 1=2

或者

create table 新表 like 旧表 
{% endhighlight %}


**二、复制表结构及数据到新表**

{% highlight sql %}
create table新表 select * from 旧表 
{% endhighlight %}

### MySQL元数据
有时我们会需要直到MySQL的以下三种信息：

- 查询结果信息：SELECT，UPDATE 或 DELETE语句影响的记录数。


- 数据库和数据表的信息：包含了数据库及数据表的结构信息。


- MySQL服务器信息：包含了数据库服务器的当前状态，版本号等。

**语句**

SELECT VERSION()   服务器版本信息。

SELECT DATABASE()  当前数据库名(或者返回空)

SELECT USER()       当前用户名

SHOW STATUS        服务器状态

SHOW VARIABLES     服务器配置变量


### MySQL序列使用

MySQL的序列是一组递增的序列，通常我们设置时，它可以实现从0开始的自动递增，然而通过AUTO_INCREMENT方法，我们可以改变序列的值使其初始位置不再从0开始。

**设置序列的开始值**

{% highlight sql %}
mysql> CREATE TABLE insect
    -> (
    -> id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    -> PRIMARY KEY (id),
    -> name VARCHAR(30) NOT NULL, 
    -> date DATE NOT NULL,
    -> origin VARCHAR(30) NOT NULL
)engine=innodb auto_increment=100 charset=utf8;
{% endhighlight %}
<br>
或者：
<br>
{% highlight sql %}
mysql> ALTER TABLE t AUTO_INCREMENT = 100;
{% endhighlight %}
<br>
### 如何利用MySQL处理重复的数据

**防止表中出现重复数据**

方法：**PRIMARY KEY(主键，且主键可以有多个)** 或者 **UNIQUE(唯一)**

不加以设置的话，默认允许表中出现重复数据。

如果我们设置了`UNIQUE`索引的话，当我们插入同样的数据，SQL语句将停止执行，并抛出一个错误。

INSERT IGNORE INTO与INSERT INTO的区别就是INSERT IGNORE会忽略数据库中已经存在的数据，如果数据库没有数据，就插入新的数据，如果有数据的话就跳过这条数据。这样就可以保留数据库中已经存在数据，达到在间隙中插入数据的目的。

以下实例使用了INSERT IGNORE INTO，执行后不会出错，也不会向数据表中插入重复数据：

{% highlight sql %}
mysql> INSERT IGNORE INTO person_tbl (last_name, first_name)
    -> VALUES( 'Jay', 'Thomas');
Query OK, 1 row affected (0.00 sec)
mysql> INSERT IGNORE INTO person_tbl (last_name, first_name)
    -> VALUES( 'Jay', 'Thomas');
Query OK, 0 rows affected (0.00 sec)
{% endhighlight %}

更多关于**统计重复数据**、**过滤重复数据**、**删除重复数据**详情见[这里](http://www.runoob.com/mysql/mysql-handling-duplicates.html)

### MySQL导出数据
**使用 SELECT ... INTO OUTFILE 语句导出数据**

实例：

{% highlight sql %}
mysql> SELECT * FROM runoob_tbl 
    -> INTO OUTFILE '/tmp/tutorials.txt';
{% endhighlight %}
<br>
在下面的例子中，生成一个文件，各值用逗号隔开。这种格式可以被许多程序使用。
<br>
{% highlight sql %}
SELECT a,b,a+b INTO OUTFILE '/tmp/result.text'
FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\n'
FROM test_table;
{% endhighlight %}
<br>
SELECT ... INTO OUTFILE 语句有以下属性:

- LOAD DATA INFILE是SELECT ... INTO OUTFILE的逆操作，SELECT句法。为了将一个数据库的数据写入一个文件，使用SELECT ... INTO OUTFILE，为了将文件读回数据库，使用LOAD DATA INFILE。


- SELECT...INTO OUTFILE 'file_name'形式的SELECT可以把被选择的行写入一个文件中。该文件被创建到服务器主机上，因此您必须拥有FILE权限，才能使用此语法。


- 输出不能是一个已经存在的文件，防止文件被篡改。


- 你需要有一个登录服务器的帐号来检索文件。否则SELECT...INTO OUTFILE 不会起任何作用。


- 在UNIX中，该文件被创建后是可读的，权限由MySQL服务器所拥有。这意味着，虽然你可以读取该文件，但可能无法将其删除。

#### 导出SQL格式的数据
**导出SQL格式的数据到指定文件**

{% highlight sql %}
$ mysqldump -u root -p RUNOOB runoob_tbl > dump.txt;
{% endhighlight %}
<br>
**导出整个数据库的数据**

{% highlight sql %}
$ mysqldump -u root -p RUNOOB > database_dump.txt
{% endhighlight %}
<br>
**备份所有数据库**

{% highlight sql %}
$ mysqldump -u root -p --all-databases > database_dump.txt
{% endhighlight %}
<br>
### 将数据表及数据库拷贝至其他主机
**将备份的数据库导入到MySQL服务器中**

{% highlight sql %}
$ mysql -u root -p database_name < dump.txt
{% endhighlight %}
<br>
**将导出的数据直接导入到远程的服务器上，但要确保两个服务器相通**

{% highlight sql %}
$ mysqldump -u root -p database_name | mysql -h other-host.com database_name
{% endhighlight %}
<br>
> 利用了管道将导出的数据导入到指定的远程主机上。

**将指定主机的数据库拷贝到本地**
{% highlight sql %}
mysqldump -h other-host.com -p port -u root -p database_name > dump.txt
{% endhighlight %}
<br>
### MySQL导入数据

**使用LOAD DATA导入数据**

以下实例中将从当前目录中读取文件 dump.txt ，将该文件中的数据插入到当前数据库的 mytbl 表中。

{% highlight sql %}
mysql > LOAD DATA LOCAL INFILE 'dump.txt' INTO TABLE mytbl;
{% endhighlight %}
<br>
## 数值类型

TINYINT小整数值

SMALLINT小整数值

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