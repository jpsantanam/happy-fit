package com.happyfit.happyfit.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.happyfit.happyfit.models.UserDiet;

@Repository
public interface UserDietRepository extends JpaRepository<UserDiet, Integer> {

}