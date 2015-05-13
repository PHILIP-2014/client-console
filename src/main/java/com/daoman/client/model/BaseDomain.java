package com.daoman.client.model;

import java.io.Serializable;
import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

public class BaseDomain implements Serializable{

	private static final long serialVersionUID = 1L;
	
	private Long id;
	@DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
	private Date gmtCreated;
	@DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
	private Date gmtModified;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Date getGmtCreated() {
		return gmtCreated;
	}
	public void setGmtCreated(Date gmtCreated) {
		this.gmtCreated = gmtCreated;
	}
	public Date getGmtModified() {
		return gmtModified;
	}
	public void setGmtModified(Date gmtModified) {
		this.gmtModified = gmtModified;
	}
	
}