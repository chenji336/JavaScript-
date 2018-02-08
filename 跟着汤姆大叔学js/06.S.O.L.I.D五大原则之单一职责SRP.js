window.onload=function(){
// http://www.cnblogs.com/libingql/p/3804327.html
/*
    //没有进行SRP 单一职责 single responsibility
    function Product(id,describe){
        this.getProductId=function(){
            return id;
        };

        this.getProductDescribe=function(){
            return describe;
        };
    }

    function Cart(){
        var cartItems=[];

        this.addItem=function(item){
            cartItems.push(item);
        };
    }

    (function(){
        var products=[new Product(1,"product1"),
                      new Product(2,"product2"),
                      new Product(3,"product3")
                     ],//products需要的数据
            cart=new Cart(),
            addToCart=function(){
                var productId=$(this).attr('id'),
                    product=$.grep(products,
                                   function(p){
                                      return p.getProductId()==productId;
                                  })[0],
                    newItem=$('<li></li>').html(product.getProductDescribe()).
                                           attr('id-cart',productId).
                                           appendTo('#cart');//展示购物车信息
                 cart.addItem(product);
            };

        products.forEach(function(p){
            var newItem=$('<li></li>').html(p.getProductDescribe())
                                      .attr('id',p.getProductId())
                                      .dblclick(addToCart)
                                      .appendTo('#products');//展示商品并且添加事件
        });
    })();*/

    //具有SRP单一职责：一个类做一个职责的事情
    //不要和单例模式搞混淆了
    //事件聚合，里面包含publish和subscribe
    
    //用于handler回调的代码
    function Event(name){
        var handlers=[];

        this.getName=function(){
            return name;
        };

        this.addHandler=function(handler){
            handlers.push(handler);
        };

        this.removeHandler=function(handler){
            for(var i=0;i<handlers.length;i++){
                if(h===handler){
                    handlers.splice(i,1);
                    break;
                }
            }
        };

        this.fire=function(eventArgs){
            handlers.forEach(function(h){
                h(eventArgs);
            });
        }
    }

    //用于发布和订阅event
    function EventAggregator(){
        var events=[];

        function getEvent(eventName){
            return $.grep(events,function(event){
                return event.getName()==eventName;
            })[0];
        }

        this.publish=function(eventName,eventArgs){
            var event=getEvent(eventName);

            if(!event){
               event=new Event(eventName);
               events.push(event);
            }

            event.fire(eventArgs);
        };

        this.subscribe=function(eventName,handler){
            var event=getEvent(eventName);
            if(!event){
               event=new Event(eventName);
               events.push(event);
            }
            event.addHandler(handler);
        };
    }


    //Product和Cart
    function Product(id,describe){
        this.getProductId=function(){
            return id;
        };

        this.getProductDescribe=function(){
            return describe;
        };
    }

    function Cart(eventAggregator){
        var cartItems=[];

        this.addItem=function(item){
            cartItems.push(item);
            eventAggregator.publish('itemAdded',item);
        };
    }

    //存储数据,一般里面可以用ajax来获取数据，我们这里写死
    function ProductRepository(){
       var products=[new Product(1,"product1"),
                      new Product(2,"product2"),
                      new Product(3,"product3")
                     ];
       this.getProducts=function(){
            return products;
       };
    }

    //控制器
    function CartController(eventAggregator,cart){
        eventAggregator.subscribe('itemAdded',function(eventArgs){
            $('<li></li>').html(eventArgs.getProductDescribe()).attr('id-cart',eventArgs.getProductId()).appendTo('#cart');
        });

        eventAggregator.subscribe('publishSelected',function(eventArgs){
            cart.addItem(eventArgs.product);
        });
    }

    function ProductController(eventAggregator,productRepository){
        var products=productRepository.getProducts();

        function onPublishSelected(){
            var productId=$(this).attr('id'),
                product=$.grep(products,
                               function(p){
                                  return p.getProductId()==productId;
                              })[0];
            eventAggregator.publish('publishSelected',{product:product});
        }

        products.forEach(function(p){
            var newItem=$('<li></li>').html(p.getProductDescribe()).attr('id',p.getProductId()).dblclick(onPublishSelected).appendTo('#products');
        });
      
    }

    (function(){
        var eventAggregator=new EventAggregator(),
            cart=new Cart(eventAggregator),
            cc=new CartController(eventAggregator,cart),
            pr=new ProductRepository(),
            pc=new ProductController(eventAggregator,pr);

    })();

}