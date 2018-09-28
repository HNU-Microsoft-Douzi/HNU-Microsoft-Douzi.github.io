---
title: "Android网络框架之Okhttp框架的使用"
subtitle: "The use of the Okhttp framework of the Android network framework"
layout: post
data: 2018-07-21
author: "Zxy"
tags:
    - android
---

## 一、添加依赖库

`implementation 'com.squareup.okhttp3:okhttp:3.7.0'`

## 二、添加网络许可

`<uses-permission android:name="android.permission.INTERNET"/>`

## 三、get请求

{% highlight java %}
//同步请求
    private void get_request(){
        OkHttpClient client  = new OkHttpClient();
        Request request = new Request.Builder()
                .url(url)
                .build();
        Call call = client.newCall(request);
        try{
            Response response = call.execute();
            if(response.isSuccessful()){
                tv.setText(response.body().toString());
            }
            else{
                Log.i("TAG","失败了!");
            }
        }catch(Exception e){
            Log.i("TAG",e.getMessage());
        }
    }

    //异步请求
    private void get_request_1(){
        OkHttpClient client = new OkHttpClient();
        Request request = new Request().Builder()
                .url(url)
                .build();
        client.newCall(request).enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
                Log.i("TAG",e.getMessage());
            }

            @Override
            public void onResponse(Call call, Response response) throws IOException {
                tv.setText(response.body().toString());
                Log.i("TAG","成功了!");
            }
        });
    }

{% endhighlight %}

##　四、post请求

{% highlight java %}
    /**
     * 异步的post
     * 同步的话和get是一样的，只要用newCall来调用就行了
     */
    private void post_request(){
        OkHttpClient mOkHttpClient = new OkHttpClient();
        RequestBody formBody = new FormBody.Builder()
                .add("topicId", "1002")
                .add("maxReply", "-1")
                .add("reqApp", "1")
                .build();

        Request request = new Request.Builder()
                .url(url)
                .post(formBody)
                .build();
        Call call = mOkHttpClient.newCall(request);
        call.enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
                Log.i("TAG",e.getMessage());
            }

            @Override
            public void onResponse(Call call, Response response) throws IOException {
                final String str = response.body().string();
                runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        Toast.makeText(getApplicationContext(), str, Toast.LENGTH_SHORT).show();
                    }
                });
            }
        });
    }
{% endhighlight %}