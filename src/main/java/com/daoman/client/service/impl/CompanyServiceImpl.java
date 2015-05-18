package com.daoman.client.service.impl;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.daoman.client.dao.company.CompanyDao;
import com.daoman.client.model.CustomerAdmin;
import com.daoman.client.model.company.Company;
import com.daoman.client.model.company.CompanyModel;
import com.daoman.client.service.TeamService;
import com.daoman.client.service.company.CompanyService;
import com.daoman.client.utils.ServiceException;
import com.daoman.utils.http.ShortUrlGenerator;
import com.google.common.base.Strings;

@Service("companyService")
public class CompanyServiceImpl implements CompanyService{

	@Autowired
	private CompanyDao companyDao;
	@Autowired
	private TeamService teamService;

	public CompanyModel queryModel(Long id) {
		if(id==null||id.longValue()<=0) {
			return null;
		}
		return companyDao.queryModel(id);
	}

	public Company doCreate(Company company) throws ServiceException {

		companyDao.insert(initCompany(company));
		
		teamService.doCreate(company.getId());

		return companyDao.queryModel(company.getId());
	}
	
	private Company initCompany(Company company) throws ServiceException{
		if(Strings.isNullOrEmpty(company.getName())) {
			throw new ServiceException("error.param.null.or.empty");
		}
		company.setUidCreated(CustomerAdmin.CUSTOMER_UID_CREATED);
		company.setIsDisabled(Company.DISABLED_FALSE);
		company.setInviteCode(generateInviteCode());
		return company;
	}
	
	public Integer doUpdate(Long uid, Company company) throws ServiceException {
		if(company.getId()==null) {
			throw new ServiceException("error.param.null.or.empty");
		}
		if(Strings.isNullOrEmpty(company.getName())) {
			throw new ServiceException("error.param.null.or.empty");
		}
		
		return companyDao.update(company);
	}

	public Long decodeInviteCode(String inviteCode) {
		if(Strings.isNullOrEmpty(inviteCode)){
			return null;
		}
		
		return companyDao.queryCidByInviteCode(inviteCode);
	}
	
	private String generateInviteCode(){
		String inviteCode = ShortUrlGenerator.random(UUID.randomUUID().toString());
		
		Integer count = companyDao.countInviteCode(inviteCode);
		if(count!=null && count.intValue()>0){
			return inviteCode+String.valueOf(count);
		}
		return inviteCode;
	}
	
}