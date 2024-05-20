package com.happyfit.happyfit.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.happyfit.happyfit.models.UserFood;

@Repository
public interface UserFoodRepository extends JpaRepository<UserFood, Integer> {

    List<UserFood> findByMealId(Integer mealId);

}
