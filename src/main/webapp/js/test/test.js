jQuery(document).ready(function(){
	
	
	
	jQuery("#start").click(function(){
//		var url = mock.getRoot()+$("input[name=url]:checked").val()+$("#pathparam").val();
		var url = mock.getRoot()+$("#url").val()+$("#pathparam").val();
		var method=$("input[name=method]:checked").val();
		var postType=$("input[name=postType]:checked").val();
		var pushData = $("#pushData").val();
		doAjax(url, method, postType, pushData);
	});
	
//	initTestLevel();
	
	initUrls(0);
	
	$("#testLevelSel").change(function(){
		initUrls($(this).val())
	});
});

function initUrls(testLevel){
	
	$("#urlContent").empty();
	
	$(urls.model).each(function(idx, obj){
		var header=$("<div style='font-weight: bold;cursor:pointer;'>"+obj.name+"：</div>");
		$("#urlContent").append(header);
		
		var body=$("<div style='display:;' ></div>");
		body.hide();
		
		$("#urlContent").append(body);
		
//		$(urls.betestUrl[obj.k]).each(function(i,o){
		var urlofmodel = urls.get(obj.k, testLevel);
		header.append("("+urlofmodel.length+")")
		
		$(urlofmodel).each(function(i,o){
			var urldom= $("<div name='url-body' style='padding:3px;'></div>");
			
			var label=$("<label></label>");
			label.append("<input type='radio' name='url' />");
			
			var urltext=$("<span ></span>");
			urltext.append(o.url);
			if(typeof o.pathid!="undefined"){
				urltext.append("{"+o.pathid+"}");
			}
			urltext.append(" ").append("<font color='#336600' >"+(o.method||method.GET)+"</font>").append(" ").append(o.author);
			
			var testlevel=o.test||0;
			
			urltext.append(" <font color='"+TEST_LEVEL_COLOR[testlevel]+"' >"+TEST_PROGRESS[testlevel]+"</font>");
			label.append(urltext);
			urldom.append(label);
			
			var message=$("<div name='msg' style='display:none;'></div>");
			$(o.error).each(function(ei, eo){
				message.append("<div style='color:red'>"+eo+"</div>")
			});
			$(o.require).each(function(ri, ro){
				message.append("<div >"+ro+"</div>")
			});
			
			urldom.append(message);
			
			urltext.click(function(){
				$("div[name='msg']").hide();
				message.show();
				
				$("div[name='url-body']").css("background-color","white");
				urldom.css("background-color","#ccc");
				
				fillPost(o);
			});
			
			body.append(urldom);
		});
		
		header.click(function(){
			body.toggle();
		});
	});
	
}

function fillPost(o){
//	alert(JSON.stringify(o))
	$("#url").val(o.url);
	$("#pushData").val(mock.get(o.mockdata));
	var m= o.method||method.GET;
	$("input[name=method][value="+m+"]").prop("checked",true);
	var pt= o.postType||postType.PayLoad;
	$("input[name=postType][value='"+pt+"']").prop("checked",true);
}

function doAjax(url, method, postType, pushData){
	
	$("#msg").html("");
	$("#errorMsg").html("");
	
	$.ajax({
		url:url,
		contentType: postType,
		data: pushData,
		dataType:"json",
		type:method,
		success:function(responseText, textStatus, jqxhr){
			var status = "<div ><b >状态：</b> "+jqxhr.status+"</div>";
			var statusText = "<div><b >返回值：</b> "+jqxhr.statusText+"</div>";
			$("#msg").html(status+statusText);
			$("#msg").append("<div><b>URI：</b>"+url+"</div>");
			$("#msg").append("<div><a target='_blank' href='http://tool.oschina.net/codeformat/json' >OSCHINA JSON格式化</a></div>")
			$("#msg").append("<div style='color:#336600;'>"+JSON.stringify(responseText)+"</div>");
		},
		error:function(req, textStatus,errorThrown){
			var status = "<div ><b >状态：</b> "+req.status+"</div>";
			var statusText = "<div><b >返回值：</b> "+req.statusText+"</div>";
			
			$("#msg").html(status+statusText);
			$("#msg").append("<div><b>URL：</b>"+url+"</div>");
			$("#msg").append("<div><a target='_blank' href='http://tool.oschina.net/codeformat/json' >OSCHINA JSON格式化</a></div>");
			$("#msg").append("<div>"+req.responseText+"</div>");
		}
	});
}
