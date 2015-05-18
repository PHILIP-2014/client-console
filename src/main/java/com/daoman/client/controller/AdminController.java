package com.daoman.client.controller;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

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
	@ResponseBody
	public CustomerAdmin postLogin(HttpServletRequest request, HttpServletResponse response,
			@RequestBody CustomerAdmin admin) throws IOException {

		try {
			CustomerAdmin _admin = customerAdminService.doLogin(admin);
			SessionUser user = customerAdminService.initSessionUser(_admin);

			setSessionUser(request, user);
			
			return _admin;
		} catch (ServiceException e) {
			sendError(request, response, e.getMessage());
		}
		return null;
	}

}