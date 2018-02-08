// 33.设计模式之策略模式.js
// 策略模式定义了算法家族，分别封装起来，让他们之间可以互相替换，此模式让算法的变化不会影响到使用算法的客户
// 感觉跟关闭开发原则很相似，就是把算法独立开来

//关于throw会不会跳出for循环,答案是会跳出
/*try{
	for(var i=0;i<10;i++){
		if(i===3){
			throw {x:2};
		}
	}
}catch(err){
	if(err.x===2){
		console.log('error');
	}
}

console.log(i);*/




//最原始的不使用validate方法
/*var validator={
	validate:function(value,type){
		switch(type){
			case 'isNonEmpty':
				return true;
				break;
			case 'isNumber':
				return true;
				break;
			case 'isAlphaNum':
				return true;
				break;
			default:
				return true;
		}
	}
};

validator.validate('123','isNonEmpty');*/

//使用策略模式下的
var validator={
	messages:[],
	config:{},
	types:{},
	validate:function(data){
		var i,data,type,checker;
		for(i in data){
			type=this.config[i];
			checker=this.types[type];
			if(!type){
				continue;
			}
			if(!checker){
				throw{
					message:'没有这个方法'+type
				};
			}

			if(!checker.validate(data[i])){
				this.messages.push(i+'-'+data[i]+'验证不能通过:'+checker.introduction);
			}
			
		}
		return this.hasError();
	},
	hasError:function(){
		return this.messages.length!==0;
	}
};

validator.types.isNonEmpty={
	validate:function(value){
		return value!=='';
	},
	introduction:'不能为空'
};

validator.types.isNumber={
	validate:function(value){
		return !isNaN(value);
	},
	introduction:'不是数字'
};

validator.types.isAlphaNum={
	validate:function(value){
		 return !/[^a-z0-9]/i.test(value);
	},
	introduction:'只能为数字或则英文，如：123，abc'
};


var data={
	first_name:'ji',
	last_name:'chen',
	age:'unknown',
	address:'1010072738@qq.com'
};

validator.config={
	first_name:'isNonEmpty',
	age:'isNumber',
	address:'isAlphaNum'
};

validator.validate(data);
if(validator.hasError()){
	console.log(validator.messages.join('\n'));
}