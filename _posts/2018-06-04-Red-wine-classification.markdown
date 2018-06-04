---
layout: post
title: 红酒分类"
subtitle: "The linear regression algorithm is used to complete a training of machine learning!"
data: 2018-06-04
author: "Zxy"
tags:
    - python
    - 机器学习
    - algorithm
---

> 注：本章内容源自于[绿盟杯第三阶段](https://www.educoder.net/tasks/gc5wkve2nyl3)，仅以学习用途作为记录，侵权即删。

## 任务概述

本关你需要训练分类器，基于红酒的不同属性对红酒进行二分类。可以尝试利用线性回归，支持向量机，决策树，随机森林，梯度树提升等方法。

## 数据说明

**训练集数据文件train.csv**

每行代表一种红酒及基本属性，最后一列为该红酒类别标签（分白葡萄酒，红葡萄酒两类），各字段由逗号分隔，格式为：

	`id`,`fixedAcidity`,` volatileAcidity`, `citricAcid`, `residualSugar`, `chlorides`, `freeSulfurDioxide`, `totalSulfurDioxide`, `density`, `pH`, `sulphates`, `alcohol`, `quality`, `type`

其中，

- ``id`: 唯一标记一种红酒；
- `type`: 标记该项目对应的红酒类别标签（`0`代表该红酒为红葡萄酒，`1`代表该红酒为白葡萄酒）。


不同特征中英文含义如下：

英文	中文

fixedAcidity	固定酸度

volatileAcidity	挥发性酸度

citricAcid	柠檬酸

residualSugar	残糖

chlorides	氯化物

freeSulfurDioxide	游离二氧化硫

totalSulfurDioxide	总二氧化硫

density	密度

pH	pH值

sulphates	硫酸盐

alcohol	乙醇

quality	红酒质量等级（1-5）

**测试集数据文件test.csv**

每行代表一种红酒及基本属性，各字段由逗号分隔，格式与训练集完全相同，但红酒类型type的值未给出，为预测变量。

	`id`,`fixedAcidity`,` volatileAcidity`, `citricAcid`, `residualSugar`, `chlorides`, `freeSulfurDioxide`, `totalSulfurDioxide`, `density`, `pH`, `sulphates`, `alcohol`, `quality`, `type`

## 挑战任务

本关任务是，要求你根据已有的红酒属性及类别的样本数据，设计并训练分类模型。然后利用该分类模型对测试集中给出的红酒进行类型预测（红葡萄酒或者白葡萄酒）

## 编程要求

请补充完善右侧代码区域中的func()函数，构建分类器，实现对红酒的分类。具体要求如下：

- 自行读取训练集文件src/step1/train.csv和测试集文件src/step1/test.csv；
- 根据获取的数据定义模型并进行模型训练，输出预测结果；
- 将生成的预测结果保存到src/step1/test_prediction.csv文件中。

预测结果文件src/step1/test_prediction.csv采用无BOM的UTF-8编码格式。该文件的格式要求为：每行记录对应于测试集中给出的每种红酒的预测类型（0代表该红酒为红葡萄酒，1代表该红酒为白葡萄酒），具体格式参考如下：

id,type

1,1

2,0

3,0

4,1

……

本关涉及到test.csv，train.csv文件的下载地址：

[https://www.educoder.net/attachments/download/200655/test.csv](https://www.educoder.net/attachments/download/200655/test.csv)

[https://www.educoder.net/attachments/download/199925/train.csv](https://www.educoder.net/attachments/download/199925/train.csv)

下面给出通关答案，也是机器学习线性回归的算法构层，这里记录下来作为学习应用。

{% highlight python %}
# -*- coding: utf-8 -*-
"""
Created on Tue May 22 11:39:44 2018
@author: DELL
"""
import pandas as pd
import numpy as np
from sklearn.tree import DecisionTreeClassifier
from sklearn.linear_model import LogisticRegression
def func():
    train = pd.read_csv("src/step1/train.csv")
    test = pd.read_csv("src/step1/test.csv")
    ##预测量定义
    y = train.type
    ## 特征定义
    predictors = ['fixedAcidity', 'volatileAcidity', 'citricAcid', 'residualSugar',
                  'chlorides', 'freeSulfurDioxide', 'totalSulfurDioxide',
                  'density', 'pH', 'sulphates', 'alcohol', 'quality']
    ## 生成结构化数据
    X = train[predictors]
    # 定义模型
    wine_model = LogisticRegression()
    # 模型训练
    wine_model.fit(X, y)
    # print("Making predictions for the following 5 wines:")
    # print(X.head())
    # print("The predictions are")
    # print(wine_model.predict_proba(X.head()))
    # 生成预测结果
    prediction = wine_model.predict_proba(test[predictors])
    submission = pd.DataFrame({'id': test['id'], 'type': prediction[:, 1]})
    submission.to_csv('src/step1/test_prediction.csv', index=False)
{% endhighlight %}