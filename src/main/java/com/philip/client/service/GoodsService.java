package com.philip.client.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.philip.client.dao.GoodsDao;
import com.philip.client.model.Goods;
import com.philip.client.utils.ServiceException;
import com.philip.client.utils.javabase.StrUtils;

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
	
	public Boolean doCreate(Goods goods, Long uid) throws ServiceException {
		if(!serviceUtil.checkPermission(uid)){
			throw new ServiceException("error.forbidden");
		}
		if(StrUtils.isEmpty(goods.getName()) || goods.getPrice() == null || goods.getType() == null){
			throw new ServiceException("error.require.params");
		}
		goods.setStatus(Goods.IS_NORMAL);
		return goodsDao.insert(goods) > 0;
	}
	
	
}
