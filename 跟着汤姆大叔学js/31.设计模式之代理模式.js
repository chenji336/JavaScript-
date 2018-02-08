// 31.设计模式之代理模式.js
// 代理模式（Proxy），为其他对象提供一种代理以控制对这个对象的访问。

// 代理模式使得代理对象控制具体对象的引用。代理几乎可以是任何对象：文件，资源，内存中的对象，或者是一些难以复制的东西。
function Girl(name){
	this.name=name;
}

function DuDu(girl){
	this.sendGift=function(gift){
		console.log('dudu送了',gift,'给',girl.name);
	}
}

function ProxyTom(girl){
	this.sendGift=function(gift){
		(new DuDu(girl)).sendGift(gift);
	}
}

var proxy=new ProxyTom(new Girl('闵茜'));
proxy.sendGift('9999朵玫瑰');