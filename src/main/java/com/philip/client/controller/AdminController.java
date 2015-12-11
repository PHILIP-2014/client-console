package com.philip.client.controller;

import java.io.IOException;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.philip.client.model.Admin;
import com.philip.client.service.AdminService;
import com.philip.client.utils.ServiceException;
import com.philip.client.utils.SessionUser;

@Controller
public class AdminController extends BaseController{
	
	@Autowired
	private AdminService adminService;

	@RequestMapping(value="/login", method=RequestMethod.GET)
	public String login(){
		
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
			SessionUser user = initSessionUser(_admin);
			setSessionUser(request, user);

			return "redirect:/main";
			
		} catch (ServiceException e) {
			sendError(request, response, e.getMessage());
		}
		return null;
	}
	
	/**
	 * 添加用户
	 * @param request
	 * @param response
	 * @param admin
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value="/admin/add", method=RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> add(HttpServletRequest request, HttpServletResponse response,
			Admin admin) throws IOException {
		try {
			return ajaxResult(adminService.doCreate(admin, getUid(request)), null);
		} catch (ServiceException e) {
			sendError(request, response, e.getMessage());
		}
		return null;
	}
	
	/**
	 * 更新用户信息
	 * @param request
	 * @param response
	 * @param admin
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value="/admin/edit", method=RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> edit(HttpServletRequest request, HttpServletResponse response,
			Admin admin) throws IOException {
		try {
			return ajaxResult(adminService.doEdit(admin, getUid(request)), null);
		} catch (ServiceException e) {
			sendError(request, response, e.getMessage());
		}
		return null;
	}
	
	/**
	 * 移除用户
	 * @param request
	 * @param response
	 * @param id
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value="/admin/remove", method=RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> remove(HttpServletRequest request, HttpServletResponse response, 
			Long id) throws IOException {
		try {
			return ajaxResult(adminService.doDisable(id, getUid(request)), null);
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