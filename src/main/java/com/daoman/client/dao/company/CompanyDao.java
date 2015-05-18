package com.daoman.client.dao.company;

import java.util.List;

import com.daoman.client.model.company.Company;
import com.daoman.client.model.company.CompanyModel;

public interface CompanyDao {
	
	public CompanyModel queryModel(Long id);
	
	public Integer insert(Company company);
	
	public Integer delete(Long cid);
	
	public Integer update(Company company);
	
	public List<CompanyModel> queryModelByTargetUid(Long targetUid);

	public Long queryCidByInviteCode(String inviteCode);
	
	public Integer countInviteCode(String inviteCode);
}