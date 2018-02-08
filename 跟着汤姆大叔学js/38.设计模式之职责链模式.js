// 38.设计模式之职责链模式.js
// 这个职责链模式就类似于冒泡事件的那些算法（冒泡机制）
var NO_TOPIC=-1,
	topic=0;
function Handler(successor,top){
	this.successor=successor;
	this.top=top;
}

Handler.prototype={
	handle:function(){
		if(this.successor){
			this.successor.handle();
		}
	},
	has:function(){
		return this.top!=NO_TOPIC;
	}
};

var app=new Handler({
	handle:function(){
		console.log('app handle');
	}
},1);

var dialog=new Handler(app,2);
dialog.handle=function(){
	console.log('dialog handle');
	Handler.prototype.handle.call(this);
};
var button=new Handler(dialog,3);
button.handle=function(){
	console.log('button handle');
	Handler.prototype.handle.call(this);//这个理解就是调用dialog的，不理解自己一步步调试看下
	// Handler.prototype.handle();
}
button.handle();