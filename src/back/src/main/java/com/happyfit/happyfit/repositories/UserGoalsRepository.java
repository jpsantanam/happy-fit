package com.happyfit.happyfit.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.happyfit.happyfit.models.UserGoals;

@Repository
public interface UserGoalsRepository extends JpaRepository<UserGoals, Integer> {

}