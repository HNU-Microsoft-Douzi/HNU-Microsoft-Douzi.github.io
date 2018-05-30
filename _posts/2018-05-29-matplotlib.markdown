---
layout: post
title: "python绘图库-Matplotlib库"
subtitle: "Use Matplotlib to make date analysis"
data: 2018-05-29
author: "Zxy"
tags:
    - 机器学习
---

{% highlight python %}
#  利用Matplotlib库绘图(构造可视化界面)
import matplotlib.pyplot as plt
plt.style.use('ggplot')
%matplotlib inline
import numpy as np
import pandas as pd
import requests
import os


if __name__ == '__main__':
    url = r'https://archive.ics.uci.edu/ml/machine-learning-databases/iris/iris.data'
    PATH = r'/Users/Administrator/Desktop/untitled/'

    r = requests.get(url)
    with open(PATH + 'iris.data', 'w') as f:
        f.write(r.text)

    os.chdir(PATH)
    df = pd.read_csv(PATH + 'iris.data', names=['sepal length', 'sepal width', 'petal length', 'petal width', 'class'])
    df.head()
    
    fig, ax = plt.subplots(figsize = (6,4))
    ax.hist(df['petal width'], color='gold');
    ax.set_ylabel('Count', fontsize=12)
    ax.set_xlabel('Width', fontsize=12)
    plt.title('Irir Petal Width', fontsize=14, y=1.01)
{% endhighlight %}

结果如下：

<img src="/assets/Matplotlib_0.png">

> 这里用到一个scv文件，这里做演示就不给出了。

第一行的.hist()传入了df对象中的petal width的所有数据，设置颜色为金色，构建花瓣宽度的直方图。

接下来的两行分别在y轴和x轴上放置标签，最后一行为全图设置了标题，其中fontsize表示字体大小,y=1.01表示标题在y轴方向上相对于图片顶部的位置。

那么，如果要显示多个列的可视化数据要怎么做呢？答案很简单，看下面的代码：

{% highlight python %}
#  利用Matplotlib库绘图(构造可视化界面)
import matplotlib.pyplot as plt
plt.style.use('ggplot')
%matplotlib inline
import numpy as np
import pandas as pd
import requests
import os


if __name__ == '__main__':
    url = r'https://archive.ics.uci.edu/ml/machine-learning-databases/iris/iris.data'
    PATH = r'/Users/Administrator/Desktop/untitled/'

    r = requests.get(url)
    with open(PATH + 'iris.data', 'w') as f:
        f.write(r.text)

    os.chdir(PATH)
    df = pd.read_csv(PATH + 'iris.data', names=['sepal length', 'sepal width', 'petal length', 'petal width', 'class'])
    df.head()
    
    # 2,2表示图像按照两行两列进行划分，但是对于整体的大小还是6英寸高和4英寸长
    fig, ax = plt.subplots(2, 2, figsize = (6,4))
    
    ax[0][0].hist(df['petal width'], color='black');
    ax[0][0].set_ylabel('Count', fontsize=12)
    ax[0][0].set_xlabel('Width', fontsize=12)
    plt.title('Iris Petal Width', fontsize=14, y=1.01)
    
    
    ax[0][1].hist(df['petal length'], color='black');
    ax[0][1].set_ylabel('Count', fontsize=12)
    ax[0][1].set_xlabel('Length', fontsize=12)
    plt.title('Iris Petal Length', fontsize=14, y=1.01)

    ax[1][0].hist(df['sepal width'], color='black');
    ax[1][0].set_ylabel('Count', fontsize=12)
    ax[1][0].set_xlabel('Width', fontsize=12)
    plt.title('Iris Sepal Width', fontsize=14, y=1.01)
    
    ax[1][1].hist(df['sepal width'], color='black');
    ax[1][1].set_ylabel('Count', fontsize=12)
    ax[1][1].set_xlabel('Length', fontsize=12)
    plt.title('Iris Petal Lengthdth', fontsize=14, y=1.01)
    
    plt.tight_layout()
{% endhighlight %}

结果如下:

<img src="/assets/Matplotlib_1.png">

对于所有土地乡的处理，先调用一个fig,ax的赋值，这里使用调用plt.subplots(2,2,figsize(6,4))显然有3个参数，前两个表示对ax进行划分，两行两列。

在下面的四个代码块中，依次对ax的四个元素进行调用，并得到结果。

最后一行加一个`plt.tight_layout()`是为了图像不显得那么紧凑。

**如何通过散点图来观察数据的相关性呢？**

很简单，我们只要将在传入数据的时候调用.scatter()这个对象就可以了。

代码如下，让我们来看一下这个散点图该怎么样进行描述：

{% highlight python %}
#  利用Matplotlib库绘图(构造可视化界面)
import matplotlib.pyplot as plt
plt.style.use('ggplot')
%matplotlib inline
import numpy as np
import pandas as pd
import requests
import os


if __name__ == '__main__':
    url = r'https://archive.ics.uci.edu/ml/machine-learning-databases/iris/iris.data'
    PATH = r'/Users/Administrator/Desktop/untitled/'

    r = requests.get(url)
    with open(PATH + 'iris.data', 'w') as f:
        f.write(r.text)

    os.chdir(PATH)
    df = pd.read_csv(PATH + 'iris.data', names=['sepal length', 'sepal width', 'petal length', 'petal width', 'class'])
    df.head()
    
    # 2,2表示图像按照两行两列进行划分，但是对于整体的大小还是6英寸高和4英寸长
    fig, ax = plt.subplots(figsize = (6,4))
    ax.scatter(df['petal width'], df['petal length'], color='green')
    ax.set_xlabel('petal width')
    ax.set_ylabel('petal length')
    ax.set_title('Petal Scatterplot')
{% endhighlight %}

看下结果:

<img src="/assets/Matplotlib_2.png">

**相应的，下面给出波形图的图像构造过程:**

{% highlight python %}
#  利用Matplotlib库绘图(构造可视化界面)
import matplotlib.pyplot as plt
plt.style.use('ggplot')
%matplotlib inline
import numpy as np
import pandas as pd
import requests
import os


if __name__ == '__main__':
    url = r'https://archive.ics.uci.edu/ml/machine-learning-databases/iris/iris.data'
    PATH = r'/Users/Administrator/Desktop/untitled/'

    r = requests.get(url)
    with open(PATH + 'iris.data', 'w') as f:
        f.write(r.text)

    os.chdir(PATH)
    df = pd.read_csv(PATH + 'iris.data', names=['sepal length', 'sepal width', 'petal length', 'petal width', 'class'])
    df.head()
    
    fig, ax = plt.subplots(figsize = (6,6))
    ax.plot(df['petal length'], color='blue');
    ax.set_ylabel('Count', fontsize=12)
    ax.set_xlabel('Width', fontsize=12)
    plt.title('Irir Length Plot')
{% endhighlight %}

结果如下:

<img src="/assets/Matplotlib_3.png">

然后对于图像的纵轴是我们直接传入的数据，会自行根据数据的值进行划分和判断区间的大小，横轴我们没有更定，默认按照行的编号递增，看来matplotlib.pyplot库的plot方法本身对于默认行(列)的划分有着一定的规律，比如横行150个数据，就按20个进行划分，应该是它本身进行了计算吧，计算的规则暂时不知道，知道的时候这里再补上。

**如何生成条形图？**

生成条形图的步骤比前面的几个都要复杂，但是往往条形图却是我们最常使用的一个图标之一：

先给出代码：

{% highlight python %}
#  利用Matplotlib库绘图(构造可视化界面)
import matplotlib.pyplot as plt
plt.style.use('ggplot')
%matplotlib inline
import numpy as np
import pandas as pd
import requests
import os


if __name__ == '__main__':
    url = r'https://archive.ics.uci.edu/ml/machine-learning-databases/iris/iris.data'
    PATH = r'/Users/Administrator/Desktop/untitled/'

    r = requests.get(url)
    with open(PATH + 'iris.data', 'w') as f:
        f.write(r.text)

    os.chdir(PATH)
    df = pd.read_csv(PATH + 'iris.data', names=['sepal length', 'sepal width', 'petal length', 'petal width', 'class'])
    df.head()
    
    fig, ax = plt.subplots(figsize = (6,6))
    bar_width=.8
    labels = [x for x in df.columns if 'length' in x or 'width' in x] # 给定所有的标签
    ver_y = [df[df['class']=='Iris-versicolor'][x].mean() for x in labels]
    vir_y = [df[df['class']=='Iris-virginica'][x].mean() for x in labels]
    set_y = [df[df['class']=='Iris-setosa'][x].mean() for x in labels]
    x = np.arange(len(labels))
    ax.bar(x, vir_y, bar_width, bottom=set_y, color='darkgrey')
    ax.bar(x, set_y, bar_width, bottom=ver_y, color='green')
    ax.bar(x, vir_y, bar_width, color='black')
    ax.set_xticks(x + (bar_width/2))
    ax.set_xticklabels(labels, rotation=-70, fontsize=12);
    ax.set_title('Mean Feature Measurement By Class', y=1.01)
    ax.legend(['Virginica', 'Setosa', 'Versicolor'])
{% endhighlight %}

这里利用给定数据集中的数据得到每个类别的特征的平均测量值。

<img src="/assets/Matloptlib_4.png">