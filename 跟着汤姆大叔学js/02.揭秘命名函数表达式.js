  //http://www.cnblogs.com/TomXu/archive/2011/12/29/2290308.html
//函数声明和函数表达式
//函数声明之后可以在之后调用，函数表达式不可以

 /* try {
  	//!会报错
    (var x = 5); // 分组操作符，只能包含表达式而不能包含语句：这里的var就是语句
  } catch(err) {
    alert('error');
  }*/


 /* alert(fp());

//函数申明的话即使在下面也会被置顶，所以alert不会报错
  function fn() {
    return 'Hello world!';
  }
//函数表达式 的话写在下面的话就会出现问题
  var fp=function(){
  	return 'Hello world!12';
  }*/


 /* // 此刻，foo还没用声明,不过google浏览器好像有点不一样，不纠结这个
  alert(typeof foo); // "undefined"
  if (true) {
    // 进入这里以后，foo就被声明在整个作用域内了
    function foo(){ return 1; }
  }
  else {
    // // 从来不会走到这里，所以这里的foo也不会被声明
    function foo(){ return 2; }
  }
  alert(typeof foo); // "function"*/

/*//调试的时候可以看到名字，堆栈
   function foo(){
    return bar();
  }
  function bar(){
    return baz();
  }
  function baz(){
    alert(1);
  }
  foo();*/

 /*  function foo(){
    return bar();
  }
  var bar = function(){
    return baz();
  }
  function baz(){
    debugger;
  }
  foo();*/


  //   function foo(){
  //   return bar();
  // }
  // var bar = (function(){
  //   if (window.addEventListener) {
  //     return function(){
  //       return baz();
  //     };
  //   }
  //   else if (window.attachEvent) {
  //     return function() {
  //       return baz();
  //     };
  //   }
  // })();
  // function baz(){
  //   debugger;
  // }
  // foo();

/*//undefined相当于false
  if(undefined){
  	alert(1)
  }else{
  	alert(2);
  }
*/

/* var f = function g(){alert(typeof(g))}; // "function"};
 f();
    alert(typeof(g)); // "function"*/


/*var p=(function(x){
	alert(x);
});
p(12);*/


/*function fn() {
    for(var i=0 ; i<2; i++) {
    //(function(){
        var backup = i;
        setTimeout(function() {
            alert(backup);
        }, 2000);
    //})();
    }
}
 
fn();*/

/* setTimeout(function() {
            alert(1);
        }, 2000);
 setInterval(function() {
            alert(1);
        }, 2000);*/

/*var foo=(function(){
	alert(1);

	function subFoo(x){
		alert(x);
	}
	return subFoo;
})();

foo(123);*/

/*var foo=(function(){
	return 1;
})();

alert(foo);*/

/*var p=(function factorial(x) {
    if (x <= 1) return 1;
    return x * factorial(x - 1);
  })(10);

 alert(p);*/

/* alert（fu()+"fun"）;
function fu(alert(1));
function fu2(alert(2));*/


/*(function p(){
	alert(1);
});

p();*/