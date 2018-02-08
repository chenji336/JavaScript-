// 32.设计模式之观察者模式.js
// 观察者模式又叫做**发布订阅模式**，好处：
// 1 支持简单的广播通信，自动通知所有已经订阅过的对象。
// 2 页面载入后目标对象很容易与观察者存在一种动态关联，增加了灵活性。
// 3 目标对象与观察者之间的抽象耦合关系能够单独扩展以及重用。

/*var d=[2,3,4];
for(var i in d){
	console.log(i,d[i]);
}
d.forEach(function(item,i,p){console.log(item,i,p)},{x:2});*/

/*window.onload=function(){
	var cj=document.getElementById('cj');
	setTimeout(function(){
		cj.style.color='yellow';
	},0);	//所以说用了setTimeout是为了在后面执行
	cj.style.color='red';
	cj.style.color='black';

}*/




// 正文（版本一）
/*var pubsub={};

(function(p){
	var topics={},
		subId=-1;

	p.publish=function(topic,args){
		if(!topics[topic])
			return false;

		for(var i in topics[topic]){
			topics[topic][i].func(topic,args);
		}

		return true;
	}

	p.subscribe=function(topic,func){
		var token=(++subId).toString();
		if(!topics[topic])
			topics[topic]=[];

		topics[topic].push({
			token:token,
			func:func
		});

		return token;
	}

	p.unsubscribe=function(token){
		for(var m in topics){
			var subscribes=topics[m];
			for(var i in subscribes){
				if(token===subscribes[i].token){
					subscribes.splice(i,1);
					return token;
				}
			}
		}	

		return false;
	}

})(pubsub);


var scribeToken=pubsub.subscribe('test',function(topic,data){
	console.log(topic,data);
});


pubsub.publish('test','publish1');
pubsub.publish('test','publish2');

// pubsub.unsubscribe(0);//这种退订的方式很傻，需要知道他的token
pubsub.unsubscribe(scribeToken);

pubsub.publish('test','publish2');*/

// 版本二
// 我们也可以利用原型的特性实现一个观察者模式，代码如下：

//这里用了prototype，所以了后续如果你使用for(var in ...)记得要加上hasOwnProperty排除继承的属性
//下面用原型是为了兼容后面不存在forEach和filter的情况下
/*if(!Array.prototype.forEach){
	Array.prototype.forEach=function(fn,thisObj){
		var scope=thisObj||window;
		for(var i=0;i<this.length;i++){
			// fn(this[i],i,this);
			// 有作用域记得用call
			fn.call(scope,this[i],i,this);
		}			
	}
}

if(!Array.prototype.filter){
	Array.prototype.filter=function(fn,thisObj){
		var scope=thisObj||window,
			filterArr=[];
		for(var i=0;i<this.length;i++){
			if(fn.call(scope,this[i],i,this)){
				filterArr.push(this[i]);//this[i]===fn.call(scope,this[i],i,this)
			}
		}

		return filterArr;
	}
}

function Observer(){
	this.fns=[];
}

Observer.prototype={
	subscribe:function(fn){
		this.fns.push(fn);
	},
	unsubscribe:function(fn){
		//**这里记住要加上this.fns=,因为filter返回的是一个数组
		//没有使用forEach，然后调用splice是因为这样数组会在里面变短
		this.fns=this.fns.filter(function(el){
			if(el!==fn){
				return true;//根据代码可知道，这里只需要返回一个true就可以了
			}
		});
	},
	update:function(args,thisObj){
		var scope=thisObj||window;//加上作用域，这样下面加上this.name就可以调用了
		this.fns.forEach(function(el){
			el.call(scope,args);
			// el(args);
		});
	}
};

//测试
var o=new Observer();
var f1=function(data){
	console.log(data,'找他要工资--',this.name);
};
o.subscribe(f1);
o.subscribe(function(data){
	console.log(data,'赶快干活--',this.name);
});
o.subscribe(f1);
o.subscribe(f1);
o.unsubscribe(f1);
o.update('Tom来了',{name:'chenji'});*/


//版本三
//如果想让多个对象都具有观察者发布订阅的功能，我们可以定义一个通用的函数，然后将该函数的功能应用到需要观察者功能的对象上，代码如下：

//测试一下对象是不是可以用for in，其实for in主要还是用于在查出属性的，
//还可以使用Object.getOwnPropertyNames或则Object.keys来获取所有的属性，不同点http://www.cnblogs.com/37sky/articles/5324105.html
/*var d={x:1,y:2};
var arr=[1,2,3];
for(var i in arr){
	console.log(i);
}*/

/*var d={},
	b=d;
b.x=10;
console.log(d.x);//10*/

/*var observer={
	addSubscribe:function(callback){
		this.subscribes[this.subscribes]=callback;
	},
	removeSubScribe:function(callback){
		for(var i in this.subscribes){
			if(callback===this.subscribes[i]){
				delete this.subscribes[i];
			}
		}
	},
	publish:function(args){
		for(var i in this.subscribes){//这样方便但是会带出原型
			if(typeof this.subscribes[i]==='function'){//这样做一个过滤
				this.subscribes[i](args);
			}
		}
	},
	make:function(o){
		//我用下面这个方法的话，是不是用o=this会更好了？
		for(var i in this){
			o[i]=this[i];
		}
		o.subscribes=[];
	}
};

var blogger={
	recommand:function(id){
		var msg='dudu推荐的帖子id:'+id;
		this.publish(msg);
	}
},
	user={
	vote:function(id){
		var msg='我投票给的id:'+id;
		this.publish(msg);
	}
};
observer.make(blogger),
observer.make(user);

var tom={
	read:function(msg){
		console.log('tom read:'+ msg);
	}
},
	mm={
	show:function(msg){
		console.log('mm read:'+ msg);
	}
};

blogger.addSubscribe(tom.read);
user.addSubscribe(mm.show);

blogger.recommand(1);
user.vote('minxi');

user.removeSubScribe(mm.show);
blogger.recommand(1);
user.vote('minxi');*/

// jQuery版本

// 根据jQuery1.7版新增的on/off功能，我们也可以定义jQuery版的观察者：
// 
// test 没有参数也可以取到吗？,下面例子显示答案是：是
/* function test(){
 	console.log(arguments);
 }
 test(1);*/

(function ($) {

    var o = $({});

    $.subscribe = function () {
        o.on.apply(o, arguments);
    };

    $.unsubscribe = function () {
        o.off.apply(o, arguments);
    };

    $.publish = function () {
        o.trigger.apply(o, arguments);
    };

} (jQuery));
// 调用方法比上面3个版本都简单：

//回调函数
function handle(e, a, b, c) {
    // `e`是事件对象，不需要关注
    console.log(a + b + c);
};

//订阅
$.subscribe("functionName", handle);
//发布
$.publish("functionName", ["a", "b", "c"]); // 输出abc
        

$.unsubscribe("functionName"); // 退订



//订阅
$.subscribe("functionName", function (e, a, b, c) {
    console.log(a + b + c);
});

$.publish("functionName", ["a", "b", "c"]); // 输出abc

//退订（退订使用的是/some/topic名称，而不是回调函数哦，和版本一的例子不一样
$.unsubscribe("functionName"); 