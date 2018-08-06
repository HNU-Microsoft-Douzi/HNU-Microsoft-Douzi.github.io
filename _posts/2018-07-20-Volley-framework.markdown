---
title: "Android网络框架之Volley框架的使用"
subtitle: "The use of the Volley framework of the Android network framework"
layout: post
data: 2018-07-20
author: "Zxy"
tags:
    - android
---

## 一、添加依赖库

`implementation 'com.mcxiaoke.volley:library:1.0.19'`

## 二、添加网络许可

`<uses-permission android:name="android.permission.INTERNET"/>`

## 三、get请求

{% highlight java %}
 //get请求
    private void getStringRequest(){
        RequestQueue queue = Volley.newRequestQueue(this);
        StringRequest request = new StringRequest(url, new Response.Listener<String>() {
            @Override
            public void onResponse(String response) {
                Log.i("TAG", response);
                tv.setText(response);
            }
        },new Response.ErrorListener(){
            @Override
            public void onErrorResponse(VolleyError volleyError) {
                Log.i("TAG", "响应失败了！");
            }
            });
        queue.add(request);//应该是将所有的请求加入到请求队列才开始对请求进行监听的，最方便的一点是StringRequest会直接将结果返回为一个String类型的对象
    }
{% endhighlight %}

##　四、post请求

{% highlight java %}
    private void postStringRequest() {
        RequestQueue queue=Volley.newRequestQueue(this);
        StringRequest request=new StringRequest(Request.Method.POST, url, new Response.Listener<String>() {
            @Override
            public void onResponse(String s) {
                tv.setText(s);
                Log.i("TAG", "响应成功！");
            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError volleyError) {
                Log.i("TAG", volleyError.toString());
            }
        }){
        };
        queue.add(request);
    }
{% endhighlight %}

> 如果报出了如下错误，那么解决方案如下:

` D/JsonObject Error Response﹕ com.android.volley.TimeoutError`

{% highlight java %}
        request.setRetryPolicy(new RetryPolicy() {
            @Override
            public int getCurrentTimeout() {
                return 50000;
            }

            @Override
            public int getCurrentRetryCount() {
                return 50000;
            }

            @Override
            public void retry(VolleyError error) throws VolleyError {

            }
        });
{% endhighlight %}