package com.philip.client.controller;

import java.io.IOException;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.philip.client.model.Order;
import com.philip.client.service.OrderService;
import com.philip.client.utils.ServiceException;

@Controller
public class OrderController extends BaseController {

	@Autowired
	private OrderService orderService;
	
	/**
	 * 添加订单
	 * @param request
	 * @param response
	 * @param order
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value="/order/add", method=RequestMethod.POST)

	public String add(HttpServletRequest request, HttpServletResponse response,
			Order order,ModelMap model) throws IOException {
		try {
//			order.setOrderNum(UUID.randomUUID().toString());
			model.put("order", order);
			orderService.doCreate(order, getUid(request));
			return "order/order";
//			return ajaxResult(orderService.doCreate(order, getUid(request)), null);
		} catch (ServiceException e) {
			sendError(request, response, e.getMessage());
		}
		return null;
	}
	
	/**
	 * 更新订单信息
	 * @param request
	 * @param response
	 * @param order
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value="/order/edit", method=RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> edit(HttpServletRequest request, HttpServletResponse response,
			Order order) throws IOException {
		try {
			return ajaxResult(orderService.doEdit(order, getUid(request)), null);
		} catch (ServiceException e) {
			sendError(request, response, e.getMessage());
		}
		return null;
	}
	
	/**
	 * 完成订单
	 * @param request
	 * @param response
	 * @param id
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value="/order/finish", method=RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> finish(HttpServletRequest request, HttpServletResponse response, 
			Long id) throws IOException {
		try {
			return ajaxResult(orderService.doFinish(id, getUid(request)), null);
		} catch (ServiceException e) {
			sendError(request, response, e.getMessage());
		}
		return null;
	}
	
	/**
	 * 取消订单
	 * @param request
	 * @param response
	 * @param id
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value="/order/remove", method=RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> remove(HttpServletRequest request, HttpServletResponse response, 
			Long id) throws IOException {
		try {
			return ajaxResult(orderService.doDisable(id, getUid(request)), null);
		} catch (ServiceException e) {
			sendError(request, response, e.getMessage());
		}
		return null;
	}
}
