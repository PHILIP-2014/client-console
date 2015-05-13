package com.daoman.client.service.company;

import java.util.List;

import com.daoman.client.model.company.CompanyModel;
import com.daoman.client.utils.ServiceException;

public interface CompanyService {
	
	public CompanyModel queryModel(Long id);
	
	public CompanyModel doCreate(CompanyModel company) throws ServiceException;
	
	
	/**
	 * 根据用户id查询所有他在的公司
	 * @param userId
	 * @return
	 * @throws ServiceException
	 */
	public List<CompanyModel> queryByUserId(Long userId);

	public Integer doUpdate(Long uid, CompanyModel company) throws ServiceException;

	/**
	 * 解析邀请码
	 * @param inviteCode
	 * @return
	 * 		若有，返回公司 id
	 * 		否则，返回null
	 */
	public Long decodeInviteCode(String inviteCode);
}