package com.fooddelivaryapp.fooddelivary.controller;



import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.fooddelivaryapp.fooddelivary.io.CartRequest;
import com.fooddelivaryapp.fooddelivary.io.CartResponse;
import com.fooddelivaryapp.fooddelivary.service.CartService;


import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/cart")
@AllArgsConstructor
public class CartControler 
{

  private final CartService cartService;


@PostMapping
  public CartResponse addToCart(@RequestBody CartRequest request)
  { 

    String foodId=request.getFoodId();

    if(foodId ==null || foodId.isEmpty())
    {
        throw new  ResponseStatusException(HttpStatus.BAD_REQUEST,"Food Id not found");

    }

    return cartService.addToCart(request);
  }

  @GetMapping
    public CartResponse getCart(){
      return cartService.getCart();
    }



    //Delete items

    @DeleteMapping
@ResponseStatus(HttpStatus.NO_CONTENT)
public void clearCar() {
    cartService.clearCart();
}

    //Remove cart
    @PostMapping("/remove")
    public CartResponse removeFromCart(@RequestBody CartRequest request)
    {
      String foodId=request.getFoodId();

    if(foodId ==null || foodId.isEmpty())
    {
        throw new  ResponseStatusException(HttpStatus.BAD_REQUEST,"Food Id not found");

    }

    return cartService.removeFromCart(request);
  }


    





    
}
