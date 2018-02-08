// 28.设计模式之工厂模式.js
// 工厂模式是属于一种设计模式，指的是专门定义一个类来负责创建其他类的实例，属于类的创建型模式，通常根据一个条件（参数）来返回不同的类的实例。
// 我理解的工厂模式和建造者模式的区别：工厂模式更注重在整体，你要求什么我在生产什么
// 而建筑者则是我实现好了，你在去用，更注重细节

window.onload=function(){//Cannot read property 'appendChild' of null,如果没有加载完则会提示这个
	//题外话，自己测试一下js和jq
	//js和jq不能定义了jq的节点，然后用js的方法什么的
	/*$('<input type="text">').val('chenji1');
	var c=$('<input type="text">');
	c.val('chenji2');
	c.appendTo(document.body);
	var input=document.createElement('input');
	input.value='chenji3';
	input.val('cccc');//input.val is not a function 因为这个不是jquery
	document.body.appendChild(input);*/


	var page=page||{};
	page.dom=page.dom||{};

	page.dom.Text=function(){
		this.insert=function(where){
			var input=document.createElement('input');
			input.value=this.value;
			where.appendChild(input);
		};
	}

	page.dom.Link=function(){
		this.insert=function(where){
			var link=document.createElement('a');
			link.href=this.url;
			link.appendChild(document.createTextNode(this.text));
			where.appendChild(link);
		}
	}

	page.dom.Image=function(){
		this.insert=function(where){
			var image=document.createElement('image');
			image.src=this.src;
			where.appendChild(image);
		}
	}


	function factory(type){
		return new page.dom[type];//专门定义一个类来专门创建其他类的实例***********************
	}

	var f=factory('Image');
	f.src='http://www.baidu.com';
	f.insert(document.body);



}
