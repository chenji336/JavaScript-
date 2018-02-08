// 12.变量对象（Variable Object）.js

//VO  全局变量 变量对象
/*var a = new String('test');
 
alert(a); // 直接访问，在VO(globalContext)里找到："test"
 
alert(window['a']); // 间接通过global访问：global === VO(globalContext): "test"
alert(a === this.a); // true
 
var aKey = 'a';
alert(window[aKey]); // 间接通过动态属性名称访问："test"*/

//AO 函数上下文   活动对象
//这个例子的代码，在当前版本的Google Chrome浏览器里有一个bug  — 即使没有传递参数z，z和arguments[2]仍然是共享的。
//测试的时候最新的Chrome浏览器是没有这个bug的
/*function foo(x, y, z) {
 
  // 声明的函数参数数量arguments (x, y, z)
  alert(foo.length); // 3
 
  // 真正传进来的参数个数(only x, y)
  alert(arguments.length); // 2
 
  // 参数的callee是函数自身
  alert(arguments.callee === foo); // true
 
  // 参数共享
 
  alert(x === arguments[0]); // true
  alert(x); // 10
 
  arguments[0] = 20;
  alert(x); // 20
 
  x = 30;
  alert(arguments[0]); // 30
 
  // 不过，没有传进来的参数z，和参数的第3个索引值是不共享的

  z = 40;
  alert(arguments[2]); // undefined
 
  arguments[2] = 50;
  alert(z); // 40
 
}
 
foo(10, 20);*/

//经典两个例子
/*alert(x); // function
 
var x = 10;
alert(x); // 10
 
x = 20;
 
function x() {};
 
alert(x); // 20
*/

/*if (true) {
  var a = 1;
} else {
  var b = 2;
}
 
alert(a); // 1
alert(b); // undefined,不是b没有声明，而是b的值是undefined*/

//变量
/*alert(a); // undefined
alert(b); // "b" 没有声明
 
b = 10;
var a = 20;*/


// 关于变量，还有一个重要的知识点。变量相对于简单属性来说，变量有一个特性(attribute)：{DontDelete},这个特性的含义就是不能用delete操作符直接删除变量属性。

/*a = 10;
alert(window.a); // 10
 
alert(delete a); // true
 
alert(window.a); // undefined
 
var b = 20;
alert(window.b); // 20
 
alert(delete b); // false
 
alert(window.b); // still 20*/


//评论中的代码
var x=(function a(){
    alert(a);
});
x();