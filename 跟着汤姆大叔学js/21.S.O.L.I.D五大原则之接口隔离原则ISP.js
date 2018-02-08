// 21.S.O.L.I.D五大原则之接口隔离原则ISP.js
// 很棒的讲解
// http://blog.csdn.net/m1654399928/article/details/9998203

向汤姆大叔请教个问题
a href="javascript:void(0)" onclick="fun()"
a href="#" onclick="fun()"
a href="javascript:;" onclick="fun()"
这种写法的区别是什么啊？[/quote]
javascript:;和javascript:void(0)是几乎差不多的，一个是执行空语句，另外一个 void(0)返回undefined。两个都不建议用。
而带有#的会导致页面跳到顶部。

//防止重置到顶部
一般都是建议这么用：
<a href="#" onclick="fun(); return false;">Link</a>
因为return false可以防止href里的#继续执行。

或者这样：
<a href="###" onclick="fun()">Link</a>

//百度百科的解释
// http://baike.baidu.com/link?url=iiFYYac0lvF655DicG4XDZVy_LPgspaX1FcrzLXtvZuzz-r9z959fG_0Xl6dkzzHnTgZXYG9lGCDjG_kqiz5o6H0YmRNs0ndUCObecTYSRbw6JNxOJdCIOziAy7wuY9dNuq3LYIwkZF8CHPe4jEqoK
// 胖接口，不要把多个方法放在一个接口去实现，而应该把多个方法拆分成类需要用的最小接口中去
// ！！！我的误区：我把接口和方法搞的有点乱，开始觉得一个接口就是一个方法
// 	其实一个接口中可以包含多个方法，所以