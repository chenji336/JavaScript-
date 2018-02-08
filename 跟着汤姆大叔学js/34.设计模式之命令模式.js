// 34.设计模式之命令模式.js
// 我的理解就是：烤羊肉串场景，把所有需要的东西都记录下来，然后在统一去实现，主要是记录撤销
// 要有服务员作为中间媒介
// 用于将一个请求封装成一个对象，从而使你可用不同的请求对客户进行参数化；对请求排队或者记录请求日志，以及执行可撤销的操作

$(function () {

    var CarManager = {

        // 请求信息
        requestInfo: function (model, id) {
            return 'The information for ' + model +
        ' with ID ' + id + ' is foobar';
        },

        // 购买汽车
        buyVehicle: function (model, id) {
            return 'You have successfully purchased Item '
        + id + ', a ' + model;
        },

        // 组织view
        arrangeViewing: function (model, id) {
            return 'You have successfully booked a viewing of '
        + model + ' ( ' + id + ' ) ';
        }
    };

//如果直接调用CarManager.buyVehicle 这样就紧耦合了，如果事情多了就会有一定的麻烦（其实这个例子看不出来的）
//根据这样的需求，我们可以这样啦实现CarManager.execute方法：
    CarManager.execute = function (command) {
    	return CarManager[command.request](command.model, command.carID);
	};

// 改造以后，调用就简单多了，如下调用都可以实现（当然有些异常细节还是需要再完善一下的）：
// 这个就相当于你进行点单，然后在让后台去操作。吃烧烤的、服务员、烤肉员

	CarManager.execute({ request: "arrangeViewing", model: 'Ferrari', carID: '145523' });
	CarManager.execute({ request: "requestInfo", model: 'Ford Mondeo', carID: '543434' });
	CarManager.execute({ request: "requestInfo", model: 'Ford Escort', carID: '543434' });
	CarManager.execute({ request: "buyVehicle", model: 'Ford Escort', carID: '543434' });
});


