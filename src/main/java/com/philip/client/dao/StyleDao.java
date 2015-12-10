package com.philip.client.dao;

import java.util.List;

import com.philip.client.model.Style;

public interface StyleDao {
	
	Style queryOne(Long style);

	Integer insert(Style style);

	void update(Style style);
	
	Integer countExist(Style style);

	List<Style> queryByGid(Long id);
	
}
