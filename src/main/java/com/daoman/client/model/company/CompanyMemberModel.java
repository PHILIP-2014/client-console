package com.daoman.client.model.company;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;

import com.daoman.client.model.UserProfile;

@JsonIgnoreProperties(ignoreUnknown = true)
public class CompanyMemberModel extends CompanyMember{
	
	private static final long serialVersionUID = 1L;
	
	private UserProfile profile;

	public UserProfile getProfile() {
		return profile;
	}

	public void setProfile(UserProfile profile) {
		this.profile = profile;
	}

	
}