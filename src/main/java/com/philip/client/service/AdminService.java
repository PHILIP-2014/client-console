package com.philip.client.service;

import java.util.Date;
import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.philip.client.dao.AdminDao;
import com.philip.client.model.Admin;
import com.philip.client.utils.ServiceException;
import com.philip.client.utils.SessionUser;
import com.philip.client.utils.security.PwdEncoder;

@Service("adminService")
public class AdminService {
	
	@Autowired
	private AdminDao adminDao;
	@Autowired
	private PwdEncoder pwdEncoder;
	
	final static Logger LOG = Logger.getLogger(AdminService.class);

	/**
	 * 常规验证
	 */
	public Admin doLogin(Admin admin) throws ServiceException {

		Admin _admin = adminDao.queryByName(admin.getName());
		if(_admin == null) {
			throw new ServiceException("error.account.not.exist");
		}
		if(_admin.getIsDisable() != Admin.IS_NORMAL) {
			throw new ServiceException("error.account.status.not.normal");
		}
		if(!pwdEncoder.isPasswordValid(_admin.getPwd(), admin.getPwd())) {
			throw new ServiceException("error.account.password.invalid");
		}

		return _admin;
	}
	
	public SessionUser initSessionUser(Admin admin) {

		if(admin==null){
			return null;
		}
		SessionUser sessionUser = new SessionUser();
		sessionUser.setAppKey(admin.getAppkey());
		sessionUser.setLoginName(admin.getName());
		sessionUser.setUid(admin.getId());
		sessionUser.setGmtLogin(new Date());

		return sessionUser;
	}
	
	public List<Admin> queryByRole(Integer role, Long uid) throws ServiceException {
		if(!checkPermission(uid)){
			throw new ServiceException("error.forbidden");
		}
		
		return adminDao.queryByRole(role);
	}
	
	private Boolean checkPermission(Long uid) {
		Admin _admin = adminDao.queryOne(uid);
		if(_admin == null || _admin.getRole() != Admin.IS_ADMIN) {
			return false;
		}
		return true;
	}
}
