---
layout: post
title: "正则表达式"
subtitle: "Regular expression"
data: 2018-03-24
author: "Zxy"
tags:
    - Java
---
## JAVA正则表达式

<p>正则表达式定义了字符串的模式。</p>
<p>正则表达式可以用来搜索、编辑或处理文本。</p>
<p>正则表达式并不仅限于某一种语言，但是在每种语言中有席位的差别。</p>
<p>正则表达式是对字符串操作的一种逻辑公式，就是用事先定义好的一些特定字符、及这些特定字符的组合，组成一个"规则字符串"，这个"规则字符串"用来表达对字符串的一种过滤逻辑。</p>
<p><b>实例</b></p>
<p>this is text</p>
<p>匹配字符串"this is text"</p>
<br>
<p>this\s+is\s+text</p>
<p>匹配"this"后面的\s+可以匹配多个空格，之后匹配is字符串，在之后\s+再匹配多个空格，再匹配text字符串</p>
<p>可以匹配这个实例：this is text</p>
<br>
<p>^\d+(\.\d+)?</p>
<p>^定义了以什么开始</p>
<p>\d+匹配一个或多个数字</p>
<p>？设置括号里的选项是可有可没有的</p>
<p>\.匹配"."</p>
<p>可以匹配的实例："5", "1.5"和"2.21"</p>
<br>
<p>java.util.regex 包主要包括以下三个类：</p>
<b>Pattern类</b><br>
<p>pattern 对象是一个正则表达式的编译表示。Pattern 类没有公共构造方法。要创建一个 Pattern 对象，你必须首先调用其公共静态编译方法，它返回一个 Pattern 对象。该方法接受一个正则表达式作为它的第一个参数。</p>
<b>Matcher类</b><br>
<p>Matcher 对象是对输入字符串进行解释和匹配操作的引擎。与Pattern 类一样，Matcher 也没有公共构造方法。你需要调用 Pattern 对象的 matcher 方法来获得一个 Matcher 对象。</p>
<b>PatternSyntaxException：</b><br>
<p>PatternSyntaxException 是一个非强制异常类，它表示一个正则表达式模式中的语法错误。</p>
<p>以下实例中使用了正则表达式 .*runoob.* 用于查找字符串中是否包了 runoob 子串：</p>
{% highlight java %}
import java.util.regex.*;
 
class RegexExample1{
   public static void main(String args[]){
      String content = "I am noob " +
        "from runoob.com.";
 
      String pattern = ".*runoob.*";
 
      boolean isMatch = Pattern.matches(pattern, content);
      System.out.println("字符串中是否包含了 'runoob' 子字符串? " + isMatch);
   }
}
{% endhighlight %}
<br><br>
<p class="h3">正则表达式语法</p>
<p>在其他语言中，\\ 表示：<b>我想要在正则表达式中插入一个普通的（字面上的）反斜杠，请不要给它任何特殊的意义。</b></p>
<p>在 Java 中，\\ 表示：<b>我要插入一个正则表达式的反斜线，所以其后的字符具有特殊的意义。</b></p>
<p>所以，在其他的语言中，一个反斜杠\就足以具有转义的作用，而在正则表达式中则需要有两个反斜杠才能被解析为其他语言中的转义作用。也可以简单的理解在正则表达式中，两个 \ 代表其他语言中的一个 \，这也就是为什么表示一位数字的正则表达式是 \\d，而表示一个普通的反斜杠是 \\\\。</p>
<p>各个字符的具体用法具体详见:<a href="http://www.runoob.com/java/java-regular-expressions.html">Java正则表达式|菜鸟教程</a></p>
<br><br>
<p class="h3">Start和end方法</p>
<p>下面是一个对单词"cat"出现在输入字符串中出现次数进行计数的例子：</p>
{% highlight java %}
import java.util.regex.Matcher;
import java.util.regex.Pattern;
 
public class RegexMatches
{
    private static final String REGEX = "\\bcat\\b";
    private static final String INPUT =
                                    "cat cat cat cattie cat";
 
    public static void main( String args[] ){
       Pattern p = Pattern.compile(REGEX);
       Matcher m = p.matcher(INPUT); // 获取 matcher 对象
       int count = 0;
 
       while(m.find()) {
         count++;
         System.out.println("Match number "+count);
         System.out.println("start(): "+m.start());
         System.out.println("end(): "+m.end());
      }
   }
}
{% endhighlight %}
<br><br>
<p class="h3">matches和lookingAt方法</p>
<p>matches 和 lookingAt 方法都用来尝试匹配一个输入序列模式。它们的不同是 matches 要求整个序列都匹配，而lookingAt 不要求。</p>
<p>lookingAt 方法虽然不需要整句都匹配，但是需要从第一个字符开始匹配。</p>
<b>实例</b><br>
{% highlight java %}
import java.util.regex.Matcher;
import java.util.regex.Pattern;
 
public class RegexMatches
{
    private static final String REGEX = "foo";
    private static final String INPUT = "fooooooooooooooooo";
    private static final String INPUT2 = "ooooofoooooooooooo";
    private static Pattern pattern;
    private static Matcher matcher;
    private static Matcher matcher2;
 
    public static void main( String args[] ){
       pattern = Pattern.compile(REGEX);
       matcher = pattern.matcher(INPUT);
       matcher2 = pattern.matcher(INPUT2);
 
       System.out.println("Current REGEX is: "+REGEX);
       System.out.println("Current INPUT is: "+INPUT);
       System.out.println("Current INPUT2 is: "+INPUT2);
 
 
       System.out.println("lookingAt(): "+matcher.lookingAt());
       System.out.println("matches(): "+matcher.matches());
       System.out.println("lookingAt(): "+matcher2.lookingAt());
   }
}
{% endhighlight %}
<br><br>
<p class="h3"></p>
<p></p>
{% highlight java %}
{% endhighlight %}
<br><br>
<p class="h3">replaceFirst 和 replaceAll 方法</p>
<p>replaceFirst 和 replaceAll 方法用来替换匹配正则表达式的文本。不同的是，replaceFirst 替换首次匹配，replaceAll 替换所有匹配。</p>
{% highlight java %}
import java.util.regex.Matcher;
import java.util.regex.Pattern;
 
public class RegexMatches
{
    private static String REGEX = "dog";
    private static String INPUT = "The dog says meow. " +
                                    "All dogs say meow.";
    private static String REPLACE = "cat";
 
    public static void main(String[] args) {
       Pattern p = Pattern.compile(REGEX);
       // get a matcher object
       Matcher m = p.matcher(INPUT); 
       INPUT = m.replaceAll(REPLACE);
       System.out.println(INPUT);
   }
}
{% endhighlight %}
<p>结果</p>
{% highlight java %}
The cat says meow. All cats say meow.
{% endhighlight %}
<br><br>
<p class="h3">appendReplacement 和 appendTail 方法</p>
<p>Matcher 类也提供了appendReplacement 和 appendTail 方法用于文本替换：</p>
{% highlight java %}
import java.util.regex.Matcher;
import java.util.regex.Pattern;
 
public class RegexMatches
{
   private static String REGEX = "a*b";
   private static String INPUT = "aabfooaabfooabfoob";
   private static String REPLACE = "-";
   public static void main(String[] args) {
      Pattern p = Pattern.compile(REGEX);
      // 获取 matcher 对象
      Matcher m = p.matcher(INPUT);
      StringBuffer sb = new StringBuffer();
      while(m.find()){
         m.appendReplacement(sb,REPLACE);
      }
      m.appendTail(sb);
      System.out.println(sb.toString());
   }
}
{% endhighlight %}
<p>结果:</p>
{% highlight java %}
-foo-foo-foo-
{% endhighlight %}
<br><br>
<p class="h3">PatternSyntaxException 类的方法</p>
<p>PatternSyntaxException 是一个非强制异常类，它指示一个正则表达式模式中的语法错误。
<br>
PatternSyntaxException 类提供了下面的方法来帮助我们查看发生了什么错误。</p>
<p>具体详见<a href="http://www.runoob.com/java/java-regular-expressions.html">菜鸟教程</a></p>