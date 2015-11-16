package com.philip.client.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Admin extends BaseModel {

	private static final long serialVersionUID = 1397584736693222309L;
	
	public static final long CUSTOMER_UID_CREATED = 0l;
	
	public final static int IS_NORMAL = 0;
	public final static int IS_DISABLE = 1;
	
	public final static int IS_ADMIN = 1;

	private String appkey;
	
	private String name;
	
	private String pwd;
	
	private Integer role;
	
	private Integer isDisable;

	public String getAppkey() {
		return appkey;
	}

	public void setAppkey(String appkey) {
		this.appkey = appkey;
	}

	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public String getPwd() {
		return pwd;
	}
	
	public void setPwd(String pwd) {
		this.pwd = pwd;
	}
	
	public Integer getRole() {
		return role;
	}

	public void setRole(Integer role) {
		this.role = role;
	}

	public Integer getIsDisable() {
		return isDisable;
	}

	public void setIsDisable(Integer isDisable) {
		this.isDisable = isDisable;
	}

}
