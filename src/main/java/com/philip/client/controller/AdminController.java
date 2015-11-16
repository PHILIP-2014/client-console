package com.philip.client.controller;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.philip.client.model.Admin;
import com.philip.client.service.AdminService;
import com.philip.client.utils.ServiceException;
import com.philip.client.utils.SessionUser;

@Controller
public class AdminController extends BaseController{
	
	@Autowired
	private AdminService adminService;

	@RequestMapping(value="/login", method=RequestMethod.GET)
	public String login(HttpServletRequest request){
		
		return null;
	}
	
	/**
	 * 登录
	 * @param request
	 * @param response
	 * @param account
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value="/login", method=RequestMethod.POST)
	public String postLogin(HttpServletRequest request, HttpServletResponse response, ModelMap out,
			Admin admin) throws IOException {

		try {
			Admin _admin = adminService.doLogin(admin);
			SessionUser user = adminService.initSessionUser(_admin);
			setSessionUser(request, user);

			return "redirect:/main";
			
		} catch (ServiceException e) {
			sendError(request, response, e.getMessage());
		}
		return null;
	}
	
	/**
	 * 系统主入口
	 * @param request
	 * @param response
	 * @param model
	 * @return
	 */
	@RequestMapping(value="/main", method=RequestMethod.GET)
	public String main(HttpServletRequest request, ModelMap out) {
		
		out.put("admin", getSessionUser(request));
		
		return "/client/index";
	}
	
	@RequestMapping(value="/queryAdmins", method=RequestMethod.GET)
	public String queryAdmins(HttpServletRequest request, HttpServletResponse response, 
			ModelMap out, Integer role) throws IOException {
		
		try {
			out.put("admin", getSessionUser(request));
			List<Admin> admins = adminService.queryByRole(role, getUid(request));
			out.put("admins", adminService.queryByRole(role, getUid(request)));
			return "/client/admins";
		} catch (ServiceException e) {
			sendError(request, response, e.getMessage());
		}
		return null;
	}
	
	/**
	 * 登出
	 * @param request
	 * @return
	 */
	@RequestMapping(value="/logout", method=RequestMethod.GET)
	public String logout(HttpServletRequest request) {
		removeSession(request, SESSION_KEY);
		return "redirect:/login";
	}
	
}