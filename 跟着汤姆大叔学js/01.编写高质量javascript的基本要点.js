//http://www.cnblogs.com/TomXu/archive/2011/12/28/2286877.html


// myname="glabol";
// window.onload=function(){
// 	alert(myname);
// 	var myname="chenji";//这个会被悬置到函数顶部，如果这个没有申明myname的话全局变量有作用
// 	alert(myname);
// }

function sum(){
	a=1;//如果没有定义就会变成全局变量了
}

function sum2(){
	alert(a);
}

// 对象
var man = {
   hands: 2,
   legs: 2,
   heads: 1
};

// 在代码的某个地方
// 一个方法添加给了所有对象
// if (typeof Object.prototype.clone === "undefined") {
//    Object.prototype.clone = function () {};
// }
// //for-in循环对对象来说的，for最好是用来对数组
// for (var i in man) {
//    console.log(i, ":",man[i]);//这里就会显示所有的man的属性，包括了clone，所以需要使用hasOwnProperty
//    //if(man.hasOwnProperty(i))
//     console.log(i+":"+man[i]);
// }

// (function () {
//    var local = 1;
//    //eval会影响到外面的local，然而Function不会（相当于new Function）
//    eval("local = 3; console.log(local)"); // logs "3"
//    console.log(local); // logs "3"
// }());

// (function () {
//    var local = 1;
//    Function("var local=123;console.log(local);")(); // logs undefined
//    console.log(local);
// }());

var mx=function(){
	alert(11);
}

function outer(a, b) {
    var c = 1,
        d = 2,
        inner;
    if (a > b) {
        inner = function () {
            return {
                r: c - d
            };
        };
    } else {
        inner = function () {
            return {
                r: c + d
            };
        };
    }
    return inner;
}

var cj=function () {
	            return {
	                r: 2
	            };
            }

alert(outer(1,2)());

