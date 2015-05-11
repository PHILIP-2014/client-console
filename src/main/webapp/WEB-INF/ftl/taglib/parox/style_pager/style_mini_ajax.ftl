[#--
    <ul class="pager pull-right marg-un">
    	<li><a href="#"><span class="icon-left"></span></a></li>
        <li><a href="#"><span class="icon-right"></span></a></li>
    </ul>
--]
<ul class="pager pull-right marg-un">[#t/]
[#t/]
[#if lp.firstPage][#t/]
[#else]<li><a href="javascript:;" onclick="${ajaxFunc}(${lp.prePage})"><span class="icon-left colorGray"></span></a></li>[#t/]
[/#if]
&nbsp;
[#if lp.lastPage][#t/]
[#else]<li><a href="javascript:;" onclick="${ajaxFunc}(${lp.nextPage})"><span class="icon-right colorGray"></span></a></li>[#t/]
[/#if]
</ul>[#t/]