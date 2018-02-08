		// 35.设计模式之迭代器模式.js
var iterator=(function(){
	var data=[1,2,3,4];
	var index=0;

	return {
		next:function(){
			if(this.hasNext()){
				index+=1;
				return data[index];
			}
		},
		hasNext:function(){
			if(index<data.length){
				return true;
			}else{
				return false;
			}
		},
		rewind:function(){
			index=0;
		},
		current:function(){
			return data[index];
		}
	};
})();

console.log(iterator.current());
console.log(iterator.next());
console.log(iterator.next());

// jQuery应用例子
// jQuery里一个非常有名的迭代器就是$.each方法，通过each我们可以传入额外的function，然后来对所有的item项进行迭代操作，例如：

$.each(['dudu', 'dudu', '酸奶小妹', '那个MM'], function (index, value) {
    console.log(index + ': ' + value);
});
//或者
$('li').each(function (index) {
    console.log(index + ': ' + $(this).text());
});