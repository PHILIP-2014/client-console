package com.philip.client.service;

import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.philip.client.dao.AdminDao;
import com.philip.client.model.Admin;
import com.philip.client.utils.ServiceException;
import com.philip.client.utils.javabase.LongUtils;
import com.philip.client.utils.javabase.StrUtils;
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
	
	public List<Admin> queryByRole(Integer role, Long uid) throws ServiceException {
		if(!checkPermission(uid)){
			throw new ServiceException("error.forbidden");
		}
		
		return adminDao.queryByRole(role);
	}
	
	public Integer countByRole(Integer role, Long uid) throws ServiceException {
		if(!checkPermission(uid)){
			throw new ServiceException("error.forbidden");
		}
		
		return adminDao.countByRole(role);
	}
	
	public Boolean doCreate(Admin admin, Long uid) throws ServiceException {
		if(!checkPermission(uid)){
			throw new ServiceException("error.forbidden");
		}
		if(StrUtils.isEmpty(admin.getName()) || admin.getRole() == null){
			throw new ServiceException("error.require.params");
		}
		return adminDao.insert(init(admin)) > 0;
	}
	
	private Admin init(Admin admin) {
		admin.setAppkey("lock-seller");
		admin.setIsDisable(Admin.IS_NORMAL);
		admin.setPwd(pwdEncoder.encodePassword("111222"));
		return admin;
	}
	
	public Boolean doEdit(Admin admin, Long uid) throws ServiceException {
		if(!checkPermission(uid)){
			throw new ServiceException("error.forbidden");
		}
		if(LongUtils.isEmpty(admin.getId())){
			throw new ServiceException("error.require.params");
		}
		return adminDao.update(admin) > 0;
	}
	
	public Boolean doDisable(Long id, Long uid) throws ServiceException {
		if(!checkPermission(uid)){
			throw new ServiceException("error.forbidden");
		}
		if(LongUtils.isEmpty(id)){
			throw new ServiceException("error.require.params");
		}
		Admin admin = new Admin();
		admin.setId(id);
		admin.setIsDisable(Admin.IS_DISABLE);
		return adminDao.update(admin) > 0;
	}
	
	private Boolean checkPermission(Long uid) {
		Admin _admin = adminDao.queryOne(uid);
		if(_admin == null || _admin.getRole() != Admin.IS_ADMIN) {
			return false;
		}
		return true;
	}
}
