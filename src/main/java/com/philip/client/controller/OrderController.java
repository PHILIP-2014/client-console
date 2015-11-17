package com.philip.client.controller;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.philip.client.service.OrderService;
import com.philip.client.utils.ServiceException;

@Controller
public class OrderController extends BaseController {

	@Autowired
	private OrderService orderService;
	
	/**
	 * 获取订单列表
	 */
	@RequestMapping(value="/orders/management", method=RequestMethod.GET)
	public String queryAdmins(HttpServletRequest request, HttpServletResponse response, 
			ModelMap out, Integer role) throws IOException {
		
		try {
			out.put("admin", getSessionUser(request));
			out.put("orders", orderService.queryAll(getUid(request)));
			return "/client/orders";
		} catch (ServiceException e) {
			sendError(request, response, e.getMessage());
		}
		return null;
	}
}
