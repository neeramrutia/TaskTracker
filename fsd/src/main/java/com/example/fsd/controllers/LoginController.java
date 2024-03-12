package com.example.fsd.controllers;

import com.example.fsd.DTO.JwtRequest;
import com.example.fsd.DTO.JwtResponse;
import com.example.fsd.entities.User;
import com.example.fsd.repositories.UserRepository;
import com.example.fsd.security.JWTHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@Controller
@RequestMapping("/loginuser")
public class LoginController {
    @Autowired
    UserRepository userRepository;

    @Autowired
    JWTHelper helper;

    @Autowired
    UserDetailsService userDetailsService;

    @Autowired
    AuthenticationManager manager;

    @PostMapping("")
    public ResponseEntity<?> logInUser(@RequestBody JwtRequest request) {

        String email = request.getEmail();
        User user = userRepository.findByEmail(email);

        if(user == null){
            return new ResponseEntity<>("User not found", HttpStatus.BAD_REQUEST);
        }else{
            if(!user.getPassword().equals(request.getPassword())){
                return new ResponseEntity<>("Incorrect Password", HttpStatus.BAD_REQUEST);
            }
            UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());
            //generate token for user
            String token = this.helper.generateToken(userDetails);

            System.out.println("token: "+ token);
            JwtResponse res = new JwtResponse(token, user.getName(), user.getRoles(), user.getEmail(),user.getId());
            return new ResponseEntity<>(res, HttpStatus.OK);
        }
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<?> exceptionHandler() {
        return ResponseEntity.ok("Credentials Invalid!!");
    }
}