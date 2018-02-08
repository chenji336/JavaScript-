// 45.代码复用模式（避免篇）.js

// 1.默认模式
// 修改地方后面加!!
// 缺陷：1.Child不能传入参数，相当于费了
// 		 2.自己的constructor没有导向自己
// 		 3.还是会产生多余的数，因为调用了new P()
// 解决：使用Parent.call(this,name)
// 我这里还是有一个疑惑：为什么需要用临时构造函数，没有发现有点在哪里
function inherit(C,P){
	// C.prototype=new P();//这里需要进行修改
	C.prototype=P.prototype;//!!
	C.prototype.constructor=C;//!!
}

function Parent(name){
	this.name=name||'admin';
}
Parent.prototype.sayhi=function(){
	console.log('hai man!',this.name);
}

function Child(name){
	// Parent.call(this,name);//!! 我这个修改也不是很好，如果是多个参数了，最好使用下面的
	Parent.apply(this,arguments);
}

inherit(Child,Parent);

var c1=new Child();
c1.sayhi();
var c2=new Child();
c2.name='chenji';
c2.sayhi();
var c3=new Child('minxi');
c3.sayhi();
console.log(c3.name);
