---
layout: post
title: "ScrollView包裹RecyclerView的异常事件"
subtitle: "Warning:Only the original thread that created a view hierarchy can touch its views"
data: 2018-10-17
author: "Zxy"
tags:
    - android
    - java
---
> 版权声明：本文出自张晓翼的博客，转载必须注明出处。

转载请注明出处：

**UI线程外的线程中不能操作UI界面**

也不知道这句话看了多少遍，所有入门小白都知道的android机制，但是没有想到还是有一天会栽在这边。

我知道不能在子线程中去改变UI界面，但是却不知道在事件监听机制中，有些监听事件本身就是运行在子线程中的！！！

看下面这个例子:

{% highlight java %}
    //通过EM获取好友的消息队列
    private EMMessageListener msgListener = new EMMessageListener() {

        @Override
        public void onMessageReceived(List<EMMessage> messages) {
            Log.d(TAG,"接收到了消息:");
            emMessages = messages;
            for(final EMMessage message: emMessages){
//                Log.d(TAG,"message来源:    " + message.getFrom().substring(8, message.getFrom().length()));
                final String[] msg = MoonStepHelper.getInstance().getMessageTypeWithBody(message.getBody().toString().trim());
                switch (MoonStepHelper.getInstance().transformMessageType(msg[0])){
                    case TEXT://处理文本消息
                        Log.e("Message","来自于ChattingActivity" + msg[1]);
                        savedChattingMessage(msg[1], 0, 1, message.getFrom().substring(8));
                                scrollView.fullScroll(ScrollView.FOCUS_DOWN);
                        break;
                    case IMAGE://处理图片消息
                        break;
                    case VIDEO://处理视频消息
                        break;
                    case LOCATION://处理位置消息
                        break;
                    case VOICE://处理声音消息
                        break;
                }
            }
        }

        @Override
        public void onCmdMessageReceived(List<EMMessage> messages) {
            //收到透传消息
            Log.d(TAG, "收到透传消息");
        }

        @Override
        public void onMessageRead(List<EMMessage> messages) {
            //收到已读回执
            Log.d(TAG, "收到已读回执");
        }

        @Override
        public void onMessageDelivered(List<EMMessage> message) {
            //收到已送达回执
            Log.d(TAG, "收到已送达回执");
        }

        @Override
        public void onMessageChanged(EMMessage message, Object change) {
            //消息状态变动
            Log.d(TAG, "消息状态变动");
        }
    };

    /**
     * 发送的消息和接收的消息都应该存储到数据库中
     * 同时让scrollView下滑
     */
    @Override
    public Message savedChattingMessage(String content,int direction,  int type, String phoneNumber) {
        Message message = new Message();
        message.setContent(content);
        message.setDirection(direction);//0、对方发送的;1、我发送的;
        message.setObject(phoneNumber);
        message.setType(type);//1、文字；2、图片；3、音频；4、视频；5、红包；6、文件；7、位置
        message.save();
        messagesQueues.add(message);
        mAdapter.add(message);
        mAdapter.notifyDataSetChanged();
        Log.d("ChattingActivity", "savedChattingMessage:" + String.valueOf(recyclerView.getHeight()));
        return message;
    }
{% endhighlight %}

我是在聊天界面去监听好友发送来的消息，当获得好友的消息的时候，我将解析后的消息分发到两个方向：本地数据库和传递给recyclerview的adapter的list列表，新的消息会被添加到mAdapter的list中，然后在mAdapter中的add方法中使用notifyDataSetChanged()方法来通知recyclerView数据的改变动态。

这个时候本来数据应该加载到recyclerView的列表中了，并且recyclerView的高度也会因为多增加了一条数据而有所改变，但是当我打印出recyclerView的高度的时候,怪异的事情发生了！！！

当我接收到来自好友的消息时，我打印出recyclerView的高度，但是我发现recyclerView的高度没有发生一点变化，因此我调用的scrollView的fullScroll(ScrollView.FOCUS_DOWN);方法没有任何效果，但是当我用鼠标滚轮去下滑模拟器的聊天页面时，却可以看到好友发送的消息已经出现在了窗口中。

这是怎么回事？？？

然后仔细阅读日志，发现只有在好友向我发送消息的时候才会出现一个警告：Warning:Only the original thread that created a view hierarchy can touch its views。不允许你在UI线程外的线程中操作界面，但是为什么是个warning而不是error我也不是很清楚。

仔细想一下，发现警告出现的时机和异常情况出现的时机几乎是同步的，那么我们可以判断两件事情逻辑上存在很大可能的关联性，所以先解决这个问题试试看。

找到警告的来源，说是notifyDataSetChanged()有了异常。

这下明白怎么回事了，我们接收消息并改变recyclerVew中数据的操作是在EMMessageListener的监听函数中的，我源码中向上找了一圈没有找到线程中的调用情况，不知道为什么没有看到，但是却能肯定在上层调用监听函数的时候是在线程中执行的。

明白异常到底是怎么回事了，那我们就开始解决问题了。

{% highlight java %}
    //通过EM获取好友的消息队列
    private EMMessageListener msgListener = new EMMessageListener() {

        @Override
        public void onMessageReceived(List<EMMessage> messages) {
            Log.d(TAG,"接收到了消息:");
            emMessages = messages;
            for(final EMMessage message: emMessages){
//                Log.d(TAG,"message来源:    " + message.getFrom().substring(8, message.getFrom().length()));
                final String[] msg = MoonStepHelper.getInstance().getMessageTypeWithBody(message.getBody().toString().trim());
                switch (MoonStepHelper.getInstance().transformMessageType(msg[0])){
                    case TEXT://处理文本消息
                        Log.e("Message","来自于ChattingActivity" + msg[1]);
                        runOnUiThread(new Runnable() {
                            @Override
                            public void run() {
                                savedChattingMessage(msg[1], 0, 1, message.getFrom().substring(8));
                                scrollView.fullScroll(ScrollView.FOCUS_DOWN);
                            }
                        });
                        break;
                    case IMAGE://处理图片消息
                        break;
                    case VIDEO://处理视频消息
                        break;
                    case LOCATION://处理位置消息
                        break;
                    case VOICE://处理声音消息
                        break;
                }
            }
        }

        @Override
        public void onCmdMessageReceived(List<EMMessage> messages) {
            //收到透传消息
            Log.d(TAG, "收到透传消息");
        }

        @Override
        public void onMessageRead(List<EMMessage> messages) {
            //收到已读回执
            Log.d(TAG, "收到已读回执");
        }

        @Override
        public void onMessageDelivered(List<EMMessage> message) {
            //收到已送达回执
            Log.d(TAG, "收到已送达回执");
        }

        @Override
        public void onMessageChanged(EMMessage message, Object change) {
            //消息状态变动
            Log.d(TAG, "消息状态变动");
        }
    };
{% endhighlight %}

使用runOnUI()问题轻松解决。