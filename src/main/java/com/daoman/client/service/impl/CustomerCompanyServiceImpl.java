package com.daoman.client.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.daoman.client.dao.CustomerCompanyDao;
import com.daoman.client.model.CustomerCompanyModel;
import com.daoman.client.service.CustomerCompanyService;
import com.daoman.client.utils.SessionUser;

@Service("customerCompanyService")
public class CustomerCompanyServiceImpl implements CustomerCompanyService{
	
	public final static String SYS_TEAM_COMPANY_NAME = "全体人员";
	
	@Autowired
	private CustomerCompanyDao customerCompanyDao;
	
	public CustomerCompanyModel queryModel(Long id) {
		return null;
	}
	
	public List<CustomerCompanyModel> queryModelsByAppKey(String appKey) {
		
		return customerCompanyDao.queryModelsByAppKey(appKey);
	}

	public CustomerCompanyModel doCreate(SessionUser user, Long cid, String authCode) {
		CustomerCompanyModel customerCompanyModel = new CustomerCompanyModel();
		customerCompanyModel.setAppKey(user.getAppKey());
		customerCompanyModel.setCid(cid);
		customerCompanyModel.setAuthCode(authCode);
		customerCompanyDao.insert(customerCompanyModel);
		return customerCompanyDao.queryModelByCid(cid);
	}
	
	public Integer countByAppKey(String appKey) {
		return customerCompanyDao.countByAppKey(appKey);
	}

	public Integer doUpdate(CustomerCompanyModel customerCompanyModel){
		// TODO Auto-generated method stub
		return null;
	}

	public Integer doDelete(Long id) {
		
		return customerCompanyDao.delete(id);
	}



}
