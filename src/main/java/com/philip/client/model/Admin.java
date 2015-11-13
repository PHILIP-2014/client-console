package com.philip.client.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Admin extends BaseModel {

	private static final long serialVersionUID = 1397584736693222309L;
	
	public static final long CUSTOMER_UID_CREATED = 0l;
	
	public final static int ACTIVE_FALSE=0;
	public final static int ACTIVE_TRUE=1;

	private String appKey;
	
	private String loginName;
	
	private String password;
	
	private Integer isActive;

	public String getAppKey() {
		return appKey;
	}

	public void setAppKey(String appKey) {
		this.appKey = appKey;
	}

	public String getLoginName() {
		return loginName;
	}

	public void setLoginName(String loginName) {
		this.loginName = loginName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	
	public Integer getIsActive() {
		return isActive;
	}

	public void setIsActive(Integer isActive) {
		this.isActive = isActive;
	}
	
}
