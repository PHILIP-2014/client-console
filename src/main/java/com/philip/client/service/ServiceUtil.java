package com.philip.client.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.philip.client.dao.AdminDao;
import com.philip.client.model.Admin;

@Service("serviceUtil")
public class ServiceUtil {
	
	@Autowired
	private AdminDao adminDao;
	
	public Boolean checkPermission(Long uid) {
		Admin _admin = adminDao.queryOne(uid);
		if(_admin == null || _admin.getRole() != Admin.IS_ADMIN) {
			return false;
		}
		return true;
	}

}
