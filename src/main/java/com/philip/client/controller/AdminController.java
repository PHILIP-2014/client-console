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
	public String postLogin(HttpServletRequest request, HttpServletResponse response, ModelMap model,
			Admin admin) throws IOException {

		try {
			Admin _admin = adminService.doLogin(admin);
			SessionUser user = adminService.initSessionUser(_admin);

			setSessionUser(request, user);
			model.put("admin", user);
			model.put("countAdmin", adminService.countByAppKey(user.getAppKey()));
			return "/app/index";
		} catch (ServiceException e) {
			sendError(request, response, e.getMessage());
		}
		return null;
	}
	
	@RequestMapping(value="/dashboard", method=RequestMethod.GET)
	public String main(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		
		SessionUser user = getSessionUser(request);
		model.put("admin", user);
		model.put("countAdmin", adminService.countByAppKey(user.getAppKey()));
		return "/app/index";
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