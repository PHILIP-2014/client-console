(function(document){
    var $countInput=$('input[name="count"]');
    var $colorInput=$('input[name="color"]');
    var $sizeInput=$('input[name="size"]');
    var $popup=$('.popup');//弹层

    var $numberDiv=$('.number');
    var $confirmOrderForm=$('[name=confirmOrderForm]');
    var $addAddressForm=$('[name="addAddressForm"]');

    $('.btn-order').on('click',function(){
        togglePopup(true);
        e.stopPropagation();
    });
    $('#popup-close-btn').on('click',function(){
        togglePopup(false);
    });

    $('#color-list button').on('click',function(e){
        select(e,'color',$colorInput);
    });
    $('#size-list button').on('click',function(e){
        select(e,'size',$sizeInput);
    });
    $('#count-set button').on('click',function(e){
        setCount(e);
    });

    $('[name="orderForm"]').on('submit',function(e){
        var arr=$(e.currentTarget).serializeArray();
        var params=convertArrayToObject(arr);
        if(!params.color||!params.size){
            return;
        }
        //todo 跳转到确认页面
        e.preventDefault();

    });



    $('#address-list li').on('click',function(e){
        $(e.currentTarget).addClass('active').siblings().removeClass('active');
        //todo 设置地址
    });
    $confirmOrderForm.on('submit',function(e){
        var arr=$(e.currentTarget).serializeArray();
        var params=convertArrayToObject(arr);
        if(!params.color||!params.size||!params.address){
            return;
        }
        onSubmit(params);
        e.preventDefault();
    });
    $addAddressForm.on('submit',function(e){
        var arr=$(e.currentTarget).serializeArray();
        var params=convertArrayToObject(arr);
        //todo 设置地址
        e.preventDefault();
    });

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