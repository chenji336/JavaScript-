// 24.JavaScript与DOM（下）.js
window.onload=function(){
	var p=document.getElementById('intro');
	var ul=document.getElementsByTagName('ul')[1];
	//通过闭包来实现点击每个li标签触发click事件,这个确实可以实现，但是这样会影响效率
	//一般都会使用委托来执行，委托如何执行可以看下面的代码
	/*var allList=document.getElementsByTagName('li');
	for(var i=0;i<allList.length;i++){
		allList[i].onclick=(function(x){
			return function(){
				alert(allList[x].firstChild.data);
			};
		})(i);
	}

	 document.getElementById('intro').style.color = '#FF0000';*/
	// 这里我们只是要了基本的CSS属性名称，唯一区别是CSS属性的名称如果带有-的话，就需要去除，比如用marginTop代替margin-top
	// innerHtml   document.createElement  document.createTextNode
	

	// Event事件
	// 注：正如我们上章所说的，DOM和JavaScript语言是2个单独的东西，浏览器事件是DOM API的一部分，而不是JavaScript的一部分。
	
	// 事件处理
	function addEvent(elem,type,fn){
		if(elem.addEventListener){
			elem.addEventListener(type,fn,false);
		}else if(elem.attachEvent){
			elem.attachEvent('on'+type,fn);
			return;//****
		}
	}

	function removeEvent(elem,type,fn){
		if(elem.removeEventListener){
			elem.removeEventListener(type,fn,false);
		}else if(elem.detachEvent){
			elem.detachEvent('on'+type,fn);
			return;
		}
	}

	p.onclick=function(){
		alert('p.onclick');
	}
	p.onclick=function(){
		alert('p.onclick1');
	}

	addEvent(p,'click',function(){
		alert('p1');
	});

	addEvent(p,'click',cj);

	function cj(e){
		alert('p2');
		// arguments.callee;
		removeEvent(p,'click',cj);
	}

	function myEventHandler(e) {
	    e = e || window.event;
	    // 防止默认行为
	    if (e.preventDefault) {
	        e.preventDefault();
	    } else {
	        e.returnValue = false;
	    }
	}

	document.getElementById('cj').onclick=myEventHandler;


	function myParagraphEventHandler(e) {

	    e = e || window.event;

	    // 停止向上冒泡
	    if (e.stopPropagation) {
	        // W3C实现  
	        e.stopPropagation();
	    } else {
	        // IE实现  
	        e.cancelBubble = true;
	    }

	}

	// 使用我们自定义的addEvent函数将myParagraphEventHandler绑定到click事件上：  
	addEvent(document.getElementsByTagName('p')[0], 'click', myParagraphEventHandler);

	addEvent(p,'click',function(){
		alert('p3');
	});
// 事件委托

// *****举例来说，如果你有一个很多行的大表格，在每个<tr>上绑定点击事件是个非常危险的想法，因为性能是个大问题。
// 流行的做法是使用事件委托。事件委托描述的是将事件绑定在容器元素上，然后通过判断点击的target子元素的类型来触发相应的事件。
// 事件委托依赖于事件冒泡，如果事件冒泡到table之前被禁用的话，那上面的代码就无法工作了。
	ul.onclick=function(e){
		e=e||window.event;
		var targetNode=e.target||e.srcElement;
		if(targetNode.nodeName.toLowerCase()==='li'){
			alert(targetNode.firstChild.data);
		}
	};

	addEvent(document.getElementById('divP'),'click', function(){
		alert(222);
	});
}

window.onunload=function(){
	alert(1);
}