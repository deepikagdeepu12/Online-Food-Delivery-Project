package com.fooddelivaryapp.fooddelivary.service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.fooddelivaryapp.fooddelivary.entity.Orderentity;

import com.fooddelivaryapp.fooddelivary.io.OrderRequest;
import com.fooddelivaryapp.fooddelivary.repository.CartRepositroy;
import com.fooddelivaryapp.fooddelivary.repository.OrderRepostiory;
import com.razorpay.RazorpayClient;

@Service
public class OrderServiceImple implements OrderService {

    @Autowired
    private OrderRepostiory orderRepostiory;

    @Autowired
    private UserService userService;

    @Autowired
    private CartRepositroy cartRepositroy;

    // ✅ FIXED property key name
    @Value("${razorpay.key}")
    private String razorpayKey;

    @Value("${razorpay.secret}")
    private String razorpaySecret;

    // ===========================
    // CREATE ORDER + RAZORPAY
    // ===========================
    @Override
    public OrderResponse createOrderWithPayment(OrderRequest request) throws Exception {

        // 1️⃣ Calculate total amount (RUPEES)
        double totalAmount = request.getOrderedItems()
                .stream()
                .mapToDouble(i -> i.getPrice() * i.getQuantity())
                .sum();

        // 2️⃣ Convert to PAISE for Razorpay
        long amountInPaise = Math.round(totalAmount * 100);

        // 3️⃣ Create Razorpay Order
        RazorpayClient razorpayClient =
                new RazorpayClient(razorpayKey, razorpaySecret);

        JSONObject options = new JSONObject();
        options.put("amount", amountInPaise);
        options.put("currency", "INR");
        options.put("receipt", "order_rcpt_" + System.currentTimeMillis());

        com.razorpay.Order razorpayOrder =
                razorpayClient.orders.create(options);

        // 4️⃣ Save Order in MongoDB
        Orderentity order = Orderentity.builder()
                .userId(userService.findByUserId())
                .userAddress(request.getUserAddress())
                .phoneNumber(request.getPhoneNumber())
                .email(request.getEmail())
                .orderedItems(request.getOrderedItems())
                .amount(totalAmount) // rupees
                .paymentStatus("PENDING")
                .orderStatus("CREATED")
                .razorpayOrderId(razorpayOrder.get("id"))
                .build();

        order = orderRepostiory.save(order);

        // 5️⃣ RETURN RESPONSE TO FRONTEND (THIS OPENS RAZORPAY)
        return OrderResponse.builder()
                .id(order.getId())
                .userId(order.getUserId())
                .amount(amountInPaise) // ✅ paise
                .razorpayOrderId(order.getRazorpayOrderId())
                .orderStatus(order.getOrderStatus())
                .build();
    }

    // ===========================
    // VERIFY PAYMENT
    // ===========================
    @Override
    public void verifyPayment(Map<String, String> paymentData, String status) {

        String razorpayOrderId = paymentData.get("razorpay_order_id");

        Orderentity existingOrder = orderRepostiory
                .findByRazorpayOrderId(razorpayOrderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        existingOrder.setPaymentStatus(status);
        existingOrder.setRazorpayPaymentId(paymentData.get("razorpay_payment_id"));
        existingOrder.setRazorpaySignature(paymentData.get("razorpay_signature"));

        orderRepostiory.save(existingOrder);

        // Clear cart after successful payment
        if ("PAID".equalsIgnoreCase(status)) {
            cartRepositroy.deleteByUserId(existingOrder.getUserId());
        }
    }

    // ===========================
    // USER ORDERS
    // ===========================
    @Override
    public List<OrderResponse> getUserOrders() {

        String loggedInUserId = userService.findByUserId();

        List<Orderentity> list =
                orderRepostiory.findByUserId(loggedInUserId);

        return list.stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    // ===========================
    // DELETE ORDER
    // ===========================
    @Override
    public void removeOrder(String orderId) {
        orderRepostiory.deleteById(orderId);
    }

    // ===========================
    // ADMIN: ALL ORDERS
    // ===========================
    @Override
    public List<OrderResponse> getOrdersOfAllUsers() {

        List<Orderentity> list = orderRepostiory.findAll();

        return list.stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    // ===========================
    // ADMIN: UPDATE STATUS
    // ===========================
    @Override
    public void updatOrderStatus(String orderId, String status) {

        Orderentity entity = orderRepostiory.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        entity.setOrderStatus(status);
        orderRepostiory.save(entity);
    }

    // ===========================
    // COMMON RESPONSE MAPPER
    // ===========================
    private OrderResponse convertToResponse(Orderentity order) {

        return OrderResponse.builder()
                .id(order.getId())
                .userId(order.getUserId())
                .userAddress(order.getUserAddress())
                .phoneNumber(order.getPhoneNumber())
                .email(order.getEmail())
                .amount(Math.round(order.getAmount() * 100)) // rupees → paise
                .paymentStatus(order.getPaymentStatus())
                .razorpayOrderId(order.getRazorpayOrderId())
                .orderStatus(order.getOrderStatus())
                .build();
    }
}
