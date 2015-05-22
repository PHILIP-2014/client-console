package com.daoman.client.service.company;

import com.daoman.client.model.company.Company;
import com.daoman.client.model.company.CompanyModel;
import com.daoman.client.utils.ServiceException;

public interface CompanyService {
	
	public CompanyModel queryModel(Long id);
	
	public Company doCreate(Company company) throws ServiceException;
	
	public Integer doUpdate(Long uid, Company company) throws ServiceException;
	
	/**
	 * @author philip
	 * 没有成员才能删除（这是app client的方法）
	 * @param id
	 * @return
	 */
	public Integer doDelete(Long id);

	/**
	 * 解析邀请码
	 * @param inviteCode
	 * @return
	 * 		若有，返回公司 id
	 * 		否则，返回null
	 */
	public Long decodeInviteCode(String inviteCode);
}