package com.daoman.client.service.company;

import com.daoman.client.model.company.Company;
import com.daoman.client.model.company.CompanyModel;
import com.daoman.client.utils.ServiceException;

public interface CompanyService {
	
	public CompanyModel queryModel(Long id);
	
	public Company doCreate(Company company) throws ServiceException;
	
	public Integer doUpdate(Long uid, Company company) throws ServiceException;

	/**
	 * 解析邀请码
	 * @param inviteCode
	 * @return
	 * 		若有，返回公司 id
	 * 		否则，返回null
	 */
	public Long decodeInviteCode(String inviteCode);
}