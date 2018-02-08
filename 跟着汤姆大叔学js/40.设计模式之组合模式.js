// 40.设计模式之组合模式.js（菜单中就有菜品项，菜品项有菜品。。。。都能打印出来）
// 组合模式：将对象组合成**树形结构**以表示“部分-整体”的层次结构。组合模式使得用户对单个对象和组合对象的使用一致性
// 为啥要用apply
// 继承那个函数的功能哦，只用prototype的话，可能会造成传参有问题。
// 比如：
function inherit(C, P) {
	C.prototype = new P();
}

// 父构造函数
function Parent(name) {
	this.name = name || 'Adam';
}
// 给原型添加say功能
Parent.prototype.say = function () {
	return this.name;
};
// Child构造函数为空
function Child(name) {
}

// 执行继承
inherit(Child, Parent);

var kid = new Child();
console.log(kid.say()); // "Adam"

var kiddo = new Child();
kiddo.name = "Patrick";
console.log(kiddo.say()); // "Patrick"

// 缺点:不能让参数传进给Child构造函数
var s = new Child('Seth');
console.log(s.say()); // "Adam"
// 这种模式的缺点是Child不能传进参数，基本上也就废了。为此，应该修改成这个：
// Child构造函数
function Child(name) {
	Parent.apply(this, arguments);//如果用Parent(name)之后this.name中的this就是window
}
/*var s = new Child('Seth');
console.log(s.say()); // "Adam"

/*
// 第一步，先实现我们的“抽象类”函数MenuComponent：

var MenuComponent = function () {
};
MenuComponent.prototype.getName = function () {
    throw new Error("该方法必须重写!");
};
MenuComponent.prototype.getDescription = function () {
    throw new Error("该方法必须重写!");
};
MenuComponent.prototype.getPrice = function () {
    throw new Error("该方法必须重写!");
};
MenuComponent.prototype.isVegetarian = function () {
    throw new Error("该方法必须重写!");
};
MenuComponent.prototype.print = function () {
    throw new Error("该方法必须重写!");
};
MenuComponent.prototype.add = function () {
    throw new Error("该方法必须重写!");
};
MenuComponent.prototype.remove = function () {
    throw new Error("该方法必须重写!");
};
MenuComponent.prototype.getChild = function () {
    throw new Error("该方法必须重写!");
};
// 该函数提供了2种类型的方法，一种是获取信息的，比如价格，名称等，另外一种是通用操作方法，比如打印、添加、删除、获取子菜单。

// 第二步，创建基本的菜品项：

var MenuItem = function (sName, sDescription, bVegetarian, nPrice) {
    MenuComponent.apply(this);//因为这里没有传入参数，其实是可以不需要调用apply的
    this.sName = sName;
    this.sDescription = sDescription;
    this.bVegetarian = bVegetarian;
    this.nPrice = nPrice;
};
MenuItem.prototype = new MenuComponent();
MenuItem.prototype.getName = function () {
    return this.sName;
};
MenuItem.prototype.getDescription = function () {
    return this.sDescription;
};
MenuItem.prototype.getPrice = function () {
    return this.nPrice;
};
MenuItem.prototype.isVegetarian = function () {
    return this.bVegetarian;
};
MenuItem.prototype.print = function () {
    console.log(this.getName() + ": " + this.getDescription() + ", " + this.getPrice() + "euros");
};
// 由代码可以看出，我们只重新了原型的4个获取信息的方法和print方法，没有重载其它3个操作方法，因为基本菜品不包含添加、删除、获取子菜品的方式。

// 第三步，创建菜品：

var Menu = function (sName, sDescription) {
    MenuComponent.apply(this);
    this.aMenuComponents = [];
    this.sName = sName;
    this.sDescription = sDescription;
    this.createIterator = function () {
        throw new Error("This method must be overwritten!");
    };
};
Menu.prototype = new MenuComponent();//!!相当于完成这个对象中的方法了，类似于继承
Menu.prototype.add = function (oMenuComponent) {
    // 添加子菜品
    this.aMenuComponents.push(oMenuComponent);
};
Menu.prototype.remove = function (oMenuComponent) {
    // 删除子菜品
    var aMenuItems = [];
    var nMenuItem = 0;
    var nLenMenuItems = this.aMenuComponents.length;
    var oItem = null;

    for (; nMenuItem < nLenMenuItems; ) {
        oItem = this.aMenuComponents[nMenuItem];
        if (oItem !== oMenuComponent) {
            aMenuItems.push(oItem);
        }
        nMenuItem = nMenuItem + 1;
    }
    this.aMenuComponents = aMenuItems;
};
Menu.prototype.getChild = function (nIndex) {
    //获取指定的子菜品
    return this.aMenuComponents[nIndex];
};
Menu.prototype.getName = function () {
    return this.sName;
};
Menu.prototype.getDescription = function () {
    return this.sDescription;
};
Menu.prototype.print = function () {
    // 打印当前菜品以及所有的子菜品
    console.log(this.getName() + ": " + this.getDescription());
    console.log("--------------------------------------------");

    var nMenuComponent = 0;
    var nLenMenuComponents = this.aMenuComponents.length;
    var oMenuComponent = null;

    for (; nMenuComponent < nLenMenuComponents; ) {
        oMenuComponent = this.aMenuComponents[nMenuComponent];
        oMenuComponent.print();
        nMenuComponent = nMenuComponent + 1;
    }
};
// 注意上述代码，除了实现了添加、删除、获取方法外，打印print方法是首先打印当前菜品信息，然后循环遍历打印所有子菜品信息。

// 第四步，创建指定的菜品：

// 我们可以创建几个真实的菜品，比如晚餐、咖啡、糕点等等，其都是用Menu作为其原型，代码如下：

var DinnerMenu = function () {
    Menu.apply(this);
};
DinnerMenu.prototype = new Menu();

var CafeMenu = function () {
    Menu.apply(this);
};
CafeMenu.prototype = new Menu();

var PancakeHouseMenu = function () {
    Menu.apply(this);
};
PancakeHouseMenu.prototype = new Menu();
// 第五步，创建最顶级的菜单容器——菜单本：

var Mattress = function (aMenus) {
    this.aMenus = aMenus;
};
Mattress.prototype.printMenu = function () {
    this.aMenus.print();
};
// 该函数接收一个菜单数组作为参数，并且值提供了printMenu方法用于打印所有的菜单内容。

// 第六步，调用方式：

var oPanCakeHouseMenu = new Menu("Pancake House Menu", "Breakfast");
var oDinnerMenu = new Menu("Dinner Menu", "Lunch");
var oCoffeeMenu = new Menu("Cafe Menu", "Dinner");
var oAllMenus = new Menu("ALL MENUS", "All menus combined");

oAllMenus.add(oPanCakeHouseMenu);
oAllMenus.add(oDinnerMenu);

oDinnerMenu.add(new MenuItem("Pasta", "Spaghetti with Marinara Sauce, and a slice of sourdough bread", true, 3.89));
oDinnerMenu.add(oCoffeeMenu);

oCoffeeMenu.add(new MenuItem("Express", "Coffee from machine", false, 0.99));

var oMattress = new Mattress(oAllMenus);
console.log("---------------------------------------------");
oMattress.printMenu();
console.log("---------------------------------------------");
*/