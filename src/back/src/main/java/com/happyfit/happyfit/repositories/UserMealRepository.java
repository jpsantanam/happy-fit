package com.happyfit.happyfit.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.happyfit.happyfit.models.UserDiet;
// import com.happyfit.happyfit.models.UserDiet;
import com.happyfit.happyfit.models.UserMeal;

@Repository
public interface UserMealRepository extends JpaRepository<UserMeal, Integer> {
    
    List<UserMeal> findByDiet(UserDiet diet);

}
