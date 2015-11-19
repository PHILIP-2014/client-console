package com.philip.client.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.philip.client.model.Goods;

public interface GoodsDao {

	Goods queryOne(@Param("id") Long id);
	
	List<Goods> queryAll();
	
	Integer countAll();
	
	Integer insert(Goods goods);
	
	Integer update(Goods goods);
}
