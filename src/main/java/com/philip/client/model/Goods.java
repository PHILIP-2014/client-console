package com.philip.client.model;

import java.math.BigDecimal;

public class Goods extends Base {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private String name;
	
	private BigDecimal price;
	
	private String mark;
	
	private Integer type;
	
	private Integer status;

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
