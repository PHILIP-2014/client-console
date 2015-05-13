package com.daoman.client.model.company;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;

import com.daoman.client.model.BaseDomain;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Company extends BaseDomain{
	
	private static final long serialVersionUID = 1L;
	
	public final static int DISABLED_FALSE = 0;
	
	public final static int DISABLED_TRUE = 1;
	
	private String name;

    private String logo;
    
    private String description;
    
    private Long uidCreated;
    
    private Integer isDisabled;
    private String inviteCode;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getLogo() {
		return logo;
	}

	public void setLogo(String logo) {
		this.logo = logo;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Long getUidCreated() {
		return uidCreated;
	}

	public void setUidCreated(Long uidCreated) {
		this.uidCreated = uidCreated;
	}

	public Integer getIsDisabled() {
		return isDisabled;
	}

	public void setIsDisabled(Integer isDisabled) {
		this.isDisabled = isDisabled;
	}

	public String getInviteCode() {
		return inviteCode;
	}

	public void setInviteCode(String inviteCode) {
		this.inviteCode = inviteCode;
	}
	
	

}