// 42.设计模式之原型模式.js
// 用原型实例指向创建对象的种类，并且通过拷贝这些原型创建新的对象
// Object.create(prototype,params)

// 因为不是构造函数，所以不用大写
var someCar = {
    drive: function () { },
    name: '马自达 3'
};

// 使用Object.create创建一个新车x
var anotherCar = Object.create(someCar);
anotherCar.name = '丰田佳美';

// Object.create运行你直接从其它对象继承过来，使用该方法的第二个参数，你可以初始化额外的其它属性。例如：
var vehicle = {
    getModel: function () {
        console.log('车辆的模具是：' + this.model);
    }
};
// 这里，可以在Object.create的第二个参数里使用对象字面量传入要初始化的额外属性，
// 其语法与Object.defineProperties或Object.defineProperty方法类型。它允许您设定属性的特性，例如enumerable, writable 或 configurable。
var car = Object.create(vehicle, {
    'id': {
        value: 'id1',
        enumerable: true // 默认writable:false, configurable:false
 },
    'model': {
        value: '福特',
        enumerable: true
    }
});

// 如果你希望自己去实现原型模式，而不直接使用Object.create 。你可以使用像下面这样的代码为上面的例子来实现：
var vehiclePrototype = {
    init: function (carModel) {
        this.model = carModel;
    },
    getModel: function () {
        console.log('车辆模具是：' + this.model);
    }
};


function vehicle(model) {
    function F() { };
    F.prototype = vehiclePrototype;

    var f = new F();

    f.init(model);
    return f;
}

var car = vehicle('福特Escort');
car.getModel();