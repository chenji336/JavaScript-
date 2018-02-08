// 17.���������֮����.js
// ECMAScript�ǻ���ԭ��ʵ�ֵ�������������ԡ�

//��chrome�����������ʾ�����
//��spiderMonkey�ǿ���ʵ�ֵģ�firefoxӦ�ÿ��ԣ�����û�в��ԣ�
/*var object = {
 
  // catchס������Ӧ��Ϣ��ϵͳ�ź�
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

// ��̬
/*function test() {
  alert([this.a, this.b]);
}
 
test.call({a: 10, b: 20}); // 10, 20
test.call({a: 100, b: 200}); // 100, 200
 
var a = 1;
var b = 2;
 
test(); // 1, 2*/

// ������Ҳ�����⣺Date.prototype.getTime()���������ݱ�׼���ֵ����Ӧ����һ�����ڶ��󣬷���ͻ��׳��쳣��
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
 /*var objectList=  [];//��Ҫ��{}����Ϊ����Ƕ���������
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

//��̳�
//ECMAScript��֧�ֶ�̳У���ֻ��һ�����󣬿���������Ϊһ��ֱ��ԭ�ͣ�����Ȼ�������Ա������������������
//Mixins�ѽ�����Ϊ���ؼ̳е����Ʒ
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

//�������
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



// AOP����
// ������ӵ�к���ʽ�����ĺ�����ĳЩ�����ǿ���װ�κͼ���ģ�ͨ��Ӧ����ν�Ľ��飩��
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
