/*var Calculator = function (decimalDigits, tax) {
            this.decimalDigits = decimalDigits;
            this.tax = tax;
        };*/

//第一种方式
     /*   Calculator.prototype = {
            add: function (x, y) {
                return x + y+this.decimalDigits;
            },

            subtract: function (x, y) {
                return x - y;
            }
        };*/

//第二种方式
     /*    Calculator.prototype = function () {
            add = function (x, y) {
                return x + y+this.decimalDigits;
            },

            subtract = function (x, y) {
                return x - y;
            }
            return {
                add: add,
                subtract: subtract
            }
        } ();
        //原型必须new才可以进行，而module可以不需要new，各自的优势我还不是特别清楚
        alert((new Calculator(1,2)).add(1,2));
*/


/*var BaseCalculator=function(){
	this.decimalDigits=2;
};

BaseCalculator.prototype.add=function(x,y){
	return x+y+this.decimalDigits;
};

BaseCalculator.prototype.subtract=function(x,y){
	return x-y;
}

BaseCalculator.prototype.icrement=function(x,y){
	return ++this.decimalDigits;
}


var Calculator = function () {
	            	this.tax = 5;
	  			 };

Calculator.prototype=new BaseCalculator();
var calc=new Calculator();
alert(calc.icrement());
alert(calc.decimalDigits);
var calc2=new Calculator();
alert(calc2.decimalDigits);*/
// alert(calc.icrement());

/*Calculator.prototype=BaseCalculator.prototype;//这样就访问不到decimalDigits
var calc=new Calculator();
alert(calc.decimalDigits);*/

/*Calculator.prototype.add=function(x,y){
	return x+y+this.decimalDigits+1;
}
alert(calc.add(1,1));*/

// ------------------------------------------原型鏈-------------------------------------------------------------------------------------------------------------------------------------------------
 function Foo() {
    this.value = 42;
}
Foo.prototype = {
    method: function() {}
};

function Bar() {}

// 设置Bar的prototype属性为Foo的实例对象
Bar.prototype = new Foo();
Bar.prototype.foo = 'Hello World';

// 修正Bar.prototype.constructor为Bar本身
Bar.prototype.constructor = Bar;

var test = new Bar() // 创建Bar的一个新实例


//屬性查找
//修改Object.prototype
/*Object.prototype.bar = 1; 
var foo = {goo: undefined};

foo.bar; // 1
'bar' in foo; // true

foo.hasOwnProperty('bar'); // false
foo.hasOwnProperty('goo'); // true
*/

/*var foo = {
    hasOwnProperty: function() {
        return false;
    },
    bar: 'Here be dragons'
};

alert(foo.hasOwnProperty('bar')); // 总是返回 false,因為會

// 使用{}对象的 hasOwnProperty，并将其上下为设置为foo
alert(Object.hasOwnProperty.call(foo, 'bar')); // true*/