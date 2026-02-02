package com.fooddelivaryapp.fooddelivary.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;
import com.fooddelivaryapp.fooddelivary.io.FoodRequest;
import com.fooddelivaryapp.fooddelivary.io.FoodResponse;

public interface FoodService {

    String uploadFile(MultipartFile file);

    FoodResponse addFood(FoodRequest request, MultipartFile file);
   
    List<FoodResponse> readFoods();

    FoodResponse readFood(String id);

    boolean deleteFood(String fileName);


    void deleteFoodById(String id);

}
