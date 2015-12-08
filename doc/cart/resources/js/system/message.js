
$(function(){  
	JS.Engine.on('notice', function(text){
		//$("#targetDiv").append("<span id='msgSpan' style='color:red'>" + text + "</span>");  
    	//console.log(text);
    	var styleClass='';
    	if(text.notices && text.notices.length>0){
    		$('#notice_count').html(text.notices.length);
        	$('#notice_count').show();
        	$('#notices_zone').empty();
        	$('#notices_zone').append($('<li class="bd-base-b"><p class="colorBlue font12 padd-20-l padd-20-r padd-5-t">您收到了'+text.notices.length+'条信息</p></li>'));
        	for(var i=0;i<text.notices.length;i++) {
        		if(text.notices[i].mtype==4 || text.notices[i].mtype==15){
        			styleClass = "paroxicon-at-on";
        		}else if(text.notices[i].mtype==11){
        			styleClass = "paroxicon-addmini-on";
        		}else if(text.notices[i].mtype==21 || text.notices[i].mtype==22){
        			styleClass = "paroxicon-workspaceadd-on";
        		}else if(text.notices[i].mtype==16){
        			styleClass = "paroxicon-share-on";
        		}else{
        			styleClass = "paroxicon-taskagain-on";
        		}
        		$('#notices_zone').append($('<li class="bd-base-b"><a href="#"><span class="paroxicon '+styleClass+'"></span>'+text.notices[i].summary+'</a></li>'));
        	}
        	$('#notices_zone').append($('<li><a href="'+_ctxPath+'/member/notice.htm" id="msgnext">查看所有信息<span class="paroxicon paroxicon-next-on pull-right"></span></a></li>'));
    	}
    });
    JS.Engine.start(_ctxPath+'/conn');
});


/*function init(){
	JS.Engine.on({
		start : function(cId,channels, engine){
			var str = '[start]:<br>'+
			'cId:'+cId+'<br>'+
			'channels:'+channels+'<br>';
			log('Engine_log',str);
			engine.addListener('sender',function(){
				log('Engine_log',"start事件后加事件<br>");
			});
		},		
		sender : function(data, time, engine){
			var str = '[sender]:<br>'+
			'data:'+data+'<br>'+
			'time:'+new Date(time).toLocaleString()+'<br>';
			log('Engine_log',str);
		},		
		stop : function(cause, cId, url, engine){
			var str = '[stop]:<br>'+
			'url:'+url+'<br>'+
			'cId:'+cId+'<br>'+
			'cause:'+cause+'<br>';
			log('Engine_log',str);
		}
	});
	st();
	JS.Engine.addListener('sender',function(){
		log('Engine_log',"start方法后加事件<br>");
	})
}	
function log(id,str){
	var t = document.getElementById(id).innerHTML;
	document.getElementById(id).innerHTML += str;
	document.getElementById(id).scrollTop = document.getElementById(id).scrollHeight;
}
function st(){
	JS.Engine.start('conn');
}

function stop(){
	JS.Engine.stop('客户主动停止');
}

function cls(){
	document.getElementById('Engine_log').innerHTML = '';
}*/