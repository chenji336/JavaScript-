*******如果不懂的话可以去看看大化设计模式中的   建造者模式，讲的很清晰
理解就是建立好一个你必须实现的几个东东的框架，然后里面的东东你自己去实现吧

// 27.设计模式之建造者模式.js
// 职责分离  取数和后面的回调都互不关心
// 比如：我建了两个房子都是一样的，但是里面怎么装修就给住房的人去决定了，可以各有不同
function getBeerById(id, callback) {
    // 使用ID来请求数据，然后返回数据.
    asyncRequest('GET', 'beer.uri?id=' + id, function (resp) {
        // callback调用 response
        callback(resp.responseText);
    });
}

var el = document.querySelector('#test');
el.addEventListener('click', getBeerByIdBridge, false);

function getBeerByIdBridge(e) {
    getBeerById(this.id, function (beer) {
        console.log('Requested Beer: ' + beer);
    });
}

根据建造者的定义，表相即是回调，也就是说获取数据以后如何显示和处理取决于回调函数，相应地回调函数在处理数据的时候不需要关注是如何获取数据的，
同样的例子也可以在jquery的ajax方法里看到，有很多回调函数（比如success, error回调等），主要目的就是职责分离。

同样再来一个jQuery的例子：

$('<div class= "foo"> bar </div>');
我们只需要传入要生成的HTML字符，而不需要关系具体的HTML对象是如何生产的。




