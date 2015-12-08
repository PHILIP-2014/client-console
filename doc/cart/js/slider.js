
/***slider**/
(function(root,factory){
    if (typeof exports === 'object') {
        // CommonJS
        factory(exports);
    } else if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['exports'], factory);
    } else {
        // Browser globals
        factory(root);
    }
}(this,function(exports){
    var sliding = startClientX = startPixelOffset = pixelOffset = currentSlide = 0,
        slideCount,self=this;
    var slideElement;
    function Slider(obj){
        this._targetElement=obj;
        //配置
        this._options={
            childElementClassName:'slide-item'
        };
        var html='';

        slideCount = obj.images.length;
        slideElement=$(obj.slideElement);

        for(var i=0;i<slideCount;i++){
            html=html+'<div class="'+this._options.childElementClassName+'"><img src="'+obj.images[i]+'" /></div>';
        }
        slideElement.html(html);
        slideElement.on('mousedown touchstart', _slideStart);
        slideElement.on('mouseup touchend', _slideEnd);
        slideElement.on('mousemove touchmove', _slide);
    }
    function _slideStart(event) {
        if (event.originalEvent.touches)
            event = event.originalEvent.touches[0];
        if (sliding == 0) {
            sliding = 1;
            startClientX = event.clientX;
        }
    }

    function _slide(event) {
        event.preventDefault();
        if (event.originalEvent.touches)
            event = event.originalEvent.touches[0];
        var deltaSlide = event.clientX - startClientX;

        if (sliding == 1 && deltaSlide != 0) {
            sliding = 2;
            startPixelOffset = pixelOffset;
        }

        if (sliding == 2) {
            var touchPixelRatio = 1;
            if ((currentSlide == 0 && event.clientX > startClientX) || (currentSlide == slideCount - 1 && event.clientX < startClientX))
                touchPixelRatio = 3;
            pixelOffset = startPixelOffset + deltaSlide / touchPixelRatio;
            $(this).css('-webkit-transform', 'translate3d(' + pixelOffset + 'px,0,0)').removeClass();
        }
    }

    function _slideEnd(event) {
        if (sliding == 2) {
            sliding = 0;
            currentSlide = pixelOffset < startPixelOffset ? currentSlide + 1 : currentSlide - 1;
            currentSlide = Math.min(Math.max(currentSlide, 0), slideCount - 1);
            pixelOffset = currentSlide * -$('body').width();
            $('#animate-temp').remove();
            $('<style id="animate-temp">'+slideElement.selector+'.animate{-webkit-transform:translate3d(' + pixelOffset + 'px,0,0)}</style>').appendTo('head');
            $(this).addClass('animate').css('-webkit-transform', '');
            _updatePosition();
        }
    }

    function _updatePosition() {
        $('span.position').removeClass('current');
        $('span.position:nth-child(' + (currentSlide + 1) + ')').addClass('current');
    }
    _updatePosition();
    function _sliderForElement(elment){

    }
    function _mergeOptions(obj1,obj2){
        var obj3={};
        for (var attrname in obj1){ obj3[attrname] = obj1[attrname]; }
        for (var attrname in obj2){ obj3[attrname] = obj2[attrname]; }
    }
    //实例化Slider
    var slider=function(targetElm){
        if(typeof targetElm==='object'){
            return new Slider(targetElm);
        } else if (typeof targetElm==='string'){
            var targetElement=document.querySelector(targetElm);
            if(targetElement){
                return new Slider(targetElement);
            } else{
                throw new Error('There is no element with given selector.');
            }
        } else{
            return new  Slider(document.body);
        }
    };
    slider.fn=Slider.prototype={
        clone:function(){
            return new Slider(this);
        },
        setOptions:function(options){
            this._options=_mergeOptions(this._options,options);
            return this;
        },
        setOption:function(option,value){
            this._options[option]=value;
            return this;
        },
        slideStart:function(){
            _slideStart.call(this);
        },
        slideEnd:function(){
            _slideEnd.call(this);
            return this;
        },
        slide:function(){
            _slide.call(this);
            return this;
        },
        start:function(){
            //todo
            _sliderForElement.call(this,this._targetElement);
            return this;
        }
    };
    exports.slider=slider;
    return slider;
}));