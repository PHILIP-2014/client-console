package com.daoman.client.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.daoman.client.model.Team;
import com.daoman.client.model.TeamCond;
import com.daoman.client.model.TeamModel;
public interface TeamDao {
	
	public TeamModel queryModel(Long id);
	
	public List<TeamModel> queryByCond(@Param("cond") TeamCond cond);

	public Integer insert(TeamModel teamModel);

	public TeamModel queryById(Long id);
	
	public Integer updateModel(TeamModel teamModel);
	
	public TeamModel queryModelOfCompany(Long cid);

	public Integer delete(Long id);
	
	public Integer update(Team team);

	public Integer incrOrDecrTeamNum(@Param("id") Long id,@Param("num")  Integer num);
	
}