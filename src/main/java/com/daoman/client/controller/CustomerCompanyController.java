package com.daoman.client.controller;

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

import com.daoman.client.model.CustomerCompanyModel;
import com.daoman.client.model.company.CompanyModel;
import com.daoman.client.service.CustomerCompanyService;
import com.daoman.client.service.company.CompanyService;
import com.daoman.client.utils.ServiceException;
import com.daoman.client.utils.SessionUser;

@Controller
@RequestMapping("/customerCompany")
public class CustomerCompanyController extends BaseController{
	
	@Autowired
	private CustomerCompanyService customerCompanyService;
	@Autowired
	private CompanyService companyService;

	/**
	 * 根据app_key获取company
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(method=RequestMethod.GET)
	public String queryModelsByAppKey(HttpServletRequest request, HttpServletResponse response, 
			ModelMap model){
		SessionUser user = getSessionUser(request);
		model.put("admin", user);
		model.put("comp_list", customerCompanyService.queryModelsByAppKey(user.getAppKey()));
		return "comp";
	}
	
	/**
	 * 创建company
	 * @param request
	 * @param response
	 * @param company
	 * @return
	 */
	@RequestMapping(method=RequestMethod.POST)
	@ResponseBody
	public CustomerCompanyModel postCompany(HttpServletRequest request, HttpServletResponse response,
			CompanyModel company){
		
		SessionUser user = getSessionUser(request);
		try {
			companyService.doCreate(company);
			CustomerCompanyModel customerCompanyModel = customerCompanyService.doCreate(user, company.getId());
			customerCompanyModel.setCompany(company);
			
			return customerCompanyModel;
		} catch (ServiceException e) {
			e.printStackTrace();
		}
		
		return null;
	}
	
	/**
	 * 更新company
	 * @param request
	 * @param response
	 * @param id
	 * @param companyModel
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value="/update", method=RequestMethod.POST)
	@ResponseBody
	public CompanyModel putCompany(HttpServletRequest request, HttpServletResponse response, 
			Long id, CompanyModel companyModel) throws IOException {

		SessionUser user = getSessionUser(request);
		try {
			companyModel.setId(id);
			
			companyService.doUpdate(user.getUid(), companyModel);
			return companyModel;
		} catch (ServiceException e) {
			sendError(request, response, e.getMessage());
		}
		return null;
	}
	
	@RequestMapping(value="/delete", method=RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> deleteCompany(HttpServletRequest request, Long id, Long cid) {
		Integer impact = companyService.doDelete(cid);
		if(impact == null){
			return ajaxResult(false, "fail");
		}
		customerCompanyService.doDelete(id);
		return ajaxResult(true, "succ");
	}
}
