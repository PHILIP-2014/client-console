
var mock={
		root:"http://client.parox.com",
		data:{
			"admin":{"loginName":"philip","password":112233},
			"accountModel":{"originPassword":112233,"password":112233,"confirmPassword":"112233"},
			"companyModel":{"name":"app团队","uidCreated":0},
			"customerCompanyModel":{"name":"appCompany","uidCreated":0,"description":"welcome"},
			"inviteModel":{"targets":["15858149467","1353104040@qq.com","1547@qq.@dd","152345687@ee.qq.com"],"cid":1705,"uidInviter":2000009},
			"favoriteModel":{"uid":2000079,"msgId":1435143,"details":"dad"},
			"id":"1850",
			"originPassword":"originPassword=112233",
			"key":"name=app,cid=1850",
			"teamId":"teamId=12"
		},
		getRoot: function(){
			return this.root;
		},
		get:function(key){
			var obj =this.data[key] 
			if(typeof obj == "object"){
				return JSON.stringify(obj);
			}
			if(typeof obj=="string"){
				return obj;
			}
			return "";
		}
}
