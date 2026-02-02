package com.fooddelivaryapp.fooddelivary.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document(collection ="users")
public class UserEntity 
{
    @Id
   private String userId;
   private String name; 
    private String email;
    private String password;

}
