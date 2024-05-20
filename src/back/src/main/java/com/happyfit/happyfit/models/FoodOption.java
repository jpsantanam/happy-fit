package com.happyfit.happyfit.models;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.happyfit.happyfit.models.enums.FoodPortionEnum;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "foodOptions")
public class FoodOption {
    @Id
    @Column(name = "id", unique = true)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer foodOptionsId;

    @Column(length = 100, nullable = false)
    private String foodName;

    @Column
    private Float foodCalories;

    @Column
    private Float foodProteins;

    @Column
    private Float foodCarbs;

    @Column
    private Float foodFats;

    @Column(length = 100, nullable = false)
    private FoodPortionEnum foodPortion;

    @OneToMany(mappedBy = "foodOption", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<UserFood> userFood = new ArrayList<>();

    public Integer getFoodOptionsId() {
        return foodOptionsId;
    }

    public void setFoodOptionsId(Integer foodOptionsId) {
        this.foodOptionsId = foodOptionsId;
    }

    public String getFoodName() {
        return foodName;
    }

    public void setFoodName(String foodName) {
        this.foodName = foodName;
    }

    public Float getFoodCalories() {
        return foodCalories;
    }

    public void setFoodCalories(Float foodCalories) {
        this.foodCalories = foodCalories;
    }

    public Float getFoodProteins() {
        return foodProteins;
    }

    public void setFoodProteins(Float foodProteins) {
        this.foodProteins = foodProteins;
    }

    public Float getFoodCarbs() {
        return foodCarbs;
    }

    public void setFoodCarbs(Float foodCarbs) {
        this.foodCarbs = foodCarbs;
    }

    public Float getFoodFats() {
        return foodFats;
    }

    public void setFoodFats(Float foodFats) {
        this.foodFats = foodFats;
    }

    public FoodPortionEnum getFoodPortion() {
        return foodPortion;
    }

    public void setFoodPortion(FoodPortionEnum foodPortion) {
        this.foodPortion = foodPortion;
    }

    public List<UserFood> getUserFood() {
        return userFood;
    }

    public void setUserFood(List<UserFood> userFood) {
        this.userFood = userFood;
    }

    
}
