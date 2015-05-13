package com.daoman.client.dao;

import com.daoman.client.model.CustomerCompany;
import com.daoman.client.model.CustomerCompanyModel;

public interface CustomerCompanyDao {

	public CustomerCompanyModel queryModel(Long id);
	
	public Long insert(CustomerCompany customerCompany);
	
	public Integer delete(Long id);
	
	public Integer update(CustomerCompany customerCompany);
	
}
