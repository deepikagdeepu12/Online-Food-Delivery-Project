package com.fooddelivaryapp.fooddelivary.repository;


import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.fooddelivaryapp.fooddelivary.entity.CartEntity;



@Repository
public interface CartRepositroy extends MongoRepository<CartEntity, String> {

    Optional<CartEntity> findByUserId(String userId);

    void deleteByUserId(String userId);
}
