package com.daoman.client.service.impl;

import org.springframework.beans.factory.annotation.Autowired;

import com.daoman.client.dao.company.CompanyDao;
import com.daoman.client.dao.company.CompanyMemberDao;
import com.daoman.client.model.CustomerCompanyModel;
import com.daoman.client.model.Team;
import com.daoman.client.model.TeamModel;
import com.daoman.client.model.company.Company;
import com.daoman.client.model.company.CompanyMember;
import com.daoman.client.model.company.CompanyMemberModel;
import com.daoman.client.service.CustomerCompanyService;
import com.daoman.client.service.TeamService;
import com.daoman.client.utils.ServiceException;
import com.google.common.base.Strings;

//@Service("customerCompanyService")
public class CustomerCompanyServiceImpl implements CustomerCompanyService{
	
	public final static String SYS_TEAM_COMPANY_NAME = "全体人员";
	
	@Autowired
	private CompanyDao companyDao;
	@Autowired
	private CompanyMemberDao companyMemberDao;
	@Autowired
	private TeamService teamService;
	
	public CustomerCompanyModel queryModel(Long id) {
		// TODO Auto-generated method stub
		return null;
	}

	public CustomerCompanyModel doCreate(Company company)
			throws ServiceException {
		
		if(Strings.isNullOrEmpty(company.getName())) {
			throw new ServiceException("error.param.null.or.empty");
		}
		if(company.getUidCreated()==null || company.getUidCreated() <= 0) {
			throw new ServiceException("error.param.null.or.empty");
		}
		
		company.setIsDisabled(Company.DISABLED_FALSE);
//		company.setInviteCode(generateInviteCode());
		companyDao.insert(company);
		
		CompanyMemberModel  companyMember= new CompanyMemberModel();
		companyMember.setIsActive(CompanyMember.ACTIVE_TRUE);
		companyMember.setCid(company.getId());
		companyMember.setTargetUid(company.getUidCreated());
		companyMember.setMemberRole(CompanyMember.ROLE_ADMIN);
		companyMemberDao.insert(companyMember);

		TeamModel teamModel = new TeamModel();
		teamModel.setIsOpen(Team.IS_OPEN_FALSE);
		teamModel.setCid(company.getId());
		teamModel.setUidCreated(company.getUidCreated());
		teamModel.setName(SYS_TEAM_COMPANY_NAME);
		teamService.doCreate(teamModel, true);
		return null;
	}
	
/*	private String generateInviteCode(){
		String inviteCode = ShortUrlGenerator.random(UUID.randomUUID().toString());
		
		Integer count = companyDao.countInviteCode(inviteCode);
		if(count!=null && count.intValue()>0){
			return inviteCode+String.valueOf(count);
		}
		return inviteCode;
	}*/

	public Integer doUpdate(CustomerCompanyModel customerCompanyModel)
			throws com.daoman.client.utils.ServiceException {
		// TODO Auto-generated method stub
		return null;
	}

	public Integer doDelete(Long id)
			throws com.daoman.client.utils.ServiceException {
		// TODO Auto-generated method stub
		return null;
	}

}
