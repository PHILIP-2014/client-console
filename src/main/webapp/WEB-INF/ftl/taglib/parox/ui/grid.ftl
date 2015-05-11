<#macro grid cols normalOperate=[] batchOperate=[] wholeOperate=[] keepParams=[] pageAction="list" ajaxLoader=''
  actionSuffix=".jhtml" keyId="id" keyId2="id" batchId="ids" wholeId="wids" value=pagination isPagination=true rowIndex=true operateCol="操作" checkRight="true"
  width="100%">
  
<#assign params = "">
<#list keepParams as keep>
<#assign expr = keep['name']>
<#if keep['value']??>
	<#assign expr = keep['value']>
</#if>
<#if params?length gt 0 && (expr?eval)??>
	<#assign params = params+'&' >
</#if>
<#if keep['encode']?? && keep['encode']>
	<#if (expr?eval)??>
		<#assign params = params + keep['name'] +'='+ (((expr?eval)!)?url)?url>
	</#if>
<#else>	
	<#assign anexp = (expr?eval)!''/><#--支持序列参数 PZP@2011-12-->
	<#if anexp?is_sequence>
		<#list anexp as e>
		<#if e_has_next>
		<#assign params = params + (keep['name'] +'='+ e!)+'&'>
		<#else>
		<#assign params = params + keep['name'] +'='+ e!>
		</#if>
		</#list> <#--支持序列参数 PZP@2011-12-->	
	<#else>
		<#if (expr?eval)??>
			<#assign params = params + keep['name'] +'='+ (expr?eval)!>		
		</#if>
	</#if>
</#if>
</#list>

<script language="javascript">
  <#list normalOperate as operate>
var ${operate["action"]} = {action:"${operate["action"]+actionSuffix}"<#if operate['confirm']??>,msg:"${operate['confirm']}"</#if><#if operate['type']??>,type:"${operate['type']}"</#if><#if operate['define']??>,define:${operate['define']}</#if>};
  </#list>
function _operate(op,id,id2) {
	if(op.msg && !confirm(op.msg)) {
		return;
	}
	if(op.type && op.type=='ajax'){
		AjaxGet(op.action+'?${keyId}='+id+'&opType=${pageAction}&${params}',ShowResult)	
	}else if(op.type && op.type=='func'){
		var href=op.action+'?${keyId}='+id+'&opType=${pageAction}&${params}';
		var func=op.define;
		func(href,id2);
		//alert(op.action)
	}else{
		location.href=op.action+'?${keyId}='+id+'&opType=${pageAction}&${params}';
	}
	/*var tableForm = document.getElementById('tableForm');
	tableForm.onsubmit=null;
	tableForm.action=op.action;
	tableForm.${keyId}.value = id;
	tableForm.submit();*/
}
function _validateBatch() {
	var batchChecks = document.getElementsByName('${batchId}');
	var hasChecked = false;
	for(var i=0; i<batchChecks.length; i++) {
		if(batchChecks[i].checked) {
			hasChecked = true;
			break;
		}
	}
	if(!hasChecked) {alert('请选择要操作的数据！')};
	return hasChecked;
}
</script>
<form id="tableForm" method="post" onsubmit="return _validateBatch();">
<table class="pn-ltable" width="${width}" cellspacing="1" cellpadding="0" border="0">
<thead class="pn-lthead">
<tr>
<#if batchOperate?size gt 0>
	<th width="20px" style="text-align:center;"><input type="checkbox" id="allCheck" value="checkbox" onclick="Pn.checkBox('${batchId}',this.checked);"/></th>
</#if>
<#if rowIndex>
	<th width="30px" style="text-align:center;">序号</th>
</#if>
<#list cols as col>
	<th<#if col['display']??> style="display:${col['display']};text-align:center;"<#else> style="text-align:center;"</#if>>${col["label"]}</th>
</#list>
<#if normalOperate?size != 0>
	<th style="text-align:center;">${operateCol}</th>
</#if>
</tr>
</thead>
<tbody class="pn-ltbody">
<#if isPagination>
	<#if value.list??>
		<#assign pageList=value.list>
	</#if>
<#else>
  <#assign pageList=value>
</#if>
<#if pageList?? && pageList?size gt 0>
	<#list pageList as row>
	<tr onmouseover="Pn.LTable.lineOver(this);" onmouseout="Pn.LTable.lineOut(this);" onclick="Pn.LTable.lineSelect(this);">
		<#if batchOperate?size gt 0>
		<td style="text-align:center;"><input type="checkbox" name="${batchId}" value="${row[keyId]}"/></td>
		</#if>
		<#if rowIndex>
		<td style="text-align:center;">${row_index+1}</td>
		</#if>
		<#list cols as col>
		<td<#if col['display']??> style="display:${col['display']}"</#if><#if col['width']??> width="${col['width']}"</#if><#if col['align']??> align="${col['align']}"</#if><#if col['title']??> title="${(col['title']?eval)!}"</#if>><#rt/>
			<#if col['length']??><div style="width:${col['length']}px;overflow-x:hidden;word-break:keep-all;text-overflow:ellipsis;" title="${(col['name']?eval)!?html}"></#if><#t/>
			<#if col['type']?? && col['type']=='input'>
				<input type="text" name="${col['inputName']}" value="${(col['name']?eval)!}" size="${col['size']!3}" onfocus="this.select();" onkeypress="if(event.keyCode==13){this.blur();return false;}"/><#t/>
			<#else>
				<#if (col['name']?eval)??><#if col['escape']!true>${(col['name']?eval)!?html}<#else>${(col['name']?eval)!}</#if><#else>${col['default']!}</#if><#t/>
			</#if>
			<#if col['length']??></div></#if><#t/>
		</td><#lt/>
		</#list>
		<td class="pn-lopt" nowrap="true"><#rt/>
		
		<#if wholeOperate?size gt 0><input type="hidden" name="${wholeId}" value="${row[keyId]}"/></#if><#t/>
		
		<#list normalOperate as operate>
			<#local opDisabled = operate['displayExp']?? && !operate['displayExp']?eval />
			<#assign show = true />		
			<#if operate['show']?? && !operate['show']?eval>
				<#assign show=false>
			</#if>
			<#if show>
				<@p.operateRight operate=operate['action'] checkRight=checkRight><a<#if opDisabled> disabled="disabled" style="background-color:#CCCCCC;"<#else> href="javascript:_operate(${operate['action']},'${row[keyId]}','${row[keyId2]}');"</#if> class="pn-loperator">
				<#if operate['ifcheck']??>
					<#if operate['ifcheck']?eval>${operate["othname"]}<#else>${operate["name"]}</#if><#t/>
				<#else>
				${operate["name"]}</#if></a>
				<#--<#if operate_has_next>|</#if>-->
				</@p.operateRight><#t/>
			</#if>
		</#list><#t/>
		</td><#lt/>
	</tr>
	</#list>
</#if>
</tbody>
</table>

<#if !pageList?? || pageList?size <= 0>
	<div class="pn-lnoresult">没有相关数据！</div>
<#else>
	<input type="hidden" name="${keyId}"/>
	<@p.hidden name="pageNo" />
	
	<#if isPagination>
		<#if ajaxLoader=''>
			<#include "grid-pager.ftl" />
		<#else>
			<#include "grid-pager-ajax.ftl" />
		</#if>
	</#if>
	
	<#include "grid-batchoperate.ftl" />
</#if>

</form>
</#macro>