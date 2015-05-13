package com.daoman.client.dao.company;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.daoman.client.model.company.CompanyMember;
import com.daoman.client.model.company.CompanyMemberModel;

public interface CompanyMemberDao{
	
	public Long insert(CompanyMember member);

	public List<CompanyMemberModel> queryMembers(Long cid);

	public Integer delete(Long id);
	
	public Integer deleteByCid(@Param("targetUid") Long targetUid, @Param("cid") Long cid);

	public Integer update(CompanyMemberModel companyMemberModel);

	public CompanyMemberModel queryModel(Long id);

	public CompanyMember queryOne(@Param("cid") Long cid, @Param("targetUid") Long targetUid);
	
	/**
	 * 更新公司成员状态
	 * @param uid
	 * @param active
	 * @param originActive：若有，则表示将此状态更新为active。为 null 表示任意状态
	 * @return
	 */
	public Integer updateActiveByUid(@Param("targetUid") Long targetUid,
			@Param("active") Integer active,
			@Param("originActive") Integer originActive);

//	@Deprecated
//	public Long queryExist(@Param("cid")Long cid, @Param("uid")Long uid);
	
	public Long queryId(@Param("cid")Long cid, @Param("targetUid")Long targetUid);
	
	public Integer countByRole(@Param("targetUid") Long targetUid, @Param("cid") Long cid, @Param("memberRole") Integer memberRole);
}