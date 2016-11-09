package com.philip.client.controller;

import com.philip.client.model.Admin;
import com.philip.client.service.AdminService;
import com.philip.client.utils.ServiceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Controller
public class MainController extends BaseController {
	
	@Autowired
	private AdminService adminService;

	/**
	 * 系统主入口
	 * @param request
	 * @param response
	 * @return
	 * @throws IOException 
	 */
	@RequestMapping(value="/main", method=RequestMethod.GET)
	public String main(HttpServletRequest request, HttpServletResponse response, ModelMap out) throws IOException {
		
		try {
			out.put("admin", getSessionUser(request));
			out.put("adminNum", adminService.countByRole(Admin.IS_ADMIN, getUid(request)));
			return "/client/index";
		} catch (ServiceException e) {
			sendError(request, response, e.getMessage());
		} 
		return null;
	}
	
	/**
	 * 获取用户列表
	 * @param request
	 * @param response
	 * @param out
	 * @param role
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value="/management/accounts", method=RequestMethod.GET)
	public String queryAdmins(HttpServletRequest request, HttpServletResponse response, 
			ModelMap out, Integer role) throws IOException {
		
		try {
			out.put("admin", getSessionUser(request));
			out.put("admins", adminService.queryByRole(role, getUid(request)));
			return "/client/admins";
		} catch (ServiceException e) {
			sendError(request, response, e.getMessage());
		}
		return null;
	}

}
