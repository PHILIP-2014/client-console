package com.daoman.client.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.daoman.client.dao.CustomerAppDao;
import com.daoman.client.model.CustomerApp;
import com.daoman.client.service.CustomerAppService;
import com.daoman.client.utils.ServiceException;

@Service("customerAppService")
public class CustomerAppServiceImpl implements CustomerAppService{
	
	@Autowired
	private CustomerAppDao customerAppDao;

	public CustomerApp queryModel(Long id) {
		// TODO Auto-generated method stub
		return null;
	}

	public CustomerApp queryModelByAppKey(String appKey) {
		return customerAppDao.queryModelByAppKey(appKey);
	}

	public CustomerApp doCreate(CustomerApp customerApp)
			throws ServiceException {
		// TODO Auto-generated method stub
		return null;
	}

	public Integer doUpdate(CustomerApp customerApp) throws ServiceException {
		// TODO Auto-generated method stub
		return null;
	}

	public Integer doDelete(Long id) throws ServiceException {
		// TODO Auto-generated method stub
		return null;
	}

	
}
