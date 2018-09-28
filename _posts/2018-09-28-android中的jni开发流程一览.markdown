---
layout: post
title: "android中的jni开发流程一览"
subtitle: "Jni development process in android"
data: 2018-09-28
author: "Zxy"
tags:
    - android
    - java
---

## jni是什么？

刚开始学习android,往往不会很快的接触到jni，甚至哪怕说jni是java学习中的一部分，也少有人去涉及这一部分的内容（当然，前提是还没有进行项目开发，小的demo不算哦~）

原因很明了，因为jni本身就是一个java和c/c++之间互相调用的一个桥梁，谁没事干去用java调c/c++呢？（当然，还是不说实际项目的情况下...）

但是，在做android开发的时候，因为课程需要必须要用到opencv来做图像处理，而opencv的图像处理又是用c/c++的代码开发出来的库，要将它应用android中实际上是一个非常繁杂的过程。

我不得不说实际上这个过程不大适用于初学者。

因为android基于java的语言体系加上自身的一些特性进行开发，而open cv本身是一个c/c++的库，你要在android中应用open cv的话，就必须调用c/c++的代码，这样的话就出现了上述中jni的应用场景了。

结果我的一个同学问道：为什么要用jni?我直接在java中调用c++不就行了吗？

。。。

**你要上天吗？... ...**

我们都知道java是基于c开发的语言，它本身运行在JVM上面，运行机制有很多个层，所以简单来说就是不能够互相调用。两个完全不同的语言，能互相调用的话岂不是乱了语言的规范？

所以，我必须在android中jni封装opencv的库才可以在android上跑opencv的代码。

## opencv的安装

关于opencv在android上的集成还是非常简单的：

- 下载opencv的android sdk:OpenCV-android-sdk
- AS中Import Module->OpenCV-android-sdk\sdk\java目录
- File->Project Structure->add->Dependencies->Module dependency导入opencv的库
- 修改opencv库中build文件的各项参数

## jni的配置

要使用jni去封装opencv的库，必须先下载好ndk，ndk的配置方法就不多说了，网上的教程很多，可以直接从网上下载好，然后再settings配置好路径，或者可以直接从settings->的SDK tools勾选NDK然后Apply去直接下载，下载好后建议把ndk加入到系统的环境变量中，这里就不再多说。

同时配合NDK下载的两个工具也在SDK Tools中：CMake和LLDB，CMake是帮助配置jni的一个工具，LLDB好像是DNK的一个调试工具，暂时没有使用到。

总共三个工具(`NDK + CMake + LLDB`)必须全部下载好，环境就算搭建好了。

用CMake来配置jni有两种方式：

#### File -> New Project -> Include C++ support -> ...

构建C++的支持，这个时候,gradle会自动地用Cmake帮你配置好你的环境，然后它会在MainActivity中有一个实例和static中进行`loadLibrary`加载库，相应地再main下会有一个cpp文件夹，这个文件夹下面放着你编写地c/c++地代码，注意不要去改动cpp或者下面这个初始化地文件(一般是叫做native-lib.c++)地文件名，不然你必须再CMakeLists.txt中做相应地修改。

CMakeLists.txt是你的app目录下地一个txt文件，如果你按照上面这种方法已经生成了一个支持C++地项目，那么这个文件里面会有一些初始地内容，就像这样:

{% highlight txt %}
# For more information about using CMake with Android Studio, read the
# documentation: https://d.android.com/studio/projects/add-native-code.html

# Sets the minimum version of CMake required to build the native library.

cmake_minimum_required(VERSION 3.4.1)

# Creates and names a library, sets it as either STATIC
# or SHARED, and provides the relative paths to its source code.
# You can define multiple libraries, and CMake builds them for you.
# Gradle automatically packages shared libraries with your APK.

add_library( # Sets the name of the library.
             native-lib

             # Sets the library as a shared library.
             SHARED

             # Provides a relative path to your source file(s).
             src/main/cpp/native-lib.cpp )

# Searches for a specified prebuilt library and stores the path as a
# variable. Because CMake includes system libraries in the search path by
# default, you only need to specify the name of the public NDK library
# you want to add. CMake verifies that the library exists before
# completing its build.

find_library( # Sets the name of the path variable.
              log-lib

              # Specifies the name of the NDK library that
              # you want CMake to locate.
              log )

# Specifies libraries CMake should link to your target library. You
# can link multiple libraries, such as libraries you define in this
# build script, prebuilt third-party libraries, or system libraries.

target_link_libraries( # Specifies the target library.
                       native-lib

                       # Links the target library to the log library
                       # included in the NDK.
                       ${log-lib} )
{% endhighlight %}

要在这里做相应地修改，相应地意思这里也给出来：

{% highlight txt %}
里面有三个参数配置：
    native-lib:设置库的名字为native-lib，名字可以任意，但是要和System.loadLibrary("native-lib");保持一致 。
   SHARED：可以分享的，动态库。
   src/main/cpp/native-lib.cpp：配置源文件或者头文件的路径

find_library
    将find_library()命令添加到CMake构建脚本中以定位NDK库，并将其路径存储为一个变量。可以使用此变量在构建脚本的其他部分引用NDK库。
    log:找到log模块

target_link_libraries 
     指定要关联到原生库的库，第一个自然是我们add_library里面指定的库名字native-lib库，然后可以看到${log-lib}，也就是引用了find_library里面定义的日志库。
     经过上面一系列的配置，项目就可以正常运行起来了。
{% endhighlight %}

----------

然后说第二种加载方式：

**在已有地项目中，添加c/c++代码地支持**

该怎么做呢?

很简单，首先，我们需要在src目录下新建一个Folder:New->Folder->JNI Folder

然后...你就会发想你的main目录下多了一个jni的文件夹，这个文件夹就是要用来存放你的c/c++代码的，这个时候你可以随意的修改这个jni文件夹的名称，当然，这是因为你还没有开始配置你的CmakeLists.txt的配置文件。

然后你需要在jni下新建一个文件，就比如说:hello.c

这个文件里面你可以之后再写东西，都可以。

最重要的一点是，你要开始向CMakeLists.txt中开始配置文件的内容：

{% highlight txt %}
cmake_minimum_required(VERSION 3.4.1)
add_library(
    # 库的名字
    cmake
    # 动态库
    SHARED
    #源文件或头文件的路径
    src/main/jni/hello.c
)
find_library( # Sets the name of the path variable.
              log-lib

              # Specifies the name of the NDK library that
              # you want CMake to locate.
              log )
target_link_libraries( # Specifies the target library.
                       cmake

                       # Links the target library to the log library
                       # included in the NDK.
                       ${log-lib} )

{% endhighlight %}

需要注意的就是add_library中的三个参数和target_link_libraries中的第一个参数，最重要的一点是：这上面的三个大括号都是圆括号，千万不要看成这个(`{}`)了哦！

配置完以后sync一遍，然后向hello.c中写入c代码，在MainActivity中进行库的加载(loadLibrary)，然后在其内进行native的声明，在直接进行调用，就可以将c/c++代码的运行结果跑到你的手机上了。

还有一点就是jni(shit)一样的语句，你需要自己去慢慢适应，并且配合jni.h文件，进行相应API的查去和调用。