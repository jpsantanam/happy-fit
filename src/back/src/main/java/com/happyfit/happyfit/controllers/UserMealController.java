package com.happyfit.happyfit.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.happyfit.happyfit.models.UserMeal;
import com.happyfit.happyfit.models.UserDiet;
import com.happyfit.happyfit.services.UserMealService;
import com.happyfit.happyfit.services.UserDietService;

@RestController
@RequestMapping("/user/{userId}/diet/meal")
public class UserMealController {

    @Autowired
    private UserMealService userMealService;
    @Autowired
    private UserDietService userDietService;

    @GetMapping
    public ResponseEntity<Map<String, Object>> getMeals(@PathVariable Integer userId) {
        UserDiet diet = userDietService.findByUserId(userId);
        if (diet == null) {
            return ResponseEntity.notFound().build();
        }
        List<UserMeal> meals = userMealService.getMealsByDiet(diet);

        Map<String, Object> response = new HashMap<>();
        response.put("diet", diet);
        response.put("meals", meals);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{mealId}")
    public ResponseEntity<UserMeal> getMealById(@PathVariable Integer userId, @PathVariable Integer mealId) {
        UserMeal meal = userMealService.findById(mealId);
        if (meal == null || !meal.getDiet().getUser().getId().equals(userId)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(meal);
    }

    @PostMapping
    public ResponseEntity<UserMeal> createMeal(@PathVariable Integer userId, @RequestBody UserMeal userMeal) {
        UserDiet diet = userDietService.findByUserId(userId);
        if (diet == null) {
            return ResponseEntity.notFound().build();
        }
        userMeal.setDiet(diet);
        UserMeal newMeal = userMealService.create(userMeal);
        return ResponseEntity.ok(newMeal);
    }

    @PutMapping("/{mealId}")
    public ResponseEntity<UserMeal> updateMeal(@PathVariable Integer userId, @PathVariable Integer mealId, @RequestBody UserMeal updatedMeal) {
        UserMeal existingMeal = userMealService.findById(mealId);
        if (existingMeal == null || !existingMeal.getDiet().getUser().getId().equals(userId)) {
            return ResponseEntity.notFound().build();
        }
        updatedMeal.setMealId(mealId);
        updatedMeal.setDiet(existingMeal.getDiet());
        UserMeal savedMeal = userMealService.edit(updatedMeal);
        return ResponseEntity.ok(savedMeal);
    }

    @DeleteMapping("/{mealId}")
    public ResponseEntity<Void> deleteMeal(@PathVariable Integer userId, @PathVariable Integer mealId) {
        UserMeal meal = userMealService.findById(mealId);
        if (meal == null || !meal.getDiet().getUser().getId().equals(userId)) {
            return ResponseEntity.notFound().build();
        }
        userMealService.delete(mealId);
        return ResponseEntity.noContent().build();
    }
}
