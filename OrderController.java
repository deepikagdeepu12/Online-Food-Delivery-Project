package com.fooddelivaryapp.fooddelivary.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;


import com.fooddelivaryapp.fooddelivary.io.OrderRequest;
import com.fooddelivaryapp.fooddelivary.service.OrderResponse;
import com.fooddelivaryapp.fooddelivary.service.OrderService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/orders")
@AllArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping("/create")
public ResponseEntity<OrderResponse> createOrderWithPayment(
        @RequestBody OrderRequest request) throws Exception {

    OrderResponse response = orderService.createOrderWithPayment(request);
    return ResponseEntity.status(HttpStatus.CREATED).body(response);
}
    @PostMapping("/verify")
    public ResponseEntity<Map<String, String>> verifyPayment(
            @RequestBody Map<String, String> paymentData) {

        orderService.verifyPayment(paymentData, "Paid");

        return ResponseEntity.ok(Map.of("status", "success"));
    }

    @GetMapping
    public List<OrderResponse> getOrders() {
        return orderService.getUserOrders();
    }

    @DeleteMapping("/{orderId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteOrder(@PathVariable String orderId) {
        orderService.removeOrder(orderId);
    }

    // admin
    @GetMapping("/all")
    public List<OrderResponse> getOrdersOfAllUsers() {
        return orderService.getOrdersOfAllUsers();
    }

    @PatchMapping("/status/{orderId}")
    public void updateOrderStatus(
            @PathVariable String orderId,
            @RequestParam String status) {

        orderService.updatOrderStatus(orderId, status);
    }
}
