package com.daoman.client.service.impl;

import java.util.Date;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.daoman.client.dao.CustomerAdminDao;
import com.daoman.client.model.CustomerAdmin;
import com.daoman.client.service.CustomerAdminService;
import com.daoman.client.utils.ServiceException;
import com.daoman.client.utils.SessionUser;
import com.daoman.client.utils.security.PwdEncoder;
import com.google.common.base.Strings;

@Service("customerAdminService")
public class CustomerAdminServiceImpl implements CustomerAdminService{
	
	@Autowired
	private CustomerAdminDao customerAdminDao;
	@Autowired
	private PwdEncoder pwdEncoder;
	
	final static Logger LOG = Logger.getLogger(CustomerAdminServiceImpl.class);

	/**
	 * 常规验证
	 */
	public CustomerAdmin doLogin(CustomerAdmin admin) throws ServiceException{

		CustomerAdmin _admin = customerAdminDao.queryModelByLoginName(admin.getLoginName());
		if(_admin == null) {
			throw new ServiceException("error.account.not.exist");
		}
		if(_admin.getIsActive() != CustomerAdmin.ACTIVE_TRUE) {
			throw new ServiceException("error.account.status.not.normal");
		}
		if(!pwdEncoder.isPasswordValid(_admin.getPassword(), admin.getPassword())) {
			throw new ServiceException("error.account.password.invalid");
		}

		return _admin;
	}
	
	public SessionUser initSessionUser(CustomerAdmin admin) {

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

		CustomerAdmin _admin = queryModelByLoginName(loginName);

		if(_admin != null && _admin.getIsActive() != CustomerAdmin.ACTIVE_FALSE) {
			return true;
		}

		return false;
	}
	
	public Integer countByAppKey(String appKey) {
		return customerAdminDao.countByAppKey(appKey);
	}

	public CustomerAdmin queryModel(Long id) {
		// TODO Auto-generated method stub
		return null;
	}

	public CustomerAdmin queryModelByLoginName(String loginName) {
		// TODO Auto-generated method stub
		return null;
	}

	public CustomerAdmin queryModelByAppKey(String appKey) {
		// TODO Auto-generated method stub
		return null;
	}

	public CustomerAdmin doCreate(CustomerAdmin customerAdmin)
			throws ServiceException {
		// TODO Auto-generated method stub
		return null;
	}

	public Integer doUpdate(CustomerAdmin customerAdmin)
			throws ServiceException {
		// TODO Auto-generated method stub
		return null;
	}

	public Integer doDelete(Long id) throws ServiceException {
		// TODO Auto-generated method stub
		return null;
	}

}
