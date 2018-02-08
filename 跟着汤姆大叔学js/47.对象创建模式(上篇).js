// 47.对象创建模式（上篇）.js
// 更简洁的方式
var MYAPP = MYAPP || {};

//定义通用方法
MYAPP.namespace = function (ns_string) {
    var parts = ns_string.split('.'),
        parent = MYAPP,
        i;

    // 默认如果第一个节点是MYAPP的话，就忽略掉，比如MYAPP.ModuleA
    if (parts[0] === "MYAPP") {
        parts = parts.slice(1);
    }

    for (i = 0; i < parts.length; i += 1) {
        // 如果属性不存在，就创建
        if (typeof parent[parts[i]] === "undefined") {
            parent[parts[i]] = {};
        }
        parent = parent[parts[i]];
    }
    return parent;
};
// 调用代码，非常简单：

// 通过namespace以后，可以将返回值赋给一个局部变量
var module2 = MYAPP.namespace('MYAPP.modules.module2');
console.log(module2 === MYAPP.modules.module2); // true

// 跳过MYAPP
MYAPP.namespace('modules.module51');

// 非常长的名字
MYAPP.namespace('once.upon.a.time.there.was.this.long.nested.property');

// 模式2：定义依赖
// 有时候你的一个模块或者函数可能要引用第三方的一些模块或者工具，这时候最好将这些依赖模块在刚开始的时候就定义好，以便以后可以很方便地替换掉。

var myFunction = function () {
    // 依赖模块
    var event = YAHOO.util.Event,
        dom = YAHOO.util.dom;

    // 其它函数后面的代码里使用局部变量event和dom
};