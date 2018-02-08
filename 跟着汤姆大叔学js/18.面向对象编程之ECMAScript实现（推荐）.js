// 18.面向对象编程之ECMAScript实现（推荐）.js
/*alert(typeof(null));//这个是历史遗留bug，正常的事Null，但是这里返回object
alert(typeof(undefined));//undefined
alert(typeof(true));//Boolean
alert(typeof('test'));//string
alert(typeof(10));//number
alert(typeof(Boolean));//object*/

//Object类型
/*var x = { // 对象"x"有3个属性: a, b, c
  a: 10, // 原始值
  b: {z: 100}, // 对象"b"有一个属性z
  c: function () { // 函数(方法)
    alert('method x.c');
  }
};
 
alert(x.a); // 10
alert(x.b); // [object Object]
alert(x.b.z); // 100
x.c(); // 'method x.c'*/

//动态,如果object被冻结了（freeze）就不能进行修改了
/*var foo = {x: 10};
 
// 添加新属性
foo.y = 20;
console.log(foo); // {x: 10, y: 20}
 
// 将属性值修改为函数
foo.x = function () {
  console.log('foo.x');
};
 
foo.x(); // 'foo.x'
 
// 删除属性
delete foo.x;
console.log(foo); // {y: 20}*/

// 规范也定义了一些原生的特殊包装类
/*var c = new Boolean(true);
var d = new String('test');
var e = new Number(10);
 
// 转换成原始值
// 使用不带new关键字的函数
с = Boolean(c);
d = String(d);
e = Number(e);
 
// 重新转换成对象
с = Object(c);
d = Object(d);
e = Object(e);*/

// 字面量Literal

/*// 等价于new Array(1, 2, 3);
// 或者array = new Array();
// array[0] = 1;
// array[1] = 2;
// array[2] = 3;
var array = [1, 2, 3];
 
// 等价于
// var object = new Object();
// object.a = 1;
// object.b = 2;
// object.c = 3;
var object = {a: 1, b: 2, c: 3};
 
// 等价于new RegExp("^\\d+$", "g")
var re = /^\d+$/g;*/

//重新定义Object=Number
var getClass = Object.prototype.toString;
 
/*Object = Number;
 
var foo = new Object;
alert([foo, getClass.call(foo)]); // 0, "[object Number]"
 
var bar = {};
 
// Rhino, SpiderMonkey 1.7中 - 0, "[object Number]"
// 其它: still "[object Object]", "[object Object]"
alert([bar, getClass.call(bar)]);*/

//重新定义Array=Number
// Array也是一样的效果
/*Array = Number;
foo = new Array;
alert([foo, getClass.call(foo)]); // 0, "[object Number]"
bar = new Array;//这样就是Number 如果是[] 就是Array
// Rhino, SpiderMonkey 1.7中 - 0, "[object Number]"
// 其它: still "", "[object Number]"
alert([bar, getClass.call(bar)]);*/

// 但对RegExp,字面量的语义是不被改变的。 semantics of the literal
// isn't being changed in all tested implementations
 
/*RegExp = Number;
 
foo = new RegExp;
alert([foo, getClass.call(foo)]); // 0, "[object Number]"
 
bar = /(?!)/g;
alert([bar, getClass.call(bar)]); // /(?!)/g, "[object RegExp]"*/

/*function test(){
	alert(this.x);
}

test.call({x:10,y:20});*/

// 关联数组
// 任何对象的内部属性都可以存储为键-值”对
/*var a = {x: 10};
a['y'] = 20;
a.z = 30;
 
var b = new Number(1);
b.x = 10;
b.y = 20;
b['z'] = 30;
 
var c = new Function('');
c.x = 10;
c.y = 20;
c['z'] = 30;

var d="sss";//因为d不是对象所以d.x点不出来的
d.x=1;
d.y=2;*/

/*var a = new String("foo");
a['length'] = 10;
alert(a['length']); // 3*/

// 对象转换
/*var a = new Number(1);
var primitiveA = Number(a); // 隐式"valueOf"调用
var alsoPrimitiveA = a.valueOf(); // 显式调用
var b=Number(1);//number
alert([
  typeof a, // "object"
  typeof primitiveA, // "number"
  typeof alsoPrimitiveA // "number"
]);*/

// 这种方式允许对象参与各种操作，例如：

/*var a = new Number(1);
var b = new Number(2);
 
alert(a + b); // 3
 
// 甚至
 
var c = {
  x: 10,
  y: 20,
  valueOf: function () {
    return this.x + this.y;
  }
};
 
var d = {
  x: 30,
  y: 40,
  // 和c的valueOf功能一样
  valueOf: c.valueOf
};
 
alert(c + d); // 100*/

/*var a = {};
alert(a.valueOf() === a); // true, "valueOf"返回this
 
var d = new Date();
alert(d.valueOf()); // time
alert(d.valueOf() === d.getTime()); // true*/

//对象还有一个更原始的代表性-字符串展示
//这个toString方法是可靠的，它在某些操作上是自动使用的：
/*var a={
	valueOf:function(){
		return 100;
	},
	toString:function(){
		return '_test';
	}
};
alert(a);
alert(a+10);
delete a.valueOf;
alert(a+10);*/
// var f = +'10'; // 10, number

// 属性的特性
/*var t={};	
Object.defineProperty(t,"x",{
	value:10,
	writable:false,
	enumerable:true,
	configurable:true
});
console.log(t.x);
t.x=20;
console.log(t.x);//显示10
var desc=Object.getOwnPropertyDescriptor(t,"x");
alert(desc.writable);
*/

//关于prototype的使用，我现在测试的是Object和function都可以具有，但是数组木有
/*var t=[];
var t1=new Array();
Object.prototype.q=1000;//这个可以访问
function Cj(){

}
Cj.prototype.p=111;
t1.prototype.pp=12;//这个有问题
t.prototype.p=100;//这个有问题*/

//内部属性和方法
// 通过Object.prototype.toString()方法可以间接得到内部属性[[Class]]的值，该方法应该返回下列字符串： "[object " + [[Class]] + "]" 。例如：

/*var getClass = Object.prototype.toString;
 
alert(getClass.call({})); // [object Object]
alert(getClass.call([])); // [object Array]
alert(getClass.call(new Number(1))); // [object Number]
alert(getClass.call(document.childNodes.item));
*/

// 构造函数
/*function A() {
  // 更新新创建的对象
  this.x = 10;
  // 但返回的是不同的对象,所以x就访问不到了，如果没有就可以访问到
  return [1, 2, 3];
}
 
var a = new A();
var b=A();//Cannot read property 'x' of undefined
console.log(a.x, a); //undefined, [1, 2, 3]*/

// IE浏览器中 - "Object", "object", 其它浏览器 - "Function", "function"
/*alert(Object.prototype.toString.call(window.alert));
alert(typeof window.alert); // "Object"*/

// 对象创建的算法
// 请注意两个主要特点：
// 首先，新创建对象的原型是从当前时刻函数的prototype属性获取的（这意味着同一个构造函数创建的两个创建对象的原型可以不同是因为函数的prototype属性也可以不同）。
// 其次，正如我们上面提到的，如果在对象初始化的时候，[[Call]]返回的是对象，这恰恰是用于整个new操作符的结果：
/*function A(){}
A.prototype.x=10;
var a=new A();
console.log('a-x:'+a.x);
A.prototype={//这样相当于重新给prototype整个赋值
	constructor:A,
	y:100
};
// A.prototype.y=100;
var b=new A();
console.log('b-x:'+b.x+'   b-y:'+b.y);//b.x undefined 
console.log('a-x:'+a.x+'   a-y:'+a.y);//这里a.x还是可以点出来的

function B(){
	this.x=10;
	return new Array();
}

var c=new B();
console.log('c-x:'+c.x+'  [[class]]:'+Object.prototype.toString.call(c));*/

// 原型

// 属性构造函数(Property constructor)
/*function A(){}
var a=new A();
alert(a.constructor);
alert(a.constructor===A);*/

/*function A() {}
A.prototype.x = new Number(10);
var a = new A();
alert(a.constructor.prototype); // [object Object]
alert(a.x); // 10, 通过原型
// 和a.[[Prototype]].x效果一样
alert(a.constructor.prototype.x); // 10
alert(a.constructor.prototype.x === a.x); // true*/
// 然而，如果我们彻底改变函数的prototype属性（通过分配一个新的对象），那原始构造函数的引用就是丢失，这是因为我们创建的对象不包括constructor属性：
/*function A() {}
A.prototype = {
  x: 10
};//true
// A.prototype.x=10;//false
var a = new A();
alert(a.x); // 10
alert(a.constructor === A); // false!*/
// 因此，对函数的原型引用需要手工恢复：
/*function A() {}
A.prototype.y=100;
A.prototype = {
  constructor: A,
  x: 10
};
 
var a = new A();
alert(a.x+'  '+a.y); // 10
alert(a.constructor === A); // true
*/
/*var fo={x:10};
Object.defineProperty(fo,'y',{
	value:100,
	enumerable:false
});
console.log(fo.x,fo.y)
for(var k in fo){
	console.log(k);
}

var xDes=Object.getOwnPropertyDescriptor(fo,'x');
var yDes=Object.getOwnPropertyDescriptor(fo,'y');
console.log(xDes.enumerable,yDes.enumerable);*/

// 因此，有的文章说“动态修改原型将影响所有的对象都会拥有新的原型”是错误的，新原型仅仅在原型修改以后的新创建对象上生效。
/*function A() {}
A.prototype.x = 10;
 
var a = new A();
alert(a.x); // 10
 
A.prototype = {
  constructor: A,
  x: 20
  y: 30
};
 
// 对象a是通过隐式的[[Prototype]]引用从原油的prototype上获取的值
alert(a.x); // 10
alert(a.y) // undefined
 
var b = new A();
 
// 但新对象是从新原型上获取的值
alert(b.x); // 20
alert(b.y) // 30*/

// 非标准的__proto__属性
// 然而，有些实现（例如SpiderMonkey），提供了不标准的__proto__显式属性来引用对象的原型：
/*function A() {}
A.prototype.x = 10;
 
var a = new A();
alert(a.x); // 10
 
var __newPrototype = {
  constructor: A,
  x: 20,
  y: 30
};
 
// 引用到新对象
A.prototype = __newPrototype;
 
var b = new A();
alert(b.x); // 20
alert(b.y); // 30
 
// "a"对象使用的依然是旧的原型
alert(a.x); // 10
alert(a.y); // undefined
 
// 显式修改原型
a.__proto__ = __newPrototype;
 
// 现在"а"对象引用的是新对象
alert(a.x); // 20
alert(a.y); // 30
// 注意，ES5提供了Object.getPrototypeOf(O)方法，该方法直接返回对象的[[Prototype]]属性——实例的初始原型。 然而，和__proto__相比，它只是getter，它不允许set值。

var foo = {};
Object.getPrototypeOf(foo) == Object.prototype; // true*/

// 对象独立于构造函数
/*function A(){}
A.prototype.x=10;
var a=new A();
alert(a.x);
A=null;
// var b=new A();
// alert(b.x);报错 A  is not a constructor
var b=new a.constructor();
alert(b.x);
delete a.constructor.prototype.constructor;
delete b.constructor.prototype.constructor;
// var c=new a.constructor();
// alert(c.x); 报错 a.constructor is not a constructor
alert(a.x);
alert(b.x);*/

// instanceof操作符的特性
/*function A(){}
var a=new A();
alert(a instanceof A);
A.prototype=null;
alert(a instanceof A);//Function has non-object prototype 'null' in instanceof check*/
// 另一方面，可以由构造函数来创建对象，但如果对象的[[Prototype]]属性和构造函数的prototype属性的值设置的是一样的话，instanceof检查的时候会返回true：

/*function B() {}
var b = new B();
 
alert(b instanceof B); // true
 
function C() {}
 
var __proto = {
  constructor: C
};
 
C.prototype = __proto;
b.__proto__ = __proto;
 
alert(b instanceof C); // true
alert(b instanceof B); // false*/

// 原型可以存放方法并共享属性
/*function A(){}
A.prototype.x=10;
var a=new A();
A.prototype.x=20;
var	b=new A(); 
alert(a.x===b.x);*/

/*function A(x){
	this.x=x||100;
}
A.prototype=(function(){
	var _someValue=500;
	function _someHelper(){
		alert('this is inneral function '+_someValue);
	}

	function method1(){
		alert('this is method1 '+this.x);
	}

	function method2(){
		alert('this is method2 '+this.x );
		_someHelper();
	}

	return {
		constructor:A,
		method1:method1,
		method2:method2
	};
})();

var m1=new A(10);
var m2=new A(20);

m1.method1();
m1.method2();

m2.method1();
m2.method2();

alert(m1.method2===m2.method2);*/

// 读写属性
/*function A(){}
A.prototype.x=10;
var a=new A();
alert(a.x);
a.x=1000;
alert(a.x);
delete a.x;
alert(a.x);*/

// 请注意，不能掩盖原型里的只读属性，赋值结果将忽略，这是由内部方法[[CanPut]]控制的。

// 例如，属性length是只读的，我们来掩盖一下length试试
 
/*function SuperString() {

}
 
SuperString.prototype = new String("abc");
 
var foo = new SuperString();
 
console.log(foo.length); // 3, "abc"的长度
 
// 尝试掩盖
foo.length = 5;
console.log(foo.length); // 依然是3

var a="123";
a.length=5;//只读属性不可以更改
alert(a.length);*/

// 属性访问器
// 内部方法[[Get]]和[[Put]]在ECMAScript里是通过点符号或者索引法来激活的，如果属性标示符是合法的名字的话，可以通过“.”来访问，而索引方运行动态定义名称。

/*var a = {testProperty: 10};
 
alert(a.testProperty); // 10, 点
alert(a['testProperty']); // 10, 索引
 
var propertyName = 'Property';
alert(a['test' + propertyName]); // 10, 动态属性通过索引的方式*/

// *这里有一个非常重要的特性——属性访问器总是使用ToObject规范来对待“.”左边的值。
// 这种隐式转化和这句“在JavaScript中一切都是对象”有关系，（然而，当我们已经知道了，JavaScript里不是所有的值都是对象）。
// 如果对原始值进行属性访问器取值，访问之前会先对原始值进行对象包装（包括原始值），然后通过包装的对象进行访问属性，属性访问以后，包装对象就会被删除。
/*var a=100;
alert(a.toString());
a.x=1;
alert(a.x);//undefined 属性访问之后，包装对面就会被删除

// alert(1.toString());*/

// 注意有个微妙的地方，在上面的例子中的两个点不是一个错误。第一点是代表小数部分，第二个才是一个属性访问器：

/*1.toString(); // 语法错误！
 
(1).toString(); // OK
 
1..toString(); // OK
 
1['toString'](); // OK*/

// 原型链
// 
// 让我们展示如何为用户定义对象创建原型链，非常简单：
// function A(){
// 	alert('this[[call]] actived');
// 	this.x=10;
// }
// A.prototype.y=100;
// var a=new A();
// console.log(a.x,a.y);//自身 继承

// function B(){
// 
// }
// B.prototype=new A();
// B.prototype.constructor=B;//让B指回自己
// var b=new B();
// console.log(b.x,b.y);//全是继承来的

/*function A(x){
	alert('this[[call]] actived');
	this.x=x;
}
A.prototype.y=100;
var a=new A(10);
console.log(a.x,a.y);//自身 继承

function B(){
	 A.apply(this,arguments);//没有这段就找不到this.x
}

B.prototype=A.prototype;
B.prototype.constructor=B;//让B指回自己
var b=new B(20);
console.log(b.x,b.y);//自身  继承*/

//--------------------------------------------------------------------------------------------------------------------------
/*function inherit(child, parent) {
  var F = function () {};
  F.prototype = parent.prototype
  // child.prototype = parent.prototype;//使用这一段的话会提示Maximum call stack size exceeded
  child.prototype = new F();
  child.prototype.constructor = child;
  child.superproto = parent.prototype;
  return child;
}*/
// 因此，继承：

/*function A() {this.y=100;}
A.prototype.x = 10;
 
function B() {
	B.superproto.constructor.apply(this,arguments);//这样才能访问到y
}
inherit(B, A); // 连接原型
 
var b = new B();
alert(b.x); // 10, 在A.prototype查找到*/

//之前觉得可以不用建立中间的function，觉得多余了，但是
//由于对象的真实原型是[[Prototype]]属性，这意味着F.prototype可以很容易修改和重用，因为通过new F创建的child.prototype可以从child.prototype的当前值里获取[[Prototype]]：
/*function A() {}
A.prototype.x = 10;
 
function B() {}
inherit(B, A);
 
B.prototype.y = 20;
 
B.prototype.foo = function () {
  alert("B#foo"+this.x);
};
 
var b = new B();
alert(b.x); // 10, 在A.prototype里查到
 
function C() {}
inherit(C, B);
 
// 使用"superproto"语法糖
// 调用父原型的同名方法
 
C.prototype.foo = function () {
  C.superproto.foo.call(this);
  alert("C#foo");
};
 
var c = new C();
alert([c.x, c.y]); // 10, 20
 
c.foo(); // B#foo, C#foo*/


// 注意，ES5为原型链标准化了这个工具函数，那就是Object.create方法。ES3可以使用以下方式实现：

/*Object.create||(Object.create = function (parent, properties) {
  function F() {}
  F.prototype = parent;
  var child = new F;
  for (var k in properties) {
    child[k] = properties[k].value;
  }
  return child;
});

// 用法
var foo = {x: 10};
var bar = Object.create(foo, {y: {value: 20}});
console.log(bar.x, bar.y); // 10, 20*/

//--------------instanceof     typeof----------------------------------------------
// if("undefined"){
// 	alert(false);
// }else{
// 	alert(true);
// }

/*var a='123';
alert(a instanceof Array);//false*/

//合并之后a和b中就都具有了合并之后的属性
var a={name:'minxi',age:23};
var b={name:'cj',age:27,sex:1};
$.extend(a,b);
alert(a);