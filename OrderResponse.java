package com.fooddelivaryapp.fooddelivary.service;









import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class OrderResponse {

    private String id;
    private String userId;
    private String userAddress;
    private String phoneNumber;
    private String email;

    private long amount;              // ✅ paise
    private String paymentStatus;
    private String razorpayOrderId;
    private String orderStatus;
}


