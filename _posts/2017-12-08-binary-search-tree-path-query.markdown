---
layout:		post
title:		"二叉查找树之路径查询"
subtitle:	"Binary search tree path query."
data:		2017-12-08 17:03:00
author: 	"Zxy"
catalog: true
tags:
    - 数据结构
    - C++
---

## 一、什么是二叉查找树？

二叉查找树`(Binary Search Tree)`，又称二叉排序树，又叫做二叉搜索树。
>(详细的介绍自己百度，这里不过多阐述。)

## 二、关于二叉查找树的定义!

二叉查找数是基于二叉树之上的一种数据存储结构，它独特的数据存储方式让数据的查询变得简单。
   
对于二叉查找树的每一个节点，都存在一个`key`值和两个指针域`lchild`(左孩子),`rchild`(右孩子)，对于每一个节点而言，它的`key`值比它的左子树上任意一个节点的`key`值都大，它的`key`值比之右子树任意一个节点的key值都要小。
   <img src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4069109802,904910852&fm=27&gp=0.jpg">


## 三、对二叉查找树实现的核心思想

我们在这里额外设置一个pparent指针用来指向每个节点的父节点，这样做的好处是便于查找指定节点的双亲节点，也就是说，以下的操作会将树的双亲表示法和孩子表示法联立在一起，关于树的表示法甚至是图的表示法，这里不多做讨论，会在其它的章节中做一个总结。

详细代码如下：
{% highlight c++ %}
//构造节点类	
class Node
{
public:
    Node():data(0),pparent(NULL),lchild(NULL),rchild(NULL) {};
    Node(int k):data(k),pparent(NULL),lchild(NULL),rchild(NULL) {};
public:
    int data;
    Node* pparent;
    Node* lchild;
    Node* rchild;
};//双亲孩子表示法，查找双亲和孩子都非常方便
//构造二叉查找树
class BSTree
{
public:
    BSTree();
    void insert(int k);
    bool search(int k);//当查找到以后，我要求你返回整个查找树的路径
    void preOrder();
    void show_path();
private:
    void insert(Node* p, int k);
    bool search(Node* p, int k);
    void preOrder(Node *p);
private:
    Node* root;
    stack<int> array;//用来存储树中遍历的路径
    int size;
    int search_count;//用来控制查找时树的遍历元素个数
    bool flag = false;
};
	bool flag = false;
};
{% endhighlight %}
### 插入函数的核心思想
对于查询二叉树而言，它的输入方式以层序的方式进行存入，但是为了满足查询二叉树的特点，我们需要在构建整颗树的过程中对树的状态不断进行调整**（这一点的思想在AVL中尤其重要）**，使其始终满足节点'key'值大于左子树'key'值而小于右子树'key'值，了解了这个以后，我们便可以通过递归地方式对整棵树进行插入操作。

详细代码如下：
{% highlight c++ %}
void BSTree::insert(int k)
{
    insert(root,k);
}

void BSTree::insert(Node* p,int k)
{
    size++;
    Node *parent = p;
    if(root->data == NULL)
    {
        root->data = k;
        return;
    }
    else
    {
        if(k < p->data)
        {
            if(p->lchild == NULL)
            {
                Node *newNode = new Node(k);
                newNode->pparent = p;
                p->lchild = newNode;
            }
            else
                insert(p->lchild, k);
        }
        else if(k > p->data)
        {
            if(p->rchild == NULL)
            {
                Node *newNode = new Node(k);
                newNode->pparent = p;
                p->rchild = newNode;
            }
            else
                insert(p->rchild, k);
    }
    else
        return;
}
{% endhighlight %}
这样的话，我们已经完成了树的构建，并且完整的将所有的数据存入树中。

##四、二叉查找树的遍历

树总共有三种遍历方式：前序、中序和后序。

这里我们默认前序进行输出用以检查整个程序在对树的处理上是否出现了问题。

对于二叉查找树的查询，我们构建一个函数并传入要查询的数值k，设置起始点为树的根节点`root`,从`root`开始遍历，设置当前节点为`pnode`，如果`pnode->key`小于我们的要查询的k，那么我们递归传入该节点的左子树(`pnode->lchild`)，反之，则传入该节点的右子树(`pnode->rchild`)，如果在树中找到了`k`，则返回`true`(这里我们构造查询函数的返回类型为`bool`类型),若遍历完整颗树都没有找到，则返回`flase`。

详细代码如下
{% highlight c++ %}
bool BSTree::search(int k)
{
    search(root, k);
}

bool BSTree::search(Node* p, int k)
{
    search_count++;
    if(k == p->data)
    {
        flag = true;
        array.push(p->data);
        cout<<"您要查找的数存在于树中";
        return true;
    }
    else if(k < p->data)
    {
        search(p->lchild,k);
        if(flag) array.push(p->data);
    }

    else
    {
        search(p->rchild,k);
        if(flag) array.push(p->data);
    }
    if(search_count == size)
    {
        cout<<"您要查找的元素不存在于树中"<<endl;
        return false;
    }
}
{% endhighlight  %}

## 五、如何实现二叉查找树的路径返回

其实一开始想的时候没有什么思路，但是仔细想想又有种豁然开朗的感觉，下面说说自己的做法。

我在递归查询的过程中，假设我输入的元素在树中可以找到**（如果不能找到的话就没有路径返回这一说了）**，那么我将查找到的元素压入栈中，在递归地过程中，查询完以后，它会向上层返回，这样的话，我只要立一个`flag`初始化为`false`,当查找到输入元素时，就让`flag`为`true`,然后在每次节点的递归中进行判断，如果说`flag`为`true`的话，我就将该节点的`key`值压入栈中，直到所有操作结束后，一次性返回输出就可以了。

详细代码如下：

{% highlight c++ %}
void BSTree::show_path()
{
    while(!array.empty())
    {
        if(array.size() != 1)
        {
            cout<<array.top()<<"->";
        }
        else
            cout<<array.top();
        array.pop();
    }
}
{% endhighlight %}

下面是整个程序的完整代码:
{% highlight c++ %}
#include <stack>
#include <iostream>
using namespace std;

class Node
{
public:
    Node():data(0),pparent(NULL),lchild(NULL),rchild(NULL) {};
    Node(int k):data(k),pparent(NULL),lchild(NULL),rchild(NULL) {};
public:
    int data;
    Node* pparent;
    Node* lchild;
    Node* rchild;
};//双亲孩子表示法，查找双亲和孩子都非常方便

class BSTree
{
public:
    BSTree();
    void insert(int k);
    bool search(int k);//当查找到以后，我要求你返回整个查找树的路径
    void preOrder();
    void show_path();
private:
    void insert(Node* p, int k);
    bool search(Node* p, int k);
    void preOrder(Node *p);
private:
    Node* root;
    stack<int> array;//用来存储树中遍历的路径
    int size;
    int search_count;//用来控制查找时树的遍历元素个数
    bool flag = false;
};

BSTree::BSTree():size(0),search_count(0)
{
    root = new Node;
}

void BSTree::insert(int k)
{
    insert(root,k);
}

void BSTree::insert(Node* p,int k)
{
    size++;
    Node *parent = p;
    if(root->data == NULL)
    {
        root->data = k;
        return;
    }
    else
    {
        if(k < p->data)
        {
            if(p->lchild == NULL)
            {
                Node *newNode = new Node(k);
                newNode->pparent = p;
                p->lchild = newNode;
            }
            else
                insert(p->lchild, k);
        }
        else if(k > p->data)
        {
            if(p->rchild == NULL)
            {
                Node *newNode = new Node(k);
                newNode->pparent = p;
                p->rchild = newNode;
            }
            else
                insert(p->rchild, k);
        }
        else
            return;
    }
}

bool BSTree::search(int k)
{
    search(root, k);
}

bool BSTree::search(Node* p, int k)
{
    search_count++;
    if(k == p->data)
    {
        flag = true;
        array.push(p->data);
        cout<<"您要查找的数存在于树中";
        return true;
    }
    else if(k < p->data)
    {
        search(p->lchild,k);
        if(flag) array.push(p->data);
    }

    else
    {
        search(p->rchild,k);
        if(flag) array.push(p->data);
    }
    if(search_count == size)
    {
        cout<<"您要查找的元素不存在于树中";
        cout<<endl;
        return false;
    }
}

void BSTree::show_path()
{
    while(!array.empty())
    {
        if(array.size() != 1)
        {
            cout<<array.top()<<"->";
        }
        else
            cout<<array.top();
        array.pop();
    }
}

void BSTree::preOrder()//默认前序输出
{
    preOrder(root);
}

void BSTree::preOrder(Node *p)
{
    if(p == NULL) return;
    else
    {
        cout<<p->data<<" ";
        preOrder(p->lchild);
        preOrder(p->rchild);
    }
}

int main()
{
    BSTree bstree;
    cout<<"情输入您的二叉查找树的元素个数:";
    int n;
    cin>>n;
    cout<<"请输入您的二叉查找树:";
    for(int i=0; i<n; i++)
    {
        int k;
        cin>>k;
        bstree.insert(k);
    }
    cout<<"您的二叉树前序输出为：";
    bstree.preOrder();
    cout<<endl;
    while(1)
    {
        cout<<"请输入您要查找的元素:";
        int m;
        cin>>m;
        if(bstree.search(m))
            bstree.show_path();
        cout<<endl;
    }
    return 0;
}
{% endhighlight %}
>(blog未曾建设完全，之后会将自己的代码全部托管到github网站上，敬请期待！Bingo~~)