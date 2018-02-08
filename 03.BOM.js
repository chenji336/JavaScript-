// 3.BOM.js

//一：window对象  global全局变量（js自带的，在浏览器中是window显示出来）
//1.全局作用域
//可删除，不可删除,定义的全局变量不可删除，window定义的变量可删除
//全局变量不可删除是因为用var定义的全局变量有一个[[Configurable]]属性，是设置为false了，所以不能被delete删除
//在IE9之前中delete都会报错
var age=10;
window.name='cj';
console.log(window.getOwnPropertyDescriptor);
delete window.age;
delete window.name;
console.log(window.age,window.name);//undefined 10

// var newValue=oldValue;//error:oldValue is not defined
var newValue=window.oldValue;//不会报错，这是一个属性查询，newValue是undefined

window.onload=function(){
	var div1=document.getElementById("div1");
};

//2.窗口位置
var leftPos=(typeof window.screenLeft=='number')?window.screenLeft:window.screenX;
var topPos=(typeof window.screenTop=='number')?window.screenTop:window.screenY;

//3.窗口大小
var pageWidth=window.innerWidth;
var pageHeight=window.innerHeight;
if(typeof pageWidth!='number'){
	if(doucment.compatMode=='CSS1Compat'){//标准模式
		pageWidth=document.doucmentElement.clientWidth;
		pageHeight=document.documentElement.clientHeight;
	}else{//混合模式
		pageWidth=document.body.clientWidth;
		pageHeight=document.body.clientHeight;
	}
}

// 4.弹出窗口屏蔽对象判断
var blocked=false;

try{
	var workWin=window.open('http://www.baidu.com','_blank');//如果是_self就不会被拦截
	if(workWin==null){
		blocked=true;
	}
}catch(ex){
	blocked=true;
}

if(blocked){
	alert('新打开页签被屏蔽了，请你在浏览器中添加信任');
}

//5.间歇调用和超时调用
var timeoutId=setTimeout(function(){
	console.log('我在1000毫秒后就要执行咯！');
},1000);
clearTimeout(timeoutId);
var timeInterval=setInterval(function(){
	console.log('我没过1000毫秒都要执行一次哦~');
},1000);
clearInterval(timeInterval);
//**我们在实际开发中，一般都不使用setInterval，因为每次使用都要取消他，而且有可能前面的间歇调用还没结束就又开始了下一个间歇调用
//我们一般用setTimeout来模拟间歇调用**

//二：location对象  主要操作地址栏
// 1.查询字符串参数
function getQueryStringArgs(){
	var qs=location.search.length>0?location.search.substring(1):'',
	args={},//保存数据对象
	items=qs!=''?qs.split('&'):[],
	item=null,
		name=null,
		value=null,
		i=0,
		len=items.length;

	for(i=0;i<len;i++){
		item=items[i];
		name=item[0];
		value=item[1];
		if(name.length){
			args[name]=value;
		}
	}

	return args;
}

//2.位置操作
//通过location 的hostname search pathname port pathname这些都会重新刷新页面
//通过location.hash不会刷新，因为会在后面添加#
//上面刷新页面都会在浏览器中添加一条记录，如果不想添加记录可以使用location.replace
//如果想让页面重新刷新可以使用location.reload()，如果添加参数true就是从服务器找，如果不添加就有可能在缓冲中找
//window.location location.href location.assign都是重新定向网页地址

//navigator对象
//1.检测插件

//检测插件（对IE无效）
function hasPlugin(name){
	name=name.toLowerCase();
	for(var i=0;i<navigator.plugins.length;i++){
		if(navigator.plugins[i].name.toLowerCase().indexOf(name)>-1){
			console.log('具有该插件：'+navigator.plugins[i].name);
			return true;
		}
	}
	console.log('没有该名字的插件：'+ name);
	return false;
}

hasPlugin('flash');
hasPlugin('QuickTime');

//检测IE中的插件就比较复杂，需要看看是不是能生成com，如果不能则报错（com的唯一标识符）
function hasIEPlugin(name){
	try{
		new ActiveXObject(name);
		// console.log('具有该插件：'+name)
		return true;
	}catch(ex){
		// console.log('不具有该插件：'+name)
		return false;
	}
}

alert(hasIEPlugin('ShockwaveFlash.ShockwaveFlash'));//true
alert(hasIEPlugin('QuickTime.QuickTime'));//false

//因为两种检测插件的方法差距比较大，最好使用外观模式针对每个插件分别创建检测函数
function hasFlash(){
	var result=hasPlugin('flash');
	if(!result){
		result=hasIEPlugin('ShockwaveFlash.ShockwaveFlash');
	}
	return result;
}

function hasQuickTime(){
	var result=hasPlugin('QuickTime');
	if(!result){
		result=hasIEPlugin('QuickTime.QuickTime');
	}
	return result;
}

//history对象
//go方法，参数为负数就是后台，是整数就是前进，还可以是string，可以找到最近包含string字符串的网页记录
//还有方法 back和forward（后退和前进）
//length方法 在chrome中进去第一个网页，history.lenght=1



