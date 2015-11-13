package com.philip.client.dao;

import com.philip.client.model.Admin;

public interface AdminDao {

	public Admin queryModel(Long id);
	
	public Admin queryModelByName(String loginName);
	
	public Admin queryModelByAppKey(String appKey);
	
	public Long insert(Admin customerAdmin);
	
	public Integer delete(Long id);
	
	public Integer update(Admin customerAdmin);
	
	public Integer countByAppKey(String appKey);
	
}
