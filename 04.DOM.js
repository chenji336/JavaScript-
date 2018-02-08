// 4.DOM.js
// 
// 一.节点层次
// 1 node类型(下面的所有的都属于node)
// 关于previousSibling和previousElementSibling
// **（在有的浏览器，比如chrome）元素内的空白字符被视作文本，而文本被视作节点。比如两个div中间有空格，则previousSibling就是text

// 如果在调用appendChild()时传入了父节点的第一个节点，那么该节点会成为父节点的最后一个节点。因为同一个节点不可能同时出现在两个不同的位置
//操作节点的几个方法：
//插入：
//appendChild()插入到最后
//insertBefore(要插入的节点,比较的节点)，如果插入的话则是在比较节点的前一个节点，如果比较节点是null，则相当于appendChild()
//例子：
		// var newItem=document.createElement("LI")
		// var textnode=document.createTextNode("Water")
		// newItem.appendChild(textnode)

		// var list=document.getElementById("myList")
		// list.insertBefore(newItem,list.childNodes[0]);
//
//替换：replaceChild(新节点，要替换的节点)
//移除：removeChild(要移除的节点)，替换和删除节点还是在文档中，只是在文档中已经没有了属于他们的位置
//
//克隆：cloneNode(参数)，如果参数是true则是深复制，可以看到.length>=0，如果是false则是浅复制,.length肯定是0
//normalize处理文本节点

//2 document（当做整个页面看）类型  nodeType=9 nodeName='#document'
//document.documentElement（就是获取html这个element）   document.body  document.title
//网页请求有关：document.URL document.domain(域名) document.referrer(来源的页面的URL)
//查找元素：getElementById getElementsByTagName getElementsByName
//特殊集合：document.anchors带name的a标签  document.links带href特性的a标签 document.images  documents.forms
//文档写入：write() writeln()   open()  close()

//3 element类型 nodeType=1 nodeName（tagName）=元素标签名（如DIV）
//HTML元素： .id .title .className .lang .dir，这些都可以直接访问和修改
//取得特性：特性是不区分大小写的 getAttribute() setAttribute() removeAttribute()
//	取得class的特性只要.getAttribute('class')，不需要className，className是因为class是关键字，所以属性的时候不能直接点出来
//	自己定义的特性也可以查出来，但是点不出来（IE除外）
//	两类特殊的特性：style，通过属性查找出来是对象形式，而通过特性查找出来就是字符串形式
//					onclick(这类型的)，通过属性查找就是函数的形式，通过特性查找出来就是字符串形式
//属性 :.attributes nodeName nodeValue 这个可以查找出元素中所有的属性
//	(ie7之前的话需要加上element.attributes[i].specified，这个true就是本来有的或则是自己创建的，false的话就是其他的一些属性)
//创建元素：document.createElement(参数)，参数不区分大小写（<=IE7的有一些问题，详细的看书）
//元素的子节点：元素的子节点，比如最开始的div下面有三个子元素，如果子元素中有空格，那么.childNode.length在ie中是3，其他浏览器都是7（因为空格看成文本text）
//	所以在执行一些操作的时候，需要判断nodeType,如果是1就进行某些操作
//	也可以通过element.getElementsByTagName（参数）来取得子节点

//4 Text类型  nodeType=3 nodeName='#Text' nodeValue
//创建文本节点：document.createTextNode('chenji') 然后可以通过element.appendChild(newTextNode)
//规范化文本节点：如果自己创建的节点有两个TextNode那么可以使用normalize使其合并在一起，变成一个文本节点
//分割文本节点：element.firstChild.splitText(5)

//5 comment类型 nodeType=8 nodeName='#comment' 可以通过data或则nodeVaule取得值(继承Text类型，因此除了splitText方法外，其他方法都有)
//document.createComment创建comment类型

//6 CDATASection类型 nodeType=4 nodeName='#cdata-section'
//document.createCDataSection()进行创建
//<div>[CDATA[This is some content.]]</div>

//7 DocumentType类型 nodeType=10 nodeName='doctype' nodeValue=null
//document.doctype.name='html'(一般情况)

//8 DocumentFragment类型  nodeType=11 nodeName='#document-fragment' nodeValue=null
//文档片段的用图可以用来减少反复渲染，一次性把需要的东西放到document.createDocumentFragment中，然后在添加到需要的父类中就可以一次性渲染出来

//9 Attr类型 nodeType=2  nodeName=特性的名称 nodeValue=特性的值
//document.createAttribute('align')，其实直接用element.setAttribute(attr)更方便


//二.DOM操作技术
//1 动态脚本 document.createElement('script')
//	如果不用.src，想直接加入内容的话需要注意一下兼容性
//2 动态样式
//	需要注意的地方：必须把创建好的document.createElement('link')放到head中，不能放到body中document.getElementsByTagName('head')[0]
//	一样需要注意兼容性
//3 操作表格 下面显示用的比较多的
//	<table> insertRow(pos) deleteRow(pos)
//	<tbody> rows deleteRow(pos) insertRow(pos)
//	<tr> cells deleteCell(pos) insertCell(pos)
//4 nodeList 注意：每次添加的时候nodeList都会更新
//	所以每次用的话最好先把之前的值保存起来len=document.getElementsByTagName('div')，不要直接使用