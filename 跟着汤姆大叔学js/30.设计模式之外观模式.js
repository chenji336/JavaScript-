// 30.设计模式之外观模式.js

// 外观模式（Facade）为子系统中的一组接口提供了一个一致的界面，此模块定义了一个高层接口，这个接口值得这一子系统更加容易使用。
// 你可以理解jquery里面很多跨浏览器的方法都是用了外观模式
// 下面这个是未经过优化的外观模式
var addMyEvent = function (el, ev, fn) {
    if (el.addEventListener) {
        el.addEventListener(ev, fn, false);
    } else if (el.attachEvent) {
        el.attachEvent('on' + ev, fn);
    } else {
        el['on' + ev] = fn;
    }
}; 

//经过优化的是这样的
// 基本原理如上，可以将每次调用接口都判断一次，改成只需要在接口初始化的时候判断一次。
var addMyEvent = (function (el, ev, fn) {
    if (el.addEventListener) {
        return function(el, ev, fn){
            el.addEventListener(ev, fn, false)
        };
    } else if (el.attachEvent) {
        return function(el,ev,fn){
            el.attachEvent('on' + ev, fn);
        };
    } else {
       return function(el,ev,fn){
            el['on' + ev] = fn;
        }
    }
})();

//总结：外观模式应该就是用一个接口去封装其他的一些接口，让接口简洁化
//关于优化，第一次执行后续不需要在执行，返回function

