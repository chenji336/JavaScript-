// 由于该function里返回了另外一个function，其中这个function可以访问自由变量i
// 所有说，这个内部的function实际上是有权限可以调用内部的对象。

/*function makeCounter() {
    // 只能在makeCounter内部访问i
    var i = 0;

    return function () {
        console.log(++i);
    };
}

// 注意，counter和counter2是不同的实例，分别有自己范围内的i。

var counter = makeCounter();
counter(); // logs: 1
counter(); // logs: 2

makeCounter()();// logs: 1
makeCounter()();// logs: 1

var counter2 = makeCounter();
counter2(); // logs: 1
counter2(); // logs: 2

alert(i); // 引用错误：i没有defind（因为i是存在于makeCounter内部）。*/

//var foo = function(){ /* code */ }
 
//function(){  code  }(); // SyntaxError: Unexpected token (

/*
var i = function () { return 10; } ();
alert(i);*/

window.onload=function(){
	var elems = document.getElementsByTagName('a');

/*	for (var i = 0; i < elems.length; i++) {
		//如果不用闭包的话还真不知道有什么方法可以实现这种需求
	    elems[i].addEventListener('click', function (e) {
	        e.preventDefault();
	        alert('I am link #' + i);
	    }, 'false');
	}*/

	/*var addFunction=function(){
	         // e.preventDefault();
	        alert('I am link #' + 1);
	}
	for (var i = 0; i < elems.length; i++) {
		//如果不用闭包的话还真不知道有什么方法可以实现这种需求
	    elems[i].addEventListener('click', addFunction, 'false');
	}*/

	for (var i = 0; i < elems.length; i++) {
		(function(lockedIndex){//采用了闭包，传入进去的i值已经执行完毕了，所以lockedIndex不会改变
		    elems[i].addEventListener('click', function (e) {
		        e.preventDefault();
		        alert('I am link #' + lockedIndex);
		    }, 'false');
	    })(i);
	}
	
}


