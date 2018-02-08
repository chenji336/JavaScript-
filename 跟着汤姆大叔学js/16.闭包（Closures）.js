/*function testFn(funArg) {
  // funarg激活时, 局部变量localVar可以访问了
  funArg(10); // 20
  funArg(20); // 30

}

testFn(function (arg) {
  var localVar = 10;
  alert(arg + localVar);
});*/

// Funarg问题
/*function testFn() {

  var localVar = 10;

  function innerFn(innerParam) {
    alert(innerParam + localVar);
  }

  return innerFn;
}

var someFn = testFn();
someFn(20); // 30*/

/*var z = 10;

function foo() {
  alert(z);
}

foo(); // 10 – 使用静态和动态作用域的时候

(function () {

  var z = 20;
  foo(); // 10 – 使用静态作用域, 20 – 使用动态作用域

})();

// 将foo作为参数的时候是一样的
(function (funArg) {

  var z = 30;
  funArg(); // 10 – 静态作用域, 30 – 动态作用域

})(foo);*/

// ECMAScript闭包的实现
/*var x = 10;

function fo() {
  alert(x);
}

(function (funArg) {

  var x = 20;

  // 变量"x"在(lexical)上下文中静态保存的，在该函数创建的时候就保存了
  funArg(); // 10, 而不是20

})(fo);*/

// 比如Rhino，针对函数的[[Scope]]属性，对应有一个非标准的 __parent__属性
// chrome试了下好像是不行的，会提示错误
/*var global = this;
var x = 10;

var fo = (function () {

  var y = 20;

  return function () {
    alert(y);
  };

})();

fo(); // 20
alert(fo.__parent__.y); // 20

fo.__parent__.y = 30;
fo(); // 30

// 可以通过作用域链移动到顶部
alert(fo.__parent__.__parent__ === global); // true
alert(fo.__parent__.__parent__.x); // 10*/

// 所有对象都引用一个[[Scope]]	
/*var firstClosure;
var secondClosure;

function fo() {

  var x = 1;

  firstClosure = function () { return ++x; };
  secondClosure = function () { return --x; };

  x = 2; // 影响 AO["x"], 在2个闭包公有的[[Scope]]中

  alert(firstClosure()); // 3, 通过第一个闭包的[[Scope]]
}

fo();

alert(firstClosure()); // 4
alert(secondClosure()); // 3*/


//下面这个例子很好的说明了同一个上下文中创建的闭包公用了一个[[scope]]
//这样一来，在函数激活的时候，最终使用到的k就已经变成了3了。
/*var data = [];

for (var k = 0; k < 3; k++) {
  data[k] = function () {
    alert(k);
  };
}

data[0](); // 3, 而不是0
data[1](); // 3, 而不是1
data[2](); // 3, 而不是2*/

//修改如下（这个东东从第一章讲到现在）
//如下所示，创建一个闭包就可以解决这个问题了：
/*var data = [];

for (var k = 0; k < 3; k++) {
  data[k] = (function(k){
  	return function(){
  		alert(k);
  	}
  })(k);
}

data[0](); // 3, 而不是0
data[1](); // 3, 而不是1
data[2](); // 3, 而不是2*/

// Funarg和return
/*function getElement(){
	[1,2,3].forEach(function(element){
		if(element%2==0){
			return element;
		}
	});

	return null;
}

alert(getElement());//最后返回null*/

// 然而，在ECMAScript中通过try catch可以实现如下效果：

/*var breakCatch = {};

function getElement() {

  try {

    [1, 2, 3].forEach(function (element) {

      if (element % 2 == 0) {
        // // 从getElement中"返回"
        alert('found: ' + element); // found: 2
        breakCatch.data = element;
        throw breakCatch;
      }

    });

  } catch (e) {
    if (e == breakCatch) {
      return breakCatch.data;
    }
  }

  return null;
}

alert(getElement()); // 2*/

//闭包用法实践
(function () {
  alert([].join.call(arguments, ';')); // 1;2;3
}).apply(this, [1, 2, 3]);
