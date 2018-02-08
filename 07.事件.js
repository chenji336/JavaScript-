// 7.事件.js
// 
// 13.1 事件流
// 解释：事件流描述的是从页面接受事件的顺序。
// IE使用的是事件冒泡流。Netscape commnunicator的事件流是事件捕捉流
// 13.1.1事件冒泡  从内到外依次触发事件
// 13.1.2事件捕获  从外到内
// 13.1.3DOM事件流 包括三个阶段：事件捕获阶段、处于目标阶段和事件冒泡阶段

// 13.2 事件处理程序
// 解释：用户或浏览器自身执行的某种动作。都是以on为开头
// 13.2.1 HTML事件处理程序  
// 	就是在HTML中的element中直接使用onclick等事件
// 	event.type就是clikc，this.value就是本身的value值
// 13.2.2 DOM0级事件处理程序
// 	使用DOM0级方法指定的事件处理程序认为是当前元素的方法
// 	element.onclick=function(){this.id}//element的id值
// 	删除：element.onclick=null
// 13.2.3 DOM2级事件处理程序
// 定义了两个方法：addEventListener(p1,p2,p3) removeEventListener(p1,p2,p3)
// 	element.addEventListener('click',function(){this.id},false)，p3是false表示在冒泡阶段调用事件处理程序，true表示在捕获阶段调用事件处理程序
// 	优势：可以添加多个addEventListener，使用DOM0只能添加一个，后面的会覆盖前面的
// 	addEventListener只能用removeEventListener来进行移除，而且p2必须是一样的
// 13.2.4 IE事件处理程序
// 定义的两个方法：attachEvent(p1,p2) detachEvent(p1,p2) 默认使用冒泡
// element.attachEvent('onclick',function(){this===window})//true
// attachEvent与addEventListener区别：1.没有P3 2.this是window 3.多次添加调用的顺序是相反的，最后加的最先出来 4.需要添加on
// 但是如果使用DOM0的话，function是没有event参数的，但是this指向的是自己，不是window
// 13.2.5 跨浏览器事件处理程序
// 需要注意的就是IE的作用域问题，还有一个就是DOM0只能添加一个，不过现在不支持DOM2的已经很少了
var EventUtil={
	addHandler:function(element,type,handler){
		if(element.addEventListener){
			element.addEventListener(type,handler,false);
		}else if(element.attachEvent){
			element.attachEvent('on'+type,handler);
		}else{
			element['on'+type]=handler;
		}
	},
	removeHandler:function(element,type,handler){
		if(element.removeEventListener){
			element.removeEventListener(type,handler,false);
		}else if(element.detachEvent){
			element.detachEvent('on'+type,handler);
		}else{
			element['on'+type]=null;
		}
	}
}

//13.3 事件对象(event)
//13.3.1 DOM中的事件对象
window.onload=function(){
	// currentTarget===绑定事件的元素
	// target===点击的元素
	// 先进性捕获，在进行自己，在进行冒泡
	var div1=document.getElementById('div1');
	var div2=document.getElementById('div2');
	var a=document.getElementsByTagName('a')[0];
	// div2.addEventListener('click',function(event){
	// 	console.log(event.type+'-'+this.id+'-'+(event.currentTarget==event.target)+'-'+event.eventPhase);
	// 	// event.stopPropagation();//阻止事件的进一步捕获或冒泡
	// },false);

	// div1.addEventListener('click',function(event){
	// 	console.log(event.type+'-'+this.id+'-'+(event.currentTarget==event.target)+'-'+event.eventPhase);
	// 	// event.stopPropagation();//阻止事件的进一步捕获或冒泡
	// },false);

	//	event.eventPhase 1捕获阶段  2事件处理程序处于目标对象上  3冒泡阶段	
	document.body.addEventListener('click',function(event){
		console.log(event.type+'-'+this.id+'-'+(event.currentTarget==event.target)+'-'+event.eventPhase);
		console.log(event.target.id);
	},false);

	// document.body.addEventListener('click',function(event){
	// 	console.log('false',event.eventPhase);
	// },false);

	a.addEventListener('click',function(event){
		console.log(event.type+'-'+this.id+'-'+(event.currentTarget==event.target));
		event.preventDefault();//取消事件的默认行为（需要cancelable为true）
	},false);
}
//13.3.2 IE中的事件对象
//srcElement相当于上面的target(这个值就是点击谁进入的就一直是这个值)
//阻止默认事件：event.returnvalue=false类似event.preventDefault();
/*window.onload=function(){
	var div1=document.getElementById('div1');
	var div2=document.getElementById('div2');
	var a=document.getElementsByTagName('a')[0];
	
	div1.onclick=function(){//DOM0是没有event参数的，需要调用window.event
		console.log(window.event.srcElement==this);//直接用DOM0进入的事件this就是点击的本身this==div1
	}

	div2.attachEvent('onclick',function(event){
		console.log(event.srcElement==this);//这个this就是window
		event.cancelBubble=true;//相当于event.stopPropagation
	});
}*/
//13.3.3 跨浏览器事件对象
//增加EventUtil中的方法
// var EventUtil={
// 	//已经有的两个方法省略......
// 	getEvent:function(event){
// 		return event?event:window.event;
// 	},
// 	getTarget:function(event){
// 		return event.target||event.srcElement;
// 	},
// 	preventDefault:function(event){
// 		if(event.preventDefault){
// 			event.preventDefault();
// 		}else{
// 			event.returnValue=false;
// 		}
// 	},
// 	stopPropagation:function(event){
// 		if(event.stopPropagation){
// 			event.stopPropagation();
// 		}else{
// 			event.cancelBubble=true;
// 		}
// 	}
// };

//13.4 事件类型
//13.4.1 UI事件
//	load unload resize scroll事件,这些都是在window上触发的（但是load在其他的有些element也可以触发）
//	scroll事件需要知道是不是混杂还是标准，标准情况(CSS1Compat)下使用document.documentElement.scrollTop取得top值，混杂就是body.scrollTop
//13.4.2 焦点事件
//	focus focusin（这个可以冒泡） blur  focusout
//13.4.3 鼠标和滚轮事件
//除了mouseenter和mouseleave这两个事件外，其他事件所有浏览器都支持（书上是说支持的浏览器：IE、firefox9+和opera）
/*window.onload=function(){
	//使用以下代码可以检测浏览器是否支持以上DOM2事件（除dbclick、mouseenter、mouseleave）
	var isSupported=document.implementation.hasFeature('MouseEvents','2.0');
	var isSupported3=document.implementation.hasFeature('MouseEvent','3.0');
	var div1=document.getElementById('div1');
	var div2=document.getElementById('div2');
	var a=document.getElementsByTagName('a')[0];

	div1.onmouseenter=function(){
		console.log('mouseenter');
	};

	div1.onmouseover=function(event){
		console.log('mouseover',event.clientX,event.clientY);
	};

	div1.onmouseout=function(){
		console.log('mouseout');
	};

	document.body.onclick=function(event){
		console.log('client:'+event.clientX+'-'+event.clientY);
		console.log('page:'+event.pageX+'-'+event.pageY);
		console.log('screen:'+event.screenX+'-'+event.screenY);
		console.log('shiftKey:'+event.shiftKey+'-'+event.ctrlKey);
		console.log('button:'+event.button);
	};

	document.body.onmouseover=function(event){
		console.log('mouseover:'+event.relatedTarget.tagName);
	};

	document.body.onmousewheel=function(event){
		console.log('mousewheel:'+event.wheelDelta);
	};

	window.onscroll=function(event){//!!1.我既然忘了加on该死 2.我既然忘了scroll是在window上触发的，该死
			console.log(document.documentElement.scrollTop);
	};
}*/
//滚轮事件  mouseWheel
//客户区坐标位置：event.clientX event.clientY
//页面坐标位置：event.pageX event.pageY,IE8以及更早版本不支持页面坐标，不可以通过计算得到scrollTop(left)和client来获取
//屏幕坐标位置：event.screenX event.screenY
//修改键：event.shiftKey event.ctrlKey event.altKey event.metaKey ，如果按下了这几个键，那么这些值为true
//相关元素(除本身之外的一个元素)：event.relatedTarget，如果从div到body，那么mouseout的event.relatedTarget是body,mouseover就是div
//	IE8中没有这个属性，代替：mouseover event.fromElement ,mouseout event.toElement
//鼠标按钮：event.button 0做 1中 2右键，但是<=IE8,就比较复杂，这么理解：01357认为是0  4认为是1  26认为是2
//	检测是<=IE8还是其他的浏览器，可以通过document.implementation.hasFeature('MouseEvents','2.0'),true就是其他浏览器
//鼠标滚轮事件：element.mousewheel 中event.wheelDelta，如果scrollTop变大那么值为+120，scrollTop变小，值-120
//	opera9.5之前，event.wheelDelta取反，Firefox不支持该事件，支持DOMMouseScroll，里面是在event.detail中保存值，所以一般是-event.detail*40

//13.4.4 键盘事件
//keydown keypress(字符键时触发) keyup
//键码：event.keyCode(keyCode属性值跟小写字母或则数字的编码相同，有时候按一些键也会有一些不同)
//字符编码：event.charCode,这个只在keypress下才能触发，但是有的浏览器不一定具有event.charCode，如果没有的话就使用event.keyCode
//	得到这些编码之后，可以使用String.fromCharCode()将其转化为实际的字符
//DOM3级变化：存在跨浏览器，在有些浏览器中还未实现，不推荐使用
//textInput事件  event.data，这个属性值就是用户输入的字符（而非字符编码）

//13.4.5 复合事件 IE9+支持，其他的都不支持，所以不考虑

//13.4.6 变动事件
//1.删除节点document.DOMNodeRemoved  List.firstChild.DOMNodeRemovedFromDocument document.DOMSubtreeModified
//	event.target被删除的节点，event.relatedNode父节点引用
//2.插入节点  document.DOMNodeInserted document.DOMSubtreeModified这两个事件都是冒泡的，所以用document,item.DOMNodeInsertedIntoDocument
//	执行顺序  DOMNodeInserted DOMNodeInsertedIntoDocument DOMSubtreeModified

//13.4.7 HTML5事件
//1.contextmenu上下文菜单
//2.beforeunload事件,在unload之前加载这个事件，可以让用户做一些操作
//3.document.DOMContentLoaded事件（不加载图片、css、javscript文件等），这个事件在load之前处理
//4.document.readystatechange事件，主要注意的就是document.readystate等于interactive和complete这里两个，交互和完成的顺序其实不确定的
//	所以为了取得先机可以通过或判断来进行，然后在移除（支持浏览器：IE、opera和Firefox4+）
//5.window.pageshow(),里面有event.persisted,如果persisted是true表明已经被保存在了bfcache中
//	window.pagehide()，页面如果在卸载时候会被保存在bfcache中，那么persisted=true
//	上面两个方法都是用在前进后退中的，因为前进后退的时候保存在缓存中，不会加载
//	在chrome没有bfcache，这个只在opera和firefox,chrome后退的时候会重新激活load

/*window.onload=function(){
	var div=document.getElementById('myDiv');
	var menu=document.getElementById('myMenu');
	div.addEventListener('contextmenu',function(event){
		event.preventDefault();
		menu.style.left=event.clientX+'px';
		menu.style.top=event.clientY+'px';
		menu.style.visibility='visible';
	},false);

	document.onclick=function(event){
		// event.preventDefault();
		menu.style.visibility='hidden';
	};

	// window.onbeforeunload=function(event){
	// 	var message='你真的要离开这个页面吗？' ;
	// 	event.returnValue=message;
	// 	return message;
	// };

};

(function(){
	var showCount=0;

	window.onpageshow=function(event){
		console.log('pageshow:'+event.persisted);
		showCount+=1;
		// alert('pageshow:'+event.persisted+'-'+showCount);
	};

	window.onpagehide=function(event){
		console.log('pagehide:'+event.persisted);
		// alert('pagehide:'+event.persisted);
	};

})();

window.onpopstate=function(event){//chrome在不是本链接情况下不触发，如果用的是改变后面的参数的情况下就会触发（比如改变href后面的参数）
	console.log('popstate');
};
//6.window.onhashchange,参数变化时触发
var isSupported=('onhashchange' in window)&&(document.documentMode===undefined||document.documentMode>7);
if(isSupported){
	window.onhashchange=function(event){
		console.log('current hash:'+location.hash);
	};
}*/

//13.4.8 设备事件
//1.window.orientationchange，事件中可以访问event.orientation属性（0初始化竖直状态,90向左旋转,-90向右旋转）在IOS所有设备中都可以访问
//2.window.MozOrientation Firefox3.6支持
//3.**window.deviceorentation。这个事件告诉开发人员设备在空间中朝向哪儿，而不是如何移动。支持的浏览器：IOS4.2+中的safari、chrome和android版的webkit
//4.**window.devicemotion事件。这个事件是要告诉开发人员设备什么时候移动，而不是朝着什么方向移动。支持的浏览器：IOS4.2+中的safari、chrome和android版的webkit

//13.4.9 触摸和手势事件
//1.触摸事件
//	document.touchstart document.touchend(这里就木有event.touches了所以需要使用event.changeTouches) document.touchmove document.touchcancel
//	event.touches event.targetTouches event.changeTouches
//	Touch对象：clientX clientY identifier pageX pageY screenX screenY target
//2.手势事件（bubble）IOS2.0中的safari引入了手势事件
//	document.gesturestar document.gestureend document.gesturechange
//	event.rotation 角度  event.scale 距离
/*function handleTouchEvent(event){
	if(event.touches.length==1){
		var div=document.getElementById('myDiv');
		event.preventDefault();
		switch(event.type){
			case 'touchstart':
				div.innerHTML='Touch started('+event.touches[0].clientX+','+event.touches[0].clientY+')';
				break;
			case 'touchend':
				div.innerHTML='Touch end('+event.changedTouches[0].clientX+','+event.changedTouches[0].clientY+')';
				break;
			case 'touchmove':
				div.innerHTML='Touch moved('+event.changedTouches[0].clientX+','+event.changedTouches[0].clientY+')';
				break;
		}
	}
}

document.addEventListener('touchstart',handleTouchEvent,false);
document.addEventListener('touchmove',handleTouchEvent,false);
document.addEventListener('touchend',handleTouchEvent,false);*/

//如果是pc端了？
/*function handleTouchEvent(event){
		var div=document.body;
		event.preventDefault();
		switch(event.type){
			case 'mousedown':
				div.innerHTML='Touch started('+event.clientX+','+event.clientY+')';
				break;
			case 'mouseup':
				div.innerHTML='Touch end('+event.clientX+','+event.clientY+')';
				break;
			case 'mousemove':
				div.innerHTML='Touch moved('+event.clientX+','+event.clientY+')';
				break;
		}
}

document.addEventListener('mousedown',handleTouchEvent,false);
document.addEventListener('mousemove',handleTouchEvent,false);
document.addEventListener('mouseup',handleTouchEvent,false);*/

/*//我用我的小米手机是不能触发手势事件的,只能在>ios2.0时候触发
function handleGestureEvent(event){
	alert(1);
	var div=document.getElementById('myDiv');
	event.preventDefault();
	switch(event.type){
		case 'gesturestar':
			div.innerHTML='gesture started('+event.rotation+','+event.scale+')';
			break;
		case 'gestureend':
			div.innerHTML='gesture ended('+event.rotation+','+event.scale+')';
			break;
		case 'gesturechange':
			div.innerHTML='gesture changed('+event.rotation+','+event.scale+')';
			break;
	}
}
document.addEventListener('gesturestar',handleGestureEvent,false);
document.addEventListener('gestureend',handleGestureEvent,false);
document.addEventListener('gesturechange',handleGestureEvent,false);*/

// 13.5 内存和性能
// 首先，每个函数都是对象，会占用内存；内存越多，性能越差。
// 其次，必须事先指定所有事件处理程序而导致DOM访问次数，会延迟整个页面的交互就绪时间。
// 13.5.1 事件委托
/*window.onload=function(){
	var list=document.getElementById('myLinks');
	list.addEventListener('click',function(event){
		var target=event.target;
		switch(target.id){
			case 'goWhere':
				console.log('goWhere');
				break;
			case 'doWhere':
				console.log('doWhere');
				break;
			case 'nobb':
				console.log('nobb');
				break;
		}
	},false);
}*/
//13.5.2 移除事件处理程序
/*window.onload=function(){
	var div=document.getElementById('myDiv');
	var button=document.getElementById('myButton');
	button.onclick=function(event){
		div.innerHTML='我是点击按钮产生的';
		//这个导致的问题就是button被移除了，但是事件还存在
		//1.解决方案：这个时候如果是用的事件委托的话也是可以解决的
		//2.让button.onclick=null
		button.onclick=null;
	};
}*/

//13.6 模拟事件
//13.6.1 DOM中的事件模拟
// 1.鼠标模拟事件
//document.createEvent('MouseEvents').initMouseEvent(type,bubbles,cancelable,view,detail,screenX,screenY,clientX,clientY,ctrlKey,
//												     altKey,shiftKey,metaKey,button,relatedTarget)
//2.键盘模拟事件（Firefox不一样，要看可以看408页）
//DOM2级事件 没有就键盘事件作出规定
//这样的模拟事件虽然会触发键盘事件，但是不会向文本框中输入文本，这是由于无法精确模拟键盘事件所导致的
//3.模拟其他事件
//变动事件 document.createEvent('MutationEvents').initMutationEvent('DOMNodeInserted',true,false,someNode,'','','',0)
//HTML事件 document.createEvent('HTMLEvents').initEvent('focus',true,false)
//4.自定义DOM事件
/*window.onload=function(){
	var div=document.getElementById('myDiv'); 
	var button=document.getElementById('myButton');
	var text=document.getElementById('myText');
	button.onclick=function(event){
		console.log('哎呦，你点击了我!!');		
	};
	//鼠标模拟事件
	var event=document.createEvent('MouseEvents');
	event.initMouseEvent('click',true,true,document.defaultView,0,0,0,0,0,false,false,false,false,0,null);
	button.dispatchEvent(event);

	//键盘模拟事件
	document.onkeydown=function(event){
		console.log('我按下了键盘：'+event.charCode);
	}
	if(document.implementation.hasFeature('KeyboardEvents','3.0')){
		event=document.createEvent('KeyboardEvent');
		//初始化事件对象
		event.initKeyboardEvent('keydown',true,true,document.defaultView,65,0,'shift',0);
		// 触发事件
		text.dispatchEvent(event);
	}

	//自定义事件
	div.addEventListener('myevent',function(event){
		console.log('myevent:'+event.detail);
	},false);

	if(document.implementation.hasFeature('CustomEvent','3.0')){
		event=document.createEvent('CustomEvent');
		event.initCustomEvent('myevent',true,false,'my detail');
		div.dispatchEvent(event);
	}
}*/
//13.6.2 IE中的事件模拟（<=IE8）
// window.onload=function(){
// 	var button=document.getElementById('myButton');
// 	var text=document.getElementById('myText');
// 	button.onclick=function(){
// 		console.log('button click');
// 	}
// 	document.onkeypress=function(){
// 		console.log('keypress:'+window.event.keyCode);
// 	}
// 	//创建事件对象
// 	var event=document.createEventObject();
// 	//初始化事件对象
// 	//鼠标模拟事件
// 	event.screenX=0;
// 	event.screenY=0;
// 	event.clientX=0;
// 	event.clientY=0;
// 	event.ctrlKey=0;
// 	event.shiftKey=0;
// 	event.altKey=0;
// 	event.button=0;

// 	button.fireEvent('onclick',event);

// 	//键盘模拟事件
// 	event.shiftKey=0;
// 	event.ctrlKey=0;
// 	event.altKey=0;
// 	event.keyCode=65;
// 	text.fireEvent('onkeypress',event);
// }

