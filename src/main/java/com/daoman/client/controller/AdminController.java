package com.daoman.client.controller;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.daoman.client.model.CustomerAdmin;
import com.daoman.client.service.CustomerAdminService;
import com.daoman.client.utils.ServiceException;
import com.daoman.client.utils.SessionUser;

@Controller
public class AdminController extends BaseController{
	
	@Autowired
	private CustomerAdminService customerAdminService;

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
			CustomerAdmin admin) throws IOException {

		try {
			CustomerAdmin _admin = customerAdminService.doLogin(admin);
			SessionUser user = customerAdminService.initSessionUser(_admin);

			setSessionUser(request, user);
			model.put("admin", user);
			return "/app/index";
		} catch (ServiceException e) {
			sendError(request, response, e.getMessage());
		}
		return null;
	}
	@RequestMapping(value="/logout", method=RequestMethod.GET)
	public String logout(HttpServletRequest request) {
		removeSession(request, SESSION_KEY);
		return "redirect:/login";
	}
	
	@RequestMapping(value="/app", method=RequestMethod.GET)
	public String index(HttpServletRequest request, ModelMap model){
		
		return "/app/index";
	}
}