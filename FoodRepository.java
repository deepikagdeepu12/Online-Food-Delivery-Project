package com.fooddelivaryapp.fooddelivary.repository;



import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.fooddelivaryapp.fooddelivary.entity.FoodEntity;

@Repository
public interface FoodRepository extends MongoRepository<FoodEntity,String> {

}
