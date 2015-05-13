package com.daoman.client.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.daoman.client.model.CustomerCompanyModel;
import com.daoman.client.model.company.Company;
import com.daoman.client.utils.SessionUser;

@Controller
@RequestMapping("/company")
public class CompanyController extends BaseController{

	@RequestMapping(method=RequestMethod.POST)
	public CustomerCompanyModel createCompany(HttpServletRequest request, Company company){
		
		SessionUser user = getSessionUser(request);
		
		//获取appKey&createUserId
		
		//doCreateCompany
		
		//封装CustomerCompanyModel
		
		CustomerCompanyModel ccm = new CustomerCompanyModel();
		ccm.setCompany(company);
		
		return null;
	}
}
