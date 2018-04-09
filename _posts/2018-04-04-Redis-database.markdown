---
layout: post
title: "Redis的基本语法"
subtitle: "How to grasp Redis's basic application?"
data: 2018-04-04
author: "Zxy"
tags:
    - 数据库
---

> 本章节部分内容转自[菜鸟教程](http://www.runoob.com/redis/),记录在这里主要是为了方便学习的时候查阅使用，侵权即删。
redis的string可以包含任何数据，甚至于jpg图片或者一个序列化对
**特性**

谈谈我的理解，Redis是一款开源免费的非关系型数据库，它不像MySQL那样是以表之间的形式来表示，因为表内的内容有很强的关联性，Redis是一款高性能的key-value数据库，它有下面几个特点：

- 支持数据的持久化，Redis性能很强，因为它在内存中操作数据，但是同时它会支持数据的持久性，也就是说，它会在一个时间段将数据存入硬盘中。

- Redis还支持多种数据类型，比如list, set, zset, hash等数据结构，这样的话就满足了我要做项目的存储功能。

- Redis支持数据的备份。
 
- Redis支持事务的原子性，什么是原子性呢？也就是说在一个事务中，A和B要么同时成功要么同时失败。比如：银行中A给B转了10000元，然后发生了故障，那么结果就必须是转账失败，A的钱没有转出去，B也不能收到这比钱，对两个人而言，是同时失败了。通过MULTI和EXEC指令包起来。


**开启Redis** 

在我们配置好环境变量以后，每次打开Redis就变得很方便了，直接在命令行中输入：`redis-server.exe`就可以开启redis数据库。

开启数据库以后，这个命令窗口不要关，可以把这个窗口想象成我们的Redis终端，一旦它被关闭了，那么其他主机就无法连接上去了。

所以，有了终端，我们就要另外开启一个窗口充当一个客户端对终端进行访问：`redis-cli.exe -h 127.0.0.1 -p 6379`

**在远程服务上执行命令**

语法：

`redis-cli -h host -p port -a password`

### Redis支持的数据类型

Redis支持五种数据类型：`string`(字符串)，`hash`(字符串)，`list`(列表)，`set`(集合)及`zset`(sorted set:有序集合) 

#### String

redis的string可以包含任何数据，甚至于jpg图片或者一个序列化对象。

**实例**
<br>
{% highlight redis %}
127.0.0.1:6379> SET MyName "ZhangMochen"
OK
127.0.0.1:6379> GET MyName 
"Zhang Mochen"
{% endhighlight %}
<br>
#### Hash

我所理解的Hash结构可以相当于python中的字典，一个Hash表有对应的key和value,本来python的字典就是由hash表构造的新型数据结构。

并且令人震惊的一点是，Redis的Hash可以存取的键对总共有2^32-1对（接近40多亿）。

#### 实例
<br>
{% highlight redis %}
redis> HMSET myhash field1 "Hello" field2 "World"
"OK"
redis> HGET myhash field1
"Hello"
redis> HGET myhash field2
"World"
{% endhighlight %}
<br>

#### List

List就像是一个双端队列，我们可以从左边向内插入数据，也可以从右边向内插入数据。
<br>
{% highlight rediq %}
redis 127.0.0.1:6379> lpush runoob redis
(integer) 1
redis 127.0.0.1:6379> lpush runoob mongodb
(integer) 2
redis 127.0.0.1:6379> lpush runoob rabitmq
(integer) 3
redis 127.0.0.1:6379> lrange runoob 0 10
1) "rabitmq"
2) "mongodb"
3) "redis"
redis 127.0.0.1:6379>
{% endhighlight %}
<br>

<b style="color:red">当使用lrange显示所有的数据时，它默认为左开右闭。</b>

#### Set

Redis的Set是String类型的无序集合。
集合是通过哈希表实现的，所以不论是添加，删除还是查找的时间复杂度都是O(1)。

**sadd命令**
 
添加一个string元素到key对应的set集合中，成功的话，返回1。如果元素已经在集合中，那么就会返回0.
<br>
{% highlight redis %}
sadd key member
{% endhighlight %}
<br>

#### Zset

zset的成员是唯一的,但分数(score)却可以重复。

<br>
{% highlight redis %}
zadd key score member
{% endhighlight %}
<br>

### Redis键(key)

Redis键命令用于管理redis的键


**下面是一些常用的key命令**

1.key存在时删除key

`DEL key`

2.检查给定KEY是否存在

`EXISTS key`

3.为给定key设置过期时间，如果到了过期时间，就会自动`DEL`对应的key。

`EXPIRE key seconds`

4.查找所有符合给定模式的key

`KEYS pattern`

5.将当前数据库的key移动到给定的数据库db中。

`MOVE key db`

6.移除key的过期时间，key将持久保持。

`PERSIST key`

7.RANDOMKEY

`从当前数据库中随机返回一个key`

8.修改key的名称

`RENAME key newkey`

9.返回key所存储的值的类型。

`TYPE key`

**下面是一些常用的String命令**

1.设置指定key的值

`SET key value`

2.获取指定key的值

`GET key`

3.返回key中字符串值的子字符串(字符串从0开始，左右双闭区间)

`GETSET key value`

4.将给定key的值设为value，并返回key的旧值。

`GETSET key value`

5.获取所有给定key的值

`MGET key[key2...]`

实例：
<br>
{% highlight redis %}
redis 127.0.0.1:6379> SET key1 "hello"
OK
redis 127.0.0.1:6379> SET key2 "world"
OK
redis 127.0.0.1:6379> MGET key1 key2 someOtherKey
1) "Hello"
2) "World"
3) (nil)
{% endhighlight %}
<br>

6.返回字符串key所存储的字符串值的长度

`STRLEN key`

7.同时设置一个或多个key-value对

`MSETNX key value[key value]`

8.让key中储存的数字值增一

`INCR key`

9.让key中储存的数字值减一

`DECR key`

**下面是一些常用的Hash命令**

1.删除一个或多个哈希表字段

`HDEL key field1[field2]`

2.查看哈希表key中，指定的字段是否存在

`HEXISTS key field`

3.获取存储在哈希表中指定字段的值

`HGET key field`

4.获取所有哈希表中的字段

`HEKEYS key`

5.获取哈希表中字段的数量

`HLEN key`

6.获取所有给定字段的值

`HMGET key field1[field2]`

7.同时将多个field-value对设置到哈希表key中

`HMSET key field1 value1[field2 value2]`

8.将哈希表key中的字段field的值设为value

`HSET key field value`

9.获取哈希表中所有值

`HVALS key`

**下面是一些常用的List命令**

1.移出并获取列表的第一个元素， 如果列表没有元素会阻塞列表直到等待超时或发现可弹出元素为止。

`BLPOP key1 [key2 ] timeout `

2.移出并获取列表的最后一个元素， 如果列表没有元素会阻塞列表直到等待超时或发现可弹出元素为止。

`BRPOP key1 [key2 ] timeout `

3.从列表中弹出一个值，将弹出的元素插入到另外一个列表中并返回它； 如果列表没有元素会阻塞列表直到等待超时或发现可弹出元素为止。

`BRPOPLPUSH source destination timeout `

4.通过索引获取列表中的元素

`LINDEX key index`

5.在列表的元素前或后插入元素

`LINSERT key BEFOREIAFTER pivot value`

6.获取列表长度

`LLEN key`

7.移除并获取列表的第一个元素

`LPOP key`

8.将一个或多个值插入到列表头部

`LPUSH key value1 [value2]`

9.获取列表指定范围内的元素

`LRANGE key start stop`

10.移除列表元素

`LREM key count value`

11.通过索引设置列表元素的值

`LSET key index value`

12.移除并获取列表最后一个元素

`RPOP key`

13.移除列表的最后一个元素，并将该元素添加到另一个列表并返回。

`RPOPLPUSH source destination`

14.在列表中添加一个或多个值

`RPUSH key value1[value2...]`

15.为已存在的列表添加值

`RPUSH key value`

**下面是一些常用的Set命令**

1.向集合添加一个或多个成员

`SADD key member1 [member2] `

2.获取集合的成员数

`SCARD key `

3.判断 member 元素是否是集合 key 的成员

`SISMEMBER key member `

4.返回集合中的所有成员

`SMEMBERS key `

5.移除并返回集合中的一个随机元素

`SPOP key `

其余关于交并集的内容详情点击[这里](http://www.runoob.com/redis/redis-sets.html);

### Redis发布订阅

Redis有一个分布式的通信方式，我们通常把它称作订阅命令，什么是订阅命令呢？

当我们在客户端新建了一个订阅频道channel时，下面再连接几个客户端，然后当有新的消息通过`PUBLISH`命令发送给频道channel时，这个消息会同时被发给下面连接的几个客户端。

就像下面这个图片

<img src="http://www.runoob.com/wp-content/uploads/2014/11/pubsub2.png">

**常用订阅命令如下**

1.订阅一个或多个符合给定模式的频道。

`PSUBSCRIBE pattern [pattern ...] `

2.查看订阅与发布系统状态。

`PUBSUB subcommand [argument [argument ...]] `

3.将消息发送到指定模式的频道。

`PUBLISH channel message`

4.退订所有给定模式的频道。

`PUNSUBSCRIBE [pattern [pattern ...]] `

5.订阅给定的一个或多个频道的信息。

`SUBSCRIBE channel [channel ...] `

6.指退订给定的频道。

`UNSUBSCRIBE [channel [channel ...]] `

### 事务

Redis同时支持事务属性，我们知道事务对于一个数据库而言是不可或缺的重要属性，它囊括着数据库的实际应用中的数据安全性。

一个事务从开始到执行会经历以下三个阶段：

- 开始事务

- 命令入队

- 执行事务

**事务常用的命令**

1.取消事务，放弃执行事务块内的所有命令

`DISCARD`

2.执行所有事务块内的命令

`EXEC`

3.标记一个事务块的开始

`MULTI`

4.取消WATCH命令对所有key的监视

`UNWATCH`

5.监视一个(或多个) key ，如果在事务执行之前这个(或这些) key 被其他命令所改动，那么事务将被打断。

`	WATCH key [key ...]`

### Redis脚本

执行脚本的常用命令为`EVAL`。

常见脚本命令见[这里](http://www.runoob.com/redis/redis-scripting.html)


### Redis连接

Redis链接命令主要是用于连接redis服务。

**Redis连接命令**

1.验证密码是否正确

`AUTH password`

2.打印字符串

`ECHO message`

3.查看服务是否运行

`PING`

4.关闭当前连接

`QUIT`

5.切换到指定的数据库

`SELECT index`


**其他常用命令，可以点击[这里](https://www.cnblogs.com/kevinws/p/6281395.html)。**