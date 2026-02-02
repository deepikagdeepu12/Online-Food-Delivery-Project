package com.fooddelivaryapp.fooddelivary.service;
import java.util.Collections;


import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.fooddelivaryapp.fooddelivary.entity.UserEntity;
import com.fooddelivaryapp.fooddelivary.repository.UserRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class AppUserDetailsService implements  UserDetailsService{

    private final UserRepository userRepository;

    public UserDetails  loadUserByUsername(String email) {
        UserEntity user=userRepository.findByEmail(email)
            .orElseThrow(() -> new UsernameNotFoundException("User Not Found" ));
        
        return  new org.springframework.security.core.userdetails.User(user.getEmail(),user.getPassword(),Collections.emptyList());
    }
}

    