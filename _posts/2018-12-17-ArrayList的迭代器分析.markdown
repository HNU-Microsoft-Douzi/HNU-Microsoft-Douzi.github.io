---
layout: post
title: "ArrayList的迭代器分析"
subtitle: "Iterator analysis of ArrayList"
data: 2018-12-17
author: "Zxy"
tags:
    - java
---

> 版权声明：转载必须注明出处。

## 集合下的迭代器

我们都知道在Collections下的子类就像ArrayList或者LinkedList在遍历的时候都存在一个iterator()的函数用来获取迭代器的对象。

使用迭代器可以大大优化遍历时的效率，不大明白为什么迭代器对提升集合的遍历效率有帮助。

所以就想顺着ArrayList扒一下源码。

## 初始猜测

先来看一下ArrayList的层次结构:

![](https://i.imgur.com/7Moid4q.png)

一开始本来是猜想iterator是在AbstractCollection这个抽象类下声明的一个必须要实现的函数。

然后就去AbstractCollection下面看一下，发现AbstractCollection本质上是Object类实现了一个Collection产生的抽象类，而对于Object自不用说，是Java中所有对象的超类，而Collection则是一个接口类，是整个分析整个过程的关键。

![](https://i.imgur.com/zFegfmd.png)

可以从中看到，Collection继承自Iterator接口，和我们的猜测一致。

Iterator就不用细说了，接口的话，里面无非就是一些指向下一个元素、获得当前元素...的一些抽象方法。

## 细说Iterator

{% highlight java %}
/**
     * Returns an iterator over the elements in this collection.  There are no
     * guarantees concerning the order in which the elements are returned
     * (unless this collection is an instance of some class that provides a
     * guarantee).
     *
     * @return an <tt>Iterator</tt> over the elements in this collection
     */
    Iterator<E> iterator();
{% endhighlight %}

如上，我们发现Collection内部创建了一个iterator的抽象函数，也就是说，所有继承了AbstractCollection的类，都必须实现这个Collection中的iterator方法。

**不实现，不行！！！**

这就解决了为什么我们在每个集合框架下都可以看到iterator的存在并通过它来获得一个迭代器的对象。

知道了源头以后，我们再回到ArrayList的源代码中，因为前面都是介绍了一些抽象，介绍了一些声明和源头，没有细节，接下来我们看看为什么Iterator可以大幅提升遍历的效率。

在ArrayList中有这样一段代码:

{% highlight java %}
/**
     * Returns an iterator over the elements in this list in proper sequence.
     *
     * <p>The returned iterator is <a href="#fail-fast"><i>fail-fast</i></a>.
     *
     * @return an iterator over the elements in this list in proper sequence
     */
    public Iterator<E> iterator() {
        return new Itr();
    }
    /**
     * An optimized version of AbstractList.Itr
     */
    private class Itr implements Iterator<E> {
        // Android-changed: Add "limit" field to detect end of iteration.
        // The "limit" of this iterator. This is the size of the list at the time the
        // iterator was created. Adding & removing elements will invalidate the iteration
        // anyway (and cause next() to throw) so saving this value will guarantee that the
        // value of hasNext() remains stable and won't flap between true and false when elements
        // are added and removed from the list.
        protected int limit = ArrayList.this.size;
        int cursor;       // index of next element to return
        int lastRet = -1; // index of last element returned; -1 if no such
        int expectedModCount = modCount;
        public boolean hasNext() {
            return cursor < limit;
        }
        @SuppressWarnings("unchecked")
        public E next() {
            if (modCount != expectedModCount)
                throw new ConcurrentModificationException();
            int i = cursor;
            if (i >= limit)
                throw new NoSuchElementException();
            Object[] elementData = ArrayList.this.elementData;
            if (i >= elementData.length)
                throw new ConcurrentModificationException();
            cursor = i + 1;
            return (E) elementData[lastRet = i];
        }
        public void remove() {
            if (lastRet < 0)
                throw new IllegalStateException();
            if (modCount != expectedModCount)
                throw new ConcurrentModificationException();
            try {
                ArrayList.this.remove(lastRet);
                cursor = lastRet;
                lastRet = -1;
                expectedModCount = modCount;
                limit--;
            } catch (IndexOutOfBoundsException ex) {
                throw new ConcurrentModificationException();
            }
        }
        @Override
        @SuppressWarnings("unchecked")
        public void forEachRemaining(Consumer<? super E> consumer) {
            Objects.requireNonNull(consumer);
            final int size = ArrayList.this.size;
            int i = cursor;
            if (i >= size) {
                return;
            }
            final Object[] elementData = ArrayList.this.elementData;
            if (i >= elementData.length) {
                throw new ConcurrentModificationException();
            }
            while (i != size && modCount == expectedModCount) {
                consumer.accept((E) elementData[i++]);
            }
            // update once at end of iteration to reduce heap write traffic
            cursor = i;
            lastRet = i - 1;
            if (modCount != expectedModCount)
                throw new ConcurrentModificationException();
        }
    }
{% endhighlight %}

ok了，我们发现iterator()这个函数返回了一个Itr()的对象，那个这个Itr到底是个什么玩意呢？

往下看，发现Itr是实现了Iterator借口的一个内部类，也就是说，iterator类，本质上不是一个单独抽离出来的类，而是一个针对每个框架需要具体实现的接口。

为什么要这样做呢？

因为不同的框架呈递不同的数据结构，内部结构不同，要遍历的方式就不进相同，所以不同的问题不同实现，只需提供一个抽象化模版就可以了。

上面的iterator本质上是对于循环遍历的一个优化结果，就遍历而言在顺序表上面体现并不是非常明显。

但是如果有时间可以看一下在LinkedList中的iterator，就可以发现对链表的优化度比较高，好像是通过int记录了当前遍历的下一个元素的下标，所以可以优化速度？

没有仔细看，如果有时间的话，你可以自己分析一下。

{% highlight java %}
/**
     * Returns a list-iterator of the elements in this list (in proper
     * sequence), starting at the specified position in the list.
     * Obeys the general contract of {@code List.listIterator(int)}.<p>
     *
     * The list-iterator is <i>fail-fast</i>: if the list is structurally
     * modified at any time after the Iterator is created, in any way except
     * through the list-iterator's own {@code remove} or {@code add}
     * methods, the list-iterator will throw a
     * {@code ConcurrentModificationException}.  Thus, in the face of
     * concurrent modification, the iterator fails quickly and cleanly, rather
     * than risking arbitrary, non-deterministic behavior at an undetermined
     * time in the future.
     *
     * @param index index of the first element to be returned from the
     *              list-iterator (by a call to {@code next})
     * @return a ListIterator of the elements in this list (in proper
     *         sequence), starting at the specified position in the list
     * @throws IndexOutOfBoundsException {@inheritDoc}
     * @see List#listIterator(int)
     */
    public ListIterator<E> listIterator(int index) {
        checkPositionIndex(index);
        return new ListItr(index);
    }
    private class ListItr implements ListIterator<E> {
        private Node<E> lastReturned;
        private Node<E> next;
        private int nextIndex;
        private int expectedModCount = modCount;
        ListItr(int index) {
            // assert isPositionIndex(index);
            next = (index == size) ? null : node(index);
            nextIndex = index;
        }
        public boolean hasNext() {
            return nextIndex < size;
        }
        public E next() {
            checkForComodification();
            if (!hasNext())
                throw new NoSuchElementException();
            lastReturned = next;
            next = next.next;
            nextIndex++;
            return lastReturned.item;
        }
        public boolean hasPrevious() {
            return nextIndex > 0;
        }
        public E previous() {
            checkForComodification();
            if (!hasPrevious())
                throw new NoSuchElementException();
            lastReturned = next = (next == null) ? last : next.prev;
            nextIndex--;
            return lastReturned.item;
        }
        public int nextIndex() {
            return nextIndex;
        }
        public int previousIndex() {
            return nextIndex - 1;
        }
        public void remove() {
            checkForComodification();
            if (lastReturned == null)
                throw new IllegalStateException();
            Node<E> lastNext = lastReturned.next;
            unlink(lastReturned);
            if (next == lastReturned)
                next = lastNext;
            else
                nextIndex--;
            lastReturned = null;
            expectedModCount++;
        }
        public void set(E e) {
            if (lastReturned == null)
                throw new IllegalStateException();
            checkForComodification();
            lastReturned.item = e;
        }
        public void add(E e) {
            checkForComodification();
            lastReturned = null;
            if (next == null)
                linkLast(e);
            else
                linkBefore(e, next);
            nextIndex++;
            expectedModCount++;
        }
        public void forEachRemaining(Consumer<? super E> action) {
            Objects.requireNonNull(action);
            while (modCount == expectedModCount && nextIndex < size) {
                action.accept(next.item);
                lastReturned = next;
                next = next.next;
                nextIndex++;
            }
            checkForComodification();
        }
        final void checkForComodification() {
            if (modCount != expectedModCount)
                throw new ConcurrentModificationException();
        }
    }
    private static class Node<E> {
        E item;
        Node<E> next;
        Node<E> prev;
        Node(Node<E> prev, E element, Node<E> next) {
            this.item = element;
            this.next = next;
            this.prev = prev;
        }
    }
{% endhighlight %}

源代码就po到这了，想自己去看源代码的网上有很多方式，这里就不贴出来了。