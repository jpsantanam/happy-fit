package com.happyfit.happyfit.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "userFood")
public class UserFood {
    @Id
    @Column(name = "id", unique = true)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer foodId;

    @ManyToOne
    @JoinColumn(name = "meal")
    @JsonIgnore
    private UserMeal meal;

    @ManyToOne
    @JoinColumn(name = "foodOption")
    @JsonIgnore
    private FoodOption foodOption;

    @Column(name = "quantity")
    private double quantity;

    public Integer getFoodId() {
        return foodId;
    }

    public void setFoodId(Integer foodId) {
        this.foodId = foodId;
    }

    public UserMeal getMeal() {
        return meal;
    }

    public void setMeal(UserMeal meal) {
        this.meal = meal;
    }

    public FoodOption getFoodOption() {
        return foodOption;
    }

    public void setFoodOption(FoodOption foodOption) {
        this.foodOption = foodOption;
    }

    public double getQuantity() {
        return quantity;
    }

    public void setQuantity(double quantity) {
        this.quantity = quantity;
    }

    
}
