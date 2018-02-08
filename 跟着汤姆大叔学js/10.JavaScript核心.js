//这篇的理解有些地方还不是很深刻，需要静下新在研读一遍
/*var foo = {
  x: 10,
  y: 20
};

//原型链
var a={
	x:10,
	calculate:function(z){
		return this.x+this.y+z;
	}
};



var b={
	x:1,
	y:20,
	__proto__:a
};

var c={
	y:30,
	__proto__:a
};

console.log(b.calculate(10));
console.log(c.calculate(10));*/

// 构造函数
function Foo(y) {
  // 构造函数将会以特定模式创建对象：被创建的对象都会有"y"属性
  this.y = y;
}

// "Foo.prototype"存放了新建对象的原型引用
// 所以我们可以将之用于定义继承和共享属性或方法
// 所以，和上例一样，我们有了如下代码：
 
// 继承属性"x"
Foo.prototype.x = 10;
 
// 继承方法"calculate"
Foo.prototype.calculate = function (z) {
  return this.x + this.y + z;
};
 
// 使用foo模式创建 "b" and "c"
var b = new  Foo(20);
var c =new  Foo(30);
 
// 调用继承的方法
b.calculate(30); // 60
c.calculate(40); // 80
 
// 让我们看看是否使用了预期的属性
 
console.log(
 
  b.__proto__ === Foo.prototype, // true
  c.__proto__ === Foo.prototype, // true
 
  // "Foo.prototype"自动创建了一个特殊的属性"constructor"
  // 指向a的构造函数本身
  // 实例"b"和"c"可以通过授权找到它并用以检测自己的构造函数
 
  b.constructor === Foo, // true
  c.constructor === Foo, // true
  Foo.prototype.constructor === Foo ,// true
 
  b.calculate === b.__proto__.calculate, // true
  b.__proto__.calculate === Foo.prototype.calculate // true
 
);

window.onload=function(){

/*	var t={};
	function test(t){
		var t=t||{};
		t.renderInput=function(){
			throw 'not implement';
		};
		t.x=100;
		t={x:1000};
	}
	test(t);
	console.log(t);

	var p=10;

	function fff(){
		var j=100;
	};
	console.log(j);*/


	// 全局变量 "x"
	var x = 10;
	 
	// 全局function
	function foo() {
	  console.log(x);
	}
	 
	(function (funArg) {
	 
	  // 局部变量 "x"
	  var x = 20; 
	 
	  // 这不会有歧义
	  // 因为我们使用"foo"函数的[[Scope]]里保存的全局变量"x",
	  // 并不是caller作用域的"x"
	 
	  funArg(); // 10, 而不是20
	 
	})(foo); // 将foo作为一个"funarg"传递下去



	var data = [];
 
	for (var k = 0; k < 3; k++) {
		//如果不加闭包的话则全部弹出3
	  data[k] = 
	  	(function (x) {
	  		return function(){
	  			alert(x);
	  		}
		  })(k);
	}
	k=4;
	data[0](); // 3, but not 0
	data[1](); // 3, but not 1
	data[2](); // 3, but not 2
}
