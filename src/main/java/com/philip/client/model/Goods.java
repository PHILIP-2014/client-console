package com.philip.client.model;

import java.math.BigDecimal;

public class Goods extends Base {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	public static final int STATUS_ON = 0;//正常
	public static final int STATUS_OFF = 1;//下架
	
	private String name;//商品名
	
	private BigDecimal price;//价格
	
	private String mark;//备注
	
	private Integer type;//类型
	
	private Integer status;//默认0正常\n 1已下架

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public BigDecimal getPrice() {
		return price;
	}

	public void setPrice(BigDecimal price) {
		this.price = price;
	}

	public String getMark() {
		return mark;
	}

	public void setMark(String mark) {
		this.mark = mark;
	}

	public Integer getType() {
		return type;
	}

	public void setType(Integer type) {
		this.type = type;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}
	
}
