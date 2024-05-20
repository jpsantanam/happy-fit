package com.happyfit.happyfit.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.happyfit.happyfit.models.UserFood;
import com.happyfit.happyfit.repositories.UserFoodRepository;

@Service
public class UserFoodService {

    @Autowired
    private UserFoodRepository userFoodRepository;

    public UserFood createFood(UserFood food) {
        validateFood(food);
        return userFoodRepository.save(food);
    }

    public UserFood editFood(UserFood food) {
        validateFood(food);
        return userFoodRepository.save(food);
    }

    public void deleteFood(Integer foodId) {
        userFoodRepository.deleteById(foodId);
    }

    public List<UserFood> findFoodsByMealId(Integer mealId) {
        return userFoodRepository.findByMealId(mealId);
    }

    public UserFood findById(Integer foodId) {
        Optional<UserFood> food = userFoodRepository.findById(foodId);
        return food.orElse(null);
    }

    private void validateFood(UserFood food) {
        if (food.getMeal() == null) {
            throw new IllegalArgumentException("A refeição não pode ser nula");
        }
        if (food.getFoodOption() == null) {
            throw new IllegalArgumentException("A opção de comida não pode ser nula");
        }
        if (food.getQuantity() <= 0) {
            throw new IllegalArgumentException("A quantidade deve ser maior que zero");
        }
    }
}
