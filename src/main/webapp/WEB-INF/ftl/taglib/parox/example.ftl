<#--视频模板-->

<#--视频模板--视频列表-->
<#macro tList pagination=pagination catId="" slice="" keywords="">
<div class="list"><!-- 视频列表 -->
  <#assign pList = pagination.list/>
  <#if pList?size gt 0>
  <#list pList as v>
   ${v.id!0}----${v.name!'...'} <br/>
  </#list>
  </#if>
 </div>
 <div class="more">
 	
 	<@p.TbPage/>
 	
 </div>
</#macro>