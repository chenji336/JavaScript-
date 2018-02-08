////////////////
// 2.函数表达式.js //////////////////

// 1.递归
// arguments.callee
function factiorial(num){
	if(num<=1){
		return num;
	}else{
		return num*factiorial(num-1);
	}
}
var result=factiorial(4);
console.log(result);
//这个会出现问题的：
var anotherFactorial=factiorial;
factiorial=null;
console.log(anotherFactorial(4));//error:factorial is not a function

//解决方法：使用arguments.callee,机智(这个比较常用)
function factiorial(num){
	if(num<=1){
		return num;
	}else{
		return num*arguments.callee(num-1);
	}
}

//但是在严格模式下，这样还是有问题的，可以使用下面这种
factiorial=(function f(num){
	if(num<=1){
		return num;
	}else{
		return num*arguments.callee(num-1);
	}
});

// 2.闭包
//**由于闭包会携带包含它的函数的作用域，因此会比其他函数占用更多的内存。所以需要合理的使用闭包
function compare(value1,value2){
	if(value1<value2){
		return -1; 
	}else if(value1>value2){
		return 1;
	}else{
		return 0;
	}
}
var ano=function(value1,value2){
	if(value1<value2){
		return -1; 
	}else if(value1>value2){
		return 1;
	}else{
		return 0;
	}
}
var result1=compare(1,2);

function createComparisonFunction(propertyName){
	return function(object1,object2){
		var value1=object1[propertyName];
		var value2=object2[propertyName];
		if(value1<value2){
			return -1; 
		}else if(value1>value2){
			return 1;
		}else{
			return 0;
		}
	};
}

//**这里[[Scopes]]里面就会多出包含它函数的作用域，会看到propertyName这个属性（如果不让后面compareAge=null的话）
var compareAge=createComparisonFunction('age');
var result2=compareAge({age:1},{age:2});

//接触匿名函数的引用（释放内存）
 compareAge=null;

var  fClosure=(function(type){
	console.log(type);
	return function(){
		console.log('closure------',type);//只有这里使用外面的变量type，才会保存在[[Scopes]]中
	};
})(12);

//闭包和变量

//**所以关于循环给数组中每个值赋值函数的就很好理解了，因为i都取最后一个数，所以results[i]()一定就是i最后的值，如果把这个i在放在闭包里的话就没有该问题了
function createFunctions(){
	var results=[];
	for(var i=0;i<10;i++){
		results[i]=function(){
			console.log(i);
		};
	}
	return results;
}
var arr=createFunctions();
arr[2]();//显示10，期望是想显示2，你如果去调试查看arr[2]，可以看到[[Scopes]]中的闭包变量中i是10（用chrome去调试）
//进行下面更改就可以让显示是期望的值，增加闭包,就可以看到上面的arr[2]中[[Scopes]]中闭包变量是2
function createFunctions(){
	var results=[];
	for(var i=0;i<10;i++){
		results[i]=(function(num){
			return function(){
				console.log(num);
			};
		})(i);
	}
	return results;
}

//关于this对象
//每个函数被调用时，其活动对象都会自动获取两个特殊变量：this和arguments
//内部函数在搜索这两个变量时，只会搜索其活动对象为止，因此永远不可能直接访问外部函数中的这两个变量
//不过，把外部作用域中的this对象保存在闭包就能够访问到的变量里，就可以让闭包访问该变量
var name='chenji';

var object={
	name:'minxi',
	getName:function(){
		console.log(this.name);//minxi
	}
};

//闭包看到这个this不会知道是谁的，默认就是window，它只会在自己的活动域中进行查找
var object={
	name:'minxi',
	getName:function(){
		return function(){
			console.log(this.name);//chenji,自己可以去看作用域,可以看到
		};
	}
};

var object={
	name:'minxi',
	getName:function(){
		var that=this;
		return function(){
			console.log(that.name);//chenji,自己可以去看作用域,可以看到
		};
	}
};
object.getName()();	