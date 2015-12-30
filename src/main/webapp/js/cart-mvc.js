(function(exports){
    function Event(sender){
        this._listeners=[];
        this._sender=sender;
    }
    Event.prototype={
        attach:function(listener){
            this._listeners.push(listener);
        },
        notify:function(arg){

            for (var index=0;index < this._listeners.length;index++){
                this._listeners[index](this._sender,arg);
            }
        }
    };
    var common={
        getDifference:function(list,arr,key){
            var obj={},array=[];
            $.each(list,function(index,item){
                obj[key]=item[key];
                if(!common.findWhere(arr,obj)){
                    array.push(item);
                }

            });
            return array;
        },
        findWhere:function(arr,obj){
            var result=null;
            $.each(arr,function(index,item){
                for (var key in obj){
                    if(item[key]===obj[key]){
                        result=item;
                    }
                }

            });
            return result;
        },
        findIndex:function(arr,obj){
            var result=-1;
            $.each(arr,function(index,item){
                for (var key in obj){
                    if(item[key]===obj[key]){
                        result=index;
                    }
                }

            });
            return result;
        },
        convertArrayToObject:function(arr){
            var attr={};
            if(!$.isArray(arr)){
                $.error('参数必须为数组');
            }
            $.each(arr,function(i,item){
                attr[item.name]=item.value;
            });
            return attr;

        },
        setOptions:function(e,type,input){
            var target=$(e.currentTarget);
            var value=target.attr('data-'+type);

            input.prop({value:value});
            target.addClass('active').siblings().removeClass('active');
        },
        expressFormSubmit:function(e,callback){
            var target=$(e.currentTarget);
            var array=target.serializeArray();
            var params=common.convertArrayToObject(array);

            if(!common.validatePhone(params.phone)){
                alert('手机格式不正确');
                return;
            }

            common.services.setExpressHttp(params)
                .error(function(data){
                    callback(data);
                });

        },
        validatePhone:function(phone){
            var reg=/^1[3-8]\d{9}$/;
            return reg.test(phone);
        },
        services:{
            addToCart:function(params){
                return $.post('/addTocart',params);
            },
            setExpressHttp:function(params){
                return $.post('/express',params);
            },
            sendOrderHttp:function(params){
                return $.post('/order',params);
            },
            cancelOrder:function(params){
                return $.post('/cancel',params)
            },
            takeDelivery:function(params){
                return $.post('/finish',params);
            },
            deleteOrder:function(id){
                return $.post('/delete',id);
            },
            deleteCartList:function(param){
                return $.post('/delete',param);
            },
            getPopupTemplate:function(id){
                return $.post('/page',id);
            },
            getProductList:function(param){
                return $.post('/list',param);
            }
        }
    };

    //model 观察状态变化，并通知监听者

    //view  触发 ui 事件

    // controller 响应用户操作,调用model上的函数
/*****************************产品详情页*************************************/
    var detail={
        Model:function(obj){
            this.addedItem={
                id:obj.id,
                count:0,
                size:'',
                color:''
            };
            this.itemDetail=obj;
        },
        View:function(model,obj){
            var self=this;
            this._model=model;
            this._rootElement=obj.rootElement;
            this._addToCartBtn=this._rootElement.find('[data-submit-type]');
            this._popup=this._rootElement.find('.popup');
            this._closePopupBtn=this._popup.find('#popup-close-btn');
            this._orderForm=this._popup.find('[name="orderForm"]');
            this._colorBtn=this._orderForm.find('#color-list button');
            this._sizeBtn=this._orderForm.find('#size-list button');
            this._countBtn=this._orderForm.find('[count-set] button');


            this._colorInput=this._orderForm.find('[name="color"]');
            this._sizeInput=this._orderForm.find('[name="size"]');
            this._countInput=this._orderForm.find('[name="count"]');


            this.closePopupBtnClicked=new Event(this);
            this.addToCartBtnClicked=new Event(this);
            this.orderFormSubmited=new Event(this);
            this.colorBtnClicked=new Event(this);
            this.sizeBtnClicked=new Event(this);
            this.countBtnClicked=new Event(this);

            this._closePopupBtn.on('click',function(e){
                self.closePopupBtnClicked.notify();
            });
            this._addToCartBtn.on('click',function(e){
                self.addToCartBtnClicked.notify(e);
            });
            this._orderForm.on('submit',function(e){
                self.orderFormSubmited.notify(e);
            });
            this._colorBtn.on('click',function(e){
                self.colorBtnClicked.notify(e);
            });
            this._sizeBtn.on('click',function(e){
                self.sizeBtnClicked.notify(e);
            });
            this._countBtn.on('click',function(e){
                self.countBtnClicked.notify(e);
            });
        },
        Controller:function(model,view){
            var self=this;
            this._model=model;
            this._view=view;
            this._view.closePopupBtnClicked.attach(function(){
                self.togglePopup(false);
            });
            this._view.addToCartBtnClicked.attach(function(sender,e){
                self.togglePopup(true);
                self.addToCart(e);
            });
            this._view.orderFormSubmited.attach(function(sender,e){
                self.formSubmit(e);
                e.preventDefault();
            });
            this._view.colorBtnClicked.attach(function(sender,e){
                self.setOptions(e,'color',self._view._colorInput);
            });
            this._view.sizeBtnClicked.attach(function(sender,e){
                self.setOptions(e,'size',self._view._sizeInput);
            });
            this._view.countBtnClicked.attach(function(sender,e){
                self.setCount(e);
            });
        }
    };
    detail.Controller.prototype={
        addToCart:function(e){
            var target=$(e.currentTarget);
            var type=target.attr('data-submit-type');

            this.togglePopup(true);
            this._view._orderForm.attr({'data-form-type':type});

            e.stopPropagation();
        },
        togglePopup:function(isShow){
            var method=isShow?'show':'hide';
            var bottom=isShow?0:'-400px';
            this._view._popup.animate({bottom:bottom},'fast')[method]();
        },
        setOptions:function(e,type,input){
            var target=$(e.currentTarget);
            var value=target.attr('data-'+type);

            input.prop({value:value});
            target.addClass('active').siblings().removeClass('active');
        },
        setCount:function(e){
            var target=$(e.currentTarget);
            var numberElement=target.siblings('.number');
            var countInput=this._view._countInput;

            var type=target.attr('data-count');
            var num=Number(countInput.attr('value'));

            if((num<=1&&type==='reduce')||(num>=100&&type==='plus')){
                return;
            }

            num=type==='plus'?num+1:num-1;
            numberElement.html(num);
            countInput.prop({value:num});
        },
        formSubmit:function(e){
            var self=this;
            var target=$(e.currentTarget);
            var type=target.attr('data-form-type');

            var arr=target.serializeArray();
            var params=common.convertArrayToObject(arr);
            if(!params.color||!params.size){
                return;
            }

            common.services.addToCart(params)
                .success(function(){
                    if(type==='buy'){
                        //todo 跳转到确认页面
                    }else{
                        alert('添加成功');
                    }
                    self.togglePopup(false);//关闭弹窗
                });



        }
    };
/**************************产品列表******************************/
    var productList={
        Model:function(obj){
            this._list=obj.list;
            this._pageNum=obj.pageNumber;
            this._hasMorePage=true;
            this._page=1;
        },
        View:function(model,obj){
            var self=this;
            this._model=model;
            this._rootElement=obj.rootElement;
            this._de=this._rootElement.find('.product-list');
            this._productList=this._rootElement.find('ul');
            this._loadTip=this._productList.siblings('.load-more');
            this._backToTopBtn=this._rootElement.find('.back-to-top .btn');

            this.listScroll=new Event(this);
            this.backToTop=new Event(this);

            $('#productList .container').scroll(function(e){
                self.listScroll.notify(this);
            });
            this._backToTopBtn.on('click',function(e){
                self.backToTop.notify(e);
            });
        },
        Controller: function (model,view) {
            var self=this,isShow;
            this._model=model;
            this._view=view;
            this._view.listScroll.attach(function(sender,target){
                if(view.isAtBottom(target)){
                    self.query();
                }

                isShow=view.isBeyondWindow(target)?true:false;
                view.toggleBackTopBtn(isShow);

            });
            this._view.backToTop.attach(function(){
                self.backToTop();
            });
        }
    };
    productList.View.prototype={
        reRender:function(data){
            var self=this;
            var html='';
            $.each(data,function(){
                html='<li class="col-xs-6 col-sm-3">' +
                        '<a href="javascript:;">' +
                            '<img src="'+this.img+'" />' +
                            '<h5 class="title">' +this.title+'</h5>' +
                            '<span class="price">￥'+this.price+'</span>' +
                        '</a>' +
                    '</li>';
                self._productList.append(html);
            });

        },
        toggleBackTopBtn:function(isShow){
            var type=isShow?'show':'hide';
            this._backToTopBtn[type]();
        },
        isAtBottom:function(target){
            var height=$(target).height();
            var childHeight=this._productList.height();
            var computeScrollHeight=childHeight-height;

            return computeScrollHeight-$(target).scrollTop()<=60;//滚动条距离底部小于60
        },
        isBeyondWindow:function(target){
            return $(target).scrollTop()>$(window).height();
        }
    };
    productList.Model.prototype={
        insertToProductList:function(data){
            this._list=this._list.concat(data);
        },
        resetQueryOptions:function(data){
            this._page+=1;
            this._hasMorePage=data.length<this._pageNum?false:true;
        }
    };
    productList.Controller.prototype={
        query:function(){
            var self=this;
            var model=self._model,
                view=self._view;
            var callback=function(data){
                model.insertToProductList(data);
                model.resetQueryOptions(data);
                view.reRender(data);
            };
            var data=[
                {id:11,
                    title:'白鹿原女裤2015秋加绒小脚裤高腰长裤修身显瘦休闲裤',
                    price:190,
                    img:'images/product/c.jpg'
                },
                {id:10,
                    title:'白鹿原女裤2015秋加绒小脚裤高腰长裤修身显瘦休闲裤',
                    price:190,
                    img:'images/product/c.jpg'
                },
                {id:9,
                    title:'白鹿原女裤2015秋加绒小脚裤高腰长裤修身显瘦休闲裤',
                    price:190,
                    img:'images/product/c.jpg'
                },
                {id:8,
                    title:'白鹿原女裤2015秋加绒小脚裤高腰长裤修身显瘦休闲裤',
                    price:190,
                    img:'images/product/c.jpg'
                },
                {id:7,
                    title:'白鹿原女裤2015秋加绒小脚裤高腰长裤修身显瘦休闲裤',
                    price:190,
                    img:'images/product/c.jpg'
                },
                {id:6,
                    title:'白鹿原女裤2015秋加绒小脚裤高腰长裤修身显瘦休闲裤',
                    price:190,
                    img:'images/product/c.jpg'
                },
                {id:5,
                    title:'白鹿原女裤2015秋加绒小脚裤高腰长裤修身显瘦休闲裤',
                    price:190,
                    img:'images/product/b.jpg'
                },
                {
                    id:4,
                    title:'白鹿原女裤2015秋加绒小脚裤高腰长裤修身显瘦休闲裤',
                    price:190,
                    img:'images/product/b.jpg'
                },


            ];
            if(model._hasMorePage){
                var options={
                    pageNum:model._pageNum,
                    page:model._page
                };
                common.services.getProductList(options).error(callback(data));
            }else{
                view._loadTip.html('没有更多了');
            }


        },
        backToTop:function(){
            $(window).animate({scrollTop:0});
        }
    };
/***************************购物车列表*********************************/
    var cartList={
        Model:function(obj){
            this._list=obj.list;
            this.totalPrice=0;
            this._selectedList=[];
        },
        View:function(model,obj){
            var self=this;
            this._model=model;
            this._rootElement=obj.rootElement;
            this._cartList=         this._rootElement.find('.order-list');
            this._orderItem=        this._cartList.children('li');
            this._deleteItemBtn=    this._orderItem.find('[data-delete="item"]');
            this._selectAllBtn=     this._rootElement.find('.select-all');
            this._deleteMoreBtn=    this._rootElement.find('.delete-more');
            this._countBtn=         this._cartList.find('[data-count]');
            this._resetBtn=         this._orderItem.find('[data-reselect]');
            this._selectBtn=        this._cartList.find('.select-btn');
            this._buyBtn=           this._rootElement.find('#buy');
            this._editBtn=          this._rootElement.find('#edit-btn');
            this._finishEdittingBtn=this._rootElement.find('#finish-editting-btn');
            this._totalPriceTip=    this._rootElement.find('[data-price="total"]');
            this._popup=            this._rootElement.find('.popup');

            this.deleteItemBtnClicked=new Event(this);
            this.resetBtnClicked=   new Event(this);
            this.countBtnClicked=   new Event(this);
            this.selectBtnClicked=  new Event(this);
            this.selectAllClicked=  new Event(this);
            this.deleteMoreClicked= new Event(this);
            this.buyBtnClicked=     new Event(this);
            this.finishBtnClicked=  new Event(this);
            this.editBtnClicked=    new Event(this);

            this._deleteItemBtn.on('click',function(e){
                self.deleteItemBtnClicked.notify(e);
            });
            this._resetBtn.on('click',function(e){
                self.resetBtnClicked.notify(e);
            });

            this._selectBtn.on('click',function(e){
                self.selectBtnClicked.notify(e);
            });
            this._countBtn.on('click',function(e){
                self.countBtnClicked.notify(e);
            });
            this._selectAllBtn.on('click',function(e){
                self.selectAllClicked.notify(e);
            });
            this._deleteMoreBtn.on('click',function(){
                self.deleteMoreClicked.notify();
            });
            this._buyBtn.on('click',function(){
                self.buyBtnClicked.notify();
            });
            this._editBtn.on('click',function(){
                self.editBtnClicked.notify();
            });
            this._finishEdittingBtn.on('click',function(){
                self.finishBtnClicked.notify();
            });
        },
        Controller:function(model,view){
            var self=this;
            this._model=model;
            this._view=view;
            this._view.selectBtnClicked.attach(function(sender,e){
                self.selectItem(e);
            });
            this._view.countBtnClicked.attach(function(sender,e){
                self.setCount(e);
            });
            this._view.selectAllClicked.attach(function(sender,e){
                self.selectAll(e);
            });
            this._view.deleteMoreClicked.attach(function(){
                self.deleteMore();
            });
            this._view.buyBtnClicked.attach(function(){
                self.comfireOrderList();
            });
            this._view.editBtnClicked.attach(function(){
                self.toggleSetBlock(true);
            });
            this._view.finishBtnClicked.attach(function(){
                self.toggleSetBlock(false);
            });
            this._view.resetBtnClicked.attach(function(sender,e){
                self.togglePopup(true,e);
            });
            this._view.deleteItemBtnClicked.attach(function(sender,e){
                self.deleteItem(e);
            });
        }
    };
    cartList.View.prototype={
        reRender:function(){
            var parent=this._cartList.parent();
            this._cartList.remove();
            parent.html('<p style="line-height:30px;padding:100px 20px;text-align:center;">购物车没有任何商品，快去选购商品吧</p>');
            this._rootElement.find('.footer').remove();

        },
        deleteItemView:function(selectIds){
            var self=this;
            $.each(selectIds,function(index,id){
                self._orderItem.filter('[data-order-id="'+id+'"]').remove();
            });
        },
        renderPopup:function(template){
            this._popup.html(template);
        },
        renderTotalPrice:function(val){
            this._totalPriceTip.html('合计：￥'+val);
        }
    };
    cartList.Model.prototype={
        updateInList:function(type,item){
            var isSelect=type==='allSelect'?true:false;
            switch (type){
                case 'isSelect':
                    item.isSelect=!item.isSelect;
                    break;
                case 'allSelect':
                case 'unSelect':
                    $.each(this._list,function(index,item){
                        item.isSelect=isSelect;
                    });
                    break;
                case 'update' :
                    $.extend(this._list,item);
            }

        },
        getSelectStatus:function(){
            var isAllSelect=true;
            $.each(this._list,function(index,item){
                if(!item.isSelect){
                    isAllSelect=false;
                }
            });
            return isAllSelect;
        },
        settleAccounts:function(){
            var total=0;
            $.each(this._list,function(index,item){
                if(item.isSelect){
                    total=total+item.price*item.count;
                }

            });
            return total;

        },
        getSelectItems:function(key){
            var self=this;
            var arr=[],value;
            $.each(this._list,function(index,item){
                if(item.isSelect){
                    switch (key){
                        case 'index':
                            value=index;
                            break;
                        case 'item':
                            value=item;
                            break;
                        default :
                            value=item[key];
                    }
                    arr.push(value);
                }
            });
            return arr;
        },
        removeFromList:function(id){
            var list=[];
            $.each(this._list,function(index,item){
                if(!item.isSelect&&item.id!=id){
                    list.push(item);
                }
            });
            this._list=list;
        }
    };
    cartList.Controller.prototype={
        selectItem:function(e){
            var doType,
                model=this._model,
                view=this._view;
            var target=$(e.currentTarget);

            var id=Number(target.closest('li[data-order-id]').attr('data-order-id'));
            var item=common.findWhere(model._list,{id:id});
            var method=item.isSelect?'removeClass':'addClass';

            target[method]('select-success');
            model.updateInList('isSelect',item);//设置数据列表项
            doType=model.getSelectStatus()?'addClass':'removeClass';
            view._selectAllBtn[doType]('select-success');//如果全选，如果不全选
            view.renderTotalPrice(model.settleAccounts());
        },
        setCount:function(e){
            var model=this._model,
                view=this._view;
            var target=$(e.currentTarget);

            var parent=target.closest('li[data-order-id]');
            var id=Number(parent.attr('data-order-id'));
            var item=common.findWhere(model._list,{id:id});
            var numberElement=target.siblings('.number');

            var type=target.attr('data-count');
            var num=Number(item.count);

            if((num<=1&&type==='reduce')||(num>=100&&type==='plus')){
                return;
            }

            num=type==='plus'?num+1:num-1;
            numberElement.html(num);
            item.count=num;
            model.updateInList('update',item);
            view.renderTotalPrice(model.settleAccounts());
            parent.find('.item-detail .number').html(num);
        },
        selectAll:function(e){
            var target=$(e.currentTarget);
            var model=this._model,
                view=this._view;
            var isSelected=target.hasClass('select-success');
            var method=isSelected?'removeClass':'addClass';
            var type=isSelected?'unSelect':'allSelect';

            target[method]('select-success');
            view._selectBtn[method]('select-success');

            model.updateInList(type);//设置数据列表项
            view.renderTotalPrice(model.settleAccounts());
        },
        deleteMore:function(){
            var self =this;
            var model=self._model,
                view=self._view;
            var selectIds=model.getSelectItems('id');

            if(selectIds.length===0)return;

            var callback=function(){
                model.removeFromList();
                if(model._list.length===0){
                    view.reRender();
                }else {
                    view.deleteItemView(selectIds);
                }

                view.renderTotalPrice(model.settleAccounts());
            };
            common.services.deleteCartList(selectIds)
                .error(callback);
        },
        comfireOrderList:function(){
            var selectIds=this._model.getSelectItems('id');
            if(selectIds.length===0){
                alert('您还未选择商品');
                return;
            }
            //todo 跳转到结算页
        },
        toggleSetBlock:function(isShow){
            var $li=this._view._cartList.children();
            var setBlockDisplay=isShow?'show':'hide';
            var detailDisplay=isShow?'hide':'show';

            this._view._editBtn[detailDisplay]();
            this._view._finishEdittingBtn[setBlockDisplay]();
            $li.find('.set-block')[setBlockDisplay]();
            $li.find('.item-detail')[detailDisplay]();

        },
        togglePopup:function(isShow,e){
            var self=this;
            var view=self._view,
                model=self._model;
            var target=$(e.currentTarget);

            var id=target.closest('li[data-order-id]').attr('data-order-id');
            var item=common.findWhere(model._list,{id:Number(id)});
            var method=isShow?'show':'hide';
            var bottom=isShow?0:'-400px';

            var _model=null,_view=null,contrl=null;
            common.services.getPopupTemplate(item.id)
                .error(function(data){
                    view.renderPopup(data.template);
                    view._popup.animate({bottom:bottom},'fast')[method]();
                    //todo 检查
                    _model=new detail.Model({detail:data.detail});
                    _view=new detail.View(_model,{
                        rootElement:$('#cart-list-panel')
                    });
                    contrl=new detail.Controller(_model,_view);
                });


        },
        deleteItem:function(e){
            var self=this;
            var target=$(e.currentTarget);
            var model=self._model,
                view=self._view;
            var id=target.closest('li[data-order-id]').attr('data-order-id');
            var callback=function(){
                model.removeFromList(id);
                if(model._list.length===0){
                    view.reRender();
                }else{
                    view.deleteItemView([id]);
                }

                view.renderTotalPrice(model.settleAccounts());
            };
            common.services.deleteCartList([id]).error(callback);
        }

    };

/******************************确认订单**********************************/
    var order={
        Model:function(obj){
            this._list=obj.list;
            this._user=obj.user;
        },
        View:function(model,obj){
            var self=this;
            this._rootElement=obj.rootElement;
            this._expressForm=this._rootElement.find('[name="addAddressForm"]');
            this._orderForm=this._rootElement.find('[name="confirmOrderForm"]');
            this._expressInfo=this._rootElement.find('.express-info');
            this._countBtn=this._rootElement.find('[data-count]');//确认页面，只一个商品的时，才会有更改数量的按钮
            this._totalPrice=this._rootElement.find('.footer .price');

            this.countBtnClicked=new Event(this);
            this.expressFormSubmit=new Event(this);
            this.orderFormSubmit=new Event(this);

            this._countBtn.on('click',function(e){
                self.countBtnClicked.notify(e);
            });
            this._expressForm.on('submit',function(e){
                self.expressFormSubmit.notify(e);
            });
            this._orderForm.on('submit',function(e){
                self.orderFormSubmit.notify(e);
            });
        },
        Controller:function(model,view){
            var self=this;
            this._model=model;
            this._view=view;
            this._view.expressFormSubmit.attach(function(sender,e){
                e.preventDefault();
                self.onExpressFormSubmit(e);

            });
            this._view.orderFormSubmit.attach(function(sender,e){
                self.orderFormSubmit(e);
                e.preventDefault();
            });
            this._view.countBtnClicked.attach(function(sender,e){
                self.setCount(e);
            });
        }
    };
    order.View.prototype={
        insertToExpressView:function(data){
            var html='<div>' +
                '<span>收件人：'+data.recipient+'</span>' +
                '<span>'+data.phone+'</span>' +
                '</div>' +
                '<div>' +
                '<span>'+data.address+'</span>' +
                '<a href="/address" class="icon-btn arrow"></a>' +
                '</div>';
            this._expressInfo.html(html);
        }
    };
    order.Model.prototype={
        setExpress:function(address){
            this._user.addresses.push(address);
        },
        setCount:function(id,num){
            var item=common.findWhere(this._list,{id:id});
            item.count=num;
        },
        getCount:function(id){
            var item=common.findWhere(this._list,{id:id});
            return item.count;
        },
        getTotalPrice:function(){
            var total=0;
            $.each(this._list,function(index,item){
                total=total+item.price*item.count;
            });
            return total;
        }
    };
    order.Controller.prototype={
        onExpressFormSubmit:function(e){
            var self=this;
            var callback=function(data){
                self._model.setExpress(data);
                self._view.insertToExpressView(data);
            };
            common.expressFormSubmit.call(self,e,callback);
        },
        orderFormSubmit:function(e){
            var self=this;
            var target=$(e.currentTarget);
            var array=target.serializeArray();
            var params=common.convertArrayToObject(array);

            common.services.sendOrderHttp(params)
                .success(function(data){
                    //TODO 跳转到订单中心
                });
        },
        setCount:function(e){
            var model=this._model;
            var target=$(e.currentTarget);
            var numberElement=target.siblings('.number');
            var itemId=model._list[0].id;
            var type=target.attr('data-count');
            var num=Number(model.getCount(itemId));

            if((num<=1&&type==='reduce')||(num>=100&&type==='plus')){
                return;
            }

            num=type==='plus'?num+1:num-1;
            numberElement.html(num);
            model.setCount(itemId,num);
            this._view._totalPrice.html(model.getTotalPrice());
        }
    };
/***********************地址管理中心***************************/
    var addressList={
    Model:function(obj){
        this._list=obj.addressList;
    },
    View:function(model,obj){
        var self=this;
        this._rootElement=obj.rootElement;
        this._addressList=this._rootElement.find('#address-list');
        this._addressItem=this._addressList.find('[data-address-index]');
        this._expressForm=this._rootElement.find('[name="addAddressForm"]');

        this.expressFormSubmit=new Event(this);
        this.addressItemClicked=new Event(this);

        this._addressItem.on('click',function(e){
            self.addressItemClicked.notify(e);
        });
        this._expressForm.on('submit',function(e){
            self.expressFormSubmit.notify(e);
        });
    },
    Controller:function(model,view){
        var self=this;
        this._model=model;
        this._view=view;

        this._view.addressItemClicked.attach(function(sender,e){
            self.selectCurrent(e);
        });
        this._view.expressFormSubmit.attach(function(sender,e){
            e.preventDefault();
            self.onExpressFormSubmit(e);
        });
    }
};
    addressList.View.prototype={
        insertToAddressListView:function(data,index){
            var li=$('<li class="active" data-address-index="'+index+'">' +
                        '<div>' +
                            '<span>'+data.recipient+'</span>' +
                            '<span>'+data.phone+'</span>' +
                        '</div>' +
                        '<div>' +
                            '<span>'+data.address+'</span>' +
                        '</div>' +
                    '</li>');
            this._addressItem=this._addressList.find('[data-address-index]');
            this._addressItem.removeClass('active');
            this._addressList.append(li);

        },
        changeSelectedView:function(index){console.log(this._addressItem[index]);
            this._addressItem.eq(index).addClass('active').siblings().removeClass('active');
        }
    };
    addressList.Model.prototype={
        changeSelectedAddress:function(index){
            var result=[];
            $.each(this._list,function(i,item){
                item.isSelect=i===index?true:false;
                result.push(item);
            });
        },
        insertToAddressList:function(item){
            var address=common.findWhere(this._list,{id:item.id});
            if(!address){
                this._list.push(data);
            }
        }
    };
    addressList.Controller.prototype={
        selectCurrent:function(e){
            var target=$(e.currentTarget);
            var index=target.attr('data-address-index');
            this._model.changeSelectedAddress(Number(index));
            this._view.changeSelectedView(index);
        },
        onExpressFormSubmit:function(e){
            var self=this;
            var callback=function(data){
                var index=self._model._list.length;
                self._model.insertToAddressList(data);
                self._view.insertToAddressListView(data,index);
            };
            common.expressFormSubmit.call(self,e,callback);
        }
    };
/***************************订单管理中心************************************/
    var orderCenter={
        Model:function(obj){
            this._list=obj.list;
            this.orderId=obj.orderId;
        },
        View:function(model,obj){
            var self=this;
            this._model=model;
            this._rootElement=obj.rootElement;
            this._orderList=this._rootElement.find('.order-list');
            this._orderItem=this._orderList.children('li');
            this._cancelBtn=this._orderItem.find('.cancel-btn');
            this._takeDeliveryBtn=this._orderItem.find('[data-order="finish"]');
            this._deleteOrderBtn=this._orderItem.find('[data-order="delete"]');
            this._noOrderTip=this._rootElement.find('.no-order');

            this.cancelBtnClicked=new Event(this);
            this.takeDeliveryBtnClicked=new Event(this);
            this.deleteOrderBtnClicked=new Event(this);

            this._cancelBtn.on('click',function(e){
                self.cancelBtnClicked.notify(e);
            });
            this._takeDeliveryBtn.on('click',function(e){
                self.takeDeliveryBtnClicked.notify(e);
            });
            this._deleteOrderBtn.on('click',function(e){
                self.deleteOrderBtnClicked.notify(e);
            });


        },
        Controller:function(model,view){
            var self=this;
            this._model=model;
            this._view=view;

            this._view.cancelBtnClicked.attach(function(sender,e){
                self.unsubscribeGoods(e);
            });
            this._view.takeDeliveryBtnClicked.attach(function(sender,e){
                self.takeDelivery(e);
            });
            this._view.deleteOrderBtnClicked.attach(function(sender,e){
                self.deleteOrder(e);
            });
        }
    };
    orderCenter.Model.prototype={
        removeFromLocalGoodsList:function(id,goodsId){
            var index=common.findIndex(this._list,{id:id});
            var num=common.findIndex(this._list[index],{id:goodsId});
            this._list[index].split(num,1);
        },
        removeFromOrderList:function(id){
            var index=common.findIndex(this._list,id);
            this._list.split(index,1);
        }

    };
    orderCenter.View.prototype={
        removeGoodsItemView:function(index,currentGoodsLen){
            var len=this._orderItem.length;
            if(len===1&&currentGoodsLen===1){
                //若不存在订单时，清空列表，显示提示信息
                this.emptyView();
                this.showEmptyTip();
            }else{
                this._orderItem.eq(index).remove();
            }

        },
        removeOrderItemView:function(index){
            if(this._orderItem.length===1){
                this.emptyView();
                this.showEmptyTip();
            }else{
                this._orderItem.eq(index).remove();
            }
        },
        emptyView:function(){
            this._orderList.remove();
        },
        showEmptyTip:function(){
            this._noOrderTip.show();
        },
        reRenderOrder:function(target){
            var sibling=target.sibling();
            target.remove();
            sibling.show();
        }
    };
    orderCenter.Controller.prototype={
        unsubscribeGoods:function(e){
            var self=this;
            var target=$(e.currentTarget);
            var index=target.attr('data-order-index');
            var num=target.attr('data-goods-index');
            var order=this._model._list[index];
            var goodsId=order.goods[num].id;

            common.services.cancelOrder({id:order.id,goodsId:goodsId})
                .success(function(){
                    self._model.removeFromLocalGoodsList({id:order.id,goodsId:goodsId});
                    self._view.removeGoodsItemView(index,self._model._list[0].goods.length);

                });
        },
        takeDelivery:function(e){
            var self=this;
            var target=$(e.currentTarget);
            var index=target.attr('data-order-index');
            var orderId=this._model._list[index].id;

            common.services.takeDelivery({id:orderId})
                .success(function(){
                    alert('感谢你的购买');
                    self._view.reRenderOrder(target);
                });
        },
        deleteOrder:function(e){
            var self=this;
            var target=$(e.currentTarget);
            var index=target.attr('data-order-index');
            var orderId=this._model._list[index].id;

            common.services.deleteOrder(orderId)
                .success(function(){
                    self._model.removeFromOrderList({id:orderId});
                    self._view.removeOrderItemView(index);
                });
        }
    };
/*********************/
    $.extend(exports,{
        productList:productList,
        detail:detail,
        cartList:cartList,
        addressList:addressList,
        orderCenter:orderCenter,
        order:order
    });
})(window);