// 48.对象创建模式(下篇).js
// 模式7：对象常量
// 对象常量是在一个对象提供set,get,ifDefined各种方法的体现，而且对于set的方法只会保留最先设置的对象，后期再设置都是无效的，已达到别人无法重载的目的。实现代码如下：

/*var constant = (function () {
    var constants = {},
        ownProp = Object.prototype.hasOwnProperty,
    // 只允许设置这三种类型的值
        allowed = {
            string: 1,
            number: 1,
            boolean: 1
        },
        prefix = (Math.random() + "_").slice(2);

    return {
        // 设置名称为name的属性
        set: function (name, value) {
            if (this.isDefined(name)) {
                return false;
            }
            if (!ownProp.call(allowed, typeof value)) {
                return false;
            }
            constants[prefix + name] = value;
            return true;
        },
        // 判断是否存在名称为name的属性
        isDefined: function (name) {
            return ownProp.call(constants, prefix + name);
        },
        // 获取名称为name的属性
        get: function (name) {
            if (this.isDefined(name)) {
                return constants[prefix + name];
            }
            return null;
        }
    };
} ());
// 验证代码如下：

// 检查是否存在
console.log(constant.isDefined("maxwidth")); // false

// 定义
console.log(constant.set("maxwidth", 480)); // true

// 重新检测
console.log(constant.isDefined("maxwidth")); // true

// 尝试重新定义
console.log(constant.set("maxwidth", 320)); // false

// 判断原先的定义是否还存在
console.log(constant.get("maxwidth")); // 480*/

// 模式9：静态成员

// 静态成员（Static Members）只是一个函数或对象提供的静态属性，可分为私有的和公有的，就像C#或Java里的public static和private static一样。

// 我们先来看一下公有成员，公有成员非常简单，我们平时声明的方法，函数都是公有的，比如：

// 构造函数
var Gadget = function () {
};

// 公有静态方法
Gadget.isShiny = function () {
    return "you bet";
};

// 原型上添加的正常方法
Gadget.prototype.setPrice = function (price) {
    this.price = price;
};

// 调用静态方法
console.log(Gadget.isShiny()); // "you bet"

// 创建实例，然后调用方法
var iphone = new Gadget();
iphone.setPrice(500);

console.log(typeof Gadget.setPrice); // "undefined"
console.log(typeof iphone.isShiny); // "undefined"
Gadget.prototype.isShiny = Gadget.isShiny;
console.log(iphone.isShiny()); // "you bet"

var Gadget = (function () {
    // 静态变量/属性
    var counter = 0;

    // 闭包返回构造函数的新实现
    return function () {
        console.log(counter += 1);
    };
} ()); // 立即执行

var g1 = new Gadget(); // logs 1
var g2 =  Gadget(); // logs 2
var g3 = new Gadget(); // logs 3