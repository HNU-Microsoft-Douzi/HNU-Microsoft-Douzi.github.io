---
title: "Android为什么使用Handler来处理UI界面的更改操作"
subtitle: "Why does Android use a Handler to handle changes to the UI interface"
layout: post
data: 2018-07-23
author: "Zxy"
tags:
    - android
---

一般我们进行android开发的时候，有时要对UI界面进行更改操作，查阅了很多资料，Android本身是提供了invalidate()方法来刷新界面的，但是不能直接在线程中调用该方法，尤其是不能在子线程中调用，因为这违背了Android的单线程模型。

对了，这里提一下UI线程内一定不能进行耗时操作，Google在android的底层构建了一个强制命令，如果你在UI线程中进行了耗时操作，并且耗时操作的时间长度超过了5s，那么Android系统会强制关闭你的程序。

Android的UI线程并不是安全的，也就是说，有多线程对UI操作的时候，可能出现数据混乱的问题。

所以，Android本身提供了Handler消息机制来处理这个问题。

所以，简单来说下Handler机制到底是什么呢？

**用一句话概述：Handler主要接收子线程发送的数据，并根据该数据来更新UI线程。**

这里放一个例子就明白了:

{% highlight java %}
public class MyHandlerActivity extends Activity{
	Button button;
	MyHandler myHandler;
	
	protected void onCreate(Bundle savedInstanceState){
	super.onCreate(savedInstanceState);
	setContentView(R.layout.handlertest);
	
	button = findViewById(R.id.button);
	myHandler = new MyHandler();//在当前UI中创建自定义Handler对象
	// 当创建一个新的Handler实例时， 它会绑定到当前线程和消息的队列中，开始分发数据 
        // Handler有两个作用， (1) : 定时执行Message和Runnalbe 对象 
        // (2): 让一个动作，在不同的线程中执行。 
 
        // 它安排消息，用以下方法 
        // post(Runnable) 
        // postAtTime(Runnable，long) 
        // postDelayed(Runnable，long) 
        // sendEmptyMessage(int) 
        // sendMessage(Message); 
        // sendMessageAtTime(Message，long) 
        // sendMessageDelayed(Message，long) 
      
        // 以上方法以 post开头的允许你处理Runnable对象 
        //sendMessage()允许你处理Message对象(Message里可以包含数据，) 
		MyRunnable my = new MyRunnable();//自定义线程来执行执行更新UI的操作
		new Thread(my).start();//开启线程
	}
	
	class MyHandler extends Handler{
		public MyHandler(){
		}
		
		public MyHandler(Looper L){
			super(L);
		}
		
		//子类必须重写此方法，接收数据
		@Override
		public void handlMessage(Message msg){
			super.handleMessage(msg);
			
			//此处可以更新UI
			//先接收到数据，然后再对UI进行更新操作
			Bundle b = msg.getData();
			String color = b.get("color");
			MyHandlerActivity.this.button.append(color);
		}
	}
	
	class MyRunnable implements Runnable{
		public void run(){
		
			try{
				Thread.sleep(1000);
			}catch(InterruptedExcetion e){
				e.printStackTrace();
			}
			
			Message msg = new Message();
			Bundle b = new Bundle();//存放数据
			b.putString("color","red");
			msg.setData(b);
			
			MyHandlerActivity.this.myRunnable.sendMessage(msg);//通过sendMessage向Handler发送消息，更新UI
	}
}
{% endhighlight %}

我想有了上面的实例➕注解就可以清晰的明了这个Handler的处理流程了。