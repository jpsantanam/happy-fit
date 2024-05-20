package com.happyfit.happyfit.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.happyfit.happyfit.models.FoodOption;
import com.happyfit.happyfit.models.UserDiet;
// import com.happyfit.happyfit.models.UserDiet;
import com.happyfit.happyfit.models.UserFood;
import com.happyfit.happyfit.models.UserMeal;
import com.happyfit.happyfit.repositories.UserFoodRepository;
import com.happyfit.happyfit.repositories.UserMealRepository;

@Service
public class UserMealService {

    @Autowired
    private UserMealRepository userMealRepository;
    @Autowired
    private UserFoodRepository userFoodRepository;

    public UserMeal findById(Integer id) {
        Optional<UserMeal> userMeal = userMealRepository.findById(id);
        return userMeal.orElse(null);
    }

    public UserMeal create(UserMeal userMeal) {
        return userMealRepository.save(userMeal);
    }

    public UserMeal edit(UserMeal userMeal) {
        return userMealRepository.save(userMeal);
    }

    public void delete(Integer userMealId) {
        userMealRepository.deleteById(userMealId);
    }

    public void addFoodToMeal(UserMeal userMeal, FoodOption foodOption, Double quantity) {
        UserFood userFood = new UserFood();
        userFood.setMeal(userMeal);
        userFood.setFoodOption(foodOption);
        userFood.setQuantity(quantity);
        userFoodRepository.save(userFood);
    }

    public List<UserMeal> getMealsByDiet(UserDiet diet) {
        return userMealRepository.findByDiet(diet);
    }
}
