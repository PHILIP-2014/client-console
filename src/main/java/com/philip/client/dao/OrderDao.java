package com.philip.client.dao;

import java.util.List;

import com.philip.client.model.Order;

public interface OrderDao {

	List<Order> queryAll();
	
	Integer countAll();
	
	Integer insert(Order order);
	
	Integer update(Order order);
}
