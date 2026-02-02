package com.fooddelivaryapp.fooddelivary.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fooddelivaryapp.fooddelivary.io.FoodRequest;
import com.fooddelivaryapp.fooddelivary.io.FoodResponse;
import com.fooddelivaryapp.fooddelivary.service.FoodService;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/public/foods")
@CrossOrigin("*")
public class FoodController {

    private final FoodService foodService;
    public FoodController(FoodService foodService, ObjectMapper objectMapper) {
        this.foodService = foodService;
    }

   @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
public FoodResponse addFood(
        @RequestPart("food") String foodString,
        @RequestPart("file") MultipartFile file) {
    try {
        ObjectMapper mapper = new ObjectMapper();
        FoodRequest foodRequest = mapper.readValue(foodString, FoodRequest.class);
        return foodService.addFood(foodRequest, file);
    } catch (JsonProcessingException e) {
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid food data");
    }
        }

        @GetMapping
        public List<FoodResponse> readFoods() {
        return foodService.readFoods();
    
    
    
    }
          @GetMapping("/{id}")
    public FoodResponse readFood(@PathVariable String id) {
        return foodService.readFood(id);
    }

        
    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
         public void deleteFood(@PathVariable String id) {
            
            foodService.deleteFoodById(id);
         }


         }




