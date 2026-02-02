package com.fooddelivaryapp.fooddelivary.service;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;


import org.springframework.stereotype.Service;

import com.fooddelivaryapp.fooddelivary.entity.CartEntity;
import com.fooddelivaryapp.fooddelivary.io.CartRequest;
import com.fooddelivaryapp.fooddelivary.io.CartResponse;
import com.fooddelivaryapp.fooddelivary.repository.CartRepositroy;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor

public class CartServiceImpl implements CartService {

     private final CartRepositroy cartRepositroy;

     private final UserService userService;

    @Override
    public CartResponse addToCart(CartRequest request) {
       
        String loggedInUserId =userService.findByUserId();

        Optional<CartEntity> cartOptional=cartRepositroy.findByUserId(loggedInUserId);

        CartEntity entity=cartOptional.orElseGet(() ->new CartEntity(loggedInUserId,new HashMap<>() ));

        Map<String,Integer> items=entity.getItems();

        items.put(request.getFoodId(),items.getOrDefault(request.getFoodId(), 0)+1);
        entity.setItems(items);
        entity=cartRepositroy.save(entity);
        return convertToResponse(entity);
            
    }


  @Override
public CartResponse getCart() {

    String loggedInUserId = userService.findByUserId();

    CartEntity entity = cartRepositroy.findByUserId(loggedInUserId)
        .orElse(new CartEntity(loggedInUserId, new HashMap<>()));

    return convertToResponse(entity);
}

  //Delete items

  @Override
  public void clearCart() {
   
    String loggedInUserId =userService.findByUserId();
    cartRepositroy.deleteByUserId(loggedInUserId);
  }

  @Override
public CartResponse removeFromCart(CartRequest cartRequest) {

    String loggedInUserId = userService.findByUserId();

    CartEntity entity = cartRepositroy.findByUserId(loggedInUserId)
        .orElseThrow(() -> new RuntimeException("Cart is not found"));

    Map<String, Integer> cartItems = entity.getItems();

    if (cartItems.containsKey(cartRequest.getFoodId())) {

        int currentQty = cartItems.get(cartRequest.getFoodId());

        if (currentQty > 1) {
            cartItems.put(cartRequest.getFoodId(), currentQty - 1);
        } else {
            cartItems.remove(cartRequest.getFoodId());
        }

        entity = cartRepositroy.save(entity);
    }

    return convertToResponse(entity);
}


  
  private CartResponse convertToResponse(CartEntity cartEntity) {
    return CartResponse.builder()
        .id(cartEntity.getId())
        .userId(cartEntity.getUserId())
        .items(cartEntity.getItems())
        .build();
}




  }

    

