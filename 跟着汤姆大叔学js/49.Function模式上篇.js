// 49.Function模式上篇.js
// 偏应用
// 这里的偏应用，其实是将参数的传入工作分开进行，在有的时候一系列的操作可能会有某一个或几个参数始终完全一样，
// 那么我们就可以先定义一个偏函数，然后再去执行这个函数（执行时传入剩余的不同参数）。
// 举个例子，代码如下：

/*var partialAny = (function (aps) {

    // 该函数是你们自执行函数表达式的结果，并且赋值给了partialAny变量
    function func(fn) {
        var argsOrig = aps.call(arguments, 1);
        return function () {
            var args = [],
                argsPartial = aps.call(arguments),
                i = 0;

            // 变量所有的原始参数集，
            // 如果参数是partialAny._ 占位符，则使用下一个函数参数对应的值
            // 否则使用原始参数里的值
            for (; i < argsOrig.length; i++) {
                args[i] = argsOrig[i] === func._
                            ? argsPartial.shift()
                            : argsOrig[i];
            }

            // 如果有任何多余的参数，则添加到尾部
            return fn.apply(this, args.concat(argsPartial));
        };
    }

    // 用于占位符设置
    func._ = {};

    return func;
})(Array.prototype.slice);
// 使用方式如下：

// 定义处理函数
function hex(r, g, b) {
    return '#' + r + g + b;
}

//定义偏函数, 将hex的第一个参数r作为不变的参数值ff
var redMax = partialAny(hex, 'ff', partialAny._, partialAny._);

// 新函数redMax的调用方式如下，只需要传入2个参数了：
console.log(redMax('11', '22')); // "#ff1122"

// 如果觉得partialAny._太长，可以用__代替哦。

var __ = partialAny._;

var greenMax = partialAny(hex, __, 'ff');
console.log(greenMax('33', '44'));

var blueMax = partialAny(hex, __, __, 'ff');
console.log(blueMax('55', '66'));

var magentaMax = partialAny(hex, 'ff', __, 'ff');
console.log(magentaMax('77')); */

//Currying(柯里化)
//简单例子
/*function add(x,y){
	if(y==undefined){
		return function(newxy){
			return x+newxy;
		};
	}
	return x+y;
}
console.log(add(1,2));
console.log(add(1)(3));*/

// 接下来，我们来定义一个比较通用的currying函数：

// 第一个参数为要应用的function，第二个参数是需要传入的最少参数个数
function curry(func, minArgs) {
    if (minArgs == undefined) {
        minArgs = 1;
    }

    function funcWithArgsFrozen(frozenargs) {
        return function () {
            // 优化处理，如果调用时没有参数，返回该函数本身
            var args = Array.prototype.slice.call(arguments);
            var newArgs = frozenargs.concat(args);
            if (newArgs.length >= minArgs) {
                return func.apply(this, newArgs);
            } else {
                return funcWithArgsFrozen(newArgs);
            }
        };
    }

    return funcWithArgsFrozen([]);
}
// 这样，我们就可以随意定义我们的业务行为了，比如定义加法：

var plus = curry(function () {
    var result = 0;
    for (var i = 0; i < arguments.length; ++i) {
        result += arguments[i];
    }
    return result;
}, 2);
// 使用方式，真实多种多样哇。

plus(3, 2) // 正常调用
plus(3) // 偏应用，返回一个函数（返回值为3+参数值）
plus(3)(2) // 完整应用（返回5）
plus()(3)()()(2) // 返回 5
plus(3, 2, 4, 5) // 可以接收多个参数
plus(3)(2, 3, 5) // 同理

// 如下是减法的例子
var minus = curry(function (x) {
    var result = x;
    for (var i = 1; i < arguments.length; ++i) {
        result -= arguments[i];
    }
    return result;
}, 2);