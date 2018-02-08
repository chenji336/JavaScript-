 // http://www.cnblogs.com/TomXu/archive/2011/12/30/2288372.html
 window.onload=function(){
 	var Calculator = function (eq) {
    //这里可以声明私有成员

    var eqCtl = document.getElementById(eq);

    return {
        // 暴露公开的成员
        add: function (x, y) {
        	var val = x + y;
        	eqCtl.innerHTML = val;
        	}
    	};
	};

	var calculator = new Calculator('cj');
	calculator.add(2, 2);
	// Calculator('cj').add(2, 2);
	// 
	// 
	var blogModule = (function () {
	    var my = {}, privateName = "博客园";

	    function privateAddTopic(data) {
	        // 这里是内部处理代码
	    }

	    my.Name = privateName;
	    my.AddTopic = function (data) {
	        privateAddTopic(data);
	    };

	    return my;
	} ());

	var blogModule = (function (my) {
	    my.AddPhoto = function () {
	       alert("i have addPhoto");
	    };
	    return my;
	} (blogModule||{})); //添加了{}是松耦合的扩展，如果需要紧耦合的扩展的话就需要固定死顺序，然后添加一个var来保存之前的方法

	alert(blogModule.Name);
	blogModule.AddPhoto();
	// var bm=new blogModule();
	// alert(bm.Name);
}

