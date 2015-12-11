package com.philip.client.service;

import java.util.Date;
import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.philip.client.dao.OrderDao;
import com.philip.client.model.Order;
import com.philip.client.model.OrderCond;
import com.philip.client.utils.DateUtil;
import com.philip.client.utils.ServiceException;
import com.philip.client.utils.javabase.LongUtils;

@Service("orderService")
public class OrderService {

	@Autowired
	private OrderDao orderDao;
	@Autowired
	private ServiceUtil serviceUtil;
	
	public List<Order> queryAll(Long uid) throws ServiceException {
		if(!serviceUtil.checkPermission(uid)){
			throw new ServiceException("error.forbidden");
		}
		return orderDao.queryAll();
	}
	
	public List<Order> queryByCond(OrderCond cond, Long uid) throws ServiceException {
		if(!serviceUtil.checkPermission(uid)){
			throw new ServiceException("error.forbidden");
		}
		return orderDao.queryByCond(cond);
	}
	
	public Integer countAll() {
		return orderDao.countAll();
	}
	
	public Boolean doCreate(Order order, Long uid) throws ServiceException {
		if(!serviceUtil.checkPermission(uid)){
			throw new ServiceException("error.forbidden");
		}
		//checkParam
		order.setOrderNum(getOrderNum());
		order.setStatus(Order.IS_WAITING);
		return orderDao.insert(order) > 0;
	}
	
	public Boolean doEdit(Order order, Long uid) throws ServiceException {
		if(!serviceUtil.checkPermission(uid)){
			throw new ServiceException("error.forbidden");
		}
		//checkParam
		return orderDao.update(order) > 0;
	}
	
	public Boolean doDisable(Long id, Long uid) throws ServiceException {
		if(!serviceUtil.checkPermission(uid)){
			throw new ServiceException("error.forbidden");
		}
		if(LongUtils.isEmpty(id)){
			throw new ServiceException("error.require.params");
		}
		Order order = new Order();
		order.setId(id);
		order.setStatus(Order.IS_CANCELED);
		return orderDao.update(order) > 0; 
	}
	
	public Boolean doFinish(Long id, Long uid) throws ServiceException {
		if(!serviceUtil.checkPermission(uid)){
			throw new ServiceException("error.forbidden");
		}
		if(LongUtils.isEmpty(id)){
			throw new ServiceException("error.require.params");
		}
		Order order = new Order();
		order.setId(id);
		order.setStatus(Order.IS_FINISHED);
		return orderDao.update(order) > 0; 
	}
	
	private String getOrderNum(){
		Integer count =0;
		String orderNum ="";
		do{
			orderNum = DateUtil.dateToStr(new Date(), DateUtil.DATE_TIME_NO_SLASH );
			count = orderDao.countExist(orderNum);
		}while(count > 0);
		Random random = new Random();
		int r = random.nextInt(9999-1000+1)+1000;
		orderNum =orderNum +r;
		return orderNum;
	}
	
	
}
