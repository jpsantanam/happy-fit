package com.happyfit.happyfit.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.happyfit.happyfit.models.User;
import com.happyfit.happyfit.models.UserDiet;
import com.happyfit.happyfit.models.dto.AddUserDietDto;
import com.happyfit.happyfit.repositories.UserDietRepository;
import com.happyfit.happyfit.repositories.UserRepository;

import jakarta.validation.Valid;

@Service
public class UserDietService {

    @Autowired
    private UserDietRepository userDietRepository;

    @Autowired
    private UserRepository userRepository;

    public UserDiet findById(Integer id) {
        Optional<UserDiet> userDiet = this.userDietRepository.findById(id);
        return userDiet.orElse(null);
    }

    public UserDiet findByUserId(Integer userId) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isPresent()) {
            return user.get().getDiet();
        }
        return null;
    }

    @Transactional
    public UserDiet create(UserDiet userDiet) {
        userDiet.setId(null);
        userDiet = this.userDietRepository.save(userDiet);
        return userDiet;
    }

    public UserDiet delete(UserDiet profile) {
        User user = profile.getUser();
        user.setProfile(null);
        this.userDietRepository.delete(profile);
        return profile;
    }

    public UserDiet fromDto(@Valid AddUserDietDto userDietDto) {
        UserDiet userDiet = new UserDiet();

        userDiet.setTotalCalories(userDietDto.getTotalCalories());
        userDiet.setTotalProteins(userDietDto.getTotalProteins());
        userDiet.setTotalCarbs(userDietDto.getTotalCarbs());
        userDiet.setTotalFats(userDietDto.getTotalFats());

        return userDiet;
    }

    public UserDiet update(User user, UserDiet userDiet) {
        this.userDietRepository.save(userDiet);
        return userDiet;
    }
}