// 5.DOM扩展.js

//1.选择符API
//**querySelector querySelectorAll 目前支持IE8+ Firefox3.5+ safari3.1+ chrome和opera10+
//querySelector()方法，查找出满足条件的第一个，类似于query，后面可以接id（#） element名 class(.) (可以被document documentFragment和element调用)
//querySelectorAll()方法，查找出所有的(可以被document documentFragment和element调用)
//matchesSelector()方法，现在很多不支持或则用的是变种（element可调用）
//2.元素遍历(用来处理空格的，防止文本节点)
//	支持Element traversal规范的有IE9+ Firefox3.5+ safari4+ chrome opera10+
//	childElementCount firstElementChild lastElementChild previousElementSibling nextElementSibling
//	这些解决了previousSibling这些会查找到文本的
//3.HTML5
//与类相关的扩展:
//	document.getElementsByClassName(直接写class名，不需要点) 或则element.也行。
//		支持版本IE9+ Firefox3+ safari3.1+ chrome opera9.5+，因为取回的是nodeList,所以会有同样的性能问题
//	div.classList.remove('disable')  .add(value) .toggle(value)  .contains(value) 支持的浏览器  Firefox3.6+和chrome
//焦点管理：document.activeElement可以获得焦点的element，element.hasFocus()判断是否获得焦点
//HTMLDocument的变化：
//	readyState属性：document.readyState='loading'正在加载  document.readyState='complete'文档已经加载完成
//	兼容模式：document.compatMode='CSS1Compat'标准模式   document.compatMode='BackCompat'混杂模式
//	head属性：document.head 实现浏览器 chrome和safari5
//字符集属性：document.charset document.defaultCharset
//自定义属性模式：添加非标准型的属性，但是前面需要添加data-，但是调用的时候不需要data-
//	比如自己定义了data-appid,那么获取的话就是element.dataset.appid
//	可以使用的浏览器：Firefox6+ chrome
//插入标记：
//	innerHTML属性，不会替换掉外面的element
//	outerHTML属性，会替换掉外面的element
//	insertAdjacentHTML(参数1，参数2)
//	内存与性能问题：当添加大量dom节点的时候，建议使用innerHTML,这样可以提高性能，一次性赋值给innerHTML
//	element.scrollIntoView()如果传入参数是true或则不传入参数，会让调用元素顶部与视口顶部持平，如果是false，则一般跟底部持平
//专有扩展：
//	children,类似于element.childNodes，不过不同是不取文本节点
//	contains，是否包含
//	插入文本：
//		element.innerText，这个在赋值的时候会先删除所有子节点，然后在赋值（opera不一样，用的是textContent）
//		element.outerText
//	滚动：（下面的这些方法支持的浏览器chrome safari）
//		element.scrollIntoViewIfNeeded(alignCenter)如果在ture则一直处在中部，如果不写或则false就是在视口不可见的情况下显示出来
//		element.scrollByLines(lineCount)将元素的内容滚动到指定的行高
//		element.scrollByPages(pageCount)将元素的内容滚动到指定的行高度