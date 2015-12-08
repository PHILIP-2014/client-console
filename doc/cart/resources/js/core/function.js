/**
 * 判断字符是否为空
 * @param v
 * @return
 */
function empty(v){ 
	//alert(typeof(v));
	switch (typeof v){ 
		case 'undefined' : return true; 
		case 'string' : if(trim(v).length == 0) return true; break; 
		case 'boolean' : if(!v) return true; break; 
		case 'number' : if(0 === v) return true; break; 
		case 'object' : 
			if(null === v) return true; 
			if(undefined !== v.length && v.length==0) return true; 
			for(var k in v){return false;} return true; 
			break;
	}
return false; 
}

/**
 * 去除字符串str头尾的空格
 * @param {String} str 字符串
 * @return str去除头尾空格后的字符串。
 * @type {String}
 */
function trim(str){if(str==null)return "";if(str=="")return "";str=str.replace(/(^\s*)|(\s*$)/g, "");return str ;};

/*
*判断参数是否是整数的方法，对于违反规则的输入返回false。
*否则返回true
*/
function isInteger(str){
	if(isNaN(Number(str)))
		return false;
	if((""+str).indexOf(".")>-1)
		return false;
	return true;
}

/**
 * 得到字符串长度，中文按两个字符
 * @param str
 * @return
 */
function getLength(str){
	if(!str) return 0;
	//http连接变为短连接为了减少http连接占用字符
	var reg = RegExp("http://((?![\\s\\\\<])[\\x00-\\xff])*","ig");
	str = str.replace(reg, 'hhhhhh');
	//计算
	var tempStr = str.replace(/[^\x00-\xff]/g, '**').replace(/\s+/g, '*');
	var len = Math.ceil(tempStr.length/2);
	return len;
}

/***
 * 截取字符串，中文按两个字符
 * @param str
 * @param len
 * @return
 */
function byteSubString( str, len ){
	if( getLength(str) <= len){
		return str;
	}
	var s = "";
	var i,l = str.length;
	for( i = l-1; i > 0 ; i--){
		var temp = str.slice(0,i);
		if(getLength(temp)==len){
			s = temp;
			break;
		}
	}
	return s;
}

function encode(str){
	return encodeURIComponent(encodeURIComponent(str));
}

/*
* 得到字符串的字符长度（一个汉字占两个字符长）
*/
function getBytesLength(str) {
	// 在GBK编码里，除了ASCII字符，其它都占两个字符宽
	return str.replace(/[^\x00-\xff]/g, 'xx').length;
}

/**
 * 根据字符长来截取字符串
 */
function subStringByBytes(val, maxBytesLen) 
{	
	var len = maxBytesLen;
	var result = val.slice(0, len);	
	while(getBytesLength(result) > maxBytesLen) 
	{
		result = result.slice(0, --len);
	}
	return result;
}

/**
 * 获取url参数
 * @param paramName
 * @return
 */
function getUrlParameter(paramName)
{
    var returnVal="";
    try{
        var paramUrl=window.location.search;
        //处理长度
        if(paramUrl.length>0){
            paramUrl=paramUrl.substring(1,paramUrl.length);
            var paramUrlArray=paramUrl.split("&");
            for(var i=0;i<paramUrlArray.length;i++){
                if(paramUrlArray[i].toLowerCase().indexOf(paramName.toLowerCase())!=-1){
                    var temp=paramUrlArray[i].split("=");
                    if(temp[0].toLowerCase()==paramName.toLowerCase()){
                        returnVal=temp[1];
                        break;
                    }
                }
            }
        }
    }
    catch(e){}
    return returnVal;
}

/**
 * 将当前url加上参数后返回
 * @param P 格式:a=value
 * @returns {String}
 */
function addUrlParam(P)
{
	if(window.location.href.indexOf('?') > 0)
	{
		return window.location.href + '&'+P;
	}
	else
	{
		return window.location.href + '?'+P;
	}
}

//年份是否为闰年
function isLeapYear(Y)
{
	if (Y % 4 !=0) return false;
	if (Y % 400 == 0) return true;
	if (Y % 100 == 0) return false;
}

//获取date日期（Date实例）所在月份最后一天
//如，date=2011-12-22, 返回31
function lastOfMonth(date){
	var 
		M = date.getMonth()+1,
		Y = date.getFullYear();
	
	switch(M){
		case 1:
		case 3:
		case 5:
		case 7:
		case 8:
		case 10:
		case 12: return 31;
		case 4:
		case 6:
		case 9:
		case 11: return 30;
		case 2:return (IsLeapYear(Y)?29:28);
	}
}


