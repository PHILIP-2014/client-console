package com.philip.client.dao;

import java.util.List;

import com.philip.client.model.Picture;

public interface PictureDao {
	
	Picture queryOne(Long picture);
	
	List<Picture> queryByGid(Long gid);

	Integer insert(Picture picture);

	void update(Picture picture);
	
}
