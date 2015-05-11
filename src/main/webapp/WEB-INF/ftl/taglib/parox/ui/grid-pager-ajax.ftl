<#--在AjaxLoad函数参数url后面添加了个pageSize参数，解决弹出框时
	--服务端取不到正确getCookieCount()值的问题。
	--@date 2011-03-14
-->
<#if pagination??>
	<#assign lp=pagination/>
<#else>
	<#assign lp=n_pagination/>
</#if>

<#assign steps=2>
<#assign leftoffset = steps>
<#assign midoffset1 = lp.pageNo-(steps-1)>
<#assign midoffset2 = lp.pageNo+(steps-1)>
<#assign rightoffset = lp.totalPage-(steps-1)>

<#-- url附加参数的判断 -->  
    <#assign requestParams = "">  
    <#if (params?? && params != '')>  
        <#assign requestParams = '&' + params>  
    </#if>  

<#if leftoffset gt lp.totalPage>
        <#assign leftoffset = lp.totalPage> 
</#if>
<#if rightoffset lt 1>
        <#assign rightoffset = 1>
<#elseif leftoffset lt lp.totalPage && rightoffset lt leftoffset+1>
	<#assign rightoffset = leftoffset+1> 
</#if>
<#if midoffset1 lt 1>
	<#assign midoffset1 = 1> 
</#if>
<#if midoffset2 gt rightoffset-1 && rightoffset gt 1>
        <#assign midoffset2 = rightoffset-1> 
<#elseif midoffset2 gt lp.totalPage>
	<#assign midoffset2 = lp.totalPage>
</#if>
<#if midoffset2 lt midoffset1>
		<#assign midoffset2 = midoffset1>
</#if>

<#--(共${lp.totalCount} 条)--><#t/>


<DIV class="pagination t-10">
<DIV class=page-bottom>
<#if lp.firstPage><SPAN class=page-start><SPAN>上一页</SPAN></SPAN><#t/>
<#else><A class=page-prev href="#" onclick="AjaxLoad('${pageAction+actionSuffix}?pageNo=${lp.prePage}&pageSize='+pageSize.value+'${requestParams}', {}, '${ajaxLoader}');"><SPAN>上一页</SPAN></A><#t/>
</#if>
<#-- 左侧列表 -->
<#list 1..leftoffset as i>
<#if lp.pageNo==i><SPAN class=page-cur>${i}</SPAN><#t/>
<#else><a href="#" onclick="AjaxLoad('${pageAction+actionSuffix}?pageNo=${i}&pageSize='+pageSize.value+'${requestParams}', {}, '${ajaxLoader}');">${i}</a><#t/>
</#if>
</#list>
<#-- 中间列表 -->
<#if (lp.pageNo gt leftoffset || lp.pageNo lt rightoffset) && rightoffset gt leftoffset+1>
<#-- 当前页左列表 -->
<#if midoffset1 gt leftoffset+1><SPAN class=page-break>...</SPAN><#t/>
</#if>
<#list midoffset1..midoffset2 as i>
<#if i lte leftoffset || i gte rightoffset>
<#elseif lp.pageNo==i><SPAN class=page-cur>${i}</SPAN><#t/>
<#else><a href="#" onclick="AjaxLoad('${pageAction+actionSuffix}?pageNo=${i}&pageSize='+pageSize.value+'${requestParams}', {}, '${ajaxLoader}');">${i}</a><#t/>
</#if>
</#list>
<#if midoffset2 lt rightoffset-1><SPAN class=page-break>...</SPAN><#t/>
</#if>
</#if>
<#if leftoffset lt lp.totalPage && midoffset2 lt lp.totalPage>
<#list rightoffset..lp.totalPage as i>
<#if lp.pageNo==i><SPAN class=page-cur>${i}</SPAN><#t/>
<#else><a href="#" onclick="AjaxLoad('${pageAction+actionSuffix}?pageNo=${i}&pageSize='+pageSize.value+'${requestParams}', {}, '${ajaxLoader}');">${i}</a><#t/>
</#if>
</#list>
</#if>
<#if lp.lastPage><SPAN class=page-end><SPAN>下一页</SPAN></SPAN><#t/>
<#else><A class=page-next href="#" onclick="AjaxLoad('${pageAction+actionSuffix}?pageNo=${lp.nextPage}&pageSize='+pageSize.value+'${requestParams}', {}, '${ajaxLoader}');"><SPAN>下一页</SPAN></A><#t/>
</#if>
<SPAN class=page-skip> 共${lp.totalPage}页 
	每页	<input id="pageSize" type="text" value="${lp.pageSize}" size="1" onfocus="this.select();" onblur="new Pn.Cookie().set(Pn.Cookie.countPerPage,this.value,10*365*24*60*60);" onkeypress="if(event.keyCode==13){$(this).blur();return false;}"/> 条
	到第<INPUT id="jumpto" size="2" value="${lp.pageNo}" name="jumpto" onclick="if(this.value=='跳转..') {this.value='';}" onKeyDown="if(event.keyCode==13) {AjaxLoad('${pageAction+actionSuffix}?pageNo='+this.value+'&pageSize='+pageSize.value+'${requestParams}', {}, '${ajaxLoader}'); return false;}">页   <input type="button" value="确&nbsp;定" onclick="AjaxLoad('${pageAction+actionSuffix}?pageNo='+jumpto.value+'&pageSize='+pageSize.value+'${requestParams}', {}, '${ajaxLoader}');" class="btn"/></span>
	</DIV>
</DIV>
