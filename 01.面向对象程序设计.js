/*// 1.面向对象程序设计.js
var person={
	name:'chenji',
	sayName:function(){
		console.log(this.name);
	}
};

person.sayName();

//访问器属性
var book={
	_year:2004,
	edit:1
};

Object.defineProperty(book,'year',{
	get:function(){
		return this._year;
	},
	set:function(newValue){
		if(newValue>2004){
			this._year=newValue;
			this.edit+=newValue-this._year;
		}
	}
});

book.year=2003;
console.log(book.year,book._year,book.edit);

//getOwnPropertyDescriptor
var book={};
// 默认enumerable: false, writable:false, configurable:false
Object.defineProperties(book,{
	_year:{//数据属性
		value:2004
	},
	edit:{
		value:1
	},
	year:{//访问器属性
		get:function(){
			return this._year;
		},
		set:function(newValue){
			if(newValue>2004){
				this._year=newValue;
				this.edit+=newValue-this._year;
			}
		}
	}
});

var descriptor=Object.getOwnPropertyDescriptor(book,'_year');
console.log(descriptor.value);
console.log(typeof descriptor.get);
var descriptor=Object.getOwnPropertyDescriptor(book,'year');
console.log(descriptor.value);
console.log(typeof descriptor.get);


//------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//工厂模式-->构造函数模式-->原型模式
//上面三个模式可以看做进化史，都是为了解决模式下的一些问题才发展到了下面的模式

//////////////////////
//工厂模式              //
//缺点：我怎么知道这个对象的类型了？ //
//////////////////////
function createPerson(name){
	var o=new Object();
	//这里添加属性和方法
	return o;
}
*/

////////////////////////////////////////////////////////////////////////
//构造函数模式                                                              //
//解决了：我知道了这个对象的类型（person1 instanceof Person）                          //
//缺点：我每次新建一个person实例，如果里面有函数，就需要在里面建立一个函数的实例（需要new）                   //
//虽然可以把里面的函数当做全局函数放在外面，让他们只调用一个函数，但是这样这个全局函数只能被我这个对象调用（全局变量可不是这么让你用的） //
//而且如果有多个函数的话就需要在外面建立多个全局变量函数，我去。。。封装性完全就没有了                          //
////////////////////////////////////////////////////////////////////////
/*function Person(name){
	this.name=name;
	this.showName=function(){
		return 'show:'+name;
	}
}

//使用new
var person1=new Person('chenji1');
console.log(person1.showName());
//***********以前对于这个不使用new的理解很不到位，现在到位了，不使用new就是全局变量了，this就是window了，所以直接this.showName()就可以访问到这个函数
//不适用new
var p2=Person('chenji2');
// console.log(p2.showName());
console.log(this.showName());

var o=new Object();
Person.call(o,'chenji3')
console.log(o.showName());*/

// 原型模式
// 每一个函数都具有prototype
// function Person(){

// }
// function Other(){

// }
// Person.prototype.name='chenji';
// Person.prototype.showName=function(){
// 	return 'show:'+this.name;
// };
// var person1=new Person();
// console.log(person1.showName());
// var person2=new Person();
// console.log(person2.showName());
// console.log(person1.showName===person2.showName);

// /*var pserson3=Person();
// console.log(person3.showName());//报错*/

// console.log(Person.prototype.isPrototypeOf(person1));
// console.log(Other.prototype.isPrototypeOf(person1));
// console.log(Object.getPrototypeOf(person1)==Person.prototype);

// var o={
// 	toString:function(){
// 		console.log('My toString');
// 	}
// };

// for(var i in o){
// 	if(i=='toString'){//这个在IE中不会出现，因为原型的toString的enumerable是false
// 		o.toString();
// 	}
// }

// console.log(Object.keys(Person.prototype));//获取所有可枚举类型的属性（Enumerable）
// console.log(Object.getOwnPropertyNames(Person.prototype));//获取所有属性，即使是不可枚举的，这里会显示construct

//更简要的原型方法（就是字面量定义原型，但是construct指向会变）
/*function Person(){};
var friend=new Person();//这样下面引用showName就会报错，因为重新定义原型对象就切断了friend指向原型的指针
Person.prototype={//这样原型就赋值给了一个新的对象了
	name:'chenji',
	showName:function(){
		return this.name;
	}
};

console.log(friend instanceof Person);
console.log(friend.constructor==Person);
console.log(friend.constructor==Object);*/
// console.log(friend.showName());//这样会报错
//上面的friend.constructor==Person返回false，为了解决这个问题，可以自己定义一个constructor然后指向Person
//但是自定义的constructor的Enumerable就变成了true，为了让其变成false，可以使用defineProperty来设置Enumerable的值

//原型的缺点：不能初始化，大家都一样
//最重要的问题：如果使用引用类型比如数组，比如p1在原型的一个子元素数组中push了一个元素，那么p2中的那个子元素也会出现，这样就p1的添加就会影响到p2

//组合使用构造函数模式和原型模式
//***这个其实就是应用了设计模式的享元模式，享元模式就是通用的部分就用一个实例，减少内存的消耗，然后在是外面的部分，会改变的部分

//动态原型模式
//就是在构造模式情况下通过typeof来判断是否有了该原型的这个方法，没有就直接在构造函数中添加

//寄生构造函数模式
//我理解就是工厂模式而已，不是很好
/*function SpecialArray(){
	var arr=new Array();
	arr.push.apply(arr,arguments);
	arr.toPipedString=function(){
		return arr.join('|');
	};
	return arr;
}
var sa=SpecialArray('red','blue','black');//这里是不是用new都没啥关系的，所以我并不认为这也算构造函数模式
console.log(sa.toPipedString());*/

//**组合模式是我们javascript中最常用的模式，但是它也有不足
//不足：都会调用两次超类型构造函数，一次是在创建子类原型的时候，一次是在子类构造函数内部。
//虽然子类最终会包含超类型对象的全部实例属性，但我们不得不在调用子类型构造函数的时候重写这些属性
//看看下面这个组合模式：
/*function SuperType(name){
	this.name=name;
	this.colors=['red','black','blue'];
}
SuperType.prototype.sayName=function(){
	console.log(this.name);
};

function SubType(name,age){
	SuperType.call(this,name);
	this.age=age;
}
SubType.prototype=new SuperType();
// SubType.prototype=SuperType.prototype;
SubType.prototype.constructor=SubType;
SubType.prototype.sayAge=function(){
	console.log(this.age);
};*/

//下面是寄生组合模式，我们来看看区别

//原型式继承  参数o,引用类型值，实质就是一个内存地址
function object(o){
  function F(){}//创建一个构造函数F
  F.prototype = o;
  return new F();
}

function inheritPrototype(subType,superType){
	var prototype=object(superType.prototype);//副本 引用类型所以需要建立副本，否则会被带偏
	prototype.constructor=subType;
	subType.prototype=prototype;
}

function SuperType(name){
	this.name=name;
	this.colors=['red','black','blue'];
}
SuperType.prototype.sayName=function(){
	console.log(this.name);
};

function SubType(name,age){
	SuperType.call(this,name);//!!apply需要数组的形式，这是单个的
	this.age=age;
}
inheritPrototype(SubType,SuperType);
SubType.prototype.sayAge=function(){
	console.log(this.age);
};
var sub=new SubType(1,2);
