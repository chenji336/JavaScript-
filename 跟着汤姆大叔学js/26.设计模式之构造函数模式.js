// 26.设计模式之构造函数模式.js

// 下面的例子是个非常简单的构造函数模式，但是有点小问题。首先是使用继承很麻烦了，其次output()在每次创建对象的时候都重新定义了，
// 最好的方法是让所有Car类型的实例都共享这个output()方法，这样如果有大批量的实例的话，就会节约很多内存。
/*function Car(model, year, miles) {
    this.model = model;
    this.year = year;
    this.miles = miles;
    this.output= function () {//每次new的时候都需要创建，很消耗内存
        return this.model + "走了" + this.miles + "公里";
    };
}

var tom= new Car("大叔", 2009, 20000);
var dudu= new Car("Dudu", 2010, 5000);

console.log(tom.output());
console.log(dudu.output());*/


// 这里，output()单实例可以在所有Car对象实例里共享使用。
// 另外：我们推荐构造函数以大写字母开头，以便区分普通的函数。
/*function Car(model, year, miles) {
    this.model = model;
    this.year = year;
    this.miles = miles;
}


// 注意：这里我们使用了Object.prototype.方法名，而不是Object.prototype
// 主要是用来避免重写定义原型prototype对象
Car.prototype.output= function () {
    return this.model + "走了" + this.miles + "公里";
};

var tom = new Car("大叔", 2009, 20000);
var dudu = new Car("Dudu", 2010, 5000);

console.log(tom.output());
console.log(dudu.output());*/

//////////////
// 只能用new吗？ //
//////////////
/*function Car(model, year, miles) {
    this.model = model;
    this.year = year;
    this.miles = miles;
    // 自定义一个output输出内容
    this.output = function () {
        return this.model + "走了" + this.miles + "公里";
    }
}

//方法1：作为函数调用
var tom=Car("大叔", 2009, 20000);  //添加到window对象上
console.log(tom,window.output());
var tom2=new Car("大叔", 2009, 20000);  //添加到tom2对象上
console.log(tom2.output());*/

//方法2：在另外一个对象的作用域内调用
/*var o = new Object();
Car.call(o, "Dudu", 2010, 5000);
console.log(o.output()); */

/////////////
// 强制使用new //
/////////////
/*function Car(model, year, miles) {
	if(!(this instanceof Car)){//判断this是不是Car new出来的还是代表window
		return new Car(model,year,miles);
	}
    this.model = model;
    this.year = year;
    this.miles = miles;
    // 自定义一个output输出内容
    this.output = function () {
        return this.model + "走了" + this.miles + "公里";
    }
}


var tom=Car("大叔", 2009, 20000);  //添加到window对象上
console.log(tom);
var tom2=new Car("大叔", 2009, 20000);  //添加到tom2对象上
console.log(tom2.output());*/

// 推荐，只有在想保留数值状态的时候使用这些包装函数，关于区别可以参考下面的代码：
// 原始string
var greet = "Hello there";
// 使用split()方法分割
greet.split(' ')[0]; // "Hello"
// 给原始类型添加新属性不会报错
greet.smile = true;
// 单没法获取这个值（18章ECMAScript实现里我们讲了为什么）
// 没有办法获取是因为greet不是object，是一个普通的string类型，然后内置的机制就相当于闭包把，先给其赋值，用完了就自动释放掉了，所以后面在取就取不到了
console.log(typeof greet.smile); // "undefined"

// 原始string
var greet = new String("Hello there");
// 使用split()方法分割
greet.split(' ')[0]; // "Hello"
// 给包装函数类型添加新属性不会报错
greet.smile = true;
// 可以正常访问新属性
console.log(typeof greet.smile); // "boolean"