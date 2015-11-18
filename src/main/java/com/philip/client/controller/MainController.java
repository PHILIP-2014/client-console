package com.philip.client.controller;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.philip.client.model.Admin;
import com.philip.client.service.AdminService;
import com.philip.client.service.GoodsService;
import com.philip.client.service.OrderService;
import com.philip.client.utils.ServiceException;

@Controller
@RequestMapping("/main")
public class MainController extends BaseController {
	
	@Autowired
	private AdminService adminService;
	@Autowired
	private OrderService orderService;
	@Autowired
	private GoodsService goodsService;
	
	/**
	 * 系统主入口
	 * @param request
	 * @param response
	 * @param model
	 * @return
	 * @throws IOException 
	 */
	@RequestMapping(method=RequestMethod.GET)
	public String main(HttpServletRequest request, HttpServletResponse response, ModelMap out) throws IOException {
		
		try {
			out.put("admin", getSessionUser(request));
			out.put("adminNum", adminService.countByRole(Admin.IS_ADMIN, getUid(request)));
			out.put("orderNum", orderService.countAll());
			out.put("goodsNum", goodsService.countAll());
			return "/client/index";
		} catch (ServiceException e) {
			sendError(request, response, e.getMessage());
		} 
		return null;
	}

}
