package com.fooddelivaryapp.fooddelivary.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.fooddelivaryapp.fooddelivary.entity.Orderentity;


@Repository
public interface OrderRepostiory extends MongoRepository<Orderentity,String>{

    List<Orderentity> findByUserId(String userId);
    Optional <Orderentity> findByRazorpayOrderId(String razorpayOrderId);




}
