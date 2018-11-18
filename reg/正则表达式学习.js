// 正则表达式学习.js
// 如果安装了convertoutf8还出现乱码可以查看该文件http://blog.csdn.net/left_la/article/details/38843135
//http://www.cnblogs.com/moqing/archive/2016/07/13/5665126.html 过目不忘js正则表达式（例子也是这里的）
//http://wenku.baidu.com/link?url=g3oy7eFa69Fcx-dBYgDJACRcINMQ1mxT0-U9ufUat2G-am7s4GUyMfZLhPeB2WXiZedo298kCYkzSuhY-bU3kyNtyjHzPl8sP8T3yIFWMgG### 从入门到精通
//http://blog.csdn.net/liujie19901217/article/details/51219672 学习总结

// string.test方法测试，返回boolean
function test() {
    var str = '374829348791';
    var re = /\D/;      //  \D代表非数字
    if (re.test(str)) {   // 返回true,代表在字符串中找到了非数字。
        console.log('不全是数字');
    } else {
        console.log('全是数字');
    }
}
// test();

//search
function search() {
    var str = 'abcdef';
    var re = /B/i; // i转小写
    //var re = new RegExp('B','i'); 也可以这样写
    console.log(str.search(re)); // 显示1；查找的是第一个
}
// search();

//match
//补充：exec()方法：和match方法一样，搜索符合规则的内容，并返回内容，格式为数组(只返回第一个)。
// 用法：正则.exec(字符串)；
// 属性：input(代表要匹配的字符串)  
function match() {
    var str = 'haj123sdk54hask33dkhalsd879';
    var re = /\d+/g;   // 每次匹配至少一个数字  且全局匹配  如果不是全局匹配，当找到数字123，它就会停止了。就只会弹出123.加上全局匹配，
    // 就会从开始到结束一直去搜索符合规则的。如果没有加号，
    // 匹配的结果就是1，2，3，5，4，3，3，8，7，9并不是我们想要的，有了加号，每次匹配的数字就是至少一个了。
    console.log(str.match(re));   // [123，54，33，879]
}
// match();


//replace
// replace配合正则表达式使用
function replace() {
    //一开始我们可能会想到这样的方法：
    var str = "我爱北京天安门，天安门上太阳升。";
    var re = /北京|天安门/g;  //  找到北京 或者天安门 全局匹配
    // var re = /(北京)|(天安门)|(太阳)/g;  // 如果加了括号，可以自己尝试一下congsole.log(arguments)，能很快看清楚各个参数的意义，会很不同
    var str2 = str.replace(re, '*');
    console.log(str2)  //我爱**，*上太阳升 
    //但是这种只是把找到的变成了一个*，并不能几个字就对应几个*。
    //我们需要一个字对应一个*，所以可以使用function
    var str3 = str.replace(re, function (str, index, me) { //index会显示第几个字母开始，me代表str
        console.log(str, '-----');
        var result = '';
        for (var i = 0; i < str.length; i++) {
            result += '*';
        }
        return result;
    });
    console.log('最后的结果：' + str3);
}
// replace();

// **************正则中的字符****************************
// \d字符
function chars1() {
    var str = '2013-6-7';
    var re1 = /\d-+/g;  // 全局匹配数字，横杠，横杠数量至少为1，匹配结果为：  3- 6-
    var re2 = /(\d-)+/g;  // 全局匹配数字，横杠，数字和横杠整体数量至少为1   3-6-
    var re3 = /(\d+)(-)/g;   //  全局匹配至少一个数字，匹配一个横杠 匹配结果：2013- 6-
    console.log(str.match(re1));
    console.log(str.match(re2));
    console.log(str.match(re3));
}
// chars1();


//正则中的每一个带小括号的项，都叫做这个正则的子项。子项在某些时候非常的有用，比如我们来看一个栗子
// 这里叫做捕获
function captureArr() {
    var str = '2013-6-7';
    var re = /(\d+)(-)/g;
    str = str.replace(re, function ($0, $1, $2, index, me) {
        //replace()中如果有子项，
        //第一个参数：$0（匹配成功后的整体结果  2013-  6-）,
        // 第二个参数 : $1(匹配成功的第一个分组，这里指的是\d   2013, 6)
        //第三个参数 : $1(匹配成功的第二个分组，这里指的是-    - - )   
        return $1 + '.';  //分别返回2013.   6.
    });
    console.log(str);   //2013.6.7
    //整个过程就是利用子项把2013- 6- 分别替换成了2013. 6.  最终弹出2013.6.7
}
// captureArr();


// match方法也会返回自己的子项，如下：
// 当match不加g的时候才可以获取到子项的集合
function matchArr() {
    var str = 'abc';
    // 这个g很关键！！！！加则没子项，不加则有
    var re = /(a)(b)(c)/g;
    console.log(str.match(re));  //[abc,a,b,c]( 返回的是匹配结果 以及每个子项  当match不加g的时候才可以获取到子项的集合)
    console.log(re.exec(str)); // 这里加不加都有，如果有g，可以使用exec
}
// matchArr();


//补充：exec()方法：和match方法一样，搜索符合规则的内容，并返回内容，格式为数组。
// 用法：正则.exec(字符串)；
// 属性：input(代表要匹配的字符串) 

function execNoG() {
    //不是全局匹配 
    var testStr = 'now test001 test002';
    var re = /test(\d+)/;
    console.log(re.exec(testStr));
    console.log(re.exec(testStr)); // 如果加了g之后这个会接着上面的运行，可以运行看下结果
    console.log(testStr.match(re));
}
// execNoG();

// !!!exec是接着运行
function execWithG() {
    var testStr = "now test001 test002";
    var re = /test(\d+)/g;
    var r = "";

    //匹配两次 每次匹配都接着上一次的位置开始匹配，一直匹配到最后r就为false,就停止匹配了 匹配到test001 test002  
    while (r = re.exec(testStr)) {
        console.log(r);//返回每次匹配成功的字符串，以及子项，分别弹出 ：test001 001,test002  002
        console.log(r.input); //分别弹出：   now test001 test002    now test001 test002  
        console.log(r[0]);   //代表每次匹配成功的字符串  分别弹出：  test001     test002
        console.log(r[1]);  //代表每次匹配成功字符串中的第一个子项 (\d+)  分别弹出：001   002
        console.log(r.index);   // 每次匹配成功的字符串中的第一个字符的位置，分别弹出：4  12
        console.log(r.length); //分别弹出：2 2
    }
}
// execWithG();


// [] ： 表示某个集合中的任意一个，比如 [abc] 整体代表一个字符 匹配 a b c 中的任意一个，也可以是范围，[0-9] 范围必须从小到大 。
// [^a] 整体代表一个字符   ：^写在[]里面的话，就代表排除的意思
// 例子：匹配HTML标签 比如<div class="b">hahahah </div> 找出标签<div class="b"></div>
function any() {
    var re = /<[^>]+>/g; //匹配左括号 中间至少一个非右括号的内容(因为标签里面还有属性等一些东西)，然后匹配右括号
    // var re = /<[\w\W]+>/g; //>这个应该也被算作字符或则非字符了。匹配左括号 中间至少一个字符或者非字符的内容，然后匹配右括号
    // 其实就是找到左括号，然后中间可以有至少一个内容，一直到找到右括号就代表是一个标签。
    var str = '<div class="b">hahahah </div>';
    var result = str.match(re);
    console.log(result);
    console.log(result.join(''));
}
// any();

//^起始字符，$结束字符,如^\d表示开头需要以数字开头
//*代表匹配前面的0-n
//.代表任意字符
function chars2() {
    var re = /^\d.*\D$/g;
    var str = '1234chenji';
    console.log(re.exec(str));
}
// chars2();

//\b:独立的部分（空格、开始和结束） 
// \B跟\b刚好相反，只要不是空格、开始或则结束就可以
function chars3() {
    var str = ' onetwo';
    var str2 = 'one two';
    var re = /\bo/;
    console.log(re.exec(str));
    console.log(re.exec(str2));
}
// chars3();



/********************* 实例编写 ******************/
// 写一个class名获取节点的函数
function getByClass(parent, className) {
    if (parent.getElementsByClassName) {
        parent.getElementsByClassName(className);
    } else {
        var results = [];
        var elements = parent.getElementsByTagName('*');
        //这个导致的问题是如果class='box1 box2'的话你是不是就匹配不上了？？？
        /* for(var i=0;i<elements.length;i++){
             if(elements[i].className==className){
                 results.push(elements[i]);
             }
         }*/

        //所以使用正则表达式来进行匹配
        var re = new RegExp('\\b' + className + '\\b');//不能使用/\bclassName\b/，要不然会把calssName当做字面量去处理了
        for (var i = 0; i < elements.length; i++) {
            if (re.test(elements[i].className)) {
                results.push(elements[i]);
            }
        }
        return results;
    }
}

// (a) (b) (c) \1/-----匹配 abca  \1代表着（a)
// (a) (b) (c) \2/------匹配 abcb \2代表着（b)
function captureCopy() {
    var str = 'abcachenji';
    var str2 = 'abcbchenji';
    var re = /(a)(b)(c)\1/;
    console.log(re.exec(str));//abca
    console.log(re.exec(str2));//null
}
// captureCopy();

// 例子（面试题中经常问到）：找重复项最多的字符个数
function findMostChar() {
    var str = 'assssjdssskssalsssdkjsssdss';
    str = str.split('').sort().join('');
    console.log(str);
    // replace里面面function执行的次数跟匹配到的有关
    var re = /(\w)\1+/g;
    var value = '';
    var index = -1;
    str.replace(re, function ($0, $1) {//$0代表aaaa  $1 a
        if ($0.length > index) {
            index = $0.length;
            value = $1;
        }
    });
    console.log('最多出现的重复字符是' + value + '，出现的次数是' + index);
    console.log(str);
}
// findMostChar();

//验证qq号是否符合条件
//qq号5-12位的数字
function validateQQ() {
    var str = '1010072738';
    var re = /^[1-9]\d{4,11}$/;
    console.log(re.test(str));
}
// validateQQ();

//去掉前后空格
//replace只会替换掉第一个
function trimBound() {
    var str = ' chenji ';
    var re = /^\s+|\s+$/g;
    console.log('(' + str.replace(re, '') + ')');
}
// trimBound();

/******************* 常用的一些表单校验
匹配中文：[\u4e00-\u9fa5] // 中文ACALL码的范围  utf-8中文范围
行首行尾空格：^\s*|\s*$ //首行出现任意个空格或者尾行出现任意个空格（任意表示也可以没有空格）
Email：^\w+@[a-z0-9]+(\.[a-z]+){1,3}$  
      //起始至少为一个字符(\w字母，数字或者下划线)，然后匹配@,接着为任意个字母或者数字，\.代表真正的点，
      //.后面为至少一个的字符（a-z）,同时这个(比如.com)整体为一个子项作为结束，
      //可以出现1-3次。因为有的邮箱是这样的.cn.net。（xxxx.@qq.com xxxx.@163.com xxxx.@16.cn.net ）
网址：[a-zA-z]+://[^\s]*   http://......
  //匹配不分大小写的任意字母，接着是//,后面是非空格的任意字符

邮政编码：[1-9]\d{5}  //起始数字不能为0，然后是5个数字
身份证：[1-9]\d{14}|[1-9]\d{17}|[1-9]\d{16}x*/

//捕获性和非捕获性分组
// 一般的分组()即括号中没有?:的使用时,regexp对象都会将分组内匹配到的内容记录下来
function captureArr2() {
    re = /(abc){2}/;//将匹配abcabc   
    // 这时RegExp会储存abc
    var str = "abcabc";
    re.test(str);
    console.log(1, RegExp.$1);
}
// captureArr2();

// 加上?:后 捕获不到数组里面的内容了
function captureNoStore() {
    re = /(?:abc){2}/;
    // RegExp  就不会储存这个分组了
    var str = "abcabc";
    re.test(str);
    console.log(2, RegExp.$1);
}
// captureNoStore();

//嵌套分组 ? 0此或则1次
function nestCapture() {
    var str = 'abc';
    var pattern = /(a?(b?(c?)))/;
    pattern.test(str);
    console.log(RegExp.$2) //-> bc
    console.log(RegExp.$3) //-> c
}
// nestCapture();


//  (?=) 正向前瞻 更多的可以查看js=.js里面关于这方面内容
//  说明：“正向前瞻”是根据后续内容是否符合匹配条件来返回匹配的结果。
//  示例：
function prespect() {
    var str = 'google';
    var pattern = /goo(?=gle)/;
    console.log(pattern.exec(str)); // -> goo
}
// prespect();


//RegExp实例方法
function execCapture() {
    var text = 'mom and dad and baby';
    var pattern = /mom (and dad (and baby)?)?/gi;
    var matches = pattern.exec(text);
    console.log(matches.index);
    console.log(matches.input);
    console.log(matches[0]);
    console.log(matches[1]);
    console.log(matches[2]);
}
// execCapture();

//全局和非全局
function execGlobal() {
    var text = 'cat, fat, bat, sat';
    var pattern1 = /.at/g;
    var matches = pattern1.exec(text);
    console.log(matches[0]);
    matches = pattern1.exec(text);//需要在执行一遍，否则还是cat
    console.log(matches[0]);
}
// execGlobal();