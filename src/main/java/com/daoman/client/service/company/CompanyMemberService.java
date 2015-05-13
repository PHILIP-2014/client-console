package com.daoman.client.service.company;

import java.util.List;

import com.daoman.client.model.company.CompanyMemberModel;
import com.daoman.client.utils.ServiceException;

public interface CompanyMemberService {

	public CompanyMemberModel doCreate(CompanyMemberModel companyMemberModel) throws ServiceException;

	public List<CompanyMemberModel> getMembers(Long cid);

	public Integer doUpdate(CompanyMemberModel companyMemberModel,Long uid) throws ServiceException;

	public CompanyMemberModel queryModel(Long id) throws ServiceException;

	public boolean isAdmin(Long targetUid, Long cid);

	public Integer doLeave(Long targetUid, Long cid) throws ServiceException;

	public CompanyMemberModel doAddMember(CompanyMemberModel companyMemberModel) throws ServiceException;

	public void doDeleteMember(Long uid, Long id) throws ServiceException;

	public boolean isExisted(Long cid, Long uid);
}