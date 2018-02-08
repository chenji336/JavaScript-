XMLHttpRequest简称xhr

21.1 XMLHttpRequest对象
21.1.1 XHR的用法  
var xhr=new XMLHttpRequest();
如果IE<=7的话就需要使用activeX（new ActiveXObject('MSXML2.XMLHttp.6.0')） 'MSXML2.XMLHttp.3.0'  'MSXML2.XMLHttp'
xhr.open(requestMode,url,async) 比如  xhr.open('get','example.txt',false)
xhr.send(data)虽然可以不传入参数，但是有的浏览器会报错，所以没有的话默认传入null
如果xhr同步的话：
	在send后面进行判断，是否传送成功，通过status来进行，如果status在>=200 <300 =304 都认为成功，可以查看xhr.responseText
如果xhr异步的话：
	在open前面就要开始调用xhr.onreadystatechange,里面有一个xhr.readyState属性，为4的话在进行上面同步相同的判断
	注意：在onreadystatechange事件中不调用this是因为调用this在某些情况下会出现问题
21.1.2 HTTP的头部信息
具体信息可以查看pdf，注意一点就是
	在open之后send之前可以使用xhr.setRequestHeader(key,value)
	一般这个用来进行ajax模仿form传送时传的content-type
21.1.3 GET请求
URL末尾的字符串需要进行正确的编码
就是在URL？后面的，可以自己编写一个函数，调用encodeURIComponet(key)+'='+encodeURIComponet(value)
21.1.4 POST请求
post的时候需要注意的就是模仿submit和序列化（当然没有强制要求序列化）
xhr.setRequestHeader('Content-Type':'application/x-www-form-urlencoded')
xhr.send(serialize(form));//serialize是一个表单脚本中的一个函数

21.2 XMLHttpRequest2级
21.2.1 FormData
这个对象很方便，相当于替换了
xhr.setRequestHeader('Content-Type':'application/x-www-form-urlencoded')
xhr.send(serialize(form));//serialize是一个表单脚本中的一个函数
可以用这个来代替
xhr.send(new FormData(form))
21.2.2 超时处理
xhr.timeout=1000 //设置为1秒  只有ie8支持
xhr.ontimeout=function(){}
21.2.3 overrideMimeType()
作用就是重写mime类型，比如服务器的MIME是'text/plain',这样返回的responseXML就是null，就算有xml的数据
因此可以在send之前open之后调用xhr.overrideMimeType('text/xml')，就可以默认替换服务器的（这种说法不一定对啊），然后返回的responseXML就不是null

21.3 进度事件
进度本来是有两个事件的，但是这里我们注意两个
21.3.1 load事件
xhr.onload这个其实就是简化了xhr.onreadystatechange,我们不需要判断xhr.readyState属性是不是=4,因为load肯定就是加载完成了之后
21.3.2 progress事件
xhr.onprogress事件放在open之前
event里面有额外的三个属性可以用来进行进度条的查看
event.lengthComputable表示进度是否可用
event.position表示已经接受的字节
event.totalsize表示根据Content-Length响应头部确定的预期字节数

21.4 跨域资源共享（CORS  cross-original-resource-share）
思路：浏览器在头中包含origin,然后服务器接受的时候看看是不是自己需要的，然后进行返回，浏览器接受返回然后在判断是否让js进行处理
21.4.1 IE对CORS的实现
iE8通过XDR（XDomainRequest）来进行实现
XDR.open(requestStype,url)之后两个参数，默认是异步
21.4.2 其他浏览器对CORS的实现
直接把所有信息都包含在了URL中
但是限制了几个地方：
	不能使用setRequestHeader()设置自定义头部
	不能发送和接受cookie
	调用getAllResponseHeaders()总是返回空
21.4.3 preflighted request 
这个自己看书，我感觉不是特别重要
21.4.4 带凭证请求
withCredentials
默认情况下跨域不提供凭证（cookie、HTTP认证以及客户端SSL证明等）。设置withCredentials=true可以发送了
如果设置了，然后服务器没有带有这些凭证，然后返回给浏览器，浏览器接受之后就不让javascript来执行操作
浏览器如果具有的话，会返回一个头：Access-control-Allow-Credentials:true
（回去的时候需要试一下从网页直接直接进入，不登录会怎样）
21.4.5 跨浏览器的CORS
其实就是检查这个浏览器是否支持跨域
其他浏览器：'withCredentials' in (new XMLHttpRequest()) true就是支持
IE：typeof XDomainRequest!='undefined'

21.4 其他跨域技术
21.4.1 图像Ping
通过src来访问图片，来知道是否通了，这个方法缺点：只能进行简单的单点通信
21.4.2 JSONP
通过服务器和js端的配合，通过加载js然后运行回调函数可以或则data，但是不是双向通信，也是单向的
-------------下面是进行实时通信的
21.4.3 Comet 
分为长轮询和流
长轮询就是浏览器发送请求到服务器，然后服务器接受了会保持一段时间，等有了新数据就会返回数据给浏览器，然后关闭。之后在这样循环
http就是浏览器和服务器进行长连接
21.4.4 服务器发送事件SSE
就是把实现Comet进行了封装，是一个api，用起来更方便
21.4.5 Web Sockets
不同于http协议，需要自己定义一个，因此发送给服务器的数据量更少，可以进行双向通信
需要有自己的web sockets服务器
21.4.6 SSE和Web Sockets
SSE适合服务器向浏览器推送，比如：查看比赛分数
Web Sockets适合双向通信，比如聊天
其实SSE也可以进行双向通信，使用XHR