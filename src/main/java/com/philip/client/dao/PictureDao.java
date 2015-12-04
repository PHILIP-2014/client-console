package com.philip.client.dao;

import com.philip.client.model.Picture;

public interface PictureDao {
	
	Picture queryOne(Long picture);

	Integer insert(Picture picture);

	void update(Picture picture);
	
}
