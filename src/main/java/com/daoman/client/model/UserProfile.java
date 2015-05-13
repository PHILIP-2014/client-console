package com.daoman.client.model;

import java.util.Date;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class UserProfile extends BaseDomain{
	
	public static final long CID_DEFAULT = 0l;
	public static final long OLD_UID_DEFAULT = 0l;
	
	private static final long serialVersionUID = 1L;

	private String nickName;
    
    private String email;
    
    private String mobile;
    
    private Long cidDefault;
    
    private String avatar;
    
    private String gender;
    
    private Date birthday;
    
    private Long oldUid;
    
    private String inviteCode;
    
    private String companyName;
    
    private String jobPosition;
    
    private String address;

	public String getJobPosition() {
		return jobPosition;
	}

	public void setJobPosition(String jobPosition) {
		this.jobPosition = jobPosition;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getNickName() {
		return nickName;
	}

	public void setNickName(String nickName) {
		this.nickName = nickName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public Long getCidDefault() {
		return cidDefault;
	}

	public void setCidDefault(Long cidDefault) {
		this.cidDefault = cidDefault;
	}

	public String getAvatar() {
		return avatar;
	}

	public void setAvatar(String avatar) {
		this.avatar = avatar;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public Date getBirthday() {
		return birthday;
	}

	public void setBirthday(Date birthday) {
		this.birthday = birthday;
	}

	public Long getOldUid() {
		return oldUid;
	}
	
	public void setOldUid(Long oldUid) {
		this.oldUid = oldUid;
	}

	public String getInviteCode() {
		return inviteCode;
	}

	public void setInviteCode(String inviteCode) {
		this.inviteCode = inviteCode;
	}

	public String getCompanyName() {
		return companyName;
	}

	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}
	
	

}