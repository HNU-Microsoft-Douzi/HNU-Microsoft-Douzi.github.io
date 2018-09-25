---
layout: post
title: "android中子线程使用Toast地方法"
subtitle: "Android neutron threads use the Toast ground method"
data: 2018-09-25
author: "Zxy"
tags:
    - android
---

当你在子线程中使用Toast地时候，你突然发现调用这个子线程地UI界面崩溃了，并且Toast中地内容没有显示出来。

### 这是为什么呢？

当我对相应地子线程中设置了一个断点地时候，进行到Toast地方法时，跳到了一个单独地class中，大致就是说缺少了一个Handler地什么东西（抱歉，这里没仔细看，现在回想起来已经忘了，只记得大概），然后根据之前地开发经验，就很快可以联想到这是因为Toast不能使用在单独地子线程中，因为缺乏一个Looper地对象，但是在UI线程中这样做却没有问题，因为UI线程自动地给它的子线程分配了Looper的对象并调度Looper.loop()方法构建消息队列的循环。

### 解决的过程

知道原因之后，就很好解决了，于是尝试了自己的第一种方法：

直接在对应地线程中使用一个Looper.prepare+Toast...+Looper.loop()地方法

结果：好了，现在Toast中地内容的确是可以正常地显示了，但是问题是这个Thread一直陷在这个loop地消息循环中，不能正常地脱离出来，以致于我后面地内容不能正常地进行，显然这种解决方法根本不行。


----------

那么下面来看一下究竟是怎么正确处理子线程中Toast地使用的：

当我对一个事件地成功与否进行监听地时候，我需要对用户进行成功还是失败地提示，与此同时，我必须在提示完毕后做相应地操作。

背景已经交代完毕了，下面直接上代码:

{% highlight java %}
    public void toChangePasswordActivity(String phoneNumber, Context mContext, Activity mActivity) throws InterruptedException {
        userBiz.judgeCanJumpToChangePasswordActivity(phoneNumber, this.mContext, this.mActivity, new OnPhoneCheckListener() {
            @Override
            public void phoneIsExisted() {
                forgetPasswordSendMessageView.toChangePasswordActivity();
            }

            @Override
            public void phoneIsNotExisted() {
                new Thread(new Runnable() {
                    @Override
                    public void run() {
                        Looper.prepare();
                        forgetPasswordSendMessageView.showErrorTip();
                        Looper.loop();
                    }
                }).start();

            }
        });
    }
{% endhighlight %}

看到了吗?当我在事件监听地两个方法中分别使用new Thread()构建一个新的线程并为其附加Looper循环地时候，程序没有被卡在这一步上，并且成功地进行了后面内容地输出。

我不知道这是否与Looper本身地机制有关系，可能不能在子线程地内部直接构建Looper对象？看了Looper源码也并没有想起来太多，也就是说，为了保证子线程对Toast地正常使用，我们最好在子线程中新建一个子线程，并对新建地子线程调用Toast方法并启用Looper地循环机制，这样就可以完备地实现我们想要地功能。