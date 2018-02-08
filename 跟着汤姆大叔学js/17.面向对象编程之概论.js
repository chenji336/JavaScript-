// 17.面向对象编程之概论.js
// ECMAScript是基于原型实现的面向对象编程语言。

//在chrome浏览器中是提示报错的
//在spiderMonkey是可以实现的（firefox应该可以，不过没有测试）
/*var object = {
 
  // catch住不能响应消息的系统信号
  __noSuchMethod__: function (name, args) {
    alert([name, args]);
    if (name == 'test') {
      return '.test() method is handled';
    }
    return delegate[name].apply(this, args);
  }
 
};
 
var delegate = {
  square: function (a) {
    return a * a;
  }
};
 
alert(object.square(10)); // 100
alert(object.test()); // .test() method is handled*/

// 多态
/*function test() {
  alert([this.a, this.b]);
}
 
test.call({a: 10, b: 20}); // 10, 20
test.call({a: 100, b: 200}); // 100, 200
 
var a = 1;
var b = 2;
 
test(); // 1, 2*/

// 不过，也有例外：Date.prototype.getTime()方法，根据标准这个值总是应该有一个日期对象，否则就会抛出异常。
/*alert(Date.prototype.getTime.call(new Date())); // time
alert(Date.prototype.getTime.call(new String(''))); // TypeError*/

//sort
/*  var arrSimple=new Array(1,8,7,6);
  arrSimple.sort();
  alert(arrSimple.join());//1678*/

 /* var arrSimple=new Array(1,8,7,6);
  arrSimple.sort(function(a,b){return a-b});//a-b 1678 b-a 8761
  alert(arrSimple.join());//1678*/

 // var objectList=new Array();  
 /*var objectList=  [];//不要用{}，因为这个是对象不是数组
 function Person(name,age){
 	this.name=name;
 	this.age=age;
 }

 objectList.push(new Person('cj1',11));
 objectList.push(new Person('cj2',12));
 objectList.push(new Person('cj3',13));
 objectList.push(new Person('cj4',14));

 objectList.sort(function(a,b){
 	return a.age-b.age;
 });

 console.log(objectList);
 objectList.forEach(function(ob){
    console.log(ob.age);
 })
*/

/*(function(a,b){
  alert(arguments[0]);
})(1,2);*/

//多继承
//ECMAScript不支持多继承（即只有一个对象，可以用来作为一个直接原型），虽然其祖先自编程语言有这样的能力
//Mixins已建议作为多重继承的替代品
// helper for augmentation
/*Object.extend = function (destination, source) {
  for (property in source) if (source.hasOwnProperty(property)) {
    destination[property] = source[property];
  }
  return destination;
};
 
var X = {a: 10, b: 20};
var Y = {c: 30, d: 40};
 
Object.extend(X, Y); // mix Y into X
alert([X.a, X.b, X.c, X.d]); 10, 20, 30, 40*/

//对象组合
/*var _delegate = {
  foo: function () {
    alert('_delegate.foo');
  }
};
 
var agregate = {
 
  delegate: _delegate,
 
  foo: function () {
    return this.delegate.foo.call(this);
  }
 
};
 
agregate.foo(); // delegate.foo
 
agregate.delegate = {
  foo: function () {
    alert('foo from new delegate');
  }
};
 
agregate.foo(); // foo from new delegate*/



// AOP特性
// 不过，拥有函数式参数的函数在某些方面是可以装饰和激活的（通过应用所谓的建议）：
// 
function checkDecorator(originalFunction) {
  return function () {
    if (fooBar != 'test') {
      alert('wrong parameter');
      return false;
    }
    return originalFunction();
  };
}
 
function test() {
  alert('test function');
}
 
var testWithCheck = checkDecorator(test);
var fooBar = false;
 
test(); // 'test function'
testWithCheck(); // 'wrong parameter'
 
fooBar = 'test';
test(); // 'test function'
testWithCheck(); // 'test function'
