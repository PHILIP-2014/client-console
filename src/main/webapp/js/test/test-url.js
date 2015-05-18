var method={
		GET:"GET",
		POST:"POST",
		PUT:"PUT",
		DELETE:"DELETE"
}

var postType={
		FormData:"application/x-www-form-urlencoded",
		PayLoad:"application/json"
}

var AUTHOR={
	philip:"王腓力"
}

var TEST_PROGRESS=["DEV","INTEGRATION"]

var TEST_LEVEL_COLOR=["#999999","#996666","#993300","#FFCC00","#006600","#009900","#FF0000","#FFF000"];

var urls={
		model:[
		       {	name:"登录模块",	k:"url-login"},
		       {	name:"团队模块",	k:"url-company"},
		],
		betestUrl:{
			//登录模块
			"url-login":[{
				url:"/login",
				method:method.POST,
				mockdata:"admin",
				author:AUTHOR.philip,
				postType: postType.PayLoad
			}],
			//团队模块
			"url-company":[{
				url:"/customerCompany",//创建公司
				method:method.POST,
				mockdata:"companyModel",
				author:AUTHOR.philip,
				postType: postType.PayLoad
			},{
				url:"/customerCompany/",//获取单个公司信息
				pathid:"id",
				method:method.GET,
				author:AUTHOR.philip,
				postType: postType.PayLoad
			},{
				url:"/customerCompany/",//更新公司信息
				pathid:"id",
				mockdata:"customerCompanyModel",
				method:method.PUT,
				author:AUTHOR.philip,
				postType: postType.PayLoad
			},{
				url:"/customerCompany",
				method:method.GET,//获取公司列表
				author:AUTHOR.philip,
			}
			],
		},
		/**
		 * key: URL分组
		 * tested: true:显示已测试的，false:仅显示未测试的
		 * */
		get:function(key, test){
			if(typeof test=="undefined"){
				return this.betestUrl[key];
			}
			
			var result=new Array();
			$.each(this.betestUrl[key], function(idx, obj){
//				var tl= typeof obj.test == "undefined"?0: obj.test;
				var tl=obj.test||0;
				
				if(tl==test){
					result.push(obj);
				}
			});
			
			return result;
		}
}