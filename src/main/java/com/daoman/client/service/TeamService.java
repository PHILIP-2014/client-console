package com.daoman.client.service;

import java.util.List;
import java.util.Map;

import com.daoman.client.model.TeamCond;
import com.daoman.client.model.TeamModel;
import com.daoman.client.utils.ServiceException;

public interface TeamService{

	public List<TeamModel> queryByCond(TeamCond cond);

	public TeamModel queryModel(Long id) throws ServiceException;

	public TeamModel doCreate(TeamModel teamModel, Boolean isSystem) throws ServiceException;

	public TeamModel queryById(Long teamId);
	
	public Integer doUpdate(TeamModel teamModel) throws ServiceException;

	public TeamModel queryModelOfCompany(Long cid);

	public Integer delete(Long uid, Long tid);

	public Map<String, Object> getUserStates(String teamIds);

	public Integer doQuit(Long uid, Long teamId) throws ServiceException;

}