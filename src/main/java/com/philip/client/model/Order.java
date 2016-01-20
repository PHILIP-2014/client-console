package com.philip.client.model;

import java.math.BigDecimal;
import java.util.Date;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.springframework.format.annotation.DateTimeFormat;

@JsonIgnoreProperties(ignoreUnknown=true)
public class Order extends Base {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public static final int STATUS_WAITING = 0; //准备下单
	public static final int STATUS_FINISHED = 1;//客户完成下单
	public static final int STATUS_COMPLETE = 2;//订单已完成
	public static final int STATUS_CANCELED = 3;//订单已取消
	
	private String orderNum;
	
	private Long gid;
	
	private String gname;
	
	private Long sid;
	
	private String mark;
	
	private Integer num;
	
	private BigDecimal totalFee;
	
	private Integer status;
	
	private String nameSetup;
	
	private String phoneSetup;
	
	private String addrSetup;
	
	@DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
	private Date gmtSetup;
	
	private String size;
	
	private String color;
	
	private BigDecimal price;

	public BigDecimal getPrice() {
		return price;
	}

	public void setPrice(BigDecimal price) {
		this.price = price;
	}

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}

	public String getSize() {
		return size;
	}

	public void setSize(String size) {
		this.size = size;
	}

	public String getOrderNum() {
		return orderNum;
	}

	public void setOrderNum(String orderNum) {
		this.orderNum = orderNum;
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

	public String getNameSetup() {
		return nameSetup;
	}

	public void setNameSetup(String nameSetup) {
		this.nameSetup = nameSetup;
	}

	public String getPhoneSetup() {
		return phoneSetup;
	}

	public void setPhoneSetup(String phoneSetup) {
		this.phoneSetup = phoneSetup;
	}

	public String getAddrSetup() {
		return addrSetup;
	}

	public void setAddrSetup(String addrSetup) {
		this.addrSetup = addrSetup;
	}


	public Date getGmtSetup() {
		return gmtSetup;
	}

	public void setGmtSetup(Date gmtSetup) {
		this.gmtSetup = gmtSetup;
	}
	
}
