// 8.表单脚本.js
// 14.1表单基础知识
// 14.1.1提交表单 
// 	submit() type='submit' 图像的话type='image'
// 	在直接调用submit()方法而不是通过触发按钮来提交的话，不会触发submit()事件，因此要记得在提交表单的时候需要验证一下表单数据
// 	submit()有时候提交很慢，用户比较急会重复提交，所以需要操作下，建议直接disabled=false
// 14.1.2重置表单
// 	reset() type='reset'
// 	通过代码来重置表单会触发reset()事件
// 14.1.3表单字段
// 	可以通过form.elements[name值]，如果是直接的form.elements[index]那么就是input的
//	1.共有的表单字段属性：disabled form name readOnly tabIndex type value 
//		除了form属性外，可以通过javascript修改其他任何属性
//		避免多次提交需要在submit事件中进行，因为不同浏览器之间存在’时差‘,有时候click事件会在submit之前执行，这样禁止之后button就不能点击了
//	2.共有的表单字段方法 focus() blur()
//	3.共有的表单字段事件 focus() blur() change()

//14.2 文本框脚本
//type='text' 和标签textarea
//text属性 size显示的字符数   maxlength是最大输入的字符数 value来初始化
//<textarea>写入初始化之</textarea>，没有maxlength 但是有rows cols两个属性来进行行高，一样可以点出value，不要使用dom方法，setAttribute
//14.2.1 选择文本
//	1.选择(select)事件 调用这个方法会触发select事件，而且会选中文本框所有字段
//	2.取得选择的文本	
//	    上面通过select()方法取得之后不知道取得具体的内容和坐标，可以通过textbox.value.substring(textbox.selectionStar,textbox.selectionEnd)来获取
//		IE使用if(document.selection){return document.selection.createRange().text}
//	3.选择部分文本	textbox.setSelectionRange(indexStar,indexEnd)
//		<=IE8 var range=textbox.createTextRange();range.collapse(true);range.moveStart('character',startIndex);range.moveEnd('character',endIndex);range.select();
//		最后都需要使用textbox.focus()，这个来进行焦点聚焦
//14.2.2 过滤输入
//	1.屏蔽字符
//	2.操作剪贴板 beforecopy() copy() beforecut() cut() beforepaste() paste()
//14.2.3 自动切换焦点
//14.2.4 HTML5约束验证API
//	使用：即使javscript被禁用了，只要有支持ＨＴＭＬ５浏览器还是可以进行验证的，Firefox4+ Safari5+ Chrome Opera10+
//	1.必填字段 required element.required
//		可以通过：'required' in document.createElement('input')来验证是否有required
//	2.其他输入类型  input type增加了url和email，如果type不填或则错误默认是text
//	3.数值范围 type可选 number range datetime datetime-local date month  week time
//		input  type='number' min='0' max='100' step='5' element.stepUp(可选参数，不填就是默认的step) .stepDown() 
//	4.输入模式 在后面添加属性 pattern='\d+'(正则表达式)
//		是否支持 'pattern' in document.createElement('input')
//	5.检测有效性 element.checkValidity()比较简单
//		element.validity这个属性更全面（不匹配则返回true），包含如下：
//		customerError patternMismatch rangeOverflow rangeUnderflow stepMismatch tooLong  typeMismatch valid  valueMissing(具体意思看430页)
//	6.禁用验证 novalidate，如果想button不验证表单可以使用formnovalidate

//14.3 选择框脚本
//<select><option value='value1'>text1</option></select>
//1.选择选项 
//	通过selectElement.options[selectElement.selectedindex]可以访问选中的option
//	如果是多选或则单选，都可以通过循环各个option.selected来进行挑选
//2.添加选项 三种方法：document.createElement('option')之后可以使用add(newOption,undefined)或则appendChild,还可以使用new Option('text','value')
//3.删除选项  removeChild(newOption) remove(index) 让newOption=null
//4.移除和重排选项  selectBox2.appendChild(selectBox1.options[1])就是把移除和重排
//	还可以使用selectBox.insertBefore(node1,node2)来进行重排

//14.4 表单序列化(不进行总结，自己看书)

//14.5 富文本编辑 （textare应该叫做超文本，富文本是可以改变字体颜色等的）
//	嵌入一个iframe的html页面，然后让其属性designMode='on'就可以开启
//1.使用contenteditable属性 js中的属性是element.contentEditable true打开 false关闭 inherit继承
//2.操作富文本 frames[id].document.execCommand(属性，false,属性或则null)  frames[id]类似另一个window啥的 
//3.富文本选区 看下面代码讲解
//4.富文本和表单   iframe并不是表单控件，因此提交的时候表单不会默认的提交富文本，所以我们需要把富文本的body.innerHTML内容放在表单的一个默认字段中用于传送
window.onload=function(){
	var form=document.getElementById('myForm');
	var colorFields=form.elements['color'];
	var firstColorField=colorFields[0];
	var firstFormField=form.elements[0];
	console.log(firstFormField===firstColorField);


	function sleep(ms){
		ms+=new Date().getTime();
		while(new Date()<ms){

		}
	}

	form.onsubmit=function(event){
		form.elements['submitBtn'].disabled=true;
		console.log(form.elements['submitBtn'].disabled);
		sleep(3000);
		console.log('end');
	}

	var btnFocus=document.getElementById('btnFocus');
	btnFocus.onclick=function(){
		form.elements['text2'].focus();
	};

	btnBlur.onclick=function(){
		form.elements['text2'].blur();
	};

	//文本text1只能输入数字。如果不是则红色提示
	var text1=form.elements['text1'];
	text1.addEventListener('focus',function(event){
		var style=event.target.style;
		if(style.backgroundColor!=='red'){
			style.backgroundColor='yellow';
		}
	},false);

	text1.addEventListener('blur',function(event){
		var value=event.target.value;
		var style=event.target.style;
		if(/[^\d]/.test(value)){
			style.backgroundColor='red';
		}else{
			style.backgroundColor='';
		}
	},false);

	text1.addEventListener('change',function(event){//chrome不是每次改变都改变，其实可以使用keyup
		var value=event.target.value;
		var style=event.target.style;
		if(/[^\d]/.test(value)){
			style.backgroundColor='red';
		}else{
			style.backgroundColor='';
		}
	},false);

	//屏蔽字符
	//text2只能输入数字，如果不是则按下去无反应
	var text2=form.elements['text2'];
	text2.addEventListener('keypress',function(event){
		var charCode=String.fromCharCode(event.charCode);
		//firefox和safari会对一些上键、下键、退格键和删除键触发keypress,所以需要检查，event.charCode>9
		//需要ctrl进行复制黏贴，所以!event.ctrlKey
		if(/[^\d]/.test(charCode)&&event.charCode>9&&!event.ctrlKey){
			event.preventDefault();
		}
	},false);

	//操作剪贴板
	//兼容性
	function getClipboardText(event){
		var clipboardData=event.clipboardData||window.clipboardData;
		return clipboardData.getData('text');
	}
	function setClipboardText(event,value){
		if(event.clipboardData){
			event.clipboardData.setData('text/plain',value);
		}else if(window.clipboardData){
			window.clipboardData.setData('text',value);
		}
	}
	text2.addEventListener('paste',function(event){
		var text=getClipboardText(event);
		if(/[^\d]/.test(text)){
			event.preventDefault();
		}
	},false);

	//自动切换焦点
	var textbox1=form.elements['textArea'][0];
	var textbox2=form.elements['textArea'][1];
	var textbox3=form.elements['textArea'][2];

	function tabForward(event){
		var textboxs=form.elements['textArea'];
		if(event.target.value.length===event.target.maxLength){
			for(var i=0,len=textboxs.length;i<len;i++){
				if(event.target===textboxs[i]){
					if(textboxs[i+1]){
						textboxs[i+1].focus();
						return;
					}
				}
			}
		}
		
	}

	textbox1.addEventListener('keyup',function(event){
		tabForward(event);
	},false);
	textbox2.addEventListener('keyup',function(event){
		tabForward(event);
	},false);
	textbox2.addEventListener('keyup',function(event){
		tabForward(event);
	},false);

	var select=document.getElementById('selLocation');
	//三种添加的方法
	//1.使用传统方式
	var newOption=document.createElement('option');
	newOption.text='text6';
	newOption.value='value6';
	select.appendChild(newOption);
	//2.使用add，第二个参数出入undefined，兼容浏览器
	var newOption2=document.createElement('option');
	newOption2.text='text7';
	newOption2.value='value7';
	select.add(newOption2,undefined);
	// 3.使用构造函数的方法
	var newOption3=new Option('new text','new value');//IE<=8有bug，其他浏览器正常
	select.appendChild(newOption3);

	//富文本编辑
	frames['richEdit'].document.designMode='on';
	var richEdit=document.getElementById('richedit');
	//richEdit.contentEditable=false;

	frames['richEdit'].document.execCommand('bold',false,null);
	frames['richEdit'].document.execCommand('italic',false,null);

	//浏览器是否具有这个能力？是否已经渲染了这个能力？获取frames[id].document.execCommand里面的第三个参数
	frames['richEdit'].document.queryCommandEnabled('bold');
	frames['richEdit'].document.queryCommandState('bold');
	frames['richEdit'].document.queryCommandValue('bold');

	var btnRich=document.getElementById('richBtn');
	btnRich.onclick=function(){
		var selection=frames['richEdit'].getSelection();
		var selectionText=selection.toString();
		var range=selection.getRangeAt(0);

		var span=frames['richEdit'].document.createElement('span');
		span.style.backgroundColor='yellow';
		range.surroundContents(span);

		//也可以用下面的代替掉
		frames['richEdit'].document.execCommand('BackColor',false,'red');

		//如果<=IE8可以使用下面方法
		var range=frames['richEdit'].document.selection.createRange();
		var selectedText=range.text;
		range.pasteHTML("<span style='background-color:yellow'>"+range.htmlText+"</span>");
	};

	//表单和富文本
	form.onsubmit=function(event){
		event.target.elements['comments'].vlaue=frames['richEdit'].document.body.innerHTML;
		//对于contenteditable也是一样的
		event.target.elements['comments'].vlaue=document.getElementById('richEdit').innerHTML;
	}
}