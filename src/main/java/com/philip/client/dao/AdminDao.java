package com.philip.client.dao;

import com.philip.client.model.Admin;

public interface AdminDao {

	public Admin queryModel(Long id);
	
	public Admin queryByName(String name);
	
	public Admin queryByAppkey(String appkey);
	
	public Long insert(Admin admin);
	
	public Integer delete(Long id);
	
	public Integer update(Admin admin);
	
	public Integer countByAppkey(String appkey);
	
}
