package com.example.fsd.repositories;

import com.example.fsd.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    @Query("select user from User user where user.email = ?1")
    User findByEmail(@Param("email") String email);
    @Query("SELECT u FROM User u JOIN u.roles r WHERE r.role = :roleName")
    List<User> findByRole(@Param("roleName") String roleName);
}