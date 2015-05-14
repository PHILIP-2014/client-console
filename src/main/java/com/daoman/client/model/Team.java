package com.daoman.client.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Team extends BaseDomain{

	private static final long serialVersionUID = 1L;
	
	public final static String SYS_TEAM_COMPANY_NAME = "全体人员";
	
	public static final int STATUS_NORMAL = 0;
	public static final int STATUS_ARCHIVE = 1;
	public static final int STATUS_DISABLE  = 2;
	public static final int IS_SYSTEM_FALSE  = 0;
	public static final int IS_SYSTEM_TRUE  = 1;
	public static final int IS_OPEN_TRUE = 1;
	public static final int IS_OPEN_FALSE = 0;
	
	private String teamCode;
	private String name;
	private String description;
	private String avatar;
	private Integer isOpen;
	private Long cid;
	private Long uidCreated;
	private Integer num;
	private Integer status;
	private Integer isSystem;
	
	public String getTeamCode() {
		return teamCode;
	}
	public void setTeamCode(String teamCode) {
		this.teamCode = teamCode;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getAvatar() {
		return avatar;
	}
	public void setAvatar(String avatar) {
		this.avatar = avatar;
	}
	public Integer getIsOpen() {
		return isOpen;
	}
	public void setIsOpen(Integer isOpen) {
		this.isOpen = isOpen;
	}
	public Long getCid() {
		return cid;
	}
	public void setCid(Long cid) {
		this.cid = cid;
	}
	public Long getUidCreated() {
		return uidCreated;
	}
	public void setUidCreated(Long uidCreated) {
		this.uidCreated = uidCreated;
	}
	public Integer getNum() {
		return num;
	}
	public void setNum(Integer num) {
		this.num = num;
	}
	public Integer getStatus() {
		return status;
	}
	public void setStatus(Integer status) {
		this.status = status;
	}
	public Integer getIsSystem() {
		return isSystem;
	}
	public void setIsSystem(Integer isSystem) {
		this.isSystem = isSystem;
	}
	
}