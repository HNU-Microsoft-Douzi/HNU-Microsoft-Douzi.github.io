---
title: "SharedPreferences源码分析"
subtitle: "SharedPreferences source code analysis"
layout: post
data: 2019-01-01
author: "Zxy"
tags:
    - android
---

> 版权声明：转载请注明博客地址和作者名称


我们经常会在项目中使用SharedPreferences来作为存储一些临时数据的载体，它的使用也非常简单，内部的Editor是单例模式，我们只要通过操纵Editor就可以方便的进行数据的存取。

但是之前也是一直都会大量的使用SharedPreferences来做一些微小数据的存储，却没有考虑性能相关的内容。

所以这里向来把源码扒一下。

它的代码不是很长，四百行不到，所以可以全部大致看一下它的注解，我这边就把我的理解和一些翻译一起放到注解里面了，不在下面额外备注了。

{% highlight java %}
/*
 * Copyright (C) 2006 The Android Open Source Project
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package android.content;
import android.annotation.Nullable;
import java.util.Map;
import java.util.Set;
/**
 * Interface for accessing and modifying preference data returned by {@link
 * Context#getSharedPreferences}.  For any particular set of preferences,
 * there is a single instance of this class that all clients share.
 * Modifications to the preferences must go through an {@link Editor} object
 * to ensure the preference values remain in a consistent state and control
 * when they are committed to storage.  Objects that are returned from the
 * various <code>get</code> methods must be treated as immutable by the application.
 *
 * 接口用于访问和修改{@link上下文#getSharedPreferences}返回的首选项数据。对于任何特定的首选项集，都有这个类的一个实例，所有客户机都共享这个实例。对首选项的修改必须通过{@link Editor}对象，以确保首选项值在提* 交到存储时保持一致的状态和控制。应用程序必须将从各种get方法返回的对象视为不可变的。
 * 
 * <p>Note: This class provides strong consistency guarantees. It is using expensive operations
 * which might slow down an app. Frequently changing properties or properties where loss can be
 * tolerated should use other mechanisms. For more details read the comments on
 * {@link Editor#commit()} and {@link Editor#apply()}.
 * 
 * 该类提供了强大的一致性保证。它使用昂贵的操作，可能会减慢应用程序的速度。频繁更改属性或可以容忍损失的属性应该使用其他机制。有关更多细节，请阅读关于{@link Editor#commit()}和{@link Editor#apply()}的评论
 *
 * <p><em>Note:该类不支持跨进程的使用.</em>
 *
 * <div class="special reference">
 * <h3>Developer Guides</h3>
 * <p>For more information about using SharedPreferences, read the
 * <a href="{@docRoot}guide/topics/data/data-storage.html#pref">Data Storage</a>
 * developer guide.</p></div>
 *
 * @see Context#getSharedPreferences
 */
public interface SharedPreferences {
    /**
     * Interface definition for a callback to be invoked when a shared
     * preference is changed.
     * 定义了一个接口，当一个 shared preference 改变的时候会被调用。
     */
    public interface OnSharedPreferenceChangeListener {
        /**
         * 在更改、添加或删除共享首选项(shared preference)时调用。即使将首选项设置为其现有值，也可以调用该方法。
         *
         * <p>This callback will be run on your main thread.
         *
         * @param sharedPreferences The {@link SharedPreferences} that received
         *            the change.
         * @param key The key of the preference that was changed, added, or
         *            removed.
         */
        void onSharedPreferenceChanged(SharedPreferences sharedPreferences, String key);
    }
    
    /**
	 * Editor接口用于修改{@link SharedPreferences}对象中的值。
	 * 在编辑器中所做的所有更改都是批处理的，并且在调用{@link #commit}或{@link #apply}之前不会复制回原始的{@link SharedPreferences}
     */
    public interface Editor {
        /**
         * 在preferences编辑器中设置一个字符串值，当{@link #commit}或{@link #apply}被调用时将被回写。
         * 
         * @param key The name of the preference to modify.
         * @param value The new value for the preference.  Passing {@code null}
         *    for this argument is equivalent to calling {@link #remove(String)} with
         *    this key.
         * @param value这里注意一下，传null的时候，就相当于调用了remove()
         * 
         * @return Returns a reference to the same Editor object, so you can
         * chain put calls together.
         */
        Editor putString(String key, @Nullable String value);
        
        /**
         * 在preferences编辑器中设置一个字符串集合，当{@link #commit}或{@link #apply}被调用时将被回写。
         * 
         * @param key The name of the preference to modify.
         * @param values The set of new values for the preference.  Passing {@code null}
         *    for this argument is equivalent to calling {@link #remove(String)} with
         *    this key.
         * @return Returns a reference to the same Editor object, so you can
         * chain put calls together.
         */
        Editor putStringSet(String key, @Nullable Set<String> values);
        
        /**
         * 在preferences编辑器中设置一个整数值，当{@link #commit}或{@link #apply}被调用时将被回写。
         * 
         * @param key The name of the preference to modify.
         * @param value The new value for the preference.
         * 
         * @return Returns a reference to the same Editor object, so you can
         * chain put calls together.
         */
        Editor putInt(String key, int value);
        
        /**
         * 在preferences编辑器中设置一个long值，当{@link #commit}或{@link #apply}被调用时将被回写。
         * 
         * @param key The name of the preference to modify.
         * @param value The new value for the preference.
         * 
         * @return Returns a reference to the same Editor object, so you can
         * chain put calls together.
         */
        Editor putLong(String key, long value);
        
        /**
         * 在preferences编辑器中设置一个float值，当{@link #commit}或{@link #apply}被调用时将被回写。
         * 
         * @param key The name of the preference to modify.
         * @param value The new value for the preference.
         * 
         * @return Returns a reference to the same Editor object, so you can
         * chain put calls together.
         */
        Editor putFloat(String key, float value);
        
        /**
         * 在preferences编辑器中设置一个boolean值，当{@link #commit}或{@link #apply}被调用时将被回写。
         * 
         * @param key The name of the preference to modify.
         * @param value The new value for the preference.
         * 
         * @return Returns a reference to the same Editor object, so you can
         * chain put calls together.
         */
        Editor putBoolean(String key, boolean value);
        /**
         * 在Editor中标记应该删除首选项值，这将在调用{@link #commit}后真正意义上的实现。
         * 
         * <p>Note that when committing back to the preferences, all removals
         * are done first, regardless of whether you called remove before
         * or after put methods on this editor.
         * 
         * @param key The name of the preference to remove.
         * 
         * @return Returns a reference to the same Editor object, so you can
         * chain put calls together.
         */
        Editor remove(String key);
        /**
         * 在Editor标记所有要删除的值，并且这将在调用{@link #commit}后真正意义上的实现
         * 
         * <p>不管怎样说，提交shared preference之前，一定要先完成clear()，不然不会被调用。
         * 
         * @return Returns a reference to the same Editor object, so you can
         * chain put calls together.
         */
        Editor clear();
        /**
         * 从你现在正在编辑的这个shared preference上把所有的改变全部提交
         * 这将自动执行请求修改，并替换SharedPreferences中当前的所有内容
         *
         * <p>这里需要注意的的一点是，当存在两个editor同时在修改首选项的时候，最后一个调用commit的editor才有用
         *
         * <p>就是说，如果你不关心返回值，而是在应用主线程中使用它，就可以考虑调用{@link #apply}
         *
         * @如果你成功写入持久化存储的话，就会返回true
         */
        boolean commit();
        /**
         * 将您的首选项更改从该编辑器提交回正在编辑的{@link SharedPreferences}对象。这将自动执行所请求的修改，替换SharedPreferences中当前的任何内容。
         *
         * <p>注意，当两个编辑器同时修改首选项时，最后一个调用apply的编辑器将获胜。
         *
         * <p>和同步的(加了synchornized)将shared preference写入持久化存储的{@link #commit}不一样，{@link #apply}会立即将它的更改给内存中的{@link SharedPreferences}。这个过程是个异步的过程，所以如果提交失败的话，不会将结果反馈给你。如过这个{@link SharedPreferences}上的另一个editor执行了{@link #commit}，而{@link #apply}仍然没有完成，那么{@link #commit}将会被阻塞，直到所有的异步提交并且提交本身都完成为止。
         *
         * <p>作为 {@link SharedPreferences} 实体是进程中的一个单例模式, 用任何的实例去提交{@link #commit}都是安全的
         * {@link #apply} 则会忽略返回值
         *
         * <p>You don't need to worry about Android component
         * lifecycles and their interaction with <code>apply()</code>
         * writing to disk.  The framework makes sure in-flight disk
         * writes from <code>apply()</code> complete before switching
         * states.
         *
         * <p class='note'>The SharedPreferences.Editor interface
         * isn't expected to be implemented directly.  However, if you
         * previously did implement it and are now getting errors
         * about missing <code>apply()</code>, you can simply call
         * {@link #commit} from <code>apply()</code>.
         */
        void apply();
    }
    /**
     * Retrieve all values from the preferences.
     *
     * <p>Note that you <em>must not</em> modify the collection returned
     * by this method, or alter any of its contents.  The consistency of your
     * stored data is not guaranteed if you do.
     *
     * @return Returns a map containing a list of pairs key/value representing
     * the preferences.
     *
     * @throws NullPointerException
     */
    Map<String, ?> getAll();
    /**
     * Retrieve a String value from the preferences.
     * 
     * @param key The name of the preference to retrieve.
     * @param defValue Value to return if this preference does not exist.
     * 
     * @return Returns the preference value if it exists, or defValue.  Throws
     * ClassCastException if there is a preference with this name that is not
     * a String.
     * 
     * @throws ClassCastException
     */
    @Nullable
    String getString(String key, @Nullable String defValue);
    
    /**
     * Retrieve a set of String values from the preferences.
     * 
     * <p>Note that you <em>must not</em> modify the set instance returned
     * by this call.  The consistency of the stored data is not guaranteed
     * if you do, nor is your ability to modify the instance at all.
     *
     * @param key The name of the preference to retrieve.
     * @param defValues Values to return if this preference does not exist.
     * 
     * @return Returns the preference values if they exist, or defValues.
     * Throws ClassCastException if there is a preference with this name
     * that is not a Set.
     * 
     * @throws ClassCastException
     */
    @Nullable
    Set<String> getStringSet(String key, @Nullable Set<String> defValues);
    
    /**
     * Retrieve an int value from the preferences.
     * 
     * @param key The name of the preference to retrieve.
     * @param defValue Value to return if this preference does not exist.
     * 
     * @return Returns the preference value if it exists, or defValue.  Throws
     * ClassCastException if there is a preference with this name that is not
     * an int.
     * 
     * @throws ClassCastException
     */
    int getInt(String key, int defValue);
    
    /**
     * Retrieve a long value from the preferences.
     * 
     * @param key The name of the preference to retrieve.
     * @param defValue Value to return if this preference does not exist.
     * 
     * @return Returns the preference value if it exists, or defValue.  Throws
     * ClassCastException if there is a preference with this name that is not
     * a long.
     * 
     * @throws ClassCastException
     */
    long getLong(String key, long defValue);
    
    /**
     * Retrieve a float value from the preferences.
     * 
     * @param key The name of the preference to retrieve.
     * @param defValue Value to return if this preference does not exist.
     * 
     * @return Returns the preference value if it exists, or defValue.  Throws
     * ClassCastException if there is a preference with this name that is not
     * a float.
     * 
     * @throws ClassCastException
     */
    float getFloat(String key, float defValue);
    
    /**
     * Retrieve a boolean value from the preferences.
     * 
     * @param key The name of the preference to retrieve.
     * @param defValue Value to return if this preference does not exist.
     * 
     * @return Returns the preference value if it exists, or defValue.  Throws
     * ClassCastException if there is a preference with this name that is not
     * a boolean.
     * 
     * @throws ClassCastException
     */
    boolean getBoolean(String key, boolean defValue);
    /**
     * Checks whether the preferences contains a preference.
     * 
     * @param key The name of the preference to check.
     * @return Returns true if the preference exists in the preferences,
     *         otherwise false.
     */
    boolean contains(String key);
    
    /**
     * Create a new Editor for these preferences, through which you can make
     * modifications to the data in the preferences and atomically commit those
     * changes back to the SharedPreferences object.
     * 
     * <p>Note that you <em>must</em> call {@link Editor#commit} to have any
     * changes you perform in the Editor actually show up in the
     * SharedPreferences.
     * 
     * @return Returns a new instance of the {@link Editor} interface, allowing
     * you to modify the values in this SharedPreferences object.
     */
    Editor edit();
    
    /**
     * Registers a callback to be invoked when a change happens to a preference.
     *
     * <p class="caution"><strong>Caution:</strong> The preference manager does
     * not currently store a strong reference to the listener. You must store a
     * strong reference to the listener, or it will be susceptible to garbage
     * collection. We recommend you keep a reference to the listener in the
     * instance data of an object that will exist as long as you need the
     * listener.</p>
     *
     * @param listener The callback that will run.
     * @see #unregisterOnSharedPreferenceChangeListener
     */
    void registerOnSharedPreferenceChangeListener(OnSharedPreferenceChangeListener listener);
    
    /**
     * Unregisters a previous callback.
     * 
     * @param listener The callback that should be unregistered.
     * @see #registerOnSharedPreferenceChangeListener
     */
    void unregisterOnSharedPreferenceChangeListener(OnSharedPreferenceChangeListener listener);
}
{% endhighlight 5}

然后分析了一下主要的内容，先来看看Editor的commit和apply的**区别**：

1. apply没有返回值而commit返回boolean表明修改是否提交成功
2. apply是先提交到内存，而后不等待返回结果直接提交到硬件磁盘，用了一个Runnable所以是异步的；而commit是提交到内存后，同步的提交到硬件磁盘并等待返回的结果，因此，在多个并发的提交commit的时候，他们会等待正在处理的commit保存到磁盘后在操作，从而降低了效率。而apply根本不管返回的结果怎么样，是不是存储成功了，来了我就做，存没存成功我直接覆盖，这样从一定程度上提高了很多效率，但是要合理使用，如果使用不合理，就会造成很多错误的情况，比如我之前没存成功，我想读前一次的结果，但是你又存了一次，把我之前的结果给覆盖掉了，所以读到的实际上是这一次的结果，产生了错误。
3. apply方法不会提示任何失败的提示。

然后关于具体的接口实现类我这里就不放分析了，有找到一篇很好的博客有对这些进行分析。

[https://blog.csdn.net/u010198148/article/details/51706483](https://blog.csdn.net/u010198148/article/details/51706483)