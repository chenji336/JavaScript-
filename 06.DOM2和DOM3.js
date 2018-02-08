// 6.DOM2和DOM3.js

//1.样式
//首先需要确定是否具有该功能：document.implementation.hasFeature('CSS','CSS);
//访问元素的样式：
//	float是关键字，所以不能直接点出来，一般都是style.cssFloat，在ie中是styleFloat
//	background-color需要style.backgroundColor来展示
//	混杂模式下style.width='20'可以自动转化为'20px'，但是标准模式下就会自动忽略，所以建议都使用'20px'
//	DOM样式属性和方法：
//		cssText:把style的样式以string显示，要是直接点的话就是对象，之前的那个也可以文本显示的是，getAttribute('style')
//		removeProperty('margin-left'):移除某个属性
//		style.getPropertyValue('margin-left')：获取某个属性
//	计算的样式：
//		style只能返回当前的，不能计算从别的样式表中获取的，比如别的.css文件
//		DOM2增强了document.defaultView,添加了getComputedStyle(p1,p2)，如果p2代表着伪元素字符串，如果没有一般用null
//		使用：document.defaultView.getComputedStyle(div1,null).color
//		IE不支持getComputedStyle，取而代之的是currentStyle
//		使用：div1.currentStyle.backgroundColor
//	操作样式表：
//		CSS规则：
//			document.styleSheets[1].cssRules[0].style.backgroundColor（IE中使用rules）这里取出来的是css中的，不是style中的
//		创建规则：
//			document.styleSheets[0].insertRule('body{background-color:red}',0)
//			对于IE的话使用ddocument.styleSheets[0].addRule('body','backgound-color:red',0)
//		删除规则：
//			document.styleSheets[0].deleteRule(0)
//			IE:document.styleSheets[0].removeRule(0)
//	元素大小：
//		偏移量：offsetLeft offsetTop offsetWidth offsetHeight  border边框为界限，border大小计算在内
//			如果要算一个元素的offsetLeft，需要进行递归计算element.offsetParent.offsetLeft
//		客户区大小：clientWidth clientHeight 这个不能算border的大小
//		滚动大小：scrollWidth scrollHeight scrollTop scrollLeft（top可以通过设置大小来控制滚动条的位置，要用200，不要用'200px'） 
//	确定元素大小：getBoundingClientRect()
//2.遍历：首先需要通过document.implementation.hasFeature('Traversal','2.0')、
//			(typeof document.createNodeIterator=='function')、
//			(typeof document.createTreeWalker=='function')
//	NodeIterator:document.createNodeIterator(div1,NodeFilter.SHOW_ELEMENT,null,false)，如果需要添加什么过滤条件，只要把null改成过滤的条件就可以
//		具体操作可以查看330页
//	TreeWalker:相比较NodeIterator更加的灵活，多了很多东东，但是使用方式不变
//3.范围：这一章节没怎么看，如果后续用到在过来进行查看
		