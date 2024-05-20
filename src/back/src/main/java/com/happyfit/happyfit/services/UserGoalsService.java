package com.happyfit.happyfit.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.happyfit.happyfit.models.UserGoals;
import com.happyfit.happyfit.models.UserProfile;
import com.happyfit.happyfit.models.dto.AddUserGoalsDto;
import com.happyfit.happyfit.models.dto.AddUserProfileDto;
import com.happyfit.happyfit.repositories.UserGoalsRepository;

import jakarta.validation.Valid;

@Service
public class UserGoalsService {

    @Autowired
    private UserGoalsRepository userGoalsRepository;

    public UserGoals findById(Integer id) {
        Optional<UserGoals> userGoals = this.userGoalsRepository.findById(id);
        return userGoals.orElse(null);
    }

    @Transactional
    public UserGoals create(UserGoals userGoals) {
        userGoals.setId(null);
        userGoals = this.userGoalsRepository.save(userGoals);
        return userGoals;
    }

/*     public UserGoals calculateGoals(UserProfile userProfile) {
        userProfileDto.getWeight();
        // BMR = 370 + (21.6 × Lean Body Mass [kg])

        // LBM = (Weight [kg] × (100 - Body Fat %) / 100

        // Body Fat % = (1.20 × BMI) + (0.23 × Age) - 5

        // BMI = (1.20 × BMI) + (0.23 × Age) - 5

        // TDEE = BMR × Activity Level

        // LBM (men) = 0.407 × weight [kg] + 0.267 × height [cm] - 19.2
        // LBM (women) = 0.252 × weight [kg] + 0.473 × height [cm] - 48.3

        return userGoals;
    } */

    public UserGoals fromDto(@Valid AddUserGoalsDto userGoalsDto) {
        UserGoals userGoals = new UserGoals();

        userGoals.setTotalCalories(userGoalsDto.getTotalCalories());
        userGoals.setTotalProteins(userGoalsDto.getTotalProteins());
        userGoals.setTotalCarbs(userGoalsDto.getTotalCarbs());
        userGoals.setTotalFats(userGoalsDto.getTotalFats());

        return userGoals;
    }
}