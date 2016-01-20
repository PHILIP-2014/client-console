package com.philip.client.controller.p;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.fastjson.JSONObject;
import com.philip.client.cond.GoodsCond;
import com.philip.client.controller.BaseController;
import com.philip.client.model.GoodsModel;
import com.philip.client.service.GoodsService;

@Controller
@RequestMapping(value="/p")
public class MGoodsController extends BaseController {

	@Autowired
	private GoodsService goodsService;
	
	
	/**
	 * 商品详情
	 * @param request
	 * @param response
	 * @param goods
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value="/goods/{id}", method=RequestMethod.GET)
	public ModelAndView getOne(HttpServletRequest request, HttpServletResponse response,
			@PathVariable Long  id,ModelMap model) throws IOException {
		//TODO 获取
		GoodsModel goodsModel = goodsService.queryModel(id);
		model.put("good", JSONObject.toJSON( goodsModel).toString());
		model.put("goods", goodsModel);
		
		return new ModelAndView("/goods/goods-detail");
//		return goodsModel;
	}
	
	/**
	 * 商品列表
	 * @param request
	 * @param response
	 * @param goods
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value="/goods", method=RequestMethod.GET)
	public String getList(HttpServletRequest request, HttpServletResponse response,
			GoodsCond cond ,ModelMap model) throws IOException {
		//TODO 
		List<GoodsModel> goodsModel = goodsService.queryByCond(cond);
		model.put("goods", goodsModel);
		model.put("good", goodsModel.toString());
		return "/goods/goods-list";
		
	}
	
}
