// 25.设计模式之单例模式.js

// var mySingleton = function () {

//     /* 这里声明私有变量和方法 */
//     var privateVariable = 'something private';
//     function showPrivate() {
//         console.log(privateVariable);
//     }

//     /* 公有变量和方法（可以访问私有变量和方法） */
//     return {
//         publicMethod: function () {
//             showPrivate();
//         },
//         publicVar: 'the public can see this!'
//     };
// };

// var single = mySingleton();
// single.publicMethod();  // 输出 'something private'
// console.log(single.publicVar); // 输出 'the public can see this!'

/*var singleton=(function(){
	var instatiate;
	var that=this;
	var _property='privateProperty';
	function _method(){
		//??我这里不太清楚为什么在chrome浏览器中调试的时候，如果下面我不添加这些私有变量则查看不到该变量
		console.log('你调用了私有方法哦！',_property);
	}

	function initInstance(){
		return {
			property:_property,
			method:_method
		};
	}

	return {
		getInstance:function(){
			if(!instatiate){
				instatiate=initInstance();
			}

			return instatiate;
		}
	};

})();

singleton.getInstance().method();
singleton.getInstance().method();*/

// 知道了单例如何实现了，但单例用在什么样的场景比较好呢？其实单例一般是用在系统间各种模式的通信协调上，下面的代码是一个单例的最佳实践：
// 也做为我以后的范例
/*var instanceTester=(function(){
	var instance;//实例容器

	function instanceTest(args){
		args=args||{};
		this.name=args.name;
		this.pointX=args.pointX||10;
		this.pointY=args.pointY||20;
	}

	var _static=function(){
		return {
			name:'instanceTester',
			getInstance:function(args){
				if(instance===undefined){
					instance=new instanceTest(args);
				}
				return instance;
			}
		};
	};

	return _static;
})();

var singleton=instanceTester().getInstance({pointX:5});
console.log(singleton.pointX,singleton.pointY);*/

//还有其他的四种方法可以实现单例模式，其中多数用了构造函数，几乎都用到了this，然后进行一些。。。
//以后有需要的话在进行查看
//我还是来实现前两种把，我觉得还挺方便的
//方法一：
/*function instanceTester(){
	if(typeof instanceTester.instance!=='undefined'){//instanceTester.instance!==undefined这样也可以，因为typeof相当于value化了
		return instanceTester.instance
	}

	this.name='111';
	this.age=12;
	instanceTester.instance=this;
}

var instance1=new instanceTester(),
	instance2=new instanceTester();
instance1.name='chenji';
console.log(instance1===instance2);
console.log(instance2.name);*/

//方法二：利用重构函数的的方法实现单例模式
function InstanceTester(){
	var instance=this;//不加这一句就报错，所以我觉得都是先让所有的指向自己，然后想办法在返回就行了
	this.name='111';
	this.age=12;
	InstanceTester=function(){
		return instance;
	};
}

var instance1=new InstanceTester(),
	instance2=new InstanceTester();
instance1.name='chenji';
console.log(instance1===instance2);
console.log(instance2.name);
