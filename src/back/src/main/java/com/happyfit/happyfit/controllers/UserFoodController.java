package com.happyfit.happyfit.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.happyfit.happyfit.models.UserFood;
import com.happyfit.happyfit.models.UserMeal;
import com.happyfit.happyfit.services.UserFoodService;
import com.happyfit.happyfit.services.UserMealService;

@RestController
@RequestMapping("/user/{userId}/diet/meal/{mealId}/food")
public class UserFoodController {

    @Autowired
    private UserFoodService userFoodService;
    @Autowired
    private UserMealService userMealService;

    @GetMapping
    public ResponseEntity<List<UserFood>> getFoods(@PathVariable Integer userId, @PathVariable Integer mealId) {
        UserMeal meal = userMealService.findById(mealId);
        if (meal == null || !meal.getDiet().getUser().getId().equals(userId)) {
            return ResponseEntity.notFound().build();
        }
        List<UserFood> foods = userFoodService.findFoodsByMealId(mealId);
        return ResponseEntity.ok(foods);
    }

    @GetMapping("/{foodId}")
    public ResponseEntity<UserFood> getFoodById(@PathVariable Integer userId, @PathVariable Integer mealId, @PathVariable Integer foodId) {
        UserFood food = userFoodService.findById(foodId);
        if (food == null || !food.getMeal().getMealId().equals(mealId) || !food.getMeal().getDiet().getUser().getId().equals(userId)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(food);
    }

    @PostMapping
    public ResponseEntity<UserFood> addFood(@PathVariable Integer userId, @PathVariable Integer mealId, @RequestBody UserFood userFood) {
        UserMeal meal = userMealService.findById(mealId);
        if (meal == null || !meal.getDiet().getUser().getId().equals(userId)) {
            return ResponseEntity.notFound().build();
        }
        userFood.setMeal(meal);
        UserFood newFood = userFoodService.createFood(userFood);
        return ResponseEntity.ok(newFood);
    }

    @PutMapping("/{foodId}")
    public ResponseEntity<UserFood> updateFood(@PathVariable Integer userId, @PathVariable Integer mealId, @PathVariable Integer foodId, @RequestBody UserFood updatedFood) {
        UserFood existingFood = userFoodService.findById(foodId);
        if (existingFood == null || !existingFood.getMeal().getMealId().equals(mealId) || !existingFood.getMeal().getDiet().getUser().getId().equals(userId)) {
            return ResponseEntity.notFound().build();
        }
        updatedFood.setFoodId(foodId);
        updatedFood.setMeal(existingFood.getMeal());
        UserFood savedFood = userFoodService.editFood(updatedFood);
        return ResponseEntity.ok(savedFood);
    }

    @DeleteMapping("/{foodId}")
    public ResponseEntity<Void> deleteFood(@PathVariable Integer userId, @PathVariable Integer mealId, @PathVariable Integer foodId) {
        UserFood food = userFoodService.findById(foodId);
        if (food == null || !food.getMeal().getMealId().equals(mealId) || !food.getMeal().getDiet().getUser().getId().equals(userId)) {
            return ResponseEntity.notFound().build();
        }
        userFoodService.deleteFood(foodId);
        return ResponseEntity.noContent().build();
    }
}
