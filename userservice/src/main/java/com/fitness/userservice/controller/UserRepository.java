package com.fitness.userservice.controller;

import org.springframework.data.jpa.repository.JpaRepository;
import com.fitness.userservice.models.User;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    Boolean existsByEmail(String email);
}
