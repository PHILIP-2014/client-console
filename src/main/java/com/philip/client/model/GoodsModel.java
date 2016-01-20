package com.philip.client.model;

import java.util.List;


public class GoodsModel extends Goods {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Deprecated
	private String styles;
	
	@Deprecated
	private String styleChoosed;
	
	private List<Style> styleList;
	
	private List<Picture> pictureList;
	
	private String[] colors;
	
	private String[] sizes;
	


	public String[] getColors() {
		return colors;
	}

	public void setColors(String[] colors) {
		this.colors = colors;
	}

	public String[] getSizes() {
		return sizes;
	}

	public void setSizes(String[] sizes) {
		this.sizes = sizes;
	}

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
