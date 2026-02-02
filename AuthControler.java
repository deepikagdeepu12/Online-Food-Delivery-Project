// package com.fooddelivaryapp.fooddelivary.controller;

// import org.springframework.security.authentication.AuthenticationManager;
// import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
// import org.springframework.security.core.userdetails.UserDetails;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;

// import com.fooddelivaryapp.fooddelivary.Util.JwtUtil;
// import com.fooddelivaryapp.fooddelivary.io.AuthenticationRequest;
// import com.fooddelivaryapp.fooddelivary.service.AppUserDetailsService;
// import com.fooddelivaryapp.fooddelivary.io.AuthenticationResponse;
// import lombok.AllArgsConstructor;

// @RestController
// @RequestMapping("/api")
// @AllArgsConstructor
// public class AuthControler 
// {
//      private  final AuthenticationManager authenticationManager;
//      private final AppUserDetailsService UserDetailsService;
//      private final  JwtUtil jwtUtil;
       
//        @PostMapping("/login")
//      public AuthenticationResponse login(@RequestBody AuthenticationRequest request)
//      {
//             authenticationManager.authenticate(
//                 new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

//               final UserDetails userDetails=UserDetailsService.loadUserByUsername(request.getEmail());
//               final String jwtToken=jwtUtil.generateToken(userDetails);
//               return new AuthenticationResponse(request.getEmail() ,jwtToken);

//             }

// }


package com.fooddelivaryapp.fooddelivary.controller;

import com.fooddelivaryapp.fooddelivary.Util.JwtUtil;
import com.fooddelivaryapp.fooddelivary.io.AuthenticationRequest;
import com.fooddelivaryapp.fooddelivary.io.AuthenticationResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api")
public class AuthControler {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private JwtUtil jwtUtil;

   @PostMapping("/login")
public AuthenticationResponse login(@RequestBody AuthenticationRequest request) {

    try{
    authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(
            request.getEmail(), request.getPassword())
    );
}
catch (Exception e) {
        throw new ResponseStatusException(
            HttpStatus.UNAUTHORIZED,
            "Invalid email or password"
        );
    }
    UserDetails userDetails =
        userDetailsService.loadUserByUsername(request.getEmail());

    String token = jwtUtil.generateToken(userDetails);

    return new AuthenticationResponse(request.getEmail(), token);
}


    }

