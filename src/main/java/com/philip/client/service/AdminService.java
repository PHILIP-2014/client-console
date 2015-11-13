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

		return false;
	}
	
}
