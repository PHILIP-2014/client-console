//应用常量
var _ctxPath = _ctxPath||'/paroxSaas';
var _appPath = 'http://www.parox.com.cn';
var loginUrl = _ctxPath+"/login/";
var _picUploadUrl = _ctxPath+"/fileUpload";
var regUrl ="";
var imgRoot ="http://192.168.1.120/images/";

function relogin()
{
	var myurl = location.href;
	//myurl = myurl.replace("img.parox.com", "www.parox.com");
	//alert(myurl);
	location.replace(loginUrl+"?returnUrl="+encodeURIComponent(myurl));
}