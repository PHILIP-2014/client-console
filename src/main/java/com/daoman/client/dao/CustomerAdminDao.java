package com.daoman.client.dao;

import com.daoman.client.model.CustomerAdmin;

public interface CustomerAdminDao {

	public CustomerAdmin queryModel(Long id);
	
	public CustomerAdmin queryModelByLoginName(String loginName);
	
	public CustomerAdmin queryModelByAppKey(String appKey);
	
	public Long insert(CustomerAdmin customerAdmin);
	
	public Integer delete(Long id);
	
	public Integer update(CustomerAdmin customerAdmin);
	
	public Integer countByAppKey(String appKey);
	
}
