// 36.设计模式之中介者模式.js
var mediator = (function () {
    // 订阅一个事件，并且提供一个事件触发以后的回调函数
    var subscribe = function (channel, fn) {
        if (!mediator.channels[channel]) mediator.channels[channel] = [];
        mediator.channels[channel].push({ context: this, callback: fn });
        return this;
    },

    // 广播事件
    publish = function (channel) {
        if (!mediator.channels[channel]) return false;
        var args = Array.prototype.slice.call(arguments, 1);
        for (var i = 0, l = mediator.channels[channel].length; i < l; i++) {
            var subscription = mediator.channels[channel][i];
            subscription.callback.apply(subscription.context, args);
        }
        return this;
    };

    return {
        channels: {},
        publish: publish,
        subscribe: subscribe,
        installTo: function (obj) {
            obj.subscribe = subscribe;
            obj.publish = publish;
        }
    };

} ());
// 调用代码，相对就简单了：

(function (Mediator) {

    function initialize() {

        // 默认值
        mediator.name = "dudu";

        // 订阅一个事件nameChange
        // 回调函数显示修改前后的信息
        mediator.subscribe('nameChange', function (arg) {
            console.log(this.name);
            this.name = arg;
            console.log(this.name);
        });
    }

    function updateName() {
        // 广播触发事件，参数为新数据
        mediator.publish('nameChange', 'tom'); // dudu, tom
    }

    initialize(); // 初始化
    updateName(); // 调用

})(mediator);