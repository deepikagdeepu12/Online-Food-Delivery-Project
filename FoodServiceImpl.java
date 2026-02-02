package com.fooddelivaryapp.fooddelivary.service;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import com.fooddelivaryapp.fooddelivary.entity.FoodEntity;
import com.fooddelivaryapp.fooddelivary.io.FoodRequest;
import com.fooddelivaryapp.fooddelivary.io.FoodResponse;
import com.fooddelivaryapp.fooddelivary.repository.FoodRepository;

import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;

import software.amazon.awssdk.services.s3.model.PutObjectRequest;
 

@Service
public class FoodServiceImpl implements FoodService {

    private final S3Client s3Client;
    private final FoodRepository foodRepository;

    @Value("${aws.s3.bucket:fooddev1}")
    private String bucketName;

    public FoodServiceImpl(S3Client s3Client, FoodRepository foodRepository) {
        this.s3Client = s3Client;
        this.foodRepository = foodRepository;
    }

    @Override
    public String uploadFile(MultipartFile file) {

        if (file == null || file.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "File is required"
            );
        }

        String originalFilename = file.getOriginalFilename();
        if (originalFilename == null || !originalFilename.contains(".")) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "File must have a valid extension"
            );
        }

        // Extract extension
        String extension =
                originalFilename.substring(originalFilename.lastIndexOf('.') + 1).toLowerCase();

        // Allow only images
        if (!extension.equals("png") &&
            !extension.equals("jpg") &&
            !extension.equals("jpeg")) {

            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Only PNG, JPG, JPEG images are allowed"
            );
        }

        String key = UUID.randomUUID() + "." + extension;

        // 🔥 FIX CONTENT TYPE (IMPORTANT)
        String contentType;
        switch (extension) {
            case "png":
                contentType = "image/png";
                break;
            case "jpg":
            case "jpeg":
                contentType = "image/jpeg";
                break;
            default:
                contentType = "application/octet-stream";
        }

        try {
            PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                    .bucket(bucketName)
                    .key(key)
                    .contentType(contentType)
                    .build();

            s3Client.putObject(
                    putObjectRequest,
                    RequestBody.fromBytes(file.getBytes())
            );

            return "https://" + bucketName + ".s3.amazonaws.com/" + key;

        } catch (IOException e) {
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    "File upload failed",
                    e
            );
        }
    }


    @Override
    public FoodResponse addFood(FoodRequest request, MultipartFile file) {
        FoodEntity entity = convertToEntity(request);
        String imageUrl = uploadFile(file);
        entity.setImageUrl(imageUrl);
        FoodEntity saved = foodRepository.save(entity);
        return convertToResponse(saved);
    }

    private FoodEntity convertToEntity(FoodRequest request) {
        return FoodEntity.builder()
                .name(request.getName())
                .description(request.getDescription())
                .price(request.getPrice())
                .category(request.getCategory())
                .build();
    }

   private FoodResponse convertToResponse(FoodEntity entity) {
    return FoodResponse.builder()
            .id(entity.getId())                 // String
            .name(entity.getName())         // ✅ FIX
            .description(entity.getDescription())
            .price(entity.getPrice())
            .category(entity.getCategory())
            .imageUrl(entity.getImageUrl())
            .build();
}

   @Override
   public List<FoodResponse> readFoods() {
    
       List<FoodEntity> foodEntity = foodRepository.findAll();
       return foodEntity.stream()
                .map(Object -> convertToResponse(Object))
                .collect(Collectors.toList());
   }

   @Override
   public FoodResponse readFood(String id) {
     
    FoodEntity foodEntity= foodRepository.findById(id)
    .orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND,"Food item not found"));
    return convertToResponse(foodEntity);
    





   }

   @Override
   public boolean deleteFood(String fileName) {
    
      DeleteObjectRequest deleteObjectRequest = DeleteObjectRequest.builder()
              .bucket(bucketName)
              .key(fileName)
              .build();

              s3Client.deleteObject(deleteObjectRequest);

              return true;
   }

   @Override
   public void deleteFoodById(String id) {
     FoodResponse response= readFood(id);
        String imageUrl=response.getImageUrl();
        String fileName=imageUrl.substring(imageUrl.lastIndexOf("/")+1);
        boolean isDeleted= deleteFood(fileName);
        if(isDeleted){
            foodRepository.deleteById(response.getId());;
        }




   }
    
   }
