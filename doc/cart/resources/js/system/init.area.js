/**
 * 系统的一些初始化数据及其操作。
 * 1.区域数据；
 * 2.行业数据；
 * 3.专业数据；
 * 
 * 基于jQuery实现，
 * @date 2011-09-16
 */
$(function(){
		var province = $('#province_id'), city = $('#city_id'), county=$('#county_id');
		
		//异步请求城市信息
		if(province.length && city.length){
			if(county.length){
				city.change(function(){
					Parox.Area.asyncUpdateChildSelect.call(this,
							_ctxPath+'/front/area/jsonArray.htm',
							'cityId',county, true,
							function(county){
								county.children().each(function(){//选择三级区域
									var countyId = county.attr('countyId');
									if(typeof countyId=='undefined' || $.trim(countyId)==''){
										return false;
									}
									//zby 2014.4.3 增加city.val()有值的判断，修正省份切换以后区县选择框没有变化的问题
									if(city.val() && (countyId == this.value) ){
										county.val(this.value);
										return false;
									}
								});
							}
					);					
				});
			}
			
			
			//加载省份数据
			AjaxPost(_ctxPath+'/front/area/jsonArray.htm',
			  null,
			  function(list){
				if(typeof(list)=="string"){
					list = eval(list);
				}
				var i = 0,size = list.length,opt = null;
				
				province.empty();
				province.append($('<option value="">==请选择==</option>'));
				
				for(; i<size;++i){
					opt = $('<option></option>');
					opt.val(list[i].id);
					opt.text(list[i].name||'');
					opt.attr('title', (list[i].name||''));
					province.append(opt);
				}
				if(province.attr(province.attr('name'))){
					province.val(province.attr(province.attr('name')));
				}
				//province.change();
				
				var proVal = province.val()||province.attr(province.attr('name'));				
				Parox.Area.asyncUpdateChildSelect.call(province,_ctxPath+'/front/area/jsonArray.htm',
					'provinceId='+proVal,city, true,function(city){
						var cityId = city.attr('cityId');
						//alert(cityId);
						city.children().each(function(){//选择二级区域						
							if(typeof cityId =='undefined' || $.trim(cityId)==''){
								return false;
							}
							//alert(this.value)
							if((cityId == this.value) ){								
								city.val(this.value);
								city.change();
								return false;
							}
						});
					}
				);
			});
			
			province.change(function(){
				Parox.Area.asyncUpdateChildSelect.call(this,
						_ctxPath+'/front/area/jsonArray.htm',
						'provinceId',city, true
				);
			});
			
		}
		
});
