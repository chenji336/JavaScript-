/*var foo = {x: 10};
 
var bar = {
  x: 20,
  test: function () {
 
    alert(this === bar); // true this对应的是这个对象而不是这个函数
    alert(this.x); // 20
 
    // this = foo; // 错误，任何时候不能改变this的值
 
    // alert(this.x); // 如果不出错的话，应该是10，而不是20
 
  }
 
};

bar.test(); // true, 20
 
// 不过，这里this依然不会是foo
// 尽管调用的是相同的function
foo.test = bar.test;
 
foo.test(); // false, 10*/


/*function foo() {
  alert(this);
}
 
foo(); // global
 
alert(foo === foo.prototype.constructor); // true
 
// 但是同一个function的不同的调用表达式，this是不同的
 
foo.prototype.constructor(); // foo.prototype*/

//自己测试的例子，来确定是指向对象而不是函数的
/*var x=1;
var a={x:2,y:function(){
	var x=3;
	alert(this.x);//this对应的是对象a的x值
}};
a.y();
alert(this.x);*/

//引出问题的例子
/*var foo = {
  bar: function () {
    alert(this);
    alert(this === foo);
  }
};
 
foo.bar(); // foo, true
 
var exampleFunc = foo.bar;
 
alert(exampleFunc === foo.bar); // true
 
// 再一次，同一个function的不同的调用表达式，this是不同的
 
exampleFunc(); // global, false  为啥一样会提示不一样的？下面会进行解答*/

//解释
/*现在，我们可以很明确的告诉你，为什么用表达式的不同形式激活同一个函数会不同的this值，答案在于引用类型（type Reference）不同的中间值。

function foo() {
  alert(this);
}
 
foo(); // global, because
 
var fooReference = {
  base: global,
  propertyName: 'foo'
};
 
alert(foo === foo.prototype.constructor); // true
 
// 另外一种形式的调用表达式
 
foo.prototype.constructor(); // foo.prototype, because
 
var fooPrototypeConstructorReference = {
  base: foo.prototype,
  propertyName: 'constructor'
};*/

// 另外一个通过调用方式动态确定this值的经典例子：
//*如果函数名称是foo，在chrome调试的时候会一直执行这个函数
//最后我的理解是：如果你不是对象，然后一般引用的都是全局的或则父类，如果是对象，然后就可以在自己的区域进行this
/*function too() {
  alert(this.bar);
}
 
var x = {bar: 10};
var y = {bar: 20};
 
x.test = too;
y.test = too;
 
x.test(); // 10
y.test(); // 20*/

/*var x=1;
(function () {
  alert(this.x); // null => global  如果this是null会被当做global，不过ECMA5好像是不会强制转换的
})();*/


// 为什么我们有一个属性访问器，它的中间值应该为引用类型的值，在某些调用中我们得到的this值不是base对象，而是global对象？

// 问题在于后面的三个调用，在应用一定的运算操作之后，在调用括号的左边的值不在是引用类型。

// 第一个例子很明显———明显的引用类型，结果是，this为base对象，即foo。
// 在第二个例子中，组运算符并不适用，想想上面提到的，从引用类型中获得一个对象真正的值的方法，如GetValue。相应的，在组运算的返回中———我们得到仍是一个引用类型。这就是this值为什么再次设为base对象，即foo。
// 第三个例子中，与组运算符不同，赋值运算符调用了GetValue方法。返回的结果是函数对象（但不是引用类型），这意味着this设为null，结果是global对象。
// 第四个和第五个也是一样——逗号运算符和逻辑运算符（OR）调用了GetValue 方法，相应地，我们失去了引用而得到了函数。并再次设为global。

//我的理解就是运算符干扰了，然后引用类型变成函数声明，变成global
/*var foo = {
  bar: function () {
    alert(this);
  }
};
 
foo.bar(); // Reference, OK => foo
(foo.bar)(); // Reference, OK => foo
 
(foo.bar = foo.bar)(); // global?
(false || foo.bar)(); // global?
(foo.bar, foo.bar)(); // global?*/


/*function t() {
  function bar() {
    alert(this); // global
  }
  bar(); // the same as AO.bar()
}

t();*/

// 作为构造器调用的函数中的this
// 还有一个与this值相关的情况是在函数的上下文中，这是一个构造函数的调用。

function A() {
  alert(this); // "a"对象下创建一个新属性
  this.x = 10;
}
 
var a = new A();
alert(a.x); // 10



// 读后感：
// 1.如果没有显示标明this的值(call、apply),javascript引擎就会根据调用语句去推断this的值.
// 2.引擎会试图将调用语句格式化为[对象名].[函数名]().如果能够格式化,this就为上述对象.否则,this只好取window.
// 3.对于[函数名]()的调用,引擎会先根据作用域链找到隐式的对象(变量对象).
// 由于全局上下文的变量对象、动态(with、catch)变量对象是可以给用户访问的,因此格式化成功.函数上下文的变量对象不能给用户直接访问,因此格式化失败.
// 4.对于(表达式)()的调用,由于表达式不可能属于任何对象,因此格式化失败.
