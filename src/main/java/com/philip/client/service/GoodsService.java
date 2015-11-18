package com.philip.client.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.philip.client.dao.GoodsDao;
import com.philip.client.model.Goods;
import com.philip.client.utils.ServiceException;

@Service("goodsService")
public class GoodsService {

	@Autowired
	private GoodsDao goodsDao;
	@Autowired
	private ServiceUtil serviceUtil;
	
	public List<Goods> queryAll(Long uid) throws ServiceException {
		if(!serviceUtil.checkPermission(uid)){
			throw new ServiceException("error.forbidden");
		}
		return goodsDao.queryAll();
	}
	public Integer countAll(){
		return goodsDao.countAll();
	}
	
}
