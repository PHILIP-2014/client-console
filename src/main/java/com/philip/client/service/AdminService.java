package com.philip.client.service;

import java.util.Date;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.common.base.Strings;
import com.philip.client.dao.AdminDao;
import com.philip.client.model.Admin;
import com.philip.client.utils.ServiceException;
import com.philip.client.utils.SessionUser;
import com.philip.client.utils.security.PwdEncoder;

@Service("adminService")
public class AdminService {
	
	@Autowired
	private AdminDao customerAdminDao;
	@Autowired
	private PwdEncoder pwdEncoder;
	
	final static Logger LOG = Logger.getLogger(AdminService.class);

	/**
	 * 常规验证
	 */
	public Admin doLogin(Admin admin) throws ServiceException{

		Admin _admin = customerAdminDao.queryModelByName(admin.getLoginName());
		if(_admin == null) {
			throw new ServiceException("error.account.not.exist");
		}
		if(_admin.getIsActive() != Admin.ACTIVE_TRUE) {
			throw new ServiceException("error.account.status.not.normal");
		}
		if(!pwdEncoder.isPasswordValid(_admin.getPassword(), admin.getPassword())) {
			throw new ServiceException("error.account.password.invalid");
		}

		return _admin;
	}
	
	public SessionUser initSessionUser(Admin admin) {

		if(admin==null){
			return null;
		}
		SessionUser sessionUser = new SessionUser();
		sessionUser.setAppKey(admin.getAppKey());
		sessionUser.setLoginName(admin.getLoginName());
		sessionUser.setUid(admin.getId());
		sessionUser.setGmtLogin(new Date());

		return sessionUser;
	}
	
	public Boolean checkExist(String column, String value) throws ServiceException {

		if(Strings.isNullOrEmpty(column) || Strings.isNullOrEmpty(value)) {
			LOG.error("Error params. column: "+ column+" value: "+value);
			throw new ServiceException("error.param.null.or.empty");
		}

		//验证 account 字段时否可用
		if("account".equals(column)) {
			return accountExist(value);
		}

		return null;
	}
	
	private Boolean accountExist(String loginName) {

		Admin _admin = queryModelByLoginName(loginName);

		if(_admin != null && _admin.getIsActive() != Admin.ACTIVE_FALSE) {
			return true;
		}

		return false;
	}
	
	public Integer countByAppKey(String appKey) {
		return customerAdminDao.countByAppKey(appKey);
	}

	public Admin queryModel(Long id) {
		// TODO Auto-generated method stub
		return null;
	}

	public Admin queryModelByLoginName(String loginName) {
		// TODO Auto-generated method stub
		return null;
	}

	public Admin queryModelByAppKey(String appKey) {
		// TODO Auto-generated method stub
		return null;
	}

	public Admin doCreate(Admin customerAdmin)
			throws ServiceException {
		// TODO Auto-generated method stub
		return null;
	}

	public Integer doUpdate(Admin customerAdmin)
			throws ServiceException {
		// TODO Auto-generated method stub
		return null;
	}

	public Integer doDelete(Long id) throws ServiceException {
		// TODO Auto-generated method stub
		return null;
	}

}
