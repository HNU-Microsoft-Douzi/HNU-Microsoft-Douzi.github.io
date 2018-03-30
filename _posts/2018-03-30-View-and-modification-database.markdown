---
layout: post
data: 2018-03-30
title: "MySQL中数据库/表编码格式的查看和修改"
subtitle: "View and modification of database / table encoding format in MySQL"
author: "Zxy"
tags:
    - MySQL
---

### 对MySQL数据库中表或库编码格式的修改

1. 查看数据库编码格式

	mysql> show variables like 'character set database';

2. 查看数据表的编码格式

	mysql> show create table <表名>;

3. 创建数据库时指定数据库的字符集

	mysql> create database <数据库名> character set utf8;

4. 创建数据表时指定数据表的编码格式

	create table tb_books (
		name varchar(45) not null,
		price double not null,
		bookCount int not null,
		author varchar(45) not null) defatult charset = utf8;

5. 修改数据库的编码格式
	
	mysql>alter database <数据库名> character set utf8;

6. 修改数据表的编码格式

	mysql>alter table <表名> character set utf8;

7. 修改字段编码格式

	mysql>alter table <表名> change <字段名><字段名><类型> character set utf8;
	
	**实例**
	
	mysql>alter table user change username username varchar(20) character set utf8;