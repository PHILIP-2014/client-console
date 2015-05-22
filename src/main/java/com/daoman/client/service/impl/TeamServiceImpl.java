package com.daoman.client.service.impl;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.daoman.client.dao.TeamDao;
import com.daoman.client.model.CustomerAdmin;
import com.daoman.client.model.Team;
import com.daoman.client.model.TeamCond;
import com.daoman.client.model.TeamModel;
import com.daoman.client.service.TeamService;
import com.daoman.client.utils.ServiceException;
import com.google.common.base.Strings;

@Service("teamService")
public class TeamServiceImpl implements TeamService{

	//	static final Integer SYS_TEAM = 0;
	static final Integer NORMAL_TEAM = 1;
	@Autowired
	private TeamDao teamDao;


	public TeamModel queryModel(Long id) throws ServiceException{
		if(id==null) {
			throw new ServiceException("error.param.null.or.empty");
		}
		return teamDao.queryModel(id);
	}

	public TeamModel doCreate(Long cid) throws ServiceException{

		TeamModel teamModel = initTeamModel(cid);
		teamDao.insert(teamModel);

		return teamDao.queryById(teamModel.getId());
	}
	
	private TeamModel initTeamModel(Long cid) {
		TeamModel teamModel = new TeamModel();
		teamModel.setName(Team.SYS_TEAM_COMPANY_NAME);
		teamModel.setCid(cid);
		teamModel.setIsOpen(Team.IS_OPEN_FALSE);
		teamModel.setUidCreated(CustomerAdmin.CUSTOMER_UID_CREATED);
		teamModel.setTeamCode(UUID.randomUUID().toString());
		teamModel.setNum(0);
		teamModel.setStatus(Team.STATUS_NORMAL);
		teamModel.setIsSystem(Team.IS_SYSTEM_TRUE);
		
		return teamModel;
	}

	public Integer doUpdate(TeamModel teamModel) throws ServiceException {

		if(Strings.isNullOrEmpty(teamModel.getName())){
			throw new ServiceException("error.param.null.or.empty");
		}
		return teamDao.updateModel(teamModel);
	}

	public List<TeamModel> queryByCond(TeamCond cond) {

		return  teamDao.queryByCond(cond);
	}

	public TeamModel queryModelOfCompany(Long cid){
		if(cid==null|| cid.longValue()<=0){
			return null;
		}
		return teamDao.queryModelOfCompany(cid);
	}

	public Integer delete(Long uid, Long tid) {
		//FIXME 移除时，要把所有team成员的redis信息也删掉，同时要删除team_member
		
		//redis 操作  新建team  把本人加入team  并把team_key加入到我的team_keys
		//RedisService.getInstance().leaveOneTeam(uid, tid);

		//return teamDao.delete(tid);
		
		return null;
	}

	public TeamModel queryById(Long teamId) {

		return teamDao.queryById(teamId);
	}

	public Integer doDelete(Long cid) {
		//没有成员才能删除（这是app client的方法, 删除全部成员群）
		TeamModel teamModel = teamDao.queryModelOfCompany(cid);
		if(teamModel == null || teamModel.getNum() > 0){
			return null;
		}
		teamModel.setStatus(Team.STATUS_DISABLE);
		return teamDao.updateModel(teamModel);
	}

}