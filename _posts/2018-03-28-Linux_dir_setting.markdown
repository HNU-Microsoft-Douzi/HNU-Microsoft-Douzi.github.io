---
layout: post
data: 2018-03-28
title: "Linux目录设置"
subtitle: "Bring you to konw how to understand linux dir!"
author: "Zxy"
tags:
    - Linux
---
### Linux的目录配置标准：FHS
有了所谓的FHS标准以后，规范了每个企业和个人的Linux配置，避免了商业上可能因目录配置不同而产生的混乱结果。

FHS一句文件系统使用的频繁与否允许用户随意改动，而将目录定义称为四种交互作用的形态，用下表来说明：

<table>
<tr>
<th style="width:130px">      </th>
<th>可分享的(sharable)</th>
<th>不可分享的(unshareable)</th>
</tr>
<tr>
<td>不变的(static)</td>
<td>/usr(软件放置处)<br>/opt(第三方软件)</td>
<td>/etc(配置文件)<br>/boot(开机与内核文件)</td>
</tr>
<tr>
<td>可变动的(variable)</td>
<td>/var/mail(用户邮件信箱)<br>/var/spoot/news(新闻组)</td>
<td>/var/run(程序相关)<br>/var/lock(程序相关)</td>
</tr>
</table>

### 下面说一下常用的目录配置文件
`/bin`:/bin下的命令可以被root与一般帐号所使用，主要有`cat,chmod,chown,date,mv,mkdir,cp,bash`等常用命令。

`/boot`:放置开机会使用到的文件，包括Linux内核文件以及开机菜单与开机所需要配置文件等。

`/dev`:任何设备与接口设备都是以文件的形式存在于这个目录当中。

`/etc`:配置文件，系统主要的配置文件几乎都防止在这个目录中。**FHS建议不要防止可执行文件(binary)在这个目录中。**

`/home`:系统默认的用户主文件夹。

`/lib`:系统开机会用到的函数库。

`/media`:防止可删除的设备。包括软盘、光盘、DVD等设备都暂时挂载于此。

`/opt`:第三方软件放置的目录。

`/sbin`:放在其下的为开机过程中所需要的，里面包括了开机、修复、还原系统所需要的命令。

`/srv`:一些网络服务启动后，这些服务所需要取用的数据目录。

`/tmp`:这是让一般用户或者是正在执行的程序暂时防止文件的地方。这个目录是任何人都能访问的，所以需要定期清理。

#### 以下五个文件不可与根目录分开
 - /etc： 配置文件
 - /bin: 重要执行文件
 - /dev: 所需要的设备文件
 - /lib: 执行文件所需的函数库与内核所需的模块
 - /sbin: 重要的系统执行文件

#### 下面列出一张目录树的图
[img](https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1522216157&di=ec107c213a2e1fb36eef160e06ce0221&src=http://s15.sinaimg.cn/middle/86a83660g78c5d493527e&690)

**注意：/bin和/usr/bin的差别：**

/bin是超级用户和一般用户都可以使用的命令；

/usr/bin是安装的软件的命令  