/* 
 * Name    : Parox Common JavaScript Library v1.0
 * Author  : parox
 * Date    : 2014-2-17 16:30 
 */
(function (w, d) {  
	if (!window.Parox) {  
		window.Parox = {};  
	}  
	var location = window.location;

	/**
	 * 异步更新parentSelectName的子select:jq_cselect(select的jQuery对象)。
	 * 
	 * 关于parentSelectName的说明：
	 * 1.当该函数被当做普通函数方式调用时，parentSelectName的形式应该为，
	 *"parent select name=parent select ID"，并且Id为parent_id的Select的
	 *parentSelectName格式为parentId;
	 *
	 * 2.否则，以call模式调用时，"parent select name";
	 */
	var Pext={
		Area:{
			asyncUpdateChildSelect : function(url,parentSelectName,jq_cselect,hasDef,callback){
				//alert("2:"+$);
				var val=null, parentId = null, i = 0;
				if(this!=Parox.Area){
					//zby 2014.4.3 修改了省份切换以后区县数据没有清空的问题
					//val = $(this).val()||$(this).attr($(this).attr('name'));
					val = $(this).val();
				}
				if(!val){
					jq_cselect.empty();
					if(hasDef){
						jq_cselect.append($('<option value="">==请选择==</option>'));
					}
					//以下代码兼容选项可选的父级select
					i = parentSelectName.indexOf('=');
					if(i>0){
						parentId = $.trim(parentSelectName.slice(0,i));
					}else{
						parentId = $.trim(parentSelectName);
					}
					parentId = parentId.slice(0,-2)+"_id";					
					if($.trim($('#'+parentId).val()) === ''){
						return;
					}
				}
				//console.log(parentId+':'+val);
				AjaxPost(url,
						(this==Parox.Area)?"parentId":("parentId="+val),
								function(list){
							if(typeof(list)=="string"){
								list = eval(list);
							}
							var i = 0,size = list.length,opt = null;
	
							jq_cselect.empty();
							if(hasDef){
								jq_cselect.empty();
								jq_cselect.append($('<option value="">==请选择==</option>'));
							}
							for(; i<size;++i){
								opt = $('<option></option>');
								opt.val(list[i].id);
								opt.text(list[i].name||'');
								opt.attr('title', (list[i].name||''));
								jq_cselect.append(opt);
							}
							jq_cselect.change();
							//alert(jq_cselect.attr('name')+":"+jq_cselect.val());
	
							if(callback && typeof callback=="function"){
								//alert('callback');
								callback(jq_cselect);
							}
						});
			}
		},

		Member : {
			updateProfile : function(params,_callback){
				params = params||{};
				AjaxPost(_ctxPath+'/settings/updateProfile.htm', params, function(data){if(_callback){_callback(data);}});
			},
			updateAccount : function(params,_callback){
				params = params||{};
				AjaxPost(_ctxPath+'/settings/updateAccount.htm', params, function(data){if(_callback){_callback(data);}});
			}
		},

		Activity : {
			list : function (_zone, params, obj){
				params = params||{};            
				if(obj){
					//$(obj).parent().parent().hide(500);
					$(obj).parent().parent().hide();
				}
				AjaxAppend(_ctxPath+'/front/activity/appendList.htm', {
					count:5,
					actId:params.actId,
					userId: params.userId,
					spaceId: params.spaceId
				}, _zone, function(){
				});
			},
			page : function (_zone, _pagenum){
				AjaxLoad(_ctxPath+'/front/activity/ajaxList.htm', {
					count:5,
					pageNo:_pagenum
				}, _zone, function(){
				});
			},
			moreSubs : function (_subs_id){
				//$("#"+_subs_id).next().hide(500);
				//$("#"+_subs_id).next().hide();		
	
				$("#"+_subs_id+" li").each(function(){
					var item = $(this);
					if(item.index()>1){
						if(item.hasClass("hidden")){
							item.removeClass("hidden");
							item.animate({display:'block'},'slow');
							//item.show(500);
							item.show();
							$("#"+_subs_id).next().find('a').text('隐藏');
						}else{
							item.addClass("hidden");
							item.animate({display:'none'},'slow');
							//item.show(500);
							item.hide();
							$("#"+_subs_id).next().find('a').text('展开');
						}
					}	
				});
			}
		},

		Org : {
			update : function(params,_callback){
				params = params||{};
				AjaxPost(_ctxPath+'/organization/update.htm', params, function(data){if(_callback){_callback(data);}});
			},
			add : function ()
			{
				var div = document.getElementById('paroxModal-org');
				if(div){}
				else
				{
					var body = $('body');
					var html = '<!--*创建一个新的组织*-->';
					html += '<div class="modal fade in" tabindex="-1" role="dialog" id="paroxModal-org" aria-labelledby="创建一个新的组织" aria-describedby="创建一个新的组织" aria-hidden="true">';
					html += '<div class="modal-dialog">';
					html += '<form id="form-addorg" role="form" action="${base}/orgAdd" method="post" data-remote="true">';
					html += '<div class="modal-content">';
					html += '<!--*标题*-->';
					html += '<div class="modal-header bgGray-f5"> <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button> <h4>创建新组织</h4> </div>';
					html += '<!--*创建项*-->';
					html += '<div class="modal-body clearfix">';
					html += '<div class="form-group"> <label for="ct-workname">你的组织叫什么？</label> <input type="text" id="orgname" class="form-control" required /> </div>';
					html += '<div class="form-group"> <label>头像上传</label> </div>';
					html += '</div>';
					html += '<!--*提交创建*-->';
					html += '<div class="modal-footer bd-t-un-style"> <button class="btn btn-success btn-addorg" data-dismiss="modal">创建</button> <button class="btn btn-default" data-dismiss="modal">取消</button> </div>';
					html += '</div>';
					html += '</form>';
					html += '</div>';
					html += '</div>';
					$(body).append($(html));
					//绑定提交按钮的click事件submit
					$('.btn-addorg').each(function(){
						$(this).on('click',function(){
							Parox.Org.check('#orgname');
						});
					});
				}
			},
			//参数形式写入上面方法
			check : function (or)
			{ 
				var orgname = $(or).val();
				if(orgname!=""){
					alert(orgname);
					AjaxPost(_ctxPath+'/organization/orgCheck.htm',{orgname:orgname},function(data){
						var jsonData = data;
						if(jsonData.code==1){
							alert(jsonData.msg);
							Parox.Org.sub(orgname);
						}
						else{
							alert(jsonData.msg);
							alert("组织创建失败123！");
						}
					});
				}
				else{
					alert("组织名不能为空！");
				}
				
			},
			sub : function (or)
			{ 
				var orgname = $(or).val();
				if(orgname!=""){
					alert(orgname);
					AjaxPost(_ctxPath+'/organization/orgAdd.htm',{orgname:orgname},function(data){
						alert(data.message);
					});
				}
				
			},
			leave : function ()
			{
				alert("leave");
				AjaxPost(_ctxPath+'/organization/leave.htm',function(data){
					alert(data.message);
				})
			},
			del : function (id)
			{
				alert("delete");
				AjaxPost(_ctxPath+'/organization/orgDel.htm',{orgId:id},function(data){
					alert(data.message);
				})
			}
		},

		Space : {

			add : function(_orgid)
			{
				AjaxGet(_ctxPath+'/organization/orgList.htm', function(data){
					if(_orgid){
						Parox.Space.showUI(data,_orgid);
					}else{
						Parox.Space.showUI(data);
					}
				});
				/*var data={list:[{orgId:1,orgName:'daoman'},{orgId:2,orgName:'3333'},{orgId:3,orgName:'666'}]};
	    		if(_orgid){
	    			Parox.Space.aaa(data,_orgid);
	    		}else{
	    			Parox.Space.aaa(data);
	    		}*/    		
			},
			showUI : function(data,_orgid){

				var modalId='paroxModal-space';
				var div = document.getElementById(modalId);
				if(div){
					$('#'+modalId).modal('hide');					
					$('#'+modalId).next().remove();
					$('#'+modalId).remove();					
				}
				
				var org_sel='';
				if(data && data.list){
					for(var i=0;i<data.list.length;i++){
						if(_orgid!=null && _orgid==data.list[i].orgId){
							org_sel += '<option value="'+data.list[i].orgId+'" selected>'+data.list[i].orgName+'</option>';
						}else{
							org_sel += '<option value="'+data.list[i].orgId+'">'+data.list[i].orgName+'</option>';
						}	
					}
				}
				var body = $('body');
				var html = '';
				html += '<div class="modal fade in" tabindex="-1" role="dialog" id="'+modalId+'" aria-labelledby="创建一个新的工作空间" aria-describedby="创建一个新的工作空间" aria-hidden="true" style="display: none;">';
				html += '<div class="modal-dialog">';
				html += '<form id="form-addspace" role="form" action="${base}/spaceAdd" method="post" data-remote="true">';
				html += '<div class="modal-content">';
				html += '<!--*标题*-->';
				html += '<div class="modal-header bgGray-f5"> <button type="button" class="close" data-dismiss="modal" ria-hidden="true">&times;</button> <h4>创建空间</h4> </div>';
				html += '<!--*创建项*-->';
				html += '<div class="modal-body clearfix">';
				html += '<div class="col-md-8">';
				html += '<div class="form-group"> <label for="ct-organize">你需要在哪个组织下创建工作空间</label> <select class="form-control" id="orgid-sel"> <option value="">选择你的组织</option> '+org_sel+' </select> </div>';
				html += '<div class="form-group"> <label for="ct-workname">命名新的工作空间</label> <input type="text" id="spacename" class="form-control" required /> </div>';
				html += '<div class="form-group">';
				html += '<label>开放设置 <a href="#" target="_blank" title="操作有疑问？查看帮助:)"><span class="paroxicon paroxicon-question"></span></a></label>';
				html += '<div class="radio"> <label> <input type="radio" name="stype" value="0" checked /> 内部群组  </label> </div>';
				html += '<div class="radio marg-20-t"> <label> <input type="radio" name="stype" value="1"> 外部网络  </label> </div>';
				html += '<div class="radio"> <label> <input type="radio" name="permission" value="1" checked/> 公开  </label> </div>';
				html += '<div class="radio marg-20-t"> <label> <input type="radio" name="permission" value="0"> 私人  </label> </div>';    	         
				html += '</div>';
				html += '</div>';
				html += '<!--浏览已有空间-->';
				html += '<div class="col-md-4 well"> <h5 class="h-weight">加入已有的工作空间？</h5> <p> 搜寻已有的工作空间，并加入。<br /> <br /> <br /> <br /> </p> <p class="text-right"> <a href="#">浏览已有空间&rarr;</a> </p> </div>';
				html += '</div>';
				html += '<!--*提交创建*-->';
				html += '<div class="modal-footer bd-t-un-style"> <button class="btn btn-success btn-addspace" data-dismiss="modal">创建并邀请</button> <button type="button" class="btn btn-default" data-dismiss="modal">取消</button> </div>';
				html += '</div>';
				html += '</form>';
				html += '</div>';
				html += '</div>';
				//div.innerHTML=html;
				//body.appendChild(div);
				$(body).append($(html));
				//alert("spacediv拼接成功");
				$('#'+modalId).modal('show');
				$('.btn-addspace').click(function(){
					Parox.Space.check('#spacename','#orgid-sel','#stype','#permission');
				});
			},
			//校验空间名
			/**
			 * TODO 变量定义冗余，到时候需要改一下
			 */
			check : function (_sname,_orgid,_stype,_permission)
			{ 
				var spacename = $(_sname).val();
				var orgid = $(_orgid).val();
				var stype = $('input[name="stype"]:checked').val();
				var permission = $('input[name="permission"]:checked').val();
				if(spacename!=""){
					alert(spacename);
					AjaxPost(_ctxPath+'/workspace/spaceCheck.htm',{spacename:spacename},function(data){
						var jsonData = data;
						if(jsonData.code==1){
							alert(jsonData.msg);
							Parox.Space.sub(spacename,orgid,stype,permission);
						}
						else{
							alert(jsonData.msg); 
							alert("空间创建失败123！");
						}
					});
				}
				else{
					alert("空间名不能为空！");
				}
			},
			//提交方法
			sub : function (sp,si,st,sm)
			{  
				var spacename = sp;
				var orgid = si;
				var stype = st;
				var permission = sm;
				AjaxPost(_ctxPath+'/workspace/spaceAdd.htm',{spacename:spacename,orgid:orgid,stype:stype,permission:permission},function(data){
					alert(data.message);
				});
			}
		},

		Doc : {

		},

		Task : {

		},

		Comment : {
			appendComment : function (_zone, params){
				params = params||{};
				var z = _zone;
				if(params.commentId){
					z = z+" .list-group";
				}
				AjaxAppend(_ctxPath+'/comment/commentView.htm', {
					count:'8',
					commentId:params.commentId,
					mainId:params.mainId,
					mainUserId:params.mainUserId,
				},z, function(){
				});
			},
			showComment : function (_zone, params){
				params = params||{};
				var z = _zone;
				if(params.commentId){
					z = z+" .list-group";
				}
				AjaxLoad(_ctxPath+'/comment/commentView.htm', {
					count:'8',
					commentId:params.commentId,
					mainId:params.mainId,
					mainUserId:params.mainUserId,
				},z, function(){
				});
			},
			showReply : function (_zone, params){
				params = params||{};
				var z = _zone;
				if(params.commentId){
					z = z+" .list-unstyled";
				}
				alert("wwwwwwwwwwwwwwww");
				AjaxLoad(_ctxPath+'/comment/commentView.htm', {
					count:'8',
					commentId:params.commentId,
					mainId:params.mainId,
					mainUserId:params.mainUserId,
				},z, function(){
				});
			},
			showMoreComment : function (_comment_id){
				$("#"+_comment_id).next().hide();
				$("#"+_comment_id+" li").each(function(){
					var item = $(this);
					//alert(item.html());
					if(item.hasClass("hidden")){
						item.removeClass("hidden");
						item.show(250);
					}
				});
			}
		},
		
		
		// Created by mays 2014-3-26
		Contacts:{
			appendContacts: function (_zone, params, obj){
				params = params||{};            
				if(obj){
					//$(obj).parent().parent().hide(500);
					$(obj).parent().parent().parent().parent().hide();  //因为在TD里面，要隐藏TR，故增加了.parent()
				}
				AjaxAppend(_ctxPath+'/contacts/appendContacts.htm', {
					count:params.count||10,
					start:params.start,
					ownerId:params.ownerId
				}, _zone, function(){
				});
			}
		},
		
		// Created by mays 2014-4-1
		Document:{
			appendFolder:function(_zone, params, obj, url){
				params = params||{};
				url=url||'/document/ajax/appendFolder.htm';
				if(obj){
					//$(obj).parent().parent().hide(500);
					$(obj).parent().parent().hide();
				}
				
				AjaxAppend(_ctxPath+url, params, _zone, function(){
				});
			}
		}
		
	};
	$.extend(Parox, Pext);
})(window, document); 