---
layout: post
title: "MySQL中的FROM子表建立"
subtitle: "Create FROM subtable in MySQL"
data: 2018-11-08
author: "Zxy"
tags:
    - mysql
---
> 版权声明：本文出自张晓翼的博客，转载必须注明出处。

转载请注明出处：

我们都知道在MySQL中的SELECT除了做查询用，还可以充当`from`和`where`的子语句。

当select放在from中的时候，它意思是将查询结果作为一个新的表给from。

而当select放在where中的时候，它的意思是将查询结果作为where的条件来使用。

先说说select放在where中的情况：

----------

### select放where中

{% highlight sql %}
where user_pet_rel.userId = (select user.Id from user where user.PhoneNumber = 'xxxxxxxxxx')
and user.Id = user_pet_rel.userId
and user_pet_rel.petId = pet.Id;
{% endhighlight %}

我们的`select user.Id from user where user.PhoneNumber = 'xxxxxxxxxx'`实际上查询出来的结果是一个user.Id = 3;

就相当于我们将3这个结果值返回给了user_pet_rel.userId，所以我们可以通过动态的改变user.PhoneNumber来获得它的Id值并赋给userId。

### select放在from中

和上面一样，但是有一点需要注意：我们必须要给from后的select创建出的子表一个别名才可以，不然的话会报错:

`Every derived table must have its own alias：每一个派生出来的表都必须有一个自己的别名`

所以我们构建下面这样一条语句：

{% highlight sql %}
select * from 
(select * from user where user.Id > 3) as t where t.Id < 6;
{% endhighlight %}