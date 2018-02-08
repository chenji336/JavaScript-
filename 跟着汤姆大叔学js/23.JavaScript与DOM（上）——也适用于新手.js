// 23.JavaScript与DOM（上）——也适用于新手.js
// DOM为web文档创建带有层级的结果，这些层级是通过node节点组成，这里有几种DOM node类型，最重要的是Element, Text, Document。
//  Element节点在页面里展示的是一个元素，所以如果你有段落元素(<p>)，你可以通过这个DOM节点来访问。
 // Text节点在页面里展示的所有文本相关的元素，所以如果你的段落有文本在里面的话，你可以直接通过DOM的Text节点来访问这个文本
 // Document节点代表是整个文档，它是DOM的根节点。
 
window.onload=function(){
	var p=document.getElementById('intro');
 	var ul=document.getElementsByTagName('ul');
 	var allLis=document.getElementsByTagName('li');
 	for(var i=0;i<allLis.length;i++){
 		alert(allLis[i].firstChild.data);
 	}
}

