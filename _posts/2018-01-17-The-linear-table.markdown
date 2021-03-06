---
layout: post
title: "线性表"
subtitle: "I'll introduce the linear table to you!"
data: 2017-12-11
author: "Zxy"
tags:
    - C++
    - 数据结构
---
## 一、什么是线性表?

线性表是由称为元素(element)的数据项组成的一种有限且有序的序列。

它细分为顺序表和链表，这里主要以链式结构作为重点讨论。

线性表中不包含任何元素时，称之为空表，(`empty list`)。当前存储的元素数目成为线性表的长度（`length`)。线性表的开始节点称为表头(`head`)，结尾节点称为表尾(`tail`)。表中元素的值与它的位置可以有联系，也可以没有联系。比如有序线性表和无序线性表间的差别。

## 二、链表的ADT
{% highlight c++ %}
ADT List{
数据对象: D={ai| ai(-ElemSet,i=1,2,...,n,n>=0}
数据关系: R1={<ai-1,ai>| ai-1,ai(- D,i=2,...,n}
基本操作：
	InitList(&L)
	DestroyList(&L)
	ListInsert(&L,i,e)
	ListDelete(&L,i,&e)
	}ADT List
	ListInsert(List &L,int i,ElemType e)
	{if(i<1||i>L.length+) return ERROR;
	q=&(L.elem[i-1]);
	for(p=&(L.elem[L.length-1]);p>=q;--p) *(p+1)=*p;
	*q=e;
	++L.length;
	return OK;
}
{% endhighlight %}

## 三、线性表的物理实现
> (友情小贴士：文中会明确提到栅栏的概念，栅栏的意思实际上就是一个当前位置，在物理意义上，它将线性表分为两个部分，前面的一个部分为已经查找完的，后面的部分为未曾访问过的，这个概念的存在有助于我更好的阐释链表的一些基本概念)

1.链表的创建

  顺序表暂时不做讨论，这里重点来说链表的创建及各项基本操作。

  创建链表时首先需要创建一个节点类LNode，用来构造构成链表的内存空间，假设我们创建的是单链表，则LNode总共分为两个域，一个数据域，一个指针域，分别用来存当前节点的数据和下一节点的地址，地址就是指针，可以看做是连接整个线性表的桥梁。

  GNode就像建筑高层建筑的钢筋水泥，有了基础，就可以创建出线性表，这时需要再构建一个线性表类Llist，用来将钢筋水泥构造成高层建筑。

代码如下：
{% highlight c++ %}
template <typename T>
class Node
{
public :
	T _value;
	Node* _next;
public
	Node() = default;
	Node(T value, Node * next)
		: _value(value), _next(next){}
};

//单链表
template <typename T>
class SingleLink
{
public:
	typedef Node<T>*  pointer;
	SingleLink();
	~SingleLink();

	int size();						 //获取长度
	bool isEmpty();					 //判空

	Node<T>* insert(int index, T t); //在指定位置进行插入
	Node<T>* insert_head(T t);		 //在链表头进行插入
	Node<T>* insert_last(T t);		 //在链表尾进行插入

	Node<T>*  del(int index);		 //在指定位置进行删除
	Node<T>*  delete_head();		 //删除链表头
	Node<T>*  delete_last();		 //删除链表尾

	T get(int index);			     //获取指定位置的元素
	T get_head();					 //获取链表头元素
	T get_last();					 //获取链表尾元素

	Node<T>* getHead();				 //获取链表头节点

private :
	int count;
	Node<T> * phead;

private :
	Node<T> * getNode(int index);	  //获取指定位置的节点
};
{% endhighlight %}

2.链表的插入

  插入操作是链表的基本操作之一，链表与顺序表之间最大的差异就是在于插入删除节点的高效性，时间复杂度为Θ（1），这里简单用文字进行介绍。

  在插入一个节点NewNode的时候，首先要注意的是为该节点申请空间<span style="color:red">（在刚刚开始学数据结构的时候，对内存空间没有概念，很多次的没有注意到申请空间，因而出了很多问题，因此在这里友情提示。）</span>申请到空间以后,让NewNode的指针指向栅栏的下一个节点，栅栏的前一个节点的指针指向NewNode,不要将顺序搞反了。

代码如下：

{% highlight c++ %}
template <typename T>
Node<T>* SingleLink<T>::insert(int index, T t)
{
	Node<T> * preNode = phead;
	int k=0;
	while(k<index)
    {
        preNode = preNode->_next;
        k++;
    }
	if (preNode)
	{
		Node<T> *newNode = new Node<T>(t,preNode->_next); //构建新节点，构建时指明节点的next节点
		preNode->_next = newNode;
		count++;
		return newNode;
	}
	return NULL;
};
/*
从头部插入
*/
template <typename T>
Node<T>* SingleLink<T>::insert_head(T t)
{
	return insert(0, t);
};
/*
从尾部进行插入
*/
{% endhighlight %}

3.链表的删除

  链表的删除同样是链表的基本操作之一，删除同插入间相差不多，时间复杂度都为Θ（1），相对于顺序表而言会快很多。

  首先你要声明一个要删除的节点名称吧？为了用它来找到你要删除的那个节点<span style="color:red">(注意这里不要去为它申请空间)</span>，假设声明为`DelNode`，通过遍历找到你要删除的节点以后，让`DelNode`指向该删除节点，然后直接让栅栏的前一个节点的指针指向`DelNode`的下一个节点，完成这个操作以后，操作系统会自动断开`DelNode`在链表中的关联，所以此时直接`delete`删除`DelNode`这个被孤立出来的内存空间就好了。

代码如下：

{% highlight c++ %}
删除链表指定位置元素
*/
template <typename T>
Node<T>* SingleLink<T>::del(int index)
{
	if (isEmpty())
		return NULL;
	Node<T>* ptrNode = phead;
	for(int i=1;i<index;i++)
    {
        ptrNode = ptrNode->_next;
    }
	Node<T>* delNode = ptrNode->_next;
	ptrNode->_next = delNode->_next;
	count--;
	delete delNode;
	return ptrNode->_next;
};
{% endhighlight %}

4.链表的销毁

  在销毁链表的时候，我习惯于声明一个节点名称`pNode`用来完成遍历，然后再声明一个`delNode`用来在`pNode`遍历完成之后将其前一个节点进行删除，记住，是内存空间的删除，要用到`delete`，否则会**内存泄漏**的，当`pNode==NULL`的时候，代表整个链表访问完毕，再执行一次删除操作即可。

{% highlight c++ %}
/*
删除链表指定位置元素
*/
template <typename T>
Node<T>* SingleLink<T>::del(int index)
{
	if (isEmpty())
		return NULL;
	Node<T>* ptrNode = phead;
	for(int i=1;i<index;i++)
    {
        ptrNode = ptrNode->_next;
    }
	Node<T>* delNode = ptrNode->_next;
	ptrNode->_next = delNode->_next;
	count--;
	delete delNode;
	return ptrNode->_next;
};
/*
删除头节点
*/
template<typename T>
Node<T>* SingleLink<T>::delete_head()
{
	return del(0);
};
/*
删除尾节点
*/
template<typename T>
Node<T>*SingleLink<T>::delete_last()
{
	return del(count);
};
{% endhighlight %}