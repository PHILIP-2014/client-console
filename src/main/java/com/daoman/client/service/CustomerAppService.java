package com.daoman.client.service;

import com.daoman.client.model.CustomerApp;
import com.daoman.client.utils.ServiceException;

public interface CustomerAppService {

	public CustomerApp queryModel(Long id);
	
	public CustomerApp queryModelByAppKey(String appKey);
	
	public CustomerApp doCreate(CustomerApp customerApp) throws ServiceException;
	
	public Integer doUpdate(CustomerApp customerApp) throws ServiceException;
	
	public Integer doDelete(Long id) throws ServiceException;
	
}
