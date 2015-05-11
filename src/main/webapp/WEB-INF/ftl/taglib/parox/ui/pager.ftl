<#macro TbPage params='' maxsteps=6>  

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

<#-- url附加参数的判断 -->  
<#assign requestParams = "">  
<#if (params?? && params != '')>  
    <#assign requestParams = '&' + params>  
</#if>

<#--(共${lp.totalCount} 条)--><#t/>


<DIV class="pagination t-15">
<DIV class=page-bottom>
<#if lp.pageNo=1><SPAN class=page-start><SPAN>上一页</SPAN></SPAN><#t/>
<#else><A class=page-prev href="?pageNo=${lp.prePage}${requestParams}"><SPAN>上一页</SPAN></A><#t/>
</#if>
<#-- 左侧列表 -->
<#list 1..leftoffset as i>
<#if lp.pageNo==i><SPAN class=page-cur>${i}</SPAN><#t/>
<#else><a href='?pageNo=${i}${requestParams}'>${i}</a><#t/>
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
<#else><a href='?pageNo=${i}${requestParams}'>${i}</a><#t/>
</#if>
</#list>
<#if midoffset2 lt rightoffset-1><SPAN class=page-break>...</SPAN><#t/>
</#if>
</#if>
<#if leftoffset lt lp.totalPage && midoffset2 lt lp.totalPage>
<#list rightoffset..lp.totalPage as i>
<#if lp.pageNo==i><SPAN class=page-cur>${i}</SPAN><#t/>
<#else><a href='?pageNo=${i}${requestParams}'>${i}</a><#t/>
</#if>
</#list>
</#if>
<#if lp.pageNo=lp.totalPage><SPAN class=page-end><SPAN>下一页</SPAN></SPAN><#t/>
<#else><A class=page-next href="?pageNo=${lp.nextPage}${requestParams}"><SPAN>下一页</SPAN></A><#t/>
</#if>
<SPAN class=page-skip> 共${lp.totalPage}页 到第<INPUT id="jumpto" size="3" value="<#if lp.pageNo=0>1<#else>${lp.pageNo}</#if>" name="jumpto" onclick="if(this.value=='跳转..') {this.value='';}" onKeyDown="if(event.keyCode==13) {window.location='?pageNo='+this.value+'${requestParams}'; return false;}">页   <input type="button" value="确定" onclick="window.location='?pageNo='+jumpto.value+'${requestParams}';"/></span>
	</DIV>
</DIV>

</#macro>


<#macro TbAjaxPage url='' div='' params=[] maxsteps=6>  

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

<#-- url附加参数的判断 -->  
<#assign rp = "">
<#list params as p>
<#assign expr = p['name']>
<#if p['value']??>
	<#assign expr = p['value']>
	<#assign rp = rp + p['name'] +':'+ expr +','>
</#if>
</#list>

<#--(共${lp.totalCount} 条)--><#t/>

<script language="javascript">
function ajaxShow(url,div,rp,pageno) {
	var u = url;
	var sxh='{'+rp+'pageNo:'+pageno+'}';
	var p = eval('('+sxh+')')
    //alert("url--"+url+"c----"+p.catId+"---p---"+p.pageNo);
    AjaxLoad(u, p, div);
}
</script>

<DIV class="pagination t-20">
<DIV class=page-bottom>
<#if lp.pageNo=1><SPAN class=page-start><SPAN>上一页</SPAN></SPAN><#t/>
<#else><A class=page-prev href="javascript:void(0)" onclick="ajaxShow('${url}','${div}','${rp}','${lp.prePage}')"><SPAN>上一页</SPAN></A><#t/>
</#if>
<#-- 左侧列表 -->
<#list 1..leftoffset as i>
<#if lp.pageNo==i><SPAN class=page-cur>${i}</SPAN><#t/>
<#else><a href="javascript:void(0)" onclick="ajaxShow('${url}','${div}','${rp}','${i}')">${i}</a><#t/>
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
<#else><a href="javascript:void(0)" onclick="ajaxShow('${url}','${div}','${rp}','${i}')">${i}</a><#t/>
</#if>
</#list>
<#if midoffset2 lt rightoffset-1><SPAN class=page-break>...</SPAN><#t/>
</#if>
</#if>
<#if leftoffset lt lp.totalPage && midoffset2 lt lp.totalPage>
<#list rightoffset..lp.totalPage as i>
<#if lp.pageNo==i><SPAN class=page-cur>${i}</SPAN><#t/>
<#else><a href="javascript:void(0)" onclick="ajaxShow('${url}','${div}','${rp}','${i}')">${i}</a><#t/>
</#if>
</#list>
</#if>
<#if lp.lastPage><SPAN class=page-end><SPAN>下一页</SPAN></SPAN><#t/>
<#else><A class=page-next href="javascript:void(0)" onclick="ajaxShow('${url}','${div}','${rp}','${lp.nextPage}')"><SPAN>下一页</SPAN></A><#t/>
</#if>
<SPAN class=page-skip> 共${lp.totalPage}页 到第<INPUT id="jumpto" size="3" value="<#if lp.pageNo=0>1<#else>${lp.pageNo}</#if>" name="jumpto" onclick="if(this.value=='跳转..') {this.value='';}" onKeyDown="if(event.keyCode==13) {ajaxShow('${url}','${div}','${rp}',this.value); return false;}">页   <input type="button" value="确定" onclick="ajaxShow('${url}','${div}','${rp}',jumpto.value);"/></span>
	</DIV>
</DIV>

</#macro>    