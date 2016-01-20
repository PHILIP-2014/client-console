package com.philip.client.model;

public class OrderModel extends Order{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String setupTime;//安装时间
	
	private String cover;//商品图片


	public String getCover() {
		return cover;
	}

	public void setCover(String cover) {
		this.cover = cover;
	}

	public String getSetupTime() {
		return setupTime;
	}

	public void setSetupTime(String setupTime) {
		this.setupTime = setupTime;
	}
	
	
	

}
