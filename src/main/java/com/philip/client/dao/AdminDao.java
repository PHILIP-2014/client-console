package com.philip.client.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.philip.client.model.Admin;

public interface AdminDao {

	public Admin queryOne(Long id);
	
	public Admin queryByName(@Param("name") String name);
	
	public Admin queryByAppkey(@Param("appkey") String appkey);

	public Integer countByAppkey(@Param("appkey") String appkey);
	
	public List<Admin> queryByRole(@Param("role") Integer role);
	
	public Integer countByRole(@Param("role") Integer role);
	
	public Integer insert(Admin admin);
	
	public Integer update(Admin admin);

	public Integer delete(@Param("id") Long id);
	
}
