// 15.函数（Functions）.js
// 函数声明的位置就是最外面或则函数体内
// 函数表达式可以在夸号中，逗号前后。。。。
// 函数声明FD
/*fo();
fo2();//报错，没找到fo2
function fo(){
	alert(1);
}

var fo2=function(){
	alert(2);
}*/
//函数表达式FE

/*alert(foo); // "foo" 未定义
 
(function foo() {});//如果前面加var a=就可以在后面被访问到
 
// 定义阶段之后也不可用，因为他不在变量对象VO中
 
alert(foo);  // "foo" 未定义*/

// 相当一部分问题出现了，我们为什么需要函数表达式？答案很明显——在表达式中使用它们，”不会污染”变量对象。最简单的例子是将一个函数作为参数传递给其它函数。

/*function foo(callback) {
  callback();
}
 
foo(function bar() {
  alert('foo.bar');
});
 
foo(function baz() {
  alert('foo.baz');
});*/

// 另外一个例子是创建封装的闭包从外部上下文中隐藏辅助性数据（在下面的例子中我们使用FE，它在创建后立即调用）：不会污染VO

/*var foo = {};
 
(function initialize() {
 
  var x = 10;//相当于私有属性了
 
  foo.bar = function () {
    alert(x);
  };
 
})();
 
foo.bar(); // 10;
 
alert(x); // "x" 未定义*/

// 还有一个例子是：在代码执行阶段通过条件语句进行创建FE，不会污染变量对象VO。

/*var fo = 10;
 
var bar = (fo % 2 == 0
  ? function () { alert(0); }
  : function () { alert(1); }
);
 
bar(); // 0*/

//关于圆括号 
//下面都会报错
/*function () {
  
}();
 
// 即便有名称
 
function foo() {
  
}();*/



/*if (true) function fo() {alert(1)}//这个是函数表达式相当于{functino fo {alert(1)}}

	fo();*/

// 注意，下面一个立即执行的函数，周围的括号不是必须的，因为函数已经处在表达式的位置，解析器知道它处理的是在函数执行阶段应该被创建的FE，这样在函数创建后立即调用了函数。

/*var fo = {
 
  bar: function (x) {
    return x % 2 != 0 ? 'yes' : 'no';
  }(1)
 
};
alert(fo.bar); // 'yes' 相当于下面的tt
var tt=function (x) {
    return x % 2 != 0 ? 'yes' : 'no';
  }(1);
alert(tt); // 'yes'*/

// 下面的代码，根据贵方任何一个function声明都不应该被执行：
// 有可能被理解成FD也有可能是FE，如果是FD就是1 如果是FE就是0
/*if (true) {
 
  function foo() {
    alert(0);
  }
 
} else {
 
  function foo() {
    alert(1);
  }
 
}
 
foo(); // 1 or 0 ?实际在上不同环境下测试得出个结果不一样*/

// 命名函数表达式的特性
/*var i=1;
(function fo(bar) {
 
  if (bar) {
  	alert(i);
  	i++;
    return;
  }
 
  fo(true); // "foo" 是可用的
 
})();//我感觉类似with，用完就删除了，所以外面访问不到fo
 alert(i);
// 在外部，是不可用的 
fo(); // "foo" 未定义*/

/*Object.prototype.x = 10;
 
(function () {
  alert(x); // 10
})();*/

/*Object.prototype.x = 10;
 
function foo() {
 
  var x = 20;
 
  // 函数声明
 
  function bar() {
    alert(x);
  }
 
  bar(); // 20, 从foo的变量对象AO中查询
 
  // 匿名函数表达式也是一样
 
  (function () {
    alert(x); // 20, 也是从foo的变量对象AO中查询
  })();
 
}
 
foo();*/

function fo() {
 
  var x = 10;
 
  (function bar() {
 
    alert(x); // 20, 不上10,不是从foo的活动对象上得到的
 
    // "x"从链上查找:
    // AO(bar) - no -> __specialObject(bar) -> no
    // __specialObject(bar).[[Prototype]] - yes: 20
 
  })();
}
 
Object.prototype.x = 20;
 
fo();