package com.daoman.client.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class AdminController extends BaseController{
	
//	@Resource
//	private CustomerAdminService customerAdminService;

	@RequestMapping(value="/login", method=RequestMethod.GET)
	public String login(HttpServletRequest request){
		
		return null;
	}

	/**
	 * parox2.0统一登录接口
	 * @param request
	 * @param response
	 * @param account
	 * @return
	 * @throws IOException
	 */
//	@RequestMapping(value="/login", method=RequestMethod.POST)
//	@ResponseBody
//	public CustomerAdmin postLogin(HttpServletRequest request, HttpServletResponse response,
//			@RequestBody CustomerAdmin admin) throws IOException {
//
//		try {
//			CustomerAdmin _admin = customerAdminService.doLogin(admin);
//			SessionUser user = customerAdminService.initSessionUser(admin);
//
//			setSessionUser(request, user);
//			
//			return _admin;
//		} catch (ServiceException e) {
//			sendError(request, response, e.getMessage());
//		}
//		return null;
//	}
//
//	/**
//	 * 输入框校验
//	 * @param request
//	 * @param response
//	 * @param key
//	 * @param value
//	 * @return
//	 * @throws IOException
//	 */
//	@RequestMapping(value="/check", method=RequestMethod.GET)
//	@ResponseBody
//	public Map<String, Object> getCheck(HttpServletRequest request, HttpServletResponse response, String key, String value) throws IOException {
//		Boolean result=false;
//		try {
//			result = customerAdminService.checkExist(key, value);
//			//返回前端 true: 验证成功，可继续，false: 验证失败
//			return ajaxResult(result==null?false:!result, null);
//		} catch (ServiceException e) {
//			sendError(request, response, e.getMessage());
//		}
//
//		return ajaxResult(false, null);
//	}
}