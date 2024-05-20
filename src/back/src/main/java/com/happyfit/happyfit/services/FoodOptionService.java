package com.happyfit.happyfit.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.happyfit.happyfit.models.FoodOption;
import com.happyfit.happyfit.repositories.FoodOptionRepository;

@Service
public class FoodOptionService {
    
    @Autowired
    private FoodOptionRepository foodOptionRepository;

    public List<FoodOption> getAllFoodOptions() {
        return foodOptionRepository.findAll();
    }

    public FoodOption getFoodOptionById(Integer id) {
        return foodOptionRepository.findById(id).orElse(null);
    }

    public List<FoodOption> getFoodOptionsByName(String foodName) {
        String normalizedFoodName = foodName.toLowerCase();
        return foodOptionRepository.findByFoodName(normalizedFoodName);
    }

    public FoodOption saveFoodOption(FoodOption foodOption) {
        validateFoodOption(foodOption);
        return foodOptionRepository.save(foodOption);
    }

    public FoodOption updateFoodOption(Integer id, FoodOption updatedFoodOption) {
        validateFoodOption(updatedFoodOption);

        FoodOption existingFoodOption = foodOptionRepository.findById(id).orElse(null);
        if (existingFoodOption != null) {
            existingFoodOption.setFoodName(updatedFoodOption.getFoodName());
            existingFoodOption.setFoodCalories(updatedFoodOption.getFoodCalories());
            existingFoodOption.setFoodProteins(updatedFoodOption.getFoodProteins());
            existingFoodOption.setFoodCarbs(updatedFoodOption.getFoodCarbs());
            existingFoodOption.setFoodFats(updatedFoodOption.getFoodFats());
            existingFoodOption.setFoodPortion(updatedFoodOption.getFoodPortion());
            
            return foodOptionRepository.save(existingFoodOption);
        } else {
            throw new IllegalArgumentException("Opção de comida não encontrada: " + id);
        }
    }

    public void deleteFoodOption(Integer id) {
        foodOptionRepository.deleteById(id);
    }

    private void validateFoodOption(FoodOption foodOption) {
        if (foodOption.getFoodName() == null || foodOption.getFoodName().isEmpty()) {
            throw new IllegalArgumentException("O nome da comida não pode ser nulo ou vazio");
        }
        if (foodOption.getFoodCalories() == null) {
            throw new IllegalArgumentException("As calorias da comida devem ser maiores que zero");
        }
        if (foodOption.getFoodProteins() == null) {
            throw new IllegalArgumentException("As proteínas da comida devem ser maiores que zero");
        }
        if (foodOption.getFoodCarbs() == null) {
            throw new IllegalArgumentException("Os carboidratos da comida devem ser maiores que zero");
        }
        if (foodOption.getFoodFats() == null) {
            throw new IllegalArgumentException("As gorduras da comida devem ser maiores que zero");
        }
        if (foodOption.getFoodPortion() == null) {
            throw new IllegalArgumentException("A porção da comida não pode ser nula");
        }
    }
}