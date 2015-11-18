package com.philip.client.controller;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.philip.client.service.GoodsService;
import com.philip.client.utils.ServiceException;

@Controller
public class GoodsController extends BaseController {

	@Autowired
	private GoodsService goodsService;
	
	/**
	 * 获取商品列表
	 */
	@RequestMapping(value="/goods/management", method=RequestMethod.GET)
	public String queryAdmins(HttpServletRequest request, HttpServletResponse response, 
			ModelMap out) throws IOException {
		
		try {
			out.put("admin", getSessionUser(request));
			out.put("goods", goodsService.queryAll(getUid(request)));
			return "/client/goods";
		} catch (ServiceException e) {
			sendError(request, response, e.getMessage());
		}
		return null;
	}
}
