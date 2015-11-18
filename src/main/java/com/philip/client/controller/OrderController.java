package com.philip.client.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.philip.client.service.OrderService;

@Controller
public class OrderController extends BaseController {

	@Autowired
	private OrderService orderService;
	
}
