package com.daoman.client.service;

import java.util.List;

import com.daoman.client.model.TeamCond;
import com.daoman.client.model.TeamModel;
import com.daoman.client.utils.ServiceException;

public interface TeamService{

	public List<TeamModel> queryByCond(TeamCond cond);

	public TeamModel queryModel(Long id) throws ServiceException;

	public TeamModel doCreate(Long cid) throws ServiceException;

	public TeamModel queryById(Long teamId);
	
	public Integer doUpdate(TeamModel teamModel) throws ServiceException;
	
	/**
	 * @author philip
	 * 没有成员才能删除（这是app client的方法, 删除全部成员群）
	 * @param cid
	 * @return
	 */
	public Integer doDelete(Long cid);

	public TeamModel queryModelOfCompany(Long cid);

	public Integer delete(Long uid, Long tid);

}