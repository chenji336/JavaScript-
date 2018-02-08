// 20.《你真懂JavaScript吗？》答案详解.js

//请听第一题
/*if (!("a" in window)) {
    var a = 1;
}
alert(a);*/
// 答案是  undefined
// 这个就是上下文，没运行前就找到a了，所以一直是true

// 0&&alert(0);//0相当于false
// 1&&alert(1);//这个才会提示
//第二题

/*var a = 1,
    b = function a(x) {
        x && a(--x);
    };//这个是函数表达式，不会覆盖掉，如果是function a的话就提示function，这里提示1
alert(a);*/

//答案是1
/*// 函数声明会覆盖变量声明，但不会覆盖变量赋值，为了解释这个，我们来看一个例子：

function value(){
    return 1;
}
var value;
alert(typeof value);    //"function"
// 尽快变量声明在下面定义，但是变量value依然是function，也就是说这种情况下，函数声明的优先级高于变量声明的优先级，
// 但如果该变量value赋值了，那结果就完全不一样了：

function value(){
    return 1;
}
var value = 1;
alert(typeof value);    //"number"*/

//题目3  题目2中已经给了解释了
/*function a(x) {
    return x * 2;
}
var a;
alert(a);*/

// 题目4

/*function b(x, y, a) {
	// alert(a===arguments[2]);
	// alert(arguments[2]);
    arguments[2] = 10;
    alert(a);
}
b(1, 2,3);
*/
//答案是10，但是如果是b(1,2)的话答案就是undefined	
//这个共享其实不是真正的共享一个内存地址，而是2个不同的内存地址，使用JavaScript引擎来保证2个值是随时一样的，当然这也有一个前提，
//那就是这个索引值要小于你传入的参数个数，也就是说如果你只传入2个参数，而还继续使用arguments[2]赋值的话，就会不一致

// 题目5

/*function a() {
    alert(this);
}
a.call(null);*/
// location.href='http://www.baidu.com';
// window.close();关闭当前页面
//答案是alert（window）
// 另外，根据ECMAScript262规范规定：如果第一个参数传入的对象调用者是null或者undefined的话，call方法将把全局对象（也就是window）作为this的值。
// 所以，不管你什么时候传入null，其this都是全局对象window，所以该题目可以理解成如下代码：
 
//下面问题请回答：
// 1.找出数字数组中最大的元素（使用Match.max函数）
//第一题，回答者回答的好，间接的用apply中的数组a来替换了call（1,2,3）
/*var a=[1,2,3];
alert(Math.max.apply(this,a));*/

//验证call 和apply,也是为了验证上面第一个问题
/*var a=function(x,y,z){

	alert(this.x+this.y+y);
}

a.apply({x:10,y:20},[1,2,3]);
a.call({x:10,y:20},1,2,3);*/

// 2.转化一个数字数组为function数组（每个function都弹出相应的数字）
//第二题应该是需要使用闭包,这样就可以输出了
/*var a=[];
for(var i=0;i<3;i++){
	a[i]=(function(k){
		return function(){
			alert(k);
		}
	})(i);
}

var arrays=[1,2,3];
function turnToFunction(arrays){//使用forEach也可以，其实原理都是使用了闭包  
            arrays.forEach(function(item,index,array){  
                arrays[index]=function(){  
                    alert(item);  
                }  
            })  
        }  
turnToFunction(arrays);
a[0]();
arrays[0]();*/

// 3.给object数组进行排序（排序条件是每个元素对象的属性个数）
//第三题 应该是使用sort()然后里面使用function来进行，做过一次
/*var objectArray=[];
function Person(name,age){
	this.name=name;
	this.age=age;
}
objectArray.push(new Person('cj',27));
objectArray.push(new Person('mx',23));
objectArray.push(new Person('lyl',26));

objectArray.sort(function(p1,p2){
	return p1.age-p2.age;//相当于从小到大
});

objectArray.forEach(function(person){
	console.log(person.age);
});*/

/*var objectArray=[];
objectArray.push({x:10,y:100});
objectArray.push({x:10});
objectArray.push({x:10,y:100,z:1000});

objectArray.sort(function(p1,p2){
	return Object.getOwnPropertyNames(p1).length-Object.getOwnPropertyNames(p2).length;//相当于从小到大
});

objectArray.forEach(function(person){
	console.log(person);
});*/

// 4.利用JavaScript打印出Fibonacci数（不使用全局变量）
//第四题
//我自己写的有点水，看看大神写的

/*function Fibonacci(x){
	var value=0;
	if(x<=2){
		value=1;
	}else{
		value=Fibonacci(x-1)+Fibonacci(x-2);
	}

	return value;
}

alert(Fibonacci(3));*/

/*var value=0;
function Fibonacci(x){

	if(x<=2){
		return 1;
	}else{
		return Fibonacci(x-2)+Fibonacci(x-1);
	}
}*/

//别人说性能有点问题，需要优化下,但是看了他的也没觉得优化多少http://blog.csdn.net/nothing_is_imposible/article/details/48344013
/*function outputFibonacci(n){  
            return n<2?n:outputFibonacci(n-1)+outputFibonacci(n-2)  
        }  
alert(outputFibonacci(2));*/

// 5.实现如下语法的功能：var a = (5).plus(3).minus(6); //2
//第五题
/*Object.prototype.plus=function(x){
	return this+x;
}
Object.prototype.minus=function(x){
	return this-x;
}
var a=(5).plus(3).minus(6);
console.log(a);*/

// 6.实现如下语法的功能：var a = add(2)(3)(4); //9
// 第六题
// ~~a柯里化函数 可以用来取整和把string变成int
/*function add(a)
{
	var temp = function(b) 
	{
		return add(a + b);
	}
	temp.valueOf = temp.toString = function() {
		return a;
	};
	return temp;
}
var result = add(2)(1.2)(1);
console.log(result); // 9*/

/*var a = function () {
        return 'haha';
    }
 a.toString =  a.valueOf =  function () {
        return 'heihei';
    }
    console.log(a());  // haha
    console.log(a);   // heiheihei*/
//这里比较出色的就是调用了~~add，这个比较惊艳，但是这个只能包括整数的添加，小数的话不考虑这个
    function add(num){ 
	  num += ~~add; 
	  add.num = num; 
	  return add; 
	} 
	add.valueOf = add.toString = function(){return add.num}; 
	var ans = add(1)(2)(3)(3);  // 9 
	alert(ans); 


