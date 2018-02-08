// http://blogread.cn/it/article/6178
// 上面这一篇讲解执行上下文我觉得是比较容易懂得
// https://segmentfault.com/q/1010000003815144
// 很好的解释了上下文的意思
/*eval('var x = 10');
 
(function foo() {
  var y = 20;
})();
 
alert(x); // 10
alert(y); // "y" 提示没有声明*/

/*function foo() {
  var x = 1;
  return function () { alert(x); };
};
 
var bar = foo();
 
bar(); // 1
 
x=2
 
bar(); // 2*///在chrome中还是1


/*var a;
console.log(a);
a=10;

f1();
function f1(){alert(1);}//函数声明
f2();
var f2=function(){alert(2);};//函数表达式*/

/*function a(){
	var p=1;
}

var b=function(){
	alert(p);
}


b();*/

/*var x=10;

function a(){	
	alert(this.x);
}



var b={x:1000};

a.call(b);
*/

function t(p){
	p&&alert(1);
}
t(false);
