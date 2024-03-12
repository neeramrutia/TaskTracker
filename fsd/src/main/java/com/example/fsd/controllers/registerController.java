package com.example.fsd.controllers;
import com.example.fsd.entities.User;
import com.example.fsd.repositories.RoleRepository;
import com.example.fsd.repositories.UserRepository;
import com.example.fsd.DTO.UserRequest;

import com.example.fsd.entities.Roles;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin
@Controller
@RequestMapping("/register")
public class registerController {
    @Autowired
    UserRepository userRepository;
    @Autowired
    RoleRepository roleRepository;
    @PostMapping("")
    public ResponseEntity<?> addUser(@RequestBody UserRequest userRequest){
        System.out.println("Add user...");

        User existingUser = userRepository.findByEmail(userRequest.getEmail());

        // check if user already exists
        if (existingUser != null) {
            System.out.println("inside if==================================");
            return new ResponseEntity<>("exist", HttpStatus.BAD_REQUEST);
        }

        User user = new User();
        user.setName(userRequest.getName());
        user.setEmail(userRequest.getEmail());
        user.setPassword(userRequest.getPassword());

        // retrieve role from the database based on the request body
        Roles role = roleRepository.findByRole("USER");

        // set the role for the user
        List<Roles> roles = new ArrayList<>();
        roles.add(role);
        user.setRoles(roles);

        // save the user
        userRepository.save(user);

        return new ResponseEntity<>("User created", HttpStatus.OK);
    }
}