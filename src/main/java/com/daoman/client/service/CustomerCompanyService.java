package com.daoman.client.service;

import com.daoman.client.model.CustomerCompanyModel;
import com.daoman.client.utils.ServiceException;
import com.daoman.client.utils.SessionUser;

public interface CustomerCompanyService {

	public CustomerCompanyModel queryModel(Long id);
	
	public CustomerCompanyModel doCreate(SessionUser user, Long cid);
	
	public Integer doUpdate(CustomerCompanyModel customerCompanyModel) throws ServiceException;
	
	public Integer doDelete(Long id) throws ServiceException;
	
}
