// 46.代码复用模式（推荐篇）.js
// 下面几种模式我可能没有很好的领会，总感觉不是最简便，如果以后领会了，在来重写一遍
// 1.原型继承
// 2.复制所有属性进行继承
// 	 深复制
/* 深拷贝 */
function extendDeep(parent, child) {
    var i,
        toStr = Object.prototype.toString,
        astr = "[object Array]";

    child = child || {};

    for (i in parent) {
        if (parent.hasOwnProperty(i)) {
            if (typeof parent[i] === 'object') {
                child[i] = (toStr.call(parent[i]) === astr) ? [] : {};
                extendDeep(parent[i], child[i]);
            } else {
                child[i] = parent[i];
            }
        }
    }
    return child;
}

var dad = {
    counts: [1, 2, 3],
    reads: { paper: true }
};
var kid = extendDeep(dad);

kid.counts.push(4);
console.log(kid.counts.toString()); // "1,2,3,4"
console.log(dad.counts.toString()); // "1,2,3"

console.log(dad.reads === kid.reads); // false
kid.reads.paper = false;
// 3.混合（mix-in）
// 4.借用方法