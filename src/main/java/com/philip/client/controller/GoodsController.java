package com.philip.client.controller;

import java.io.IOException;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.philip.client.model.Goods;
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
			Goods goods) throws IOException {
		try {
			return ajaxResult(goodsService.doCreate(goods, getUid(request)), null);
		} catch (ServiceException e) {
			sendError(request, response, e.getMessage());
		}
		return null;
	}
}
