package com.philip.client.model;

import java.math.BigDecimal;
import java.sql.Date;

public class Order extends Base {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public static final int IS_WAITING = 0;
	public static final int IS_FINISHED = 1;
	public static final int IS_CANCELED = 2;
	
	private String orderNum;
	
	private Long cid;
	
	private Long gid;
	
	private String gname;
	
	private Long sid;
	
	private String mark;
	
	private Integer num;
	
	private BigDecimal totalFee;
	
	private Integer status;
	
	private Date gmtSetup;

	public String getOrderNum() {
		return orderNum;
	}

	public void setOrderNum(String orderNum) {
		this.orderNum = orderNum;
	}

	public Long getCid() {
		return cid;
	}

	public void setCid(Long cid) {
		this.cid = cid;
	}

	public Long getGid() {
		return gid;
	}

	public void setGid(Long gid) {
		this.gid = gid;
	}

	public String getGname() {
		return gname;
	}

	public void setGname(String gname) {
		this.gname = gname;
	}

	public Long getSid() {
		return sid;
	}

	public void setSid(Long sid) {
		this.sid = sid;
	}

	public String getMark() {
		return mark;
	}

	public void setMark(String mark) {
		this.mark = mark;
	}

	public Integer getNum() {
		return num;
	}

	public void setNum(Integer num) {
		this.num = num;
	}

	public BigDecimal getTotalFee() {
		return totalFee;
	}

	public void setTotalFee(BigDecimal totalFee) {
		this.totalFee = totalFee;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public Date getGmtSetup() {
		return gmtSetup;
	}

	public void setGmtSetup(Date gmtSetup) {
		this.gmtSetup = gmtSetup;
	}
	
}
