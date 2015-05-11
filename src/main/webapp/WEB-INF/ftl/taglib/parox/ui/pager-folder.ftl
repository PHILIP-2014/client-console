<#macro FolderPager pageContext='' url='' suffixUrl='' >  
	<div class="btn-toolbar pull-right" role="toolbar">
	<#assign totalPage= ( ( pageContext.total - 1) / pageContext.limit )?int + 1 />
	<#assign currentPage= ( pageContext.start / pageContext.limit )?int + 1 />

    	<div class="btn-group"><a href="${url!''}?start=0&limit=${pageContext.limit!}&${suffixUrl!''}" class="btn btn-default btn-xs">&lt;&lt;</a></div>
    	<#assign startIndex= pageContext.start - pageContext.limit />
    	<#if 0 gte startIndex  >
    		<#assign startIndex = 0 />
    	</#if>
    	<div class="btn-group"><a href="${url!''}?start=${startIndex}&limit=${pageContext.limit!''}&${suffixUrl!''}" class="btn btn-default btn-xs">&lt;</a></div>
    	<#list [-5,-4,-3,-2,-1,0,1,2,3,4,5] as jj>
    		<#if (currentPage + jj) gte 0 && totalPage gt (currentPage + jj) > 
    			<#assign startIndex = ( currentPage + jj) * pageContext.limit />
    			<#assign nowPage = currentPage + jj + 1 />
    			<#if startIndex == pageContext.start >
    				<div class="btn-group"><a href="javascript:void(0)" class="btn btn-default btn-xs active">${nowPage}</a></div>
    			<#else>
    				<div class="btn-group"><a href="${url!''}?start=${startIndex}&limit=${pageContext.limit}&${suffixUrl!''}" class="btn btn-default btn-xs">${nowPage}</a></div>
    			</#if>
    		</#if>
    	</#list>
    	<#assign startIndex= pageContext.start  + pageContext.limit >
    	<#if startIndex gt pageContext.total >
    		<#assign startIndex=( totalPage - 1) * pageContext.limit />
    	</#if>
    	    <div class="btn-group"><a href="${url!''}?start=${startIndex}&limit=${pageContext.limit}&${suffixUrl!''}" class="btn btn-default btn-xs">&gt;</a></div>
    	<#assign startIndex=(totalPage - 1)*pageContext.limit />
    	    <div class="btn-group"><a href="${url!''}?start=${startIndex}&limit=${pageContext.limit}&${suffixUrl!''}" class="btn btn-default btn-xs">&gt;&gt;</a></div>
    </div>
</#macro>