package com.philip.client.model;

/**
 * Style
 */
public class Style extends Base {
		
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	/**商品ID*/
	private Long gid;
	/**款式名（例：深蓝）*/
	private String content;

	public void setGid(Long value) {
		this.gid = value;
	}
	
	public Long getGid() {
		return this.gid;
	}
	
	public void setContent(String value) {
		this.content = value;
	}
	
	public String getContent() {
		return this.content;
	}

}

