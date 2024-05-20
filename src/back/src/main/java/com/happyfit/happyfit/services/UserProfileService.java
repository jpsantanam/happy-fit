package com.happyfit.happyfit.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.happyfit.happyfit.models.User;
import com.happyfit.happyfit.models.UserProfile;
import com.happyfit.happyfit.models.dto.AddUserProfileDto;
import com.happyfit.happyfit.repositories.UserProfileRepository;

import jakarta.validation.Valid;

@Service
public class UserProfileService {

    @Autowired
    private UserProfileRepository userProfileRepository;

    public UserProfile findById(Integer id) {
        Optional<UserProfile> userProfile = this.userProfileRepository.findById(id);
        return userProfile.orElse(null);
    }

    @Transactional
    public UserProfile create(UserProfile userProfile) {
        userProfile.setId(null);
        userProfile = this.userProfileRepository.save(userProfile);

        // UserGoals userGoals = this.userGoalsService.fromDto(addGoalsDto);
        // UserGoals newUserGoals = userGoalsService.create(userGoals);

        return userProfile;
    }

    public UserProfile delete(UserProfile profile) {
        User user = profile.getUser();
        user.setProfile(null);
        this.userProfileRepository.delete(profile);
        return profile;
    }

    public UserProfile fromDto(@Valid AddUserProfileDto userProfileDto) {
        UserProfile userProfile = new UserProfile();

        userProfile.setWeight(userProfileDto.getWeight());
        userProfile.setHeight(userProfileDto.getHeight());
        userProfile.setAge(userProfileDto.getAge());
        userProfile.addGender(userProfileDto.getGender());
        userProfile.setHip(userProfileDto.getHip());
        userProfile.setWaist(userProfileDto.getWaist());
        userProfile.setNeck(userProfileDto.getNeck());
        userProfile.addCurrentGoal(userProfileDto.getCurrentGoal());
        userProfile.setSmokes(userProfileDto.getSmokes());
        userProfile.setDrinks(userProfileDto.getDrinks());
        userProfile.setHadSurgeries(userProfileDto.getHadSurgeries());
        userProfile.setHasDiseases(userProfileDto.getHasDiseases());
        userProfile.setHasPain(userProfileDto.getHasPain());
        userProfile.setPal(userProfileDto.getPal());

        return userProfile;
    }

    public UserProfile update(User user, UserProfile userProfile) {
        this.userProfileRepository.save(userProfile);
        return userProfile;
    }
}