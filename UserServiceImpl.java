package com.fooddelivaryapp.fooddelivary.service;


import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.fooddelivaryapp.fooddelivary.entity.UserEntity;
import com.fooddelivaryapp.fooddelivary.io.UserRequest;
import com.fooddelivaryapp.fooddelivary.io.UserResponse;
import com.fooddelivaryapp.fooddelivary.repository.UserRepository;

import lombok.AllArgsConstructor;


@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationFacade authenticationFacade;


    @Override
    public UserResponse registerUser(UserRequest request) {
        
        UserEntity newUser=convertToEntity(request);
        newUser=userRepository.save(newUser);
        return convertToResponse(newUser);
        





    }
    
    
    
    
    private UserEntity convertToEntity(UserRequest request) {
       
        return UserEntity.builder()
        .email(request.getEmail())
        .password(passwordEncoder.encode(request.getPassword()))
        .name(request.getName())
        .build();
        }
      



        private UserResponse convertToResponse(UserEntity registerUser)
        {
            return UserResponse.builder()
            .userId(registerUser.getUserId())
             .name(registerUser.getName())
               .email(registerUser.getEmail())
               .build();
          
        }




        @Override
        public String findByUserId() {
          

             String loggedInUserEmail= authenticationFacade.getAuthentication().getName();
             UserEntity userEntity = userRepository.findByEmail(loggedInUserEmail).orElseThrow(() -> new UsernameNotFoundException("user not Found"));
                return userEntity.getUserId();
             


        }


        

      













}
