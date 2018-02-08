// 14.作用域链(Scope Chain).js
/*var x = 10;
 
function fo() {
  alert(x);
}
 
(function () {
  var x = 20;
  fo(); // 10, but not 20
})();
*/

//构造函数作用域链
//构造函数的话是作为全局变量的，找不到父级
/*var x = 10;
 
function fo() {
 
  var y = 20;
 
  function barFD() { // 函数声明
    alert(x);
    alert(y);
  }
 
  var barFE = function () { // 函数表达式
    alert(x);
    alert(y);
  };
 
  var barFn =new Function('alert(x); alert(y);');
 
  barFD(); // 10, 20
  barFE(); // 10, 20
  barFn(); // 10, "y" is not defined
 
}
 
fo();
*/


/*function Lakers() {  
       this.name = "kobe bryant";  
       this.age = "28";  
       this.gender = "boy";  
}  
var people=new Lakers();  
with(people.name)  
{  
    people.name='chenji';
}  

alert(people.name);
*/

var x = 10, y = 10;
 
with ({x: 20}) {
 
   x = 30;y = 30;
 
  alert(x); // 30
  alert(y); // 30
}
 
alert(x); // 10
alert(y); // 30