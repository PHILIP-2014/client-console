package com.philip.client.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.philip.client.dao.OrderDao;
import com.philip.client.model.Order;
import com.philip.client.utils.ServiceException;

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
}
