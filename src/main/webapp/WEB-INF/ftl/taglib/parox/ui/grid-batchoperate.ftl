
<#if (batchOperate?size > 0) || (wholeOperate?size > 0)>
<div class="pn-lbopt">

<#if (batchOperate?size > 0)>
  <#list batchOperate as operate>
  	<#if operate['action']?starts_with('/')>
		<#assign actionUrl=base+operate['action']>
	<#else>
		<#assign actionUrl=operate['action']>
	</#if>
    
      <#if (operate.confirm)??>
      	<@p.operateRight operate=operate['action'] checkRight=checkRight>
			<input type="button" value="${operate['name']}" onclick="if(_validateBatch() && confirm('${operate.confirm}')){AjaxPostForm('${actionUrl+actionSuffix}?opType=${pageAction}&${params}','tableForm');return true;}else{return false;}" class="btn"/>
		</@p.operateRight>
      <#elseif operate.type?? && operate.type='function'>
      		<input type="button" value="${operate['name']}" onclick="if(_validateBatch()){${operate['action']};}" class="btn"/>
      <#else>
      	<@p.operateRight operate=operate['action'] checkRight=checkRight>
			<input type="button" value="${operate['name']}" onclick="if(_validateBatch()){AjaxPostForm('${actionUrl+actionSuffix}?opType=${pageAction}&${params}','tableForm');}" class="btn"/>
		</@p.operateRight>			
      </#if>
    
  </#list>
</#if>

  <#list wholeOperate as operate>  
  	<#if operate['action']?starts_with('/')>
		<#assign actionUrl=base+operate['action']>
	<#else>
		<#assign actionUrl=operate['action']>
	</#if>
	
  	  <#if (operate.confirm)??>
	<input type="button" value="${operate['name']}" onclick="confirm('${operate.confirm}')){AjaxPostForm('${actionUrl+actionSuffix}?opType=${pageAction}&${params}','tableForm');return true;}else{return false;}" class="btn"/>
      <#elseif operate.type?? && operate.type='function'>
      <input type="button" value="${operate['name']}" onclick="${operate['action']}" class="btn"/>
      <#else>
	<input type="button" value="${operate['name']}" onclick="AjaxPostForm('${actionUrl+actionSuffix}?opType=${pageAction}&${params}','tableForm');" class="btn"/>			
      </#if>
  </#list>
  <#--
  <#if wholeOptName!="">
&nbsp; <input type="submit" value="${wholeOptName}" onclick="AjaxPostForm('${actionUrl+actionSuffix}?opType=${pageAction}${params}','tableForm');" class="btn"/>
  </#if>
  -->
</div>
</#if>