package com.fooddelivaryapp.fooddelivary.service;


import com.fooddelivaryapp.fooddelivary.io.CartRequest;
import com.fooddelivaryapp.fooddelivary.io.CartResponse;

public interface CartService {


     

      CartResponse addToCart(CartRequest request);

      CartResponse getCart();

      void clearCart();

      CartResponse removeFromCart(CartRequest cartRequest);

      

     






}
