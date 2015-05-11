<#--全局常量-->
<#assign const = {
	'PAGE_SIZE': 5
}/>

<#--栏目标识常量-->
<#assign ActType = {
	'DOC_ADD': 1,
	'DOC_DEL': 2,
	'TASK_CREATE': 3,
	'SPACE_CREATE': 4,
	'SPACE_USER_ADD': 5,
	'SPACE_USER_LEAVE': 6,
	'DOC_COMMENT': 11,
	'DOC_AGREE': 12,
	'DOC_APPROVE': 13,
	'DOC_SHARE': 14,
	'DOC_VIEW': 15,
	'DOC_DOWN': 16,
	'DOC_MARK': 17,
	'DOC_NEW_VERSION': 18,
	'TASK_ADD_DOC': 21,
	'TASK_STATE_CHANGE': 22,
	'TASK_COMMENT': 23,
	'TASK_USER_CHANGE': 24,
	'TASK_FOLLOW_CHANGE': 25,
	'TASK_DEADLINE_CHANGE': 26
}/>

<#assign NoticeType = {
	'TASK_CREATE': 1,
	'TASK_ASSIGN': 2,
	'TASK_STATE_CHANGE': 3,
	'TASK_MENTION': 4,
	'DOC_ADD': 11,
	'DOC_UPDATE': 12,
	'DOC_APPROVE': 14,
	'DOC_MENTION': 15,
	'DOC_SHARE': 16,
	'FOLDER_SHARE':17,
	'INVATE_ORG': 21,
	'INVATE_SPACE': 22,
	'APPLY_ORG': 23,
	'APPLY_SPACE': 24,
	'APPLY_ORG_AGREE': 25,
	'APPLY_SPACE_AGREE': 26,
	'APPLY_ORG_REFUSE': 27,
	'APPLY_SPACE_REFUSE': 28
}/>

<#assign MemberRight = {
	'MANAGE': 1,
	'COMMON': 2
}/>

<#assign SpaceRole = {
	'MANAGE': 1,
	'COMMON': 2,
	'JUNIOR': 0
}/>

<#assign SpaceType = {
	'INNER': 1,
	'OUTER': 2
}/>

<#assign SpacePrivacy = {
	'OPEN': 1,
	'CLOSED': 0
}/>

<#assign JoinType = {
	'INVATE': 1,
	'APPLY': 2
}/>

<#assign LeaveType = {
	'SELF': 1,
	'REMOVE': 2
}/>

<#assign TagCat = {
	'DOC': 1,
	'TASK': 2
}/>

<#assign urls={ 
	'mjk':{'index': '/mjk/index.htm','perioInfo': '/mjk/procDetail.htm','order': '/mjk/order/order.htm',
		'payover': '/mjk/order/payover.htm', 'orderPay': '/mjk/order/orderPay.htm'
	},
	'index': '/index.htm', 
	'search':'/search/index.htm'
}/>

<#assign advMap = {
	'A1_1': '<script type="text/javascript">document.write(\'<a style="display:none!important" id="tanx-a-mm_26887698_2994314_10130862"></a>\');    tanx_s = document.createElement("script");     tanx_s.type = "text/javascript";     tanx_s.charset = "gbk";     tanx_s.id = "tanx-s-mm_26887698_2994314_10130862";     tanx_s.async = true;     tanx_s.src = "http://p.tanx.com/ex?i=mm_26887698_2994314_10130862";     tanx_h = document.getElementsByTagName("head")[0];     if(tanx_h)tanx_h.insertBefore(tanx_s,tanx_h.firstChild);</script>',
	'A1_2': '<script type="text/javascript">document.write(\'<a style="display:none!important" id="tanx-a-mm_26887698_2994314_10130852"></a>\');     tanx_s = document.createElement("script");     tanx_s.type = "text/javascript";     tanx_s.charset = "gbk";     tanx_s.id = "tanx-s-mm_26887698_2994314_10130852";     tanx_s.async = true;     tanx_s.src = "http://p.tanx.com/ex?i=mm_26887698_2994314_10130852";     tanx_h = document.getElementsByTagName("head")[0];     if(tanx_h)tanx_h.insertBefore(tanx_s,tanx_h.firstChild);</script>',
	'A1_3': '<script type="text/javascript">document.write(\'<a style="display:none!important" id="tanx-a-mm_26887698_2994314_10130847"></a>\');     tanx_s = document.createElement("script");     tanx_s.type = "text/javascript";     tanx_s.charset = "gbk";     tanx_s.id = "tanx-s-mm_26887698_2994314_10130847";     tanx_s.async = true;     tanx_s.src = "http://p.tanx.com/ex?i=mm_26887698_2994314_10130847";     tanx_h = document.getElementsByTagName("head")[0];     if(tanx_h)tanx_h.insertBefore(tanx_s,tanx_h.firstChild);</script>',
	'A1_4': '<script type="text/javascript">document.write(\'<a style="display:none!important" id="tanx-a-mm_26887698_2994314_10130834"></a>\');     tanx_s = document.createElement("script");     tanx_s.type = "text/javascript";     tanx_s.charset = "gbk";     tanx_s.id = "tanx-s-mm_26887698_2994314_10130834";     tanx_s.async = true;     tanx_s.src = "http://p.tanx.com/ex?i=mm_26887698_2994314_10130834";     tanx_h = document.getElementsByTagName("head")[0];     if(tanx_h)tanx_h.insertBefore(tanx_s,tanx_h.firstChild);</script>',
	'A1_5': '<script type="text/javascript">document.write(\'<a style="display:none!important" id="tanx-a-mm_26887698_2994314_10130826"></a>\');     tanx_s = document.createElement("script");     tanx_s.type = "text/javascript";     tanx_s.charset = "gbk";     tanx_s.id = "tanx-s-mm_26887698_2994314_10130826";     tanx_s.async = true;     tanx_s.src = "http://p.tanx.com/ex?i=mm_26887698_2994314_10130826";     tanx_h = document.getElementsByTagName("head")[0];     if(tanx_h)tanx_h.insertBefore(tanx_s,tanx_h.firstChild);</script>',
	'A2': '<script type="text/javascript">document.write(\'<a style="display:none!important" id="tanx-a-mm_26887698_2994314_10130902"></a>\');     tanx_s = document.createElement("script");     tanx_s.type = "text/javascript";     tanx_s.charset = "gbk";     tanx_s.id = "tanx-s-mm_26887698_2994314_10130902";     tanx_s.async = true;     tanx_s.src = "http://p.tanx.com/ex?i=mm_26887698_2994314_10130902";     tanx_h = document.getElementsByTagName("head")[0];     if(tanx_h)tanx_h.insertBefore(tanx_s,tanx_h.firstChild);</script>',
	'B1': '<script type="text/javascript">document.write(\'<a style="display:none!important" id="tanx-a-mm_26887698_2994314_10130873"></a>\');     tanx_s = document.createElement("script");     tanx_s.type = "text/javascript";     tanx_s.charset = "gbk";     tanx_s.id = "tanx-s-mm_26887698_2994314_10130873";     tanx_s.async = true;     tanx_s.src = "http://p.tanx.com/ex?i=mm_26887698_2994314_10130873";     tanx_h = document.getElementsByTagName("head")[0];     if(tanx_h)tanx_h.insertBefore(tanx_s,tanx_h.firstChild);</script>',
	'C1': '<script type="text/javascript">document.write(\'<a style="display:none!important" id="tanx-a-mm_26887698_2994314_10130902"></a>\');     tanx_s = document.createElement("script");     tanx_s.type = "text/javascript";     tanx_s.charset = "gbk";     tanx_s.id = "tanx-s-mm_26887698_2994314_10130902";     tanx_s.async = true;     tanx_s.src = "http://p.tanx.com/ex?i=mm_26887698_2994314_10130902";     tanx_h = document.getElementsByTagName("head")[0];     if(tanx_h)tanx_h.insertBefore(tanx_s,tanx_h.firstChild);</script>',
	'D1': '<script type="text/javascript">document.write(\'<a style="display:none!important" id="tanx-a-mm_26887698_2994314_10130961"></a>\');     tanx_s = document.createElement("script");     tanx_s.type = "text/javascript";     tanx_s.charset = "gbk";     tanx_s.id = "tanx-s-mm_26887698_2994314_10130961";     tanx_s.async = true;     tanx_s.src = "http://p.tanx.com/ex?i=mm_26887698_2994314_10130961";     tanx_h = document.getElementsByTagName("head")[0];     if(tanx_h)tanx_h.insertBefore(tanx_s,tanx_h.firstChild);</script>',
	'D2': '<script type="text/javascript">document.write(\'<a style="display:none!important" id="tanx-a-mm_26887698_2994314_10130955"></a>\');     tanx_s = document.createElement("script");     tanx_s.type = "text/javascript";     tanx_s.charset = "gbk";     tanx_s.id = "tanx-s-mm_26887698_2994314_10130955";     tanx_s.async = true;     tanx_s.src = "http://p.tanx.com/ex?i=mm_26887698_2994314_10130955";     tanx_h = document.getElementsByTagName("head")[0];     if(tanx_h)tanx_h.insertBefore(tanx_s,tanx_h.firstChild);</script>',
	'D3': '<script type="text/javascript">document.write(\'<a style="display:none!important" id="tanx-a-mm_26887698_2994314_10130945"></a>\');     tanx_s = document.createElement("script");     tanx_s.type = "text/javascript";     tanx_s.charset = "gbk";     tanx_s.id = "tanx-s-mm_26887698_2994314_10130945";     tanx_s.async = true;     tanx_s.src = "http://p.tanx.com/ex?i=mm_26887698_2994314_10130945";     tanx_h = document.getElementsByTagName("head")[0];     if(tanx_h)tanx_h.insertBefore(tanx_s,tanx_h.firstChild);</script>',
	'D4': '<script type="text/javascript">document.write(\'<a style="display:none!important" id="tanx-a-mm_26887698_2994314_10130939"></a>\');     tanx_s = document.createElement("script");     tanx_s.type = "text/javascript";     tanx_s.charset = "gbk";     tanx_s.id = "tanx-s-mm_26887698_2994314_10130939";     tanx_s.async = true;     tanx_s.src = "http://p.tanx.com/ex?i=mm_26887698_2994314_10130939";     tanx_h = document.getElementsByTagName("head")[0];     if(tanx_h)tanx_h.insertBefore(tanx_s,tanx_h.firstChild);</script>',
	'D5': '<script type="text/javascript">document.write(\'<a style="display:none!important" id="tanx-a-mm_26887698_2994314_10130930"></a>\');     tanx_s = document.createElement("script");     tanx_s.type = "text/javascript";     tanx_s.charset = "gbk";     tanx_s.id = "tanx-s-mm_26887698_2994314_10130930";     tanx_s.async = true;     tanx_s.src = "http://p.tanx.com/ex?i=mm_26887698_2994314_10130930";     tanx_h = document.getElementsByTagName("head")[0];     if(tanx_h)tanx_h.insertBefore(tanx_s,tanx_h.firstChild);</script>',
	'D6': '<script type="text/javascript">document.write(\'<a style="display:none!important" id="tanx-a-mm_26887698_2994314_10130918"></a>\');     tanx_s = document.createElement("script");     tanx_s.type = "text/javascript";     tanx_s.charset = "gbk";     tanx_s.id = "tanx-s-mm_26887698_2994314_10130918";     tanx_s.async = true;     tanx_s.src = "http://p.tanx.com/ex?i=mm_26887698_2994314_10130918";     tanx_h = document.getElementsByTagName("head")[0];     if(tanx_h)tanx_h.insertBefore(tanx_s,tanx_h.firstChild);</script>',
	'D7': '<script type="text/javascript">document.write(\'<a style="display:none!important" id="tanx-a-mm_26887698_2994314_10130916"></a>\');     tanx_s = document.createElement("script");     tanx_s.type = "text/javascript";     tanx_s.charset = "gbk";     tanx_s.id = "tanx-s-mm_26887698_2994314_10130916";     tanx_s.async = true;     tanx_s.src = "http://p.tanx.com/ex?i=mm_26887698_2994314_10130916";     tanx_h = document.getElementsByTagName("head")[0];     if(tanx_h)tanx_h.insertBefore(tanx_s,tanx_h.firstChild);</script>',
	'E1': '<script type="text/javascript">document.write(\'<a style="display:none!important" id="tanx-a-mm_26887698_2994314_10169557"></a>\');      tanx_s = document.createElement("script");     tanx_s.type = "text/javascript";     tanx_s.charset = "gbk";     tanx_s.id = "tanx-s-mm_26887698_2994314_10169557";     tanx_s.async = true;     tanx_s.src = "http://p.tanx.com/ex?i=mm_26887698_2994314_10169557";     tanx_h = document.getElementsByTagName("head")[0];     if(tanx_h)tanx_h.insertBefore(tanx_s,tanx_h.firstChild);</script>',
	'F1': '<script type="text/javascript">document.write(\'<a style="display:none!important" id="tanx-a-mm_26887698_2994314_10169572"></a>\');     tanx_s = document.createElement("script");     tanx_s.type = "text/javascript";     tanx_s.charset = "gbk";     tanx_s.id = "tanx-s-mm_26887698_2994314_10169572";     tanx_s.async = true;     tanx_s.src = "http://p.tanx.com/ex?i=mm_26887698_2994314_10169572";     tanx_h = document.getElementsByTagName("head")[0];    if(tanx_h)tanx_h.insertBefore(tanx_s,tanx_h.firstChild);</script>',
	'F2': '<script type="text/javascript">document.write(\'<a style="display:none!important" id="tanx-a-mm_26887698_2994314_10169577"></a>\');     tanx_s = document.createElement("script");     tanx_s.type = "text/javascript";     tanx_s.charset = "gbk";     tanx_s.id = "tanx-s-mm_26887698_2994314_10169577";     tanx_s.async = true;     tanx_s.src = "http://p.tanx.com/ex?i=mm_26887698_2994314_10169577";     tanx_h = document.getElementsByTagName("head")[0];     if(tanx_h)tanx_h.insertBefore(tanx_s,tanx_h.firstChild);</script>',
	'F3': '<script type="text/javascript">document.write(\'<a style="display:none!important" id="tanx-a-mm_26887698_2994314_10169609"></a>\');     tanx_s = document.createElement("script");     tanx_s.type = "text/javascript";     tanx_s.charset = "gbk";     tanx_s.id = "tanx-s-mm_26887698_2994314_10169609";     tanx_s.async = true;     tanx_s.src = "http://p.tanx.com/ex?i=mm_26887698_2994314_10169609";     tanx_h = document.getElementsByTagName("head")[0];     if(tanx_h)tanx_h.insertBefore(tanx_s,tanx_h.firstChild);</script>',
	'F4': '<script type="text/javascript">document.write(\'<a style="display:none!important" id="tanx-a-mm_26887698_2994314_10169633"></a>\');     tanx_s = document.createElement("script");     tanx_s.type = "text/javascript";     tanx_s.charset = "gbk";     tanx_s.id = "tanx-s-mm_26887698_2994314_10169633";     tanx_s.async = true;     tanx_s.src = "http://p.tanx.com/ex?i=mm_26887698_2994314_10169633";     tanx_h = document.getElementsByTagName("head")[0];     if(tanx_h)tanx_h.insertBefore(tanx_s,tanx_h.firstChild);</script>',
	'F5': '<script type="text/javascript">document.write(\'<a style="display:none!important" id="tanx-a-mm_26887698_2994314_10169642"></a>\');     tanx_s = document.createElement("script");     tanx_s.type = "text/javascript";     tanx_s.charset = "gbk";     tanx_s.id = "tanx-s-mm_26887698_2994314_10169642";     tanx_s.async = true;     tanx_s.src = "http://p.tanx.com/ex?i=mm_26887698_2994314_10169642";     tanx_h = document.getElementsByTagName("head")[0];     if(tanx_h)tanx_h.insertBefore(tanx_s,tanx_h.firstChild);</script>',
	'F6': '<script type="text/javascript">document.write(\'<a style="display:none!important" id="tanx-a-mm_26887698_2994314_10169649"></a>\');     tanx_s = document.createElement("script");     tanx_s.type = "text/javascript";     tanx_s.charset = "gbk";     tanx_s.id = "tanx-s-mm_26887698_2994314_10169649";     tanx_s.async = true;     tanx_s.src = "http://p.tanx.com/ex?i=mm_26887698_2994314_10169649";     tanx_h = document.getElementsByTagName("head")[0];     if(tanx_h)tanx_h.insertBefore(tanx_s,tanx_h.firstChild);</script>',
	'F7': '<script type="text/javascript">document.write(\'<a style="display:none!important" id="tanx-a-mm_26887698_2994314_10169666"></a>\');     tanx_s = document.createElement("script");     tanx_s.type = "text/javascript";     tanx_s.charset = "gbk";     tanx_s.id = "tanx-s-mm_26887698_2994314_10169666";     tanx_s.async = true;     tanx_s.src = "http://p.tanx.com/ex?i=mm_26887698_2994314_10169666";     tanx_h = document.getElementsByTagName("head")[0];     if(tanx_h)tanx_h.insertBefore(tanx_s,tanx_h.firstChild);</script>',
	'F8': '<script type="text/javascript">document.write(\'<a style="display:none!important" id="tanx-a-mm_26887698_2994314_10169674"></a>\');     tanx_s = document.createElement("script");     tanx_s.type = "text/javascript";     tanx_s.charset = "gbk";     tanx_s.id = "tanx-s-mm_26887698_2994314_10169674";     tanx_s.async = true;     tanx_s.src = "http://p.tanx.com/ex?i=mm_26887698_2994314_10169674";     tanx_h = document.getElementsByTagName("head")[0];     if(tanx_h)tanx_h.insertBefore(tanx_s,tanx_h.firstChild);</script>',
	'F9': '<script type="text/javascript">document.write(\'<a style="display:none!important" id="tanx-a-mm_26887698_2994314_10169679"></a>\');     tanx_s = document.createElement("script");     tanx_s.type = "text/javascript";     tanx_s.charset = "gbk";     tanx_s.id = "tanx-s-mm_26887698_2994314_10169679";     tanx_s.async = true;     tanx_s.src = "http://p.tanx.com/ex?i=mm_26887698_2994314_10169679";     tanx_h = document.getElementsByTagName("head")[0];     if(tanx_h)tanx_h.insertBefore(tanx_s,tanx_h.firstChild);</script>',
	'F10': '<script type="text/javascript">document.write(\'<a style="display:none!important" id="tanx-a-mm_26887698_2994314_10169685"></a>\');     tanx_s = document.createElement("script");     tanx_s.type = "text/javascript";     tanx_s.charset = "gbk";     tanx_s.id = "tanx-s-mm_26887698_2994314_10169685";     tanx_s.async = true;     tanx_s.src = "http://p.tanx.com/ex?i=mm_26887698_2994314_10169685";     tanx_h = document.getElementsByTagName("head")[0];     if(tanx_h)tanx_h.insertBefore(tanx_s,tanx_h.firstChild);</script>',
	'F11': '<script type="text/javascript">document.write(\'<a style="display:none!important" id="tanx-a-mm_26887698_2994314_10169694"></a>\');     tanx_s = document.createElement("script");     tanx_s.type = "text/javascript";     tanx_s.charset = "gbk";     tanx_s.id = "tanx-s-mm_26887698_2994314_10169694";     tanx_s.async = true;     tanx_s.src = "http://p.tanx.com/ex?i=mm_26887698_2994314_10169694";     tanx_h = document.getElementsByTagName("head")[0];     if(tanx_h)tanx_h.insertBefore(tanx_s,tanx_h.firstChild);</script>',	
	'F12': '<script type="text/javascript">document.write(\'<a style="display:none!important" id="tanx-a-mm_26887698_2994314_10169706"></a>\');     tanx_s = document.createElement("script");     tanx_s.type = "text/javascript";     tanx_s.charset = "gbk";     tanx_s.id = "tanx-s-mm_26887698_2994314_10169706";     tanx_s.async = true;     tanx_s.src = "http://p.tanx.com/ex?i=mm_26887698_2994314_10169706";     tanx_h = document.getElementsByTagName("head")[0];     if(tanx_h)tanx_h.insertBefore(tanx_s,tanx_h.firstChild);</script>',
	'F13': '<script type="text/javascript">document.write(\'<a style="display:none!important" id="tanx-a-mm_26887698_2994314_10169717"></a>\');     tanx_s = document.createElement("script");     tanx_s.type = "text/javascript";     tanx_s.charset = "gbk";     tanx_s.id = "tanx-s-mm_26887698_2994314_10169717";     tanx_s.async = true;     tanx_s.src = "http://p.tanx.com/ex?i=mm_26887698_2994314_10169717";     tanx_h = document.getElementsByTagName("head")[0];     if(tanx_h)tanx_h.insertBefore(tanx_s,tanx_h.firstChild);</script>'
}/>