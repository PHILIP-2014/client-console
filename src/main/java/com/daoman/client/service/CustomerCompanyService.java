package com.daoman.client.service;

import com.daoman.client.model.CustomerCompanyModel;
import com.daoman.client.model.company.Company;
import com.daoman.client.utils.ServiceException;

public interface CustomerCompanyService {

	public CustomerCompanyModel queryModel(Long id);
	
	public CustomerCompanyModel doCreate(Company company) throws ServiceException;
	
	public Integer doUpdate(CustomerCompanyModel customerCompanyModel) throws ServiceException;
	
	public Integer doDelete(Long id) throws ServiceException;
	
}
