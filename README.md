#Hux Blog

###[View Live Hux Blog &rarr;](https://huangxuan.me)

![](http://huangxuan.me/img/blog-desktop.jpg)



## Boilerplate (beta)

Want to clone a boilerplate instead of my buzz blog? Here comes this!  

```
$ git clone git@github.com:Huxpro/huxblog-boilerplate.git
```

**[View Boilerplate Here &rarr;](http://huangxuan.me/huxblog-boilerplate/)**


## Porting 

- [**Hexo**](https://github.com/Kaijun/hexo-theme-huxblog) by @kaijun
- [**React-SSR**](https://github.com/LucasIcarus/huxpro.github.io/tree/ssr) by @LucasIcarus

## Translation

 - ![cn](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/China.png) **Chinese (Simplified)**: 感谢 [@BrucZhaoR](https://github.com/BruceZhaoR) 的 [中文翻译 &rarr;](https://github.com/Huxpro/huxpro.github.io/blob/master/README.zh.md)

## Features

##### New Feature (V1.5.2)

- Annoyed to delete my blog post after clone or pull? **Boilerplate** comes to help you get started quickly and easily merge update.
- `-apple-system` is added in font rule, which display beautiful new font **San Francisco** in iOS 9 by default.
- Fixed [issue#15](https://github.com/Huxpro/huxpro.github.io/issues/15) about code wrap.

##### New Feature (V1.5.1)

- **[Comment](#comment)** support [**Disqus**](http://disqus.com) officially, thanks to @rpsh.

##### New Feature (V1.5)

- **[Comment](#comment)** and **[Analytics](#analytics)** is configurable now! We also add **Google Analytics support** and drop tencents. Both documents is updated.

##### New Feature (V1.4)

- **[Featured Tags](#featured-tags)** is now independent of [SideBar](#sidebar). Both documents is updated.
- New **[SEO Title](#seo-title)** for SEO usage which is differ from the site title

##### New Feature (V1.3.1)

- Support **PingFang (苹方)**, the new Chinese font presented by [OS X El Capitan](http://www.apple.com/cn/osx/whats-new/)


##### New Feature (V1.3)

- Big Improvement to the **Navigation Menu** *(especially in Android)*:  Dropping the old, stuttering, low-performance [Bootstrap collapse.js](http://getbootstrap.com/javascript/#collapse),  replaced with an own wrote, [jank free](http://jankfree.org/) navbar menu in a pretty high-performance implementation of [Google Material Design](https://www.google.com/design/spec/material-design/introduction.html).

<img src="http://huangxuan.me/img/blog-md-navbar.gif" width="320" />


##### New Feature (V1.2)

- Brand new **[Keynote Layout](#keynote-layout)** is provided for easily posting beautiful HTML presentations you have created with this blog


##### New Feature (V1.1)

- We now support a clean and gorgeous **[SideBar](#sidebar)** for displaying more info
- **[Friends](#friends)** is also added as a common feature of blog help you do SEO

##### V1.0

- Full-feature **Tag** support
- **Mobile first** user experience optimization
- **Typographic optimization** for Chinese Fonts
- **Network optimizaition** for China, dropping Google webfont, using local CDN
- Using [Github Flavored Markdown](https://help.github.com/articles/github-flavored-markdown/)
- Using Baidu, Tencent/QQ analytics
- Using [DuoShuo](http://duoshuo.com/) as the Disqus-like third party discussion system


## Support

- **Feel free to fork. I'll Appreciate it if you keep the Author & Github link at footer**
- Give it a **Star** if you like, fork or just clone to use ;)
- If any problem or requirement, just open an issue here and I will help you.


## Document

* Get Started
	* [Environment](#environment)
	* [Get Started](#get-started)
	* [Write Posts](#write-posts)
* Components
	* [SideBar](#sidebar)
	* [Mini About Me](#mini-about-me)
	* [Featured Tags](#featured-tags)
	* [Friends](#friends)
	* [Keynote Layout](#keynote-layout)
* Comment & Analysis
	* [Comment](#comment)
	* [Analytics](#analytics)
* Advanced
	* [Customization](#customization)
	* [Header Image](#header-image)
	* [SEO Title](#seo-title)
	* [Page Build Warning](#page-build-warning)

#### Environment

If you have jekyll installed, simply run `jekyll serve` in Command Line
and preview the themes in your browser. You can use `jekyll serve --watch` to watch for changes in the source files as well.


#### Get Started

You can easily get started by modifying `_config.yml`:

```
# Site settings
title: Hux Blog             # title of your website
SEOTitle: Hux Blog			# check out docs for more detail
description: "Cool Blog"    # ...

# SNS settings      
github_username: huxpro     # modify this account to yours
weibo_username: huxpro      # the footer woule be auto-updated.

# Build settings
# paginate: 10              # nums of posts in one page
```

There are more options you can check out in the [Jekyll - Official Site](http://jekyllrb.com/), or you can directly dive into code to find more.


#### Write Posts

Feel free to checkout Markdown files in the `_posts/`, you will quickly realized how to post your articles with magical markdown plus this nice theme.

The **front-matter** of a post looks like that:

```
---
layout:     post
title:      "Hello 2015"
subtitle:   "Hello World, Hello Blog"
date:       2015-01-29 12:00:00
author:     "Hux"
header-img: "img/post-bg-2015.jpg"
tags:
    - Life
---

```

#### 前言

博客总算建起来了，大致来说就分为这么几块儿，python,c++,java,algorithm,机器学习，学习过程中遇到的问题会记录在自己的个人博客中。

希望它可以见证自己的一步步成长。

就说这么多，然后要浏览我的网站的话，请点击这里:[on click](http://www.zxyblog.xyz)

很高兴与你相遇，就这样~