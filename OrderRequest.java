package com.fooddelivaryapp.fooddelivary.io;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderRequest {

    private String phoneNumber;
    private String orderStatus;
    private List<OrderItem> orderedItems;  // ✅ MUST NOT BE NULL
    private String userAddress;
    private double amount;
    private String email;
}
