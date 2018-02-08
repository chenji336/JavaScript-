// 50.Function模式下篇.js
// 自声明函数里面说的太玄乎了.
// 
/*var a = {};
var b = a;
// 现在 a, b 都指向 {};

a = 'xxx';
// 因为改变了指针指向. 所以
// 显然 a 指向 'xxx', b 依然指向 ｛｝.

// 如果这样:
a = b;
a.t = 'xxx';
console.log(b.t); // 'xxx';
// 因为指针指向没变. 只是修改了值.*/

// 声明完函数以后，立即执行该函数
(function () {
	console.log('watch out!');
} ());

//这种方式声明的函数，也可以立即执行
!function () {
	console.log('watch out!');
} ();

// 如下方式也都可以哦
~function () {  console.log('watch out!');} ();
-function () { console.log('watch out!');} ();
+function () { console.log('watch out!'); } ();