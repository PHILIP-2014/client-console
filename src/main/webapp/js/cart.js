(function(document){
    var $countInput=$('input[name="count"]');
    var $colorInput=$('input[name="color"]');
    var $sizeInput=$('input[name="size"]');
    var $popup=$('.popup');                             //购物设置弹层
    var $orderForm=$('[name="orderForm"]');             //购物设置表单

    var $numberDiv=$('.number');                        //显示数量的div
    var $confirmOrderForm=$('[name=confirmOrderForm]'); //确认订单的表单
    var $addAddressForm=$('[name="addAddressForm"]');   //添加地址的表单

    var $orderList=$('.order-list');                    //订单列表
    var orderHtml=$orderList.children().clone();         //模板
    var $finishEditingBtn=$('#finish-editing-btn');     //完成编辑按钮
    var $editBtn=$('#edit-btn');                        //订单编辑按钮
    var $selectBtn=$('.select-btn');                    //单个勾选按钮
    var $selectAll=$('.select-all');                    //全选按钮

    //加入购物车、立即购买按钮点击
    $('.btn-order').on('click',function(e){
        var target=$(e.currentTarget);
        var type=target.attr('data-submit-type');

        togglePopup(true);
        $orderForm.attr({'data-form-type':type});
        e.stopPropagation();
    });
    //关闭购物设置弹层
    $('#popup-close-btn').on('click',function(){
        togglePopup(false);
    });
    //颜色选择
    $('#color-list button').on('click',function(e){
        select(e,'color',$colorInput);
    });
    //尺寸选择
    $('#size-list button').on('click',function(e){
        select(e,'size',$sizeInput);
    });
    //数量选择
    $('#count-set button').on('click',function(e){
        setCount(e);
    });
    //购物设置表单的确认操作
    $orderForm.on('submit',function(e){
        var target=$(e.currentTarget);
        var type=target.attr('data-form-type');

        var arr=$(e.currentTarget).serializeArray();
        var params=convertArrayToObject(arr);
        if(!params.color||!params.size){
            return;
        }
        if(type==='cart'){
            //todo 加入购物车操作
        }else{
            //todo 跳转到确认页面
        }
        e.preventDefault();

    });
    //TODO 空白区域关闭弹窗
/**=======================确认订单页===============================**/

    //地址选择
    $('#address-list li').on('click',function(e){
        $(e.currentTarget).addClass('active').siblings().removeClass('active');
        //todo 设置地址
    });
    //确认订单提交
    $confirmOrderForm.on('submit',function(e){
        var arr=$(e.currentTarget).serializeArray();
        var params=convertArrayToObject(arr);
        if(!params.color||!params.size||!params.address){
            return;
        }
        onSubmit(params);
        e.preventDefault();
    });
    //添加地址信息
    $addAddressForm.on('submit',function(e){
        var arr=$(e.currentTarget).serializeArray();
        var params=convertArrayToObject(arr);
        //todo 设置地址
        e.preventDefault();
    });
/**============================购物车页=====================================**/
    //订单列表处理的格式,假数据,待替换
    var list=[
        {id:23,name:'ddd',isSelect:false,price:100},
        {id:24,name:'dds',isSelect:false,price:150}
    ];
    var selectList=[];//选中的列表
    //订单单个勾选
    $selectBtn.on('click',function(e){
        var isAllSelect,doType;
        var target=$(e.currentTarget);
        var item=list[target.attr('data-index')];
        var method=item.isSelect?'removeClass':'addClass';

        target[method]('select-success');
        changeOrderItem(item,'isSelect');//设置数据列表项

        isAllSelect=getSelectStatus();
        doType=isAllSelect?'addClass':'removeClass';
        $selectAll[doType]('select-success');//如果全选，如果不全选
        //todo 结算价格


    });
    //勾选全部订单
    $selectAll.on('click',function(e){
        var target=$(e.currentTarget);
        var method=target.hasClass('select-success')?'removeClass':'addClass';
        $(e.currentTarget)[method]('select-success');
        $selectBtn[method]('select-success');

        setOrderList();//设置数据列表项
        //todo 结算价格
    });
    //删除选中的订单
    $('.delete-more').on('click',function(){
        var selectItems=getSelectItems();
        list=getDifference(list,selectItems,'id');
        reRender();//重新渲染列表
    });
    $('#buy').on('click',function(e){
        var selectItems=getSelectItems();
        list=getDifference(list,selectItems,'id');
        //todo 跳转到结算页
    });
    $('.counter').on('click',function(e){
        setItemCount(e);
    });
    //订单编辑
    $editBtn.on('click',function(e){
        toggleSetBlock(true);
    });
    //完成订单编辑
    $finishEditingBtn.on('click',function(){
        toggleSetBlock(false);
    });
    function reRender(){
        //todo
        var html='';
        /*$.each(list,function(index,item){
            html+=;
        });*/
        $orderList.html(html);
    }

    function getUnique(arr,key){
        var obj={},resultArr=[];
        $.each(arr,function(index,item){
            var value=item[key];
            if(!obj[value]){
                resultArr.push(item);
                obj[value]=true;
            }
        });
    }

    function getDifference(list,arr,key){
        var obj={},array=[];
        $.each(list,function(index,item){
            obj[key]=item[key];
            if(!_findWhere(arr,obj)){
                array.push(item);
            }

        });
        return array;
    }
    function _findWhere(arr,obj){
        var result=null;
        $.each(arr,function(index,item){
            for (var key in obj){
                if(item[key]===obj[key]){
                    result=item;
                }
            }

        });
        return result;
    }
    function getSelectItems(){
        $.each(list,function(index,item){
            if(item.isSelect){
                selectList.push(item);
            }
        });
        return selectList;
    }
    function changeOrderItem(item,type){
        if(type==='isSelect'){
            item.isSelect=!item.isSelect;
        }
    }
    function getSelectStatus(){
        var isAllSelect=true;
        $.each(list,function(index,item){
            if(!item.isSelect){
                isAllSelect=false;
            }
        });
        return isAllSelect;
    }
    function setOrderList(){
        $.each(list,function(index,item){
            item.isSelect=true;
        });
    }

    function setItemCount(e){
        var target=$(e.currentTarget);
        var type=target.attr('data-count');
        //
    }
    function toggleSetBlock(isShow){
        var $li=$orderList.children();
        var setBlockDisplay=isShow?'block':'none';
        var detailDisplay=isShow?'none':'block';

        $editBtn.css({display:detailDisplay});
        $finishEditingBtn.css({display:setBlockDisplay});
        $li.find('.set-block').css({display:setBlockDisplay});
        $li.find('.item-detail').css({display:detailDisplay});
    }

    function togglePopup(isShow){
        var val=isShow?'block':'none';
        var bottom=isShow?0:'-400px';
        $popup.animate({bottom:bottom}).css({display:val});

    }
    function setCount(e){
        var target=$(e.currentTarget);
        var type=target.attr('data-count');
        var num=Number($countInput.attr('value'));

        if((num<=1&&type==='reduce')||(num>=100&&type==='plus')){
            return;
        }

        num=type==='plus'?num+1:num-1;
        $numberDiv.html(num);
        $countInput.prop({value:num});
    }
    function select(e,type,input){
        var target=$(e.currentTarget);
        var val=target.attr('data-'+type);

        input.prop({value:val});
        target.addClass('active').siblings().removeClass('active');

    }
    function onSubmit(param){
        //todo 替换提交接口
        $.post('/order',param);
    }

    function convertArrayToObject(arr){
        var attr={};
        if(!$.isArray(arr)){
            $.error('参数必须为数组');
        }
        $.each(arr,function(i,item){
            attr[item.name]=item.value;
        });
        return attr;
    }
})(document);