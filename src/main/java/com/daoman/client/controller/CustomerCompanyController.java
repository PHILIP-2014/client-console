package com.daoman.client.controller;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
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
	@ResponseBody
	public List<CustomerCompanyModel> queryModelsByAppKey(HttpServletRequest request, HttpServletResponse response){
		SessionUser user = getSessionUser(request);
		return customerCompanyService.queryModelsByAppKey(user.getAppKey());
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
			@RequestBody CompanyModel company){
		
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
	@RequestMapping(value="/{id}", method=RequestMethod.PUT)
	@ResponseBody
	public CompanyModel putCompany(HttpServletRequest request, HttpServletResponse response, 
			@PathVariable Long id, @RequestBody CompanyModel companyModel) throws IOException {

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
}
