---
layout: post
title: "python中类的继承"
subtitle: "Bring you to feel python's class is how to achieve inheritance!"
data: 2018-03-04
author: "Zxy"
tags:
    - python
---
## python中什么是继承？
<ul>
<li>新类不必从头编写</li>
<li>新类从现有的类继承，就自动拥有了现有类的所有功能</li>
<li>新类只需要编写现有类缺少的新功能</li>
</ul>
<br>

## 继承的好处？
<ul>
<li>复用已有代码</li>
<li>自动拥有了现有类的所有功能</li>
<li>只需要编写缺少的新功能</li>
</ul>
<br>

## python继承的特点：
<ul>
<li>子类和父类是is关系</li>
<li>总是从某个类继承</li>
<li>不要忘记调用super().init</li>
</ul>
<br>

实例：

{% highlight python %}
class Person(object):
	def __init_(self, name, gender):
		self.name = name
		self.gender = gender

class Teacher(Person):
	def __inif__(self, name, gender, course):
		super(Teacher, self).init(name, gender)
		self.course = course

t = Teacher('Alice', 'Female', 'English')
print t.name
print t.course
{% endhighlight %}