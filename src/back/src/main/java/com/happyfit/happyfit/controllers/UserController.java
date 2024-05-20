package com.happyfit.happyfit.controllers;

import java.net.URI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.happyfit.happyfit.models.User;
import com.happyfit.happyfit.models.UserDiet;
import com.happyfit.happyfit.models.UserProfile;
import com.happyfit.happyfit.models.dto.UserCreateDto;
import com.happyfit.happyfit.models.dto.AddNutritionistDto;
import com.happyfit.happyfit.models.dto.AddUserDietDto;
import com.happyfit.happyfit.models.dto.AddUserProfileDto;
import com.happyfit.happyfit.services.UserDietService;
import com.happyfit.happyfit.services.UserProfileService;
import com.happyfit.happyfit.services.UserService;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserProfileService userProfileService;

    @Autowired
    private UserDietService userDietService;

    @GetMapping("/{id}")
    public ResponseEntity<User> findById(@PathVariable Integer id) {
        User user = userService.findById(id);

        if (user == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(user);
    }

    @GetMapping
    public ResponseEntity<User> findByEmail(@RequestParam("email") String email) {
        User user = userService.findByEmail(email);

        if (user == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(user);
    }

    @GetMapping("/{id}/profile")
    public ResponseEntity<UserProfile> findProfile(@PathVariable Integer id) {
        User user = userService.findById(id);
        UserProfile userProfile = user.getProfile();

        return ResponseEntity.ok(userProfile);
    }

    @GetMapping("/{id}/diet")
    public ResponseEntity<UserDiet> findDiet(@PathVariable Integer id) {
        User user = userService.findById(id);
        UserDiet userDiet = user.getDiet();

        return ResponseEntity.ok(userDiet);
    }

    @GetMapping("/{id}/nutritionist")
    public ResponseEntity<User> findNutritionist(@PathVariable Integer id) {
        User user = userService.findById(id);
        User nutritionist = user.getNutritionist();

        return ResponseEntity.ok(nutritionist);
    }

    @PostMapping
    public ResponseEntity<String> create(@Valid @RequestBody UserCreateDto userDto) {
        User user = this.userService.findByEmail(userDto.getEmail());

        if(user != null){
            return ResponseEntity.badRequest().body("Email já cadastrado.");
        }

        user = this.userService.fromDto(userDto);
        User newUser = this.userService.create(user);

        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}").buildAndExpand(newUser.getId()).toUri();
        return ResponseEntity.created(uri).build();
    }

    @PostMapping("/{id}/nutritionist")
    public ResponseEntity<User> addNutritionist(@PathVariable Integer id,
            @RequestBody AddNutritionistDto addNutritionistDto) {
        User user = this.userService.findById(id);
        User nutritionist = this.userService.findById(addNutritionistDto.getNutritionistId());

        user = this.userService.addNutritionist(user, nutritionist);

        if (user == null) {
            return ResponseEntity.badRequest().body(null);
        }

        return ResponseEntity.ok().body(user);
    }

    @PostMapping("/{id}/profile")
    public ResponseEntity<User> addProfile(@PathVariable Integer id, @RequestBody AddUserProfileDto addProfileDto) {
        User user = this.userService.findById(id);

        UserProfile userProfile = this.userProfileService.fromDto(addProfileDto);
        UserProfile newUserProfile = userProfileService.create(userProfile);

        user = this.userService.addProfile(user, newUserProfile);

        if (user == null) {
            return ResponseEntity.badRequest().body(null);
        }

        return ResponseEntity.ok().body(user);
    }

    @PostMapping("/{id}/diet")
    public ResponseEntity<User> addDiet(@PathVariable Integer id, @RequestBody AddUserDietDto addDietDto) {
        User user = this.userService.findById(id);

        UserDiet userDiet = this.userDietService.fromDto(addDietDto);
        UserDiet newUserDiet = userDietService.create(userDiet);

        user = this.userService.addDiet(user, newUserDiet);

        if (user == null) {
            return ResponseEntity.badRequest().body(null);
        }

        return ResponseEntity.ok().body(user);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<User> delete(@PathVariable Integer id) {
        User user = this.userService.findById(id);
        this.userService.delete(user);
        return ResponseEntity.ok().body(user);
    }

    @DeleteMapping("/{id}/profile")
    public ResponseEntity<UserProfile> deleteProfile(@PathVariable Integer id) {
        User user = this.userService.findById(id);
        UserProfile profile = user.getProfile();
        this.userProfileService.delete(profile);
        return ResponseEntity.ok().body(profile);
    }

    @DeleteMapping("/{id}/diet")
    public ResponseEntity<UserDiet> deleteDiet(@PathVariable Integer id) {
        User user = this.userService.findById(id);
        UserDiet diet = user.getDiet();
        this.userDietService.delete(diet);
        return ResponseEntity.ok().body(diet);
    }

    @PutMapping("/{id}")
    ResponseEntity<Void> update(@RequestBody UserCreateDto userDto, @PathVariable Integer id) {
        User user = this.userService.fromDto(userDto);
        user.setId(id);
        this.userService.update(user);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}/profile")
    ResponseEntity<Void> updateProfile(@RequestBody AddUserProfileDto addProfileDto, @PathVariable Integer id) {
        User user = this.userService.findById(id);
        UserProfile profile = this.userProfileService.fromDto(addProfileDto);
        profile.setId(user.getProfile().getId());
        this.userProfileService.update(user, profile);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}/diet")
    ResponseEntity<Void> updateDiet(@RequestBody AddUserDietDto addDietDto, @PathVariable Integer id) {
        User user = this.userService.findById(id);
        UserDiet diet = this.userDietService.fromDto(addDietDto);
        diet.setId(user.getDiet().getId());
        this.userDietService.update(user, diet);
        return ResponseEntity.noContent().build();
    }
}