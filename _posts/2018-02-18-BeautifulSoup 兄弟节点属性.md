---
layout: blog-page
title: "BeautifulSoup 兄弟节点属性"
data: 2018-02-18
tag: 爬虫
---
<p class="h2">知识点：.next_sibling  .previous_sibling 属性</p>
<p>兄弟节点可以理解为和本节点所在的同一级别的标签，而.next_sibling则意为选取本节点的下一个节点，而.previoous_sibling则意为选取本节点的上一个节点。如果节点不存在的话，就会返回None</p>
<p>实例这里不会给出，但是要说一个着重注意的地方：</p>
<p style="color:red">若是给定一个节点，它的兄弟节点（下一个节点/上一个节点）都存在，用.next_sibling或者.previous_sibling却显示的是空白，没有显示实际的内容，这是为什么呢？因为兄弟节点的内容会涵盖空白或者换行，我们看到的空行实际是换行的内容，自然没有东西，要想要看到实际内容，需要再写一遍兄弟节点的调用。</p>