// 29.设计模式之装饰者模式.js

//下面这个装饰者的代码确实是比较好理解
// 我来一个简单的吧，先写个装饰者模式的特点：
// 1. 装饰对象和真实对象有相同的接口。这样客户端对象就能以和真实对象相同的方式和装饰对象交互。
// 2. 装饰对象包含一个真实对象的引用（reference）
// 3. 装饰对象接受所有来自客户端的请求。它把这些请求转发给真实的对象。
// 4. 装饰对象可以在转发这些请求以前或以后增加一些附加功能。这样就确保了在运行时，
// 不用修改给定对象的结构就可以在外部增加附加的功能。在面向对象的设计中，通常是通过继承来实现对给定类的功能扩展

/*function baseClass() {
            this.showPrice = function() {
                console.log('基础价格: 100');
            }
        }
 
        // 装饰者1
        function decorator1(target) {//继承方法理解用乘法，装饰者可以用加法
            // 在装饰器内部保存对真实对象的引用
            var instance = target;
 
            this.showPrice = function(){
                // 这里是调用真实对象的引用
                instance.showPrice();
                // 这里是装饰器额外增加的代码
                console.log('增加功能1之后的价格：899');
            }
        }
 
        // 装饰者2
        function decorator2(target) {
            var instance = target;
 
            this.showPrice = function() {
                instance.showPrice();
 
                console.log('增加功能2之后的价格：1999');
            }
        }
 
        var baseInstance = new baseClass();
 
        //装饰器的参数可以是baseClass实例，也可以是其他装饰器实例
        var decorator_1 = new decorator1(baseInstance);
        // 到这来只给baseClass增加了decorator1
        decorator_1.showPrice();
 
        var decorator_2 = new decorator2(decorator_1);
        //var decorator_2 = new decorator2(baseInstance);
        decorator_2.showPrice();
 
        console.log('这个是链式操作的装饰者模式');
        var decorator_2_1 = new decorator2(new decorator1(baseInstance));
        decorator_2_1.showPrice();*/


//这个是tom大叔翻译给的例子
// 再来一个彻底的例子：

var tree = {};
tree.decorate = function () {
    console.log('Make sure the tree won\'t fall');
};

tree.getDecorator = function (deco) {
    tree[deco].prototype = this;
    return new tree[deco];
};

tree.RedBalls = function () {
    console.log(this);
    this.decorate = function () {
        this.RedBalls.prototype.decorate(); // 第7步：先执行原型（这时候是Angel了）的decorate方法
        console.log('Put on some red balls'); // 第8步 再输出 red
        // 将这2步作为RedBalls的decorate方法
    }
};

tree.BlueBalls = function () {
    console.log(this);
    this.decorate = function () {
        this.BlueBalls.prototype.decorate(); // 第1步：先执行原型的decorate方法，也就是tree.decorate()
        console.log('Add blue balls'); // 第2步 再输出blue
        // 将这2步作为BlueBalls的decorate方法
    }
};

tree.Angel = function () {
    console.log(this);
    this.decorate = function () {
        this.Angel.prototype.decorate(); // 第4步：先执行原型（这时候是BlueBalls了）的decorate方法
        console.log('An angel on the top'); // 第5步 再输出angel
        // 将这2步作为Angel的decorate方法
    }
};

tree = tree.getDecorator('BlueBalls'); // 第3步：将BlueBalls对象赋给tree，这时候父原型里的getDecorator依然可用
tree = tree.getDecorator('Angel'); // 第6步：将Angel对象赋给tree，这时候父原型的父原型里的getDecorator依然可用
tree = tree.getDecorator('RedBalls'); // 第9步：将RedBalls对象赋给tree

tree.decorate(); // 第10步：执行RedBalls对象的decorate方法


// Array.prototype.copy=function(){}
// var p=[1,2];
// for(var i in p){
// 	console.log(i);
// }

// /*

//  */
// for(var i=0;i<p.length;i++){

// 	console.log(p[i]);
// }*/


// p.forEach(function(c){
// 	console.log(c);
// });