/**
 * @param msg
 * @param func
 * @param title
 * @param innerHTML 用于自定义对话框内容。Added by PZP@2011-12
 * @param fopenBefore 打开对话框之前的回调。参数(div,title, msg)
 * @param fopenBefore 关闭对话框之前的回调。参数(div,title, msg)
 */
function showMsgDailog(msg,func,title, innerHTML, fopenBefore,fcloseBefore)
{
	var div = document.getElementById('dailog_msg');
	if(div){}
	else
	{
		var body = document.getElementsByTagName('body').item(0);
		div = document.createElement('div');
		div.id = "dailog_msg";        
		body.appendChild(div);
		
		//默认使用浏览器alert窗口 - PZP@2011-12
		if(typeof jQuery("#dailog_msg").dialog != 'function'){
			alert(msg);
			if(typeof func == 'function'){
				func();
			}
			return;
		}
	}
	div.title = title?title:(title="消息");
	div.innerHTML=(typeof innerHTML=='string')?innerHTML:("<p><span class=\"ui-icon ui-icon-circle-check\" style=\"float:left; margin:0 7px 50px 0;\"></span>"+msg+"</p>");
	jQuery(function() {
		if(typeof fopenBefore == 'function'){
			fopenBefore(div,title, msg);//对话框打开之前执行的回调
		}
		jQuery("#dailog_msg").dialog({
			autoOpen: true,
			modal: true,
			buttons: {
				"确定": function() {
					if(typeof fcloseBefore == 'function'){
						fcloseBefore(div,title, msg);
					}
					jQuery(this).dialog('close');					
					if(func){
						func();
					}
					//关闭第一层对话框，如果存在
					var boxMsg = $('#box_msg');
					if(boxMsg.length){
						boxMsg.dialog('close');
					}
				}
			}
		});
	});
}

function showMsgBox(pTitle,pUrl,pData,pWidth,pButtons,callback)
{
	var div = document.getElementById('box_msg');
	if(div){}
	else
	{
		var body = document.getElementsByTagName('body').item(0);
        div = document.createElement('div');
        div.id = "box_msg";
		body.appendChild(div);
	}
	div.title = pTitle?pTitle:"消息";
	jQuery(function() {
		jQuery("#box_msg").dialog({
			autoOpen: false,
			modal: true,
			width: pWidth,
			buttons: pButtons
		});
	});
	AjaxLoad(pUrl, pData, 'box_msg', function(){
		jQuery("#box_msg").dialog("open");
		//执行自定义回调
		if(typeof callback == 'function'){
			callback($(div));
		}
	});
}
function showInfo(msg,title,pWidth)
{
	var div = document.getElementById('dailog_info');
	if(div){}
	else
	{
		var body = document.getElementsByTagName('body').item(0);
        div = document.createElement('div');
        div.id = "dailog_info";
		body.appendChild(div);
	}
	div.title = title?title:"提示";
	div.innerHTML="<p>"+msg+"</p>";
	if(pWidth){
		jQuery(function() {
			jQuery("#dailog_info").dialog({
				autoOpen: true,
				show: 'blind',
				hide: 'explode',
				width: pWidth
			});
		});
		
	}else{
		jQuery(function() {
			jQuery("#dailog_info").dialog({
				autoOpen: true,
				show: 'blind',
				hide: 'explode'
			});
		});
	}	
}

//*************************//
//*****请用已封装方法替代以下方法***//
//*************************//

//给Checkbox提供全选功能
//请用 Parox.Form.CheckAll(self,filter)代替此方法
function CheckAll(self, filter)
{
	var all = self.checked;
	jQuery(filter).each(function(){		
		jQuery(this).prop('checked',all);
	});
}
//请用 Parox.Form.SelectGroupBox(self,prefix)代替此方法
 function SelectGroupBox(self, prefix)
 {
 	if(!prefix){prefix='';}
 	if(self.name=='SelectAll'+prefix){
 		var all = self.checked;
 		jQuery("input[name=SelectID"+prefix+"]").each(function(){jQuery(this).prop('checked',all);});
 	}else{
 		var all = true;
 		jQuery("input[name=SelectID"+prefix+"]").each(function(){
 			if(!jQuery(this).prop('checked'))
 				all=false;
 		});
 		jQuery("input[name=SelectAll"+prefix+"]").prop('checked', all);
 	}
 }
 //全选/反选/
 //请用 Parox.Form.SelectAll(self,prefix)代替此方法
 function SelectAll(self, prefix)
 {
 	if(!prefix){prefix='';}
 	var label=jQuery("#"+self.id).html();
 	var all = (label=='全选');
 	jQuery("input[@name=SelectID]").each(function(){jQuery(this).prop('checked',all);});
 	jQuery("#"+self.id).html(label=='全选'?'反选':'全选');	
 }
 //请用 Parox.Form.CheckedIds(frm,prefix)代替此方法
 function CheckedIds(frm,prefix)
 {
 	if(!prefix){prefix='';}
 	var ids = '';
 	jQuery("input[@name=SelectID"+prefix+"]").each(function(){if(jQuery(this).attr('checked'))ids+=','+jQuery(this).attr('value');});
 	if(ids.length>0)
 		ids = ids.substring(1);
 	return ids;
 }
 //检查Checkbox至少要选中一条
 //请用 Parox.Form.IsCheckedOne(frm,prefix)代替此方法
 function IsCheckedOne(frm,prefix)
 {
 	if(!prefix){prefix='';}
 	var one = false;
 	jQuery("input[@name=SelectID"+prefix+"]").each(function(){if(jQuery(this).attr('checked'))one=true;});
 	return one;
 }
 //url时间戳控制--请用 Parox.UrlTimeStamp(url)代替此方法
 function url2(url)
 {
	if (url.indexOf('?') == -1) {
    	url += "?";
    }
    else
        url += "&";
 	url += "timeStamp=" + new Date().getTime();
 	return url;
 }
 //请用 Parox.Ajax.AjaxGet(url, func)代替此方法
 function AjaxGet(url, func)
 {
	Ajax(url, '', 'GET', func);
 }
 //请用 Parox.Ajax.AjaxLoad(url, data, div, func)代替此方法
 function AjaxLoad(url, data, div, func) {
	if(jQuery(div).length>0){//property
		jQuery(div).html("<div class='text-center marg-10 padd-10 clearfix'><img alt='加载中...' src="+_CTX_PATH+"/images/common/ajax-loader.gif></div>");
		Ajax(url, data, 'LOAD', function(data){jQuery(div).html(data);if(func){func(data);}});
	}else{//id
		jQuery('#'+div).html("<div class='text-center marg-10 padd-10 clearfix'><img alt='加载中...' src="+_CTX_PATH+"/images/common/ajax-loader.gif></div>");
		Ajax(url, data, 'LOAD', function(data){jQuery('#'+div).html(data);if(func){func(data);}});
	}
 }
 
 //请用 Parox.Ajax.AjaxAppend(url, data, div, func)代替此方法
 function AjaxAppend(url, data, div, func) {
	if(jQuery(div).length>0){//property
		Ajax(url, data, 'LOAD', function(data){jQuery(div).append(data);if(func){func(data);}});
	}else{//id
		Ajax(url, data, 'LOAD', function(data){jQuery('#'+div).append(data);if(func){func(data);}});
	}
 }
 //请用 Parox.Ajax.AjaxPost(url, data, func)代替此方法
 function AjaxPost(url, data, func) {
	Ajax(url, data, 'POST', function(data){if(func){func(data);}} );
 }
 //请用 Parox.Ajax.Ajax(url, data, type, func)代替此方法
 function Ajax(url, data, type, func, completeFunc)
 { 	
    if (url.indexOf('?') == -1) {
    	url += "?";
    }
    else
        url += "&";
 	url += "timeStamp=" + new Date().getTime()

 	if(type=='GET')
 	{
 		jQuery.ajax({ url: url,
 			type: 'GET',
 			data: data,
 			cache: false,
 			timeout: 1000*180,
 			error: function() {alert('数据加载失败，可能是网络连接问题或者服务器错误。'); },
 			/*error:function(XMLHttpRequest, textStatus, errorThrown){  
 				alert(XMLHttpRequest.responseText)
				alert(textStatus)
				alert(errorThrown)
			},*/
 			success: func,
 			complete:function(XMLHttpRequest, textStatus){
 				var sessionstate=XMLHttpRequest.getResponseHeader("sessionstate"); //通过XMLHttpRequest取得响应头，sessionstatus， 
 				if(sessionstate=="timeout"){
 					alertLogin();
                }
 				if(completeFunc){
 					completeFunc(XMLHttpRequest,textStatus);
 				}
 			}
 		});
 	}else if(type=='LOAD')
 	{
 		jQuery.ajax({ url: url,
 			type: 'POST',
 			data: data,
 			dataType:"html",
 			cache: false,
 			timeout: 1000*180,
 			error: function() {alert('数据加载失败，可能是网络连接问题或者服务器错误。');},
 			/*error:function(XMLHttpRequest, textStatus, errorThrown){  
				alert(textStatus)
				alert(errorThrown)
			},*/
 			success: func,
 			complete:function(XMLHttpRequest, textStatus){
 				var sessionstate=XMLHttpRequest.getResponseHeader("sessionstate"); //通过XMLHttpRequest取得响应头，sessionstatus，  
 				if(sessionstate=="timeout"){
 					relogin();
                }
 				if(completeFunc){
 					completeFunc(XMLHttpRequest,textStatus);
 				}
 			}
 		});
 	}else if(type=='POST')
 	{	
 		//jQuery('.submit').each(function(){jQuery(this).attr('title',jQuery(this).html());jQuery(this).html('请稍候');jQuery(this).attr('disabled','disabled');});
 		jQuery.ajax({ url: url,
 			type: 'POST',
 			//data: j('#'+param).serialize(),
 			data: data,
 			cache: false,
 			timeout: 1000*180,
 			error: function() { 
 				alert('数据加载失败，可能是网络连接问题或者服务器错误。'); 
 			}, 
 			/*error:function(XMLHttpRequest, textStatus, errorThrown){  
				alert(textStatus)
				alert(errorThrown)
			},*/
 			success: func,
 			complete:function(XMLHttpRequest, textStatus){
 				var sessionstate=XMLHttpRequest.getResponseHeader("sessionstate"); //通过XMLHttpRequest取得响应头，sessionstatus，  
 				if(sessionstate=="timeout"){
 					alertLogin();
                }
 				if(completeFunc){
 					completeFunc(XMLHttpRequest,textStatus);
 				}
 			}
 		});
 	}
 }
 
 function PostData(opt)
 {	
	 var url = opt.url,
	 	data = opt.data||{},
	 	func = opt.func||function(data){},
	 	btn = opt.btn;
	 if(btn){
		 jQuery(btn).each(function(){jQuery(this).addClass('loader');jQuery(this).attr('disabled','disabled');});
	 }
	 Ajax(url, data, 'POST', func, function(XMLHttpRequest,textStatus){
		 if(btn){
			 jQuery(btn).each(function(){jQuery(this).removeClass('loader');jQuery(this).attr('disabled',false);});
		 }
	 });
 }
 
 function PostForm(url, frm, func)
 {	
	if (url.indexOf('?') == -1) {
    	url += "?";
    }
    else
        url += "&";
 	url += "timeStamp=" + new Date().getTime()
	//Ajax(url, frm, 'POST', ShowResult, true);
 	jQuery('#'+frm+' .btn-success').each(function(){jQuery(this).addClass('loader');jQuery(this).attr('disabled','disabled');});
	jQuery.ajax({ url: url,
		type: 'POST',
		data: jQuery('#'+frm).serialize(),
		cache: false,
		timeout: 20000,
		error: function() { alert('数据加载失败，可能是网络连接问题或者服务器错误。'); },
		/*error:function(XMLHttpRequest, textStatus, errorThrown){  
			alert(textStatus)
			alert(errorThrown)
		},*/
		success: func,
		complete:function(XMLHttpRequest, textStatus){
			var sessionstate=XMLHttpRequest.getResponseHeader("sessionstate"); //通过XMLHttpRequest取得响应头，sessionstatus，
			if(sessionstate=="timeout"){
				alertLogin();
            }
			jQuery('#'+frm+' .btn-success').each(function(){jQuery(this).removeClass('loader');jQuery(this).attr('disabled',false);});
		}
	});
	
 }
 
//请用 Parox.Ajax.PostCheckForm(url, frm, cnfirm, needchecked)代替此方法
 function PostCheckForm(url, frm, cnfirm, needchecked)
 {
	var doit=true;
	if(needchecked==true)
	{
		if(!IsCheckedOne())
		{
			alert('请至少选择一条记录');
			doit = false;
			return;
		}
	}
	if(cnfirm==true)
	{
		if(!confirm('你确定要执行该操作？'))
		{
			doit=false;
		}
	}
	if(doit)
	{
		if (url.indexOf('?') == -1) {
	    	url += "?";
	    }
	    else
	        url += "&";
	 	url += "timeStamp=" + new Date().getTime()
		//Ajax(url, frm, 'POST', ShowResult, true);
	 	jQuery('.submit').each(function(){jQuery(this).attr('title',jQuery(this).html());jQuery(this).html('请稍候');jQuery(this).attr('disabled','disabled');});
		jQuery.ajax({ url: url,
			type: 'POST',
			data: jQuery('#'+frm).serialize(),
			cache: false,
			//timeout: 20000,
			//error: function() { alert('数据加载失败，可能是网络连接问题或者服务器错误。'); },
			/**/error:function(XMLHttpRequest, textStatus, errorThrown){  
				alert(textStatus)
				alert(errorThrown)
			},
			success: ShowResult,
			complete:function(){jQuery('.submit').each(function(){jQuery(this).html(jQuery(this).attr('title'));jQuery(this).attr('disabled',false);});}
		});
	}
 }
 
 function ShowResult(result)
 {
	 var msg = result;
	 //eval( "msg = " + result );	 	
	if (msg.method != undefined) {
		console.log(msg.method);
         switch (msg.method) {
             case "eval":
                 eval(msg.data);
                 break;
             case "alert":
                 console.log(msg.data);
            	 showMsgDailog(msg.data);
                 break;
             case "goto":
                 window.location.href = msg.data;
                 break;
             case "send_goto":            	
                 //var data = eval('(' + msg.data + ')');
             	var data =  msg.data ;
                 //alert(data.message);
             	showMsgDailog(data.message,function(){window.location.href = data.url;});                
                break;
             case "reload":
                 //alert(msg.data);
            	 showMsgDailog(msg.data,function(){location.reload();});
                 break;
             case "error":
                 var data =  msg.data ;
             	//eval("data="+msg.data);
             	
                 var bo = true;
                 for (var o in data) {
                 	//alert(o)
                	 jQuery('#e_'+o).html(data[o]).show();
                 }
                 break;
         }
     }
 }
 
 function testJson(object) {
	var num = 0;
	var str = '';
	for ( var i in object) {
		//if(i.toLowerCase().indexOf('item')>0)
			str += ',' + i;
		console.log(i+':'+object[i]);
		num++;
	}
	if (str.length > 0)
		str = str.substring(1);
	console.log(str);
	//alert(Ext.util.JSON.encode(object));	
 }
