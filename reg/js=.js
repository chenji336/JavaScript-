// 正向前瞻

// 格式化数字为12,234,123.123
function prospect1() {
	var num = 12345678.987
	var numStr = num.toString()
	console.log(numStr.match(/\d(?=(\d{3})+\.)/g)); // [2,5]
	var numNew = numStr.replace(/\d(?=(\d{3})+\.)/g, function ($0, $1) {
		console.log('arguments:', arguments)
		// 获取到两个一个是1（因为后面有3的倍数6个），还有就是4（后面有3的倍数两个）
		// $0代表最终获取到的 $1代表第一个括号中的
		console.log('$0:', $0)
		console.log('$1:', $1)
		return $0 + ',';
	})
	console.log(numNew)
}
// prospect1();

// 获取前面的数字
function prospect2() {
	const test = "<span class=\"read-count\">阅读数：641</span>";
	const pattern = /\d+(?=<\/span>)/g;
	const mc = test.match(pattern);
	console.log(pattern.exec(test)); // 会出现index以及input（input内容就是test内容）
	console.log('mc:', mc); // ['641']
	
}
// prospect2();

// 正后瞻(匹配后面的数据)
function backLook() {
	const test = "<span class=\"read-count\">阅读数：641</span>";
	const pattern = /(?<=<span class=\"read-count\">阅读数：)\d+/g;
	const mc = test.match(pattern);
	console.log('mc:', mc); // ['641']
}
// backLook();

// 前瞻+后瞻
function preBack() {
	const test = "<span class=\"read-count\">阅读数：641</span>";
	const pattern = /(?<=<span class=\"read-count\">阅读数：).+(?=<\/span>)/g;
	const mc = test.match(pattern);
	console.log('mc:', mc); // ['641']
}
// preBack();


// 负前瞻（跟正前瞻相反）
function negativePrespect() {
	const str = 'google';
	const pattern = /goo(?!ddd)/g; // /goo(?=gle)/g
	console.log(str.match(pattern));
}
// negativePrespect();

// 负后瞻（跟正后瞻相反）
function negativeBackLook() {
	const str = 'google';
	const pattern = /(?<!god)gle/g; // //(?<=goo)gle/g
	console.log(str.match(pattern));
	// console.log(pattern.test(str)); // 返回true或则false
}
negativeBackLook();