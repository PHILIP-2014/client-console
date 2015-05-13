/**
 * 
 */
package com.daoman.client.model;

import java.io.Serializable;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;

/**
 * @author parox
 *
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class TeamCond implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private Long targetUid;
	private String nameFuzzy;
	private String name;
	private String nameMatchBefore;
	private Long cid;
	
	public Long getCid() {
		return cid;
	}

	public void setCid(Long cid) {
		this.cid = cid;
	}

	public TeamCond (){
		
	}
	
	public TeamCond(Long cid, Long targetUid){
		this.cid=cid;
		this.targetUid=targetUid;
	}
	
	public TeamCond (Long targetUid){
		this.targetUid = targetUid;
	}
	public String getNameFuzzy() {
		return nameFuzzy;
	}
	public void setNameFuzzy(String nameFuzzy) {
		this.nameFuzzy = nameFuzzy;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getNameMatchBefore() {
		return nameMatchBefore;
	}
	public void setNameMatchBefore(String nameMatchBefore) {
		this.nameMatchBefore = nameMatchBefore;
	}

	public Long getTargetUid() {
		return targetUid;
	}

	public void setTargetUid(Long targetUid) {
		this.targetUid = targetUid;
	}
	
}
