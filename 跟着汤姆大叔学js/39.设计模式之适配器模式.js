//////////////////////////////////////////////////////////////////////////
// 39.设计模式之适配器模式.js                                                     //
// 适配器模式：将一个类的接口可以转化成客户希望的另外一个接口。Adapter模式使得原本由于接口不兼容而不能一起工作的那些类可以一起工作。 ////////////////////////////////////////////////////////////////////////////
//.net中的dataadapter就是适配器模式，可以匹配不同数据库中的数据
//典型的例子：刚入nba的姚明不会英语，需要翻译，可以调用这个模式，把他的中文适配成可以听懂的英文

//鸭子
var Duck = function(){

};
Duck.prototype.fly = function(){
throw new Error("该方法必须被重写!");
};
Duck.prototype.quack = function(){
throw new Error("该方法必须被重写!");
}

//火鸡
var Turkey = function(){

};
Turkey.prototype.fly = function(){
    throw new Error(" 该方法必须被重写 !");
};
Turkey.prototype.gobble = function(){
    throw new Error(" 该方法必须被重写 !");
};
// 然后再定义具体的鸭子和火鸡的构造函数，分别为：

//鸭子
var MallardDuck = function () {
    Duck.apply(this);
};
MallardDuck.prototype = new Duck(); //原型是Duck
MallardDuck.prototype.fly = function () {
    console.log("可以飞翔很长的距离!");
};
MallardDuck.prototype.quack = function () {
    console.log("嘎嘎！嘎嘎！");
};

//火鸡
var WildTurkey = function () {
    Turkey.apply(this);
};
WildTurkey.prototype = new Turkey(); //原型是Turkey
WildTurkey.prototype.fly = function () {
    console.log("飞翔的距离貌似有点短!");
};
WildTurkey.prototype.gobble = function () {
    console.log("咯咯！咯咯！");
};
// 为了让火鸡也支持quack方法，我们创建了一个新的火鸡适配器TurkeyAdapter：

var TurkeyAdapter = function(oTurkey){
    Duck.apply(this);
    this.oTurkey = oTurkey;
};
TurkeyAdapter.prototype = new Duck();
TurkeyAdapter.prototype.quack = function(){
    this.oTurkey.gobble();
};
TurkeyAdapter.prototype.fly = function(){
    var nFly = 0;
    var nLenFly = 5;
    for(; nFly < nLenFly;){
        this.oTurkey.fly();
        nFly = nFly + 1;
    }
};
// 该构造函数接受一个火鸡的实例对象，然后使用Duck进行apply，其适配器原型是Duck，然后要重新修改其原型的quack方法，以便内部调用oTurkey.gobble()方法。其fly方法也做了一些改变，让火鸡连续飞5次（内部也是调用自身的oTurkey.fly()方法）。

// 调用方法，就很明了了，测试一下便可以知道结果了：

var oMallardDuck = new MallardDuck();
var oWildTurkey = new WildTurkey();
var oTurkeyAdapter = new TurkeyAdapter(oWildTurkey);

//原有的鸭子行为
oMallardDuck.fly();
oMallardDuck.quack();

//原有的火鸡行为
oWildTurkey.fly();
oWildTurkey.gobble();

//适配器火鸡的行为（火鸡调用鸭子的方法名称）
oTurkeyAdapter.fly();
oTurkeyAdapter.quack();