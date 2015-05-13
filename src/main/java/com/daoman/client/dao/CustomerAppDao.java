package com.daoman.client.dao;

import com.daoman.client.model.CustomerApp;

public interface CustomerAppDao {

	public CustomerApp queryModel(Long id);
	
	public CustomerApp queryModelByAppKey(String appKey);
	
	public Long insert(CustomerApp customerApp);
	
	public Integer delete(Long id);
	
	public Integer update(CustomerApp customerApp);
	
}
