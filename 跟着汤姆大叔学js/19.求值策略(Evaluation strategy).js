// 19.求值策略(Evaluation strategy).js

//ECMAScript中全部都是按值传递的，里面有一个特殊的按共享传递，是没有按引用传递的
// 按值传递
/*var a=10;
function fo(x){
	x=100;
}
console.log(a);
fo(a);
console.log(a);*/

//下面如果传入的是一个对象的话在，相当于是按照  按共享传递 是按值传递的一个特例

/*function fo(ob,isUsed){
	if(isUsed){
		ob={z:1000,q:10000}
		return;
	}

	ob.x=1;
	ob.y=2;
}
var a={x:10,y:100};
console.log(a);//10 100
fo(a);
console.log(a);//1 2
fo(a,true);
console.log(a);//1 2 */


//如果不理解的话可以看下面这个例子
//相当于是让两个对象都指向了一个地址，但是如果一个对象地址改变了，另外一个对象是不会改变的
/*var a={x:1},
	b=a;
console.log(a);
console.log(b);
console.log(a===b);
b={x:2};
console.log(a);
console.log(b);
console.log(a===b);

// 相当于
var a={x:1};
function fo(b){
	console.log(a==b);
	b={x:2};
	console.log(a==b);
}
console.log(a);
fo(a);
console.log(a);*/