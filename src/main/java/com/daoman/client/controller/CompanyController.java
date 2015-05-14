package com.daoman.client.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.daoman.client.model.CustomerCompanyModel;
import com.daoman.client.model.company.Company;
import com.daoman.client.service.CustomerCompanyService;
import com.daoman.client.service.company.CompanyService;
import com.daoman.client.utils.ServiceException;
import com.daoman.client.utils.SessionUser;

@Controller
@RequestMapping("/company")
public class CompanyController extends BaseController{
	
	@Autowired
	private CustomerCompanyService customerCompanyService;
	@Autowired
	private CompanyService companyService;

	@RequestMapping(method=RequestMethod.POST)
	public CustomerCompanyModel createCompany(HttpServletRequest request, Company company){
		
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
}
