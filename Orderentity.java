package com.fooddelivaryapp.fooddelivary.entity;

import java.util.List;

import org.springframework.data.mongodb.core.mapping.Document;

import com.fooddelivaryapp.fooddelivary.io.OrderItem;



import org.springframework.data.annotation.Id;


import lombok.Builder;
import lombok.Data;

@Data
@Builder
@Document(collection = "orders")
public class Orderentity {

    @Id
    private String id;

    private String userId;
    private String userAddress;
    private String phoneNumber;
    private String email;

    private List<OrderItem> orderedItems;

    private double amount;             // rupees
    private String paymentStatus;

    private String razorpayOrderId;
    private String razorpayPaymentId;
    private String razorpaySignature;

    private String orderStatus;
}
