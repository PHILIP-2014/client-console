package com.daoman.client.service;

import com.daoman.client.model.CustomerAdmin;
import com.daoman.client.utils.ServiceException;
import com.daoman.client.utils.SessionUser;

public interface CustomerAdminService {
	
	public CustomerAdmin doLogin(CustomerAdmin customerAdmin) throws ServiceException;
	
	public SessionUser initSessionUser(CustomerAdmin customerAdmin);
	
	public Boolean checkExist(String column, String value) throws ServiceException;
	
	public CustomerAdmin queryModel(Long id);
	
	public CustomerAdmin queryModelByLoginName(String loginName);
	
	public CustomerAdmin queryModelByAppKey(String appKey);
	
	public CustomerAdmin doCreate(CustomerAdmin customerAdmin) throws ServiceException;
	
	public Integer doUpdate(CustomerAdmin customerAdmin) throws ServiceException;
	
	public Integer doDelete(Long id) throws ServiceException;
	
}