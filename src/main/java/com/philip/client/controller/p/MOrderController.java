package com.philip.client.controller.p;

import java.io.IOException;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.philip.client.controller.BaseController;
import com.philip.client.model.Order;
import com.philip.client.model.OrderModel;
import com.philip.client.service.OrderService;
import com.philip.client.utils.ServiceException;

@Controller
@RequestMapping(value="/p")
public class MOrderController extends BaseController {

	@Autowired
	private OrderService orderService;
	
	
	/**
	 * 获取订单
	 * @param request
	 * @param response
	 * @param order
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value="/order", method=RequestMethod.GET)
	public String getOrder(HttpServletRequest request, HttpServletResponse response,
			Long id,ModelMap model) throws IOException {
		try {
//			order.setOrderNum(UUID.randomUUID().toString());
			OrderModel order = orderService.queryModel(id);
			model.put("order", order);
			return "order/order";
		} catch (ServiceException e) {
			sendError(request, response, e.getMessage());
		}
		return null;
	}
	
	
	
	
	/**
	 * 预览/确定下单
	 * @param request
	 * @param response
	 * @param order
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value="/order/preview", method=RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> preview(HttpServletRequest request, HttpServletResponse response,
			Order order,ModelMap model) throws IOException {
		try {
			model.put("order", order);
			orderService.doCreate(order);
			return ajaxResult(true, order);
		} catch (ServiceException e) {
			sendError(request, response, e.getMessage());
		}
		return null;
	}
	
	/**
	 * 提交订单
	 * @param request
	 * @param response
	 * @param order
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value="/order", method=RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> postOrder(HttpServletRequest request, HttpServletResponse response,
			 OrderModel order,ModelMap model) throws IOException {
		try {
			order.setStatus(Order.STATUS_FINISHED);
			orderService.updateOrder(order);
			return ajaxResult(true, order);
		} catch (ServiceException e) {
			e.printStackTrace();
		}
		return null;
	}
	
	/**
	 * 更新订单
	 * @param request
	 * @param response
	 * @param order
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value="/order", method=RequestMethod.PUT)
	@ResponseBody
	public Map<String, Object> putOrder(HttpServletRequest request, HttpServletResponse response,
			Order order,ModelMap model) throws IOException {
		try {
			model.put("order", order);
			orderService.doUpdate(order, getUid(request));
			return ajaxResult(true, null);
		} catch (ServiceException e) {
			sendError(request, response, e.getMessage());
		}
		return null;
	}
	
	
	
}
