package com.daoman.client.model.company;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;

import com.daoman.client.model.BaseDomain;

@JsonIgnoreProperties(ignoreUnknown = true)
public class CompanyMember extends BaseDomain {
	
	private static final long serialVersionUID = 1L;
	
	/**
	 * 邀请者uid,默认为0
	 */
	public static final long INVITER_DEFAULT = 0L;
	
	public static int ROLE_DEFAULT = 0;
	public static int ROLE_ADMIN = 1;
	
	public final static int ACTIVE_FALSE=0;
	public final static int ACTIVE_TRUE=1;
	public final static int ACTIVE_FORBID=2;
	
	private Long cid;
    
    private Long targetUid;
    
    private Long uidInviter;
    
    private Integer memberRole;
    
    private Integer isActive;

	public Long getCid() {
		return cid;
	}

	public void setCid(Long cid) {
		this.cid = cid;
	}

	public Long getUidInviter() {
		return uidInviter;
	}

	public void setUidInviter(Long uidInviter) {
		this.uidInviter = uidInviter;
	}

	public Integer getMemberRole() {
		return memberRole;
	}

	public void setMemberRole(Integer memberRole) {
		this.memberRole = memberRole;
	}

	public Integer getIsActive() {
		return isActive;
	}

	public void setIsActive(Integer isActive) {
		this.isActive = isActive;
	}

	public Long getTargetUid() {
		return targetUid;
	}

	public void setTargetUid(Long targetUid) {
		this.targetUid = targetUid;
	}


}