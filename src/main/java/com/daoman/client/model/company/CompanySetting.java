/**
 * 
 */
package com.daoman.client.model.company;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;

import com.daoman.client.model.BaseDomain;

/**
 * @author parox
 *
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class CompanySetting extends BaseDomain {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private Long cid;
	private String category;
	private String key;
	private String value;
	
	public Long getCid() {
		return cid;
	}
	public void setCid(Long cid) {
		this.cid = cid;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public String getKey() {
		return key;
	}
	public void setKey(String key) {
		this.key = key;
	}
	public String getValue() {
		return value;
	}
	public void setValue(String value) {
		this.value = value;
	}
	
	
}
