package com.philip.client.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.philip.client.cond.GoodsCond;
import com.philip.client.model.Goods;
import com.philip.client.model.GoodsModel;

public interface GoodsDao {

	Goods queryOne(@Param("id") Long id);
	
	List<Goods> queryAll();
	
	Integer countAll();
	
	Integer insert(Goods goods);
	
	Integer update(Goods goods);

	GoodsModel queryModel(Long id);

	List<GoodsModel> queryByCond(@Param("cond")GoodsCond cond);
}
