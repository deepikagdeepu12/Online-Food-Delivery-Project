package com.fooddelivaryapp.fooddelivary.service;



import com.fooddelivaryapp.fooddelivary.io.UserRequest;
import com.fooddelivaryapp.fooddelivary.io.UserResponse;


public interface UserService {

    UserResponse registerUser(UserRequest request);

    String  findByUserId();

}
