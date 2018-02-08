var i=0;
function getData(){
	i++;
	postMessage(i);
	// 不能调用window document parent对象，否则会报错
	// console.log(window);
	setTimeout("getData()",1000);
}
getData();