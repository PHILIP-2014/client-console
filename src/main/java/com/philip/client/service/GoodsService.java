package com.philip.client.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.philip.client.dao.GoodsDao;
import com.philip.client.dao.StyleDao;
import com.philip.client.model.Goods;
import com.philip.client.model.GoodsModel;
import com.philip.client.model.Style;
import com.philip.client.utils.ServiceException;
import com.philip.client.utils.javabase.LongUtils;
import com.philip.client.utils.javabase.StrUtils;

@Service("goodsService")
public class GoodsService {

	@Autowired
	private GoodsDao goodsDao;
	@Autowired
	private StyleDao styleDao;
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
	
	public Boolean doCreate(GoodsModel goods, Long uid) throws ServiceException {
		if(!serviceUtil.checkPermission(uid)){
			throw new ServiceException("error.forbidden");
		}
		if(StrUtils.isEmpty(goods.getName()) || goods.getPrice() == null || goods.getType() == null){
			throw new ServiceException("error.require.params");
		}
		goods.setStatus(Goods.IS_NORMAL);
		if(goodsDao.insert(goods) <= 0){
			throw new ServiceException("error.create.failed");
		}
		//deal styles
		List<String> styles = StrUtils.splitToString(goods.getStyles());
		for(String content : styles){
			Style style = new Style();
			style.setContent(content);
			style.setGid(goods.getId());
			if(styleDao.countExist(style) > 0){
				continue;
			}
			styleDao.insert(style);
		}
		
		return true;
	}
	
	public Boolean doEdit(Goods goods, Long uid) throws ServiceException {
		if(!serviceUtil.checkPermission(uid)){
			throw new ServiceException("error.forbidden");
		}
		if(StrUtils.isEmpty(goods.getName()) || goods.getPrice() == null || goods.getType() == null){
			throw new ServiceException("error.require.params");
		}
		return goodsDao.update(goods) > 0;
	}
	
	public Boolean doDisable(Long id, Long uid) throws ServiceException {
		if(!serviceUtil.checkPermission(uid)){
			throw new ServiceException("error.forbidden");
		}
		if(LongUtils.isEmpty(id)){
			throw new ServiceException("error.require.params");
		}
		Goods goods = new Goods();
		goods.setId(id);
		goods.setStatus(Goods.IS_OFFLINE);
		return goodsDao.update(goods) > 0; 
	}
}
