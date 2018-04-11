// 41.设计模式之模板方法模式.js
// 定义一个操作中的算法的框架，而将一些不走延迟到子类中进行实现。模板方法使得子类可以不改变一个算法的结构即可重新定义该算法的某些特定步骤
//模板方法和策略模式的区别是：一个是继承，一个是用委托方式来实现

//我可能会忘记的单词：烧开水（boilWater）、冲泡（brew）、倒在杯子里（pourOnCup），加小料（addCondiments）、CaffeineBeverage 、prepareRecipe 、customerWantsCondiments
//一般继承的话记得使用 父类.apply(this),这样如果有参数就好操作了，使用confirm
function CaffeineBeverge(){

}
CaffeineBeverge.prototype.prepareRecipe=function(){
	this.boilWater();
	this.brew();
	this.pourOnCup();
	if(this.customerWantsCondiments()){//!!调用方法我既然没有用括号
		this.addCondiments();
	}
};
CaffeineBeverge.prototype.boilWater=function(){
	console.log("水烧开了！");
};
CaffeineBeverge.prototype.pourOnCup=function(){
	console.log("把配好的东东倒进杯子了!");
};
CaffeineBeverge.prototype.customerWantsCondiments=function(){
	return true;
};
//下面的两个原型方法需要在子类中实现，进行模板的匹配
CaffeineBeverge.prototype.brew=function(){
	throw new Error("该方法必须重写!");
};
CaffeineBeverge.prototype.addCondiments=function(){
	throw new Error("该方法必须重写!");
};


//下面是caffeine  beverge分别来实现
function Caffeine(){
	CaffeineBeverge.apply(this);
}
Caffeine.prototype=new CaffeineBeverge();
Caffeine.prototype.brew=function(){
	console.log("把咖啡因倒进水中进行冲泡!");
};
Caffeine.prototype.addCondiments=function(){
	console.log("在咖啡中加上几颗奶糖!");
};
Caffeine.prototype.customerWantsCondiments=function(){
	return confirm("你想要添加奶糖吗？");
};

function Beverge(){
	CaffeineBeverge.apply(this);
}
Beverge.prototype=new CaffeineBeverge();
Beverge.prototype.brew=function(){
	console.log("把饮料粉倒进水中进行冲泡!");
};
Beverge.prototype.addCondiments=function(){
	console.log("在饮料中添加一些水果!");
};
Beverge.prototype.customerWantsCondiments=function(){
	return confirm("你想要添加水果吗？");
};

var caffeine=new Caffeine(),
	beverge=new Beverge();
caffeine.prepareRecipe();
beverge.prepareRecipe();