/* ========================================================================
 * Parox: core.js v0.1
 * the parox core js 
 * ========================================================================
 * Copyright 2014 Parox, Inc.
 *
 * ++++hetao++++2014/01/17++++
 *
 * 基于 bootstrap/jquery 做核心JS封装
 * 语法格式遵从 bootstrap.js 格式习惯书写
 * ======================================================================== */
 
(function (w, d) {  
    if (!window.Parox) {  
        window.Parox = {};  
    }  
    var location = window.location,  
    de = d.documentElement,  
    userAgent = navigator.userAgent.toLowerCase(),  
    ie6 = /msie 6.0/.test(userAgent),  
    opera = /opera/.test(userAgent),  
    ie = /msie/.test(userAgent) && !opera,  
    safari = /webkit/.test(userAgent),  
    ff = /firefox/.test(userAgent);  
    var tip = {  
        require : '缺少参数，参数必须的',  
        rule : '参数不合法'  
    };  
    var Pmain= {
        name : 'Parox Javascript Library',  
        version : '1.0',  
        debug : true,  
        namespace : function (name) {  
            var parts = name.split('.');  
            var current = Parox;  
            for (var i in parts) {  
                if (!current[parts[i]]) {  
                    current[parts[i]] = {};  
                }  
                current = current[parts[i]];  
            }  
        },  
        Dom : {  
            g : function (id) {  
                return typeof id === 'string' ? d.getElementById(id) : id;  
            },  
            remove : function (o) {  
                var obj = this.g(o);  
                if (!obj) {  
                    return;  
                }  
                return obj.parentNode.removeChild(obj);  
            },  
            setOpacity : function (obj, val) {  
                var vals = (typeof obj === "number" && val <= 100 && val >= 0) ? val : 100;  
                if (!obj) {  
                    return;  
                }  
                if (ie) {  
                    obj.style.filter = 'alpha(opacity=' + vals + ')';  
                } else {  
                    obj.style.opacity = vals / 100;  
                }  
            },  
            getMaxZindex : function (o) {  
                var maxZindex = 0;  
                var obj = o ? o : '*';  
                var divs = d.getElementsByTagName(obj);  
                for (z = 0; z < divs.length; z++) {  
                    maxZindex = Math.max(maxZindex, divs[z].style.zIndex);  
                }  
                return maxZindex;  
            },  
            createElement : function (type, prop) {  
                var tmp = d.createElement(type);  
                for (var i in prop) {  
                    tmp.setAttribute(i, prop[i]);  
                }  
                return tmp;  
            },  
            createTextNode : function (txt) {  
                return d.createTextNode(txt);  
            },  
            hasAttr : function (obj, attr) {  
                obj.getAttribute(attr);  
                return obj;  
            },  
            setAttr : function (obj, attr) {  
                var self = this;  
                for (var i in attr) {  
                    if (i === 'class') {  
                        self.addClass(obj, attr[i]);  
                    } else {  
                        obj.setAttribute(i, attr[i]);  
                    }  
                }  
                return obj;  
            },  
            removeAttr : function (obj, attr) {  
                obj.removeAttribute(attr);  
                return obj;  
            },  
            getClass : function (c, pd) {  
                var all = pd ? d.getElementsByName(pd).getElementsByTagName("*") : d.getElementsByTagName("*"),  
                str = "",  
                n = [];  
                for (var i = 0; i < all.length; i++) {  
                    if (Parox.Dom.hasClass(all[i], c)) {  
                        n.push(all[i]);  
                    }  
                }  
                return n;  
            },  
            addClass : function (o, str) {  
                var obj = this.g(o);  
                if (!obj) {  
                    return;  
                }  
                var className = obj.className;  
                var reg = eval("/^" + str + "$ | " + str + "$|^" + str + " | " + str + " /");  
                if (reg.test(className)) {  
                    return;  
                }  
                if (className !== '') {  
                    obj.className = className + " " + str;  
                } else {  
                    obj.className = str;  
                }  
            },  
            removeClass : function (o, str) {  
                var obj = this.g(o);  
                if (!obj) {  
                    return;  
                }  
                var className = obj.className;  
                if (this.isNull(className)) {  
                    var reg = new RegExp(str, "g");  
                    var n = className.replace(reg, "");  
                    obj.className = n;  
                }  
            },  
            hasClass : function (o, str) {  
                if (!o) {  
                    return;  
                }  
                var obj = this.g(o);  
                var className = obj.className;  
                var reg = eval("/^" + str + "$| " + str + "$|^" + str + " | " + str + " /");  
                if (reg.test(className)) {  
                    return true;  
                } else {  
                    return false;  
                }  
            },  
            html : function (obj, html) {  
                if (html) {  
                    obj.innerHTML = html;  
                } else {  
                    return obj.innerHTML;  
                }  
            },  
            text : function (obj, text) {  
                if (text) {  
                    if (document.textContent) {  
                        obj.textContent = text;  
                    } else {  
                        obj.innerText = text;  
                    }  
                } else {  
                    if (document.textConten) {  
                        return obj.textContent;  
                    } else {  
                        return obj.innerText;  
                    }  
                }  
            }  
        },  
        Events : {  
            addEvent : function (oTarget, oType, fnHandler) {  
                var self = this;  
                if (oTarget.addEventListener) {  
                    oTarget.addEventListener(oType, fnHandler, false);  
                } else if (oTarget.attachEvent) {  
                    oTarget.attachEvent('on' + oType, fnHandler);  
                } else {  
                    oTarget['on' + oType] = fnHandler;  
                }  
            },  
            removeEvent : function (oTarget, oType, fnHandler) {  
                var self = this;  
                if (oTarget.removeEventListener) {  
                    oTarget.removeEventListener(oType, fnHandler, false);  
                } else if (oTarget.detachEvent) {  
                    oTarget.detachEvent('on' + oType, fnHandler);  
                } else {  
                    oTarget['on' + oType] = null;  
                }  
            },  
            getEvent : function (ev) {  
                return ev || window.event;  
            },  
            getTarget : function (ev) {  
                return this.getEvent(ev).target || this.getEvent().srcElement;  
            },  
            stopPropagation : function () {  
                if (window.event) {  
                    return this.getEvent().cancelBubble = true;  
                } else {  
                    return arguments.callee.caller.arguments[0].stopPropagation();  
                }  
            },  
            stopDefault : function () {  
                if (window.event) {  
                    return this.getEvent().returnValue = false;  
                } else {  
                    return arguments.callee.caller.arguments[0].preventDefault();  
                }  
            }  
        },  
        Ready : function (loadEvent) {  
            if (!loadEvent) {  
                return;  
            }  
            var init = function () {  
                if (arguments.callee.done) {  
                    return;  
                } else {  
                    arguments.callee.done = true;  
                }  
                loadEvent.apply(d, arguments);  
            };  
            if (d.addEventListener) {  
                d.addEventListener("DOMContentLoaded", init, false);  
                return;  
            }  
            if (safari) {  
                var _timer = setInterval(function () {  
                        if (/loaded|complete/.test(d.readyState)) {  
                            clearInterval(_timer);  
                            init();  
                        }  
                    }, 10);  
            }  
            d.write('<script id="_ie_onload" defer src="javascript:void(0)"><\/script>');  
            var script = d.getElementById('_ie_onload');  
            script.onreadystatechange = function () {  
                if (this.readyState == 'complete') {  
                    init();  
                }  
            };  
            return true;  
        },  
        Storage : {  
            setItem : function (strName, strValue) {  
                if (Storage) {}  
                else if (Storage) {}  
                else {}  
  
            },  
            getItem : function (strValue) {},  
            removeItem : function (strValue) {},  
            removeAll : function () {}  
  
        },  
        getScript : function (obj, callback, order) {  
            var self = this,  
            arr = obj,  
            timeout,  
            ord = order || true,  
            num = 0,  
            str = typeof obj === 'string';  
            if (!arr) {  
                this.Error(tip.require);  
                return;  
            }  
            function add() {  
                if (arr[0] === undefined) {  
                    return;  
                }  
                var script = Parox.Dom.createElement("script", {  
                        'src' : (str ? obj : arr[num]),  
                        'type' : 'text/javascript'  
                    }),  
                header = d.getElementsByTagName("head")[0];  
                if (str) {  
                    if (script.readyState) {  
                        script.onreadystatechange = function () {  
                            if (script.readyState === 'loaded' || script.readyState === 'complete') {  
                                script.onreadystatechange = null;  
                                callback && callback();  
                            }  
                        };  
                    } else {  
                        script.onload = function () {  
                            callback && callback();  
                        };  
                    }  
                } else {  
                    if (arr.length >= 1) {  
                        if (script.readyState) {  
                            script.onreadystatechange = function () {  
                                if (script.readyState === 'loaded' || script.readyState === 'complete') {  
                                    script.onreadystatechange = null;  
                                    arr.shift();  
                                    timeout = setTimeout(add, 1);  
                                }  
                            };  
                        } else {  
                            script.onload = function () {  
                                arr.shift();  
                                timeout = setTimeout(add, 1);  
                            };  
                        }  
                    } else {  
                        clearTimeout(timeout);  
                        callback && callback();  
                    }  
                }  
                header.appendChild(script);  
            }  
            add();  
        },       
        Cookies : {  
            setCookie : function (sName, sValue, oExpires, sPath, sDomain, bSecure) {  
                var sCookie = sName + '=' + encodeURIComponent(sValue);  
                if (oExpires) {  
                    var date = new Date();  
                    date.setTime(date.getTime() + oExpires * 60 * 60 * 1000);  
                    sCookie += '; expires=' + date.toUTCString();  
                }  
                if (sPath) {  
                    sCookie += '; path=' + sPath;  
                }  
                if (sDomain) {  
                    sCookie += '; domain=' + sDomain;  
                }  
                if (bSecure) {  
                    sCookie += '; secure';  
                }  
                d.cookie = sCookie;  
            },  
            getCookie : function (sName) {  
                var sRE = '(?:; )?' + sName + '=([^;]*)';  
                var oRE = new RegExp(sRE);  
                if (oRE.test(d.cookie)) {  
                    return decodeURIComponent(RegExp[$1]);  
                } else {  
                    return null;  
                }  
            },  
            removeCookie : function (sName, sPath, sDomain) {  
                this.setCookie(sName, '', new Date(0), sPath, sDomain);  
            },  
            clearAllCookie : function () {  
                var cookies = d.cookie.split(";");  
                var len = cookies.length;  
                for (var i = 0; i < len; i++) {  
                    var cookie = cookies[i];  
                    var eqPos = cookie.indexOf("=");  
                    var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;  
                    name = name.replace(/^\s*|\s*$/, "");  
                    d.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";  
                }  
            }  
        },  
        tabSort : function (sTableID, iCol, sDataType) { //排序函数，sTableID为目标,iCol哪列排序，为必需，sDataType可选  
            var oTable = document.getElementById(sTableID);  
            var oTBody = oTable.tBodies[0];  
            var colDataRows = oTBody.rows;  
            var aTRs = [];  
            var len = colDataRows.length;  
            function convert(sValue, sDataType) { //类型转，根据不同类型数据排序，比如，整型，日期，浮点，字符串，接受两个参数，一个是值，一个是排序的数据类型  
                switch (sDataType) {  
                case "int":  
                    return parseInt(sValue);  
                case "float":  
                    return parseFloat(sValue);  
                case "date":  
                    return new Date(Date.parse(sValue));  
                default:  
                    return sValue.toString();  
                }  
            }  
            function geterateCompareTRs(iCol, sDataType) { //比较函数，用于sort排序用  
                return function compareTRs(oTR1, oTR2) {  
                    var vValue1,  
                    vValue2;  
                    if (oTR1.cells[iCol].getAttribute("value")) { //用于高级排序，比如图片，添加一个额外的属性来排序  
                        vValue1 = convert(oTR1.cells[iCol].getAttribute("value"), sDataType);  
                        vValue2 = convert(oTR2.cells[iCol].getAttribute("value"), sDataType);  
                    } else {  
                        vValue1 = convert(oTR1.cells[iCol].firstChild.nodeValue, sDataType);  
                        vValue2 = convert(oTR2.cells[iCol].firstChild.nodeValue, sDataType);  
                    }  
                    if (vValue1 < vValue2) {  
                        return -1;  
                    } else if (vValue1 > vValue2) {  
                        return 1;  
                    } else {  
                        return 0;  
                    }  
                };  
            }  
            for (var i = 0; i < len; i++) {  
                aTRs[i] = colDataRows[i];  
            }  
            if (oTable.sortCol == iCol) { //如果已经排序，则倒序  
                aTRs.reverse();  
            } else {  
                aTRs.sort(geterateCompareTRs(iCol, sDataType));  
            }  
            var oFragment = document.createDocumentFragment();  
            var trlen = aTRs.length;  
            for (var j = 0; j < trlen; j++) {  
                oFragment.appendChild(aTRs[j]);  
            }  
            oTBody.appendChild(oFragment);  
            oTable.sortCol = iCol; //设置一个状态  
        },  
        Browse : {  
            isIE : ie,  
            isFF : ff  
        },  
        trim : function (str) {  
            var re = /^\s*(.*?)\s*$/;  
            return str.replace(re, '$1');  
        },  
        escape : function (str) {  
            var s = "";  
            if (str.length === 0) {  
                return "";  
            }  
            s = str.replace(/&/g, "&amp;");  
            s = s.replace(/</g, "&lt;");  
            s = s.replace(/>/g, "&gt;");  
            s = s.replace(/ /g, "&nbsp;");  
            s = s.replace(/\'/g, "&#39;");  
            s = s.replace(/\"/g, "&quot;");  
            return s;  
        },  
        getQueryString : function (name) {  
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");  
            var r = location.search.substr(1).match(reg);  
            if (r !== null)  
                return unescape(r[2]);  
            return null;  
        },  
        Error : function (obj, info) {  
            if (!this.debug) {  
                return;  
            }  
            throw Error(obj);  
        },
        //面板类效果 hetao
		Panel:{
			// input 类
        	//@param oBtn触发按钮
        	//@param oPanel面板容器
			//@param marg边距
        	//@param intval浮出速度
        	//@param direction浮出方向（0:left,1:right,2:top,3:bottom）
			//++++++++可选向++++++++
			//@param id传递ID(如果有)
			//@param userId用户传递ID(如果有)
			//@param flag区分属于哪个块()
			//@param url提交链接(如果有)
			Toggle:function(options)
			{//oBtn,oPanel,barW,intval,direction,id,userId,flag,url
				var opts		= options||{};
				var oB 			= $(opts.oBtn)	 ||{},
					oP 			= $(opts.oPanel) ||{},
					marg		= opts.marg		 ||50,
					i			= opts.intrl     ||200,
					dir 		= opts.dir		 ||0;
				var oP_w 		= oP.width(),
				 	oP_h 		= oP.height();
				switch(dir){
					case 0:
						oP.css({'left':-oP_w,'top':marg});
						oB.on('click',function(event){
							if(!$(this).hasClass('active')){
								$(this).addClass('active');
								oP.animate({'left':0,'opacity':1},i);
								$(window).on('click',function(event){
									if(event.clientX>oP_w&&event.clientY>50){
										if(oB.hasClass('active')){
											oB.removeClass('active');
											oP.animate({'left':-oP_w,'opacity':0},i);
											$(this).off();
										}
									}
								});
								
							}else{
								$(this).removeClass('active');
								oP.animate({'left':-oP_w,'opacity':0},i);
							}
						});
						break;
					case 1:
						oP.css({'right':-oP_w,'top':marg});
						oB.on('click',function(event){
							if(!$(this).hasClass('active')){
								$(this).addClass('active');
								oP.animate({'right':0,'opacity':1},i);	
							}else{
								$(this).removeClass('active');
								oP.animate({'right':-oP_w,'opacity':0},i);
							}
						});
						break;
					case 2:
						oP.css({'top':-oP_h});
						oB.on('click',function(){
							if(!$(this).hasClass('active')){
								$(this).addClass('active');
								oP.animate({'top':marg,'opacity':1},i);
							}else{
								$(this).removeClass('active');
								oP.animate({'top':-oP_h,'opacity':0},i);
							}
						});
						break;
					case 3:
						oP.css({'bottom':-oP_h,'margin-top':marg});
						oB.on('click',function(){
							if(!$(this).hasClass('active')){
								$(this).addClass('active');
								oP.animate({'bottom':0,'opacity':1},i);	
							}else{
								$(this).removeClass('active');
								oP.animate({'bottom':-oP_h,'opacity':0},i);
							}
						});
						break;
					default:
						oP.css({'left':-oP_w,'top':marg});
						oB.on('click',function(){
							if(!$(this).hasClass('active')){
								$(this).addClass('active');
								oP.animate({'left':0,'opacity':1},i);	
							}else{
								$(this).removeClass('active');
								oP.animate({'left':-oP_w,'opacity':0},i);
							}
						});
						break;
				}
			},
        	//--
			ToggleDetail:function(options){
				var opts		= options||{};
				var oB			= $(opts.oBtn)	||{},
					oBI	 		= $(opts.oBtnId)||{},
					oP			= $(opts.oPanel)||{},
					//oC			= $(opts.oClose)||{},
					i			= opts.intrval	||200;
				var	oP_w		= oP.outerWidth();
					//！！！！此处将会留有隐患，占用了widow对象，做事件寄存，并且做事件释放，有空需要在做优化
					//！！！！如果当前项已经展开，如果点击当前项完成收起的动作时，依旧会产生AJAX请求，这个需要优化
					$(window).off('click');
					if(oBI.hasClass('edit')){
						//console.log(oB.hasClass('edit'));
						oB.siblings(opts.oBtnId).hasClass('edit')?oP.css({'right':-oP_w}).animate({'right':0},i):oP.animate({'right':-oP_w},i);
						oB.removeClass('edit');
					}else{
						if(oB.hasClass('edit')) oB.removeClass('edit');
						
							oP.css({'right':-oP_w}).animate({'right':0},i,function(){
								$(window).on('click',function(event){
									if($('body').width()-event.clientX>oP_w){
										oP.animate({'right':-oP_w},i);
										oB.removeClass('edit');
										$(this).off('click');
									}
								});
								
								oC=$('[data-btn="closedetails"]');
								oC.on('click',function(){
										oP.animate({'right':-oP_w},i);
										oB.removeClass('edit');
								});
								
							});
							oBI.addClass('edit');	
					}
			},
			//--
			AssignPanel:function(options){
				var opts = options||{};
				
				var _param		= opts.param	||{},//{taskId:para,flag:flag}
					_btn 		= $(opts.btn)	||{},
					_pn			= opts.panel	||{},
					_url		= opts.url		||{},
					_func		= opts.callback;
				_btn.on('click',function(event){
					var $this = $(this);
					var _id   = $this.attr('data-assign-id'),
						_flag = $this.attr('data-assign-flag'),
						_pns   = _pn+'_'+_flag+'_'+_id;
					var $pn	  = $('#'+_pns);
						console.log($pn);
					if($this.hasClass('p-h-r')){
						$this.removeClass('p-h-r');
						//console.log(_id+"----"+_flag);
						var _p	= JSON.parse('\{"taskId"\:'+_id+'\, "flag"\:'+_flag+'\}');
						$.extend(_p,_param);
						//console.log(_pn);
						AjaxLoad(_url,_p, _pns, function(data){if(_func){_func(data);} $('input').iCheck({ checkboxClass:'icheckbox_polaris', increaseArea:"-20"});});
						$pn.show(100);
						$this.toggleClass('active').removeClass('p-h-r').html('&and;');
						
					}else{
						$pn.hide(100);
						$this.toggleClass('active').addClass('p-h-r').html('&or;');
					}
				});
			}
		},
        //修改信息面板
        modElement:{
        	// input 类
        	//@param id触发项
        	//@param handler容器句柄
        	//@param placeHolder提示信息
        	//@param url内容提交链接
        	Input:function(options){
        		var P		= options||{};
        		
        		var otherParams	= P.params||{},
        			hdr  		= $('[data-edit='+P.handler+']')||{},
        			_inputName	= P.name||{},
        			phr			= P.placeHolder||'添加描述',
        			u			= P.url||{},
        			_func		= P.callback;
        			
    			hdr.on('click',function(){
    				var $this = $(this);
    				if($this.has('input').length==0){
    					var _editArea 	= hdr.children('[data-edit-area="'+P.handler+'"]');
    					var _initVal 	= _editArea.text();
	        			var _area		= '\<input type="text" value='+_initVal+' placeholder='+phr+' data-edit-ipt="'+_inputName+'" name="'+_inputName+'"  class="modElement-ipt col-lg-12 text-muted"  \/\>';
	        			_editArea.html(_area);
	        			var $ipt 		= $('[data-edit-ipt='+_inputName+']');
	        			$ipt.focus();
	        			$ipt.on('focusout keydown',function(event){
	        				//鼠标已出焦点or键盘回车发送提交
	        				if(event.keyCode==13||event.type=='focusout'){
	        					var valNow=$(this).val().trim();
	        					if(typeof(valNow)!=undefined && _initVal!=valNow){
	        						if(valNow=='')valNow=phr;
		        					var _p=JSON.parse('{"'+_inputName+'":"'+valNow+'"}');
	        						$.extend(_p,otherParams);
	        						AjaxPost(u,_p,function(data){_editArea.html(valNow);if(_func){_func(data);}});
	        					}else{						
	        						_editArea.html(_initVal);
	        					}		        				
	        				}
	        			});
    				}
        			//--
        		});
        		//--
        	},
        	SelectArea:function(options){
        		var opts = options||{};
        		
        		var otherParams = opts.params||{},
        			hdr			= $('[data-edit ='+opts.handler+']')||{},
        			u			= opts.url||{},
        			_func		= opts.callback;
        		
        		hdr.on('change',function(){
        			var _provinceId = $('select[name=provinceId]').val();
    				var _cityId 	= $('select[name=cityId]').val();
    				var _countyId	= $('select[name=countyId]').val();
        			console.log(_countyId);
        			
        			if(_provinceId!=''&&_cityId!=''&&_countyId!=''){
        				var _p = JSON.parse('{"provinceId":'+_provinceId+',"cityId":'+_cityId+',"countyId":'+_countyId+'}');
        				$.extend(_p,otherParams);
        				console.log(_p);
        				AjaxPost(u,_p,function(data){if(_func){_func(data);}});
        			}
        		});
        	},
        	//分配&跟踪
			Assign:function(options){
				console.log("分配");
				var opts = options||{};
				var btn  = $(opts.btn)||{};
				//if(){
					//AjaxPost(u,_p,function(data){});
				//}
				
				btn.on('triggle',function(){
					
				});
			},
			//截止时间
			Endtime:function(options){
				var opts = options||{};
				
				var otherParams	= opts.params||{},
	    			hdr  		= $('#'+opts.handler)||{},
	    			_inputName	= opts.name||opts.handler,
	    			phr			= opts.placeHolder||'无截止日期',
	    			initVal=valNow		= hdr.html(),
	    			u			= opts.url||{},
	    			_func		= opts.callback;
	    			
    			hdr.on('click',function(e){
    				var $this = $(this);
    				if(!$this.has('input').length==1){
    					var ipt = '<input type=\"text\" id=\"close-date\" placeholder=\"'+phr+'\" class=\"date bgWhite cur-p bd-un-style bg-un-style padd-un\" name="'+_inputName+'"  data-date=\"\" data-date-format=\"yyyy-mm-dd hh\:ii\:ss" data-link-field=\"close-date\" data-link-format=\"yyyy\-mm\-dd\ hh\:ii\:ss" readonly \/\>';	
    					$this.html(ipt);
    					
    					/*calendar param
    					* plugin datetimepicker
    					*/
    					$('[data-link-field="close-date"]').datetimepicker({
    						language:'zh-CN',
    						weekStart: 1,
    						todayBtn:  1,
    						autoclose: 1,
    						todayHighlight: 1,
    						startView: 2,
    						minView: 0,
    						maxView: 4,
    						forceParse: 0,
    						format:'yyyy-mm-dd hh:ii:ss'
    					});
    					
    					var closedate = $('#close-date');
    					
    					closedate.focus();
    					closedate.on('change',function(){
    						
    						valNow = $(this).val();
    						
    						if(valNow!='' && typeof(valNow)!=undefined){
        						if(initVal!=valNow){
        							var _p=JSON.parse('{"'+_inputName+'":"'+valNow+'"}');
	        						$.extend(_p,otherParams);
	        						AjaxPost(u,_p,function(data){hdr.html(valNow);initVal=valNow;if(_func){_func(data);}});
        						}
        					}else{
        						hdr.html(phr);
        					}
    					});
    					
    				}
    			});
			},
			//任务标签
			Tags:function(options){
				var opts = options||{};
				
				var otherParams	= opts.params||{},
	    			hdr  		= $('#'+opts.handler)||{},
	    			tga			= $('#'+opts.area)||{},
	    			phr			= opts.phr	||'请输入标签',
	    			_inputName	= opts.name ||'',
	    			u			= opts.url  ||'',
	    			_func		= opts.callback;
	    			
	    		hdr.on('click',function(event){
	    			var ipt = '<li><input type=\"text\" value=\"\" placeholder=\"'+phr+'\" id=\"addtagsIpt\" name="'+_inputName+'"  class="modElement-ipt col-lg-12 text-muted padd-5-l" style="top:3px" \/\><\/li>';
	    			tga.append(ipt);
	    			var $ipt = $('#addtagsIpt');
	    			$ipt.focus();
	    			$ipt.on('focusout keydown',function(event){
	    				if(event.keyCode==13||event.type=='focusout'){
		    				var valNow = $ipt.val();
		    				if(valNow!='' && typeof(valNow)!=undefined){
		    					var tagsItems = '<li class=\"p-o\"><a href=\"#\" class=\"marg-un-t\">'+valNow+'<\/a><span class=\"delete p-o-r\"  data-toggle="tooltip" data-placement="bottom" data-original-title="删除" title="删除">&times;<\/span><\/li>';
		    					var _p=JSON.parse('{"'+_inputName+'":"'+valNow+'"}');
        						$.extend(_p,otherParams);
        						//console.log(_p);
        						AjaxPost(u,_p,function(data){$ipt.parent().remove();$ipt.remove();tga.append(tagsItems);if(_func){_func(data);}});
		    				}else{
		    					$ipt.parent().remove();
		    					$ipt.remove();
		    				}
	    				}
	    			});
	    		});
			},
			//检查项
			CheckItems:function(options){
				var opts = options||{};
				
				var otherParams	= opts.params||{},
	    			hdr  		= $('#'+opts.handler)||{},
	    			chka		= $('#'+opts.area)||{},
	    			phr			= opts.phr	||'请输入检查项名称',
	    			_inputName	= opts.name ||'',
	    			u			= opts.url  ||'',
	    			iptId		= '',
	    			_func		= opts.callback;
	    			
	    		hdr.on('click',function(event){
	    			var ipt = '<li><input type="text" placeholder=\"'+phr+'\" id=\"chiAddIpt\" name="'+_inputName+'"  class="modElement-ipt col-lg-12 text-muted padd-5-l" style="top:3px" \/><\/li>';
	    			chka.append(ipt);
	    			var $aIpt = $("#chiAddIpt");
	    			$aIpt.focus();
	    			$aIpt.on('focusout keydown',function(event){
	    				if(event.keyCode==13||event.type=='focusout'){
	    					var valNow = $aIpt.val();
	    					if(valNow!='' && typeof(valNow)!=undefined){
		    					var _p=JSON.parse('{"'+_inputName+'":"'+valNow+'"}');
	    						$.extend(_p,otherParams);
	    						//console.log(_p);
	    						AjaxPost(u,_p,function(data){$aIpt.parent().remove();$aIpt.remove();if(_func){_func(data);}});
	    						var checkItems = '<li><input type="checkbox" data-items-x="" \/> '+valNow+'<\/li>';
	    						chka.append(checkItems);
								$('[data-items-x=""]').iCheck({ checkboxClass:'icheckbox_polaris', increaseArea:"-20"});
							}else{
								$aIpt.parent().remove();
	    						$aIpt.remove();
							}
	    				}
	    			});
	    		});
			},
			//附件
			Accessory:function(){
				
			}
        },
        //--
        //对话框
		Dialog:{
			//消息窗口
			Msg:function(options){
				var P = options||{};
				
				var info	= P.info  ||'人艰不拆啊！',
					type	= P.type  ||'info',//danger/info/success/warning
					auto	= P.auto  ||1;//是否自动隐藏
					i		= P.intrval ||5000;//自动隐藏时间
				
				var pdId	= 'ph'+Math.floor(Math.random()*1000000);
				
				var temp = '<div class="'+pdId+' alert alert-'+type+' fade in marg-20-l marg-20-r" role="dialog"  tabindex="-1">';
					temp +='<button type="button" class="close" data-dismiss="p-alert" >&times;</button>';
					temp +='<p>'+info+'</p>';
					temp +='</div>';
				$('.container').prepend(temp);
				//$('#'+pdId).alert('close');
				var pI 	= $('.'+pdId),
					t	= setTimeout();
				var closeBtn = $('[data-dismiss="p-alert"]');
					closeBtn.on('click',function(){
						pI.slideUp(300);
						setTimeout(function(){pI.alert('close');},300);
					});
					
					if(auto){
						t=setTimeout(function(){
							pI.slideUp(300);
							setTimeout(function(){pI.alert('close');},300);
						},i);
						
						pI.hover(function(){
							clearTimeout(t);
						},
						function(){
							t=setTimeout(function(){
								pI.slideUp(300);
								setTimeout(function(){pI.alert('close');},300);
							},i);
						});
					}
			},
			//警告窗口
			Alert:function(options){
				var P 		= options 	||{};
				var info	= P.info  	||'人艰不拆啊！',
				 	tit		= P.tit   	||'好了！可以下班了！Go home！！' ,
				 	btn		= P.hasBtn	||1,//是否有自定义信息按钮
					btnOK	= P.btnOK 	||'好的！我知道了！';
					type	= P.type  	||'default',//default/primary/danger/success/warning/
					auto	= P.auto  	||0;//是否自动隐藏
					i		= P.intrval  ||2000;
				var	pdId	= 'ph'+Math.floor(Math.random()*1000000);
				
				var temp ='<iframe src=\"javascript:false\" style="position:absolute; visibility:inherit; top:0px; left:0px; width:100%; height:100%; z-index:-1; border:0; filter=progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0);"><\/iframe>';
				 	temp+='<div class="modal fade in" tabindex="-1" role="dialog" aria-labelledby="'+tit+'" aria-hidden="true" style="display:block" id="'+pdId+'">';
					temp+='<div class="modal-dialog">';
					temp+='<div class="modal-content">';
					temp+='<div class="modal-header">';
					temp+='<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>';
					temp+='<h4 class="modal-title">'+tit+'</h4>';
					temp+='</div>';
					temp+='<div class="modal-body">';
					temp+='<p>'+info+'</p>';
					temp+='</div>';
					
					if(btn){
						temp+='<div class="modal-footer">';
						temp+='<button type="button" class="btn btn-'+type+'" data-dismiss="modal">'+btnOK+'</button>';
						temp+='</div>';
					}
					
					temp+='</div>';                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
					temp+='</div>';
					temp+='</div>';
					
					$('body').append(temp);
				
				var pdDiv 	= $('#'+pdId),
					t		= setTimeout();
					pdDiv.modal('show');
					
					if(auto){
						t = setTimeout(function(){
							pdDiv.modal('hide');
							setTimeout(function(){pdDiv.remove();},500);
						},i);
						
						pdDiv.hover(function(){
										clearTimeout(t);
									},
									function(){
										pdDiv.modal('hide');
										setTimeout(function(){pdDiv.remove();},500);
									});
					}
					
					pdDiv.on('hidden.bs.modal',function(e){
						pdDiv.remove();
						$('body').removeClass('modal-open');
					});
					
					
			},
			//--
			Popover:function(opt){},
			//--
			Confirm:function(opt){},
			//--
			Login:function(opt){
				/*
				var temp ='<form class="form-signin" action="${base}/login/" method="post" data-remote="true">'
		      	<input type="hidden" name="processUrl" value="${processUrl!}">
		      	<input type="hidden" name="returnUrl" value="${returnUrl!}">
		        <h2 class="form-signin-heading">请登录</h2>
		        
			      <!-- 临时添加  注册链接  start -->
			      <a style="position:relative;left:265px;top:-35px;z-index:999;" href="${base}/register">注册</a>
			      <!-- 临时添加  注册链接  end -->
		        <input name="username" type="text" class="form-control" placeholder="邮箱/用户名" required autofocus>
		        <input name="password" type="password" class="form-control" placeholder="密码" required>
		        
		        <label class="checkbox">
		          <input type="checkbox" value="remember-me"> 记住我
		        </label>
		        <button class="btn btn-lg btn-primary btn-block" type="submit">登录</button>
		      </form>
		      */
			}
		}
    };
    $.extend(Parox, Pmain);
    Px = Parox;
})(window, document);
