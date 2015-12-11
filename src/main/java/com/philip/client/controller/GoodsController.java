package com.philip.client.controller;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.philip.client.cond.GoodsCond;
import com.philip.client.model.Goods;
import com.philip.client.model.GoodsModel;
import com.philip.client.service.GoodsService;
import com.philip.client.utils.ServiceException;

@Controller
public class GoodsController extends BaseController {

	@Autowired
	private GoodsService goodsService;
	
	/**
	 * 添加商品
	 * @param request
	 * @param response
	 * @param goods
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value="/goods/add", method=RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> add(HttpServletRequest request, HttpServletResponse response,
			GoodsModel goods) throws IOException {
		try {
			return ajaxResult(goodsService.doCreate(goods, getUid(request)), null);
		} catch (ServiceException e) {
			sendError(request, response, e.getMessage());
		}
		return null;
	}
	
	/**
	 * 商品详情
	 * @param request
	 * @param response
	 * @param goods
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value="/goods/{id}", method=RequestMethod.GET)
	public String getOne(HttpServletRequest request, HttpServletResponse response,
			@PathVariable Long  id,ModelMap model) throws IOException {
		//TODO 获取
		GoodsModel goodsModel = goodsService.queryModel(id);
		model.put("goodsModel", goodsModel);
			return "/goods/goods-detail";
		
		
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
		model.put("goodsModel", goodsModel);
		return "/client/index";
		
		
	}
	
	/**
	 * 更新商品信息
	 * @param request
	 * @param response
	 * @param goods
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value="/goods/edit", method=RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> edit(HttpServletRequest request, HttpServletResponse response,
			Goods goods) throws IOException {
		try {
			return ajaxResult(goodsService.doEdit(goods, getUid(request)), null);
		} catch (ServiceException e) {
			sendError(request, response, e.getMessage());
		}
		return null;
	}
	
	/**
	 * 移除用户
	 * @param request
	 * @param response
	 * @param id
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value="/goods/remove", method=RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> remove(HttpServletRequest request, HttpServletResponse response, 
			Long id) throws IOException {
		try {
			return ajaxResult(goodsService.doDisable(id, getUid(request)), null);
		} catch (ServiceException e) {
			sendError(request, response, e.getMessage());
		}
		return null;
	}
}
