package com.daoman.client.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;

import com.daoman.client.model.company.Company;

@JsonIgnoreProperties(ignoreUnknown = true)
public class CustomerCompanyModel extends CustomerCompany {

	private static final long serialVersionUID = -7681018197088276876L;

	private Company company;

	public Company getCompany() {
		return company;
	}

	public void setCompany(Company company) {
		this.company = company;
	}
	
}
