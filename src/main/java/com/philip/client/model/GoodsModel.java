package com.philip.client.model;

import java.util.List;


public class GoodsModel extends Goods {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private String styles;
	
	private String styleChoosed;
	
	private List<Style> styleList;
	
	private List<Picture> pictureList;
	

	public List<Style> getStyleList() {
		return styleList;
	}

	public void setStyleList(List<Style> styleList) {
		this.styleList = styleList;
	}

	public List<Picture> getPictureList() {
		return pictureList;
	}

	public void setPictureList(List<Picture> pictureList) {
		this.pictureList = pictureList;
	}

	public String getStyles() {
		return styles;
	}

	public void setStyles(String styles) {
		this.styles = styles;
	}

	public String getStyleChoosed() {
		return styleChoosed;
	}

	public void setStyleChoosed(String styleChoosed) {
		this.styleChoosed = styleChoosed;
	}
	
}
