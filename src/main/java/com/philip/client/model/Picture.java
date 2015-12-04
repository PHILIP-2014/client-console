package com.philip.client.model;

/**
 * Picture
 */
public class Picture extends Base {
		
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	/**商品ID*/
	private Long gid;
	/**图片地址*/
	private String picUrl;

	public void setGid(Long value) {
		this.gid = value;
	}
	
	public Long getGid() {
		return this.gid;
	}
	
	public void setPicUrl(String value) {
		this.picUrl = value;
	}
	
	public String getPicUrl() {
		return this.picUrl;
	}

}

