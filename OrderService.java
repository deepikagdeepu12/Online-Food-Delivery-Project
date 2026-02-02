package com.fooddelivaryapp.fooddelivary.service;

import java.util.List;
import java.util.Map;

import com.fooddelivaryapp.fooddelivary.io.OrderRequest;


public interface OrderService {

    OrderResponse createOrderWithPayment(OrderRequest request) throws Exception;

    void verifyPayment(Map<String, String> paymentData, String status);

    List<OrderResponse> getUserOrders();

    void removeOrder(String orderId);

    List<OrderResponse> getOrdersOfAllUsers();

    void updatOrderStatus(String orderId, String status);
}
