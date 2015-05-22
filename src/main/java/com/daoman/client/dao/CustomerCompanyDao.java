package com.daoman.client.dao;

import java.util.List;

import com.daoman.client.model.CustomerCompany;
import com.daoman.client.model.CustomerCompanyModel;

public interface CustomerCompanyDao {

	public CustomerCompanyModel queryModel(Long id);
	
	public List<CustomerCompanyModel> queryModelsByAppKey(String appKey);
	
	public Integer insert(CustomerCompany customerCompany);
	
	public Integer countByAppKey(String appKey);
	
	public Integer delete(Long id);
	
	public Integer update(CustomerCompany customerCompany);
	
}
