package com.happyfit.happyfit.models;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "userMeal")
public class UserMeal {
    @Id
    @Column(name = "id", unique = true)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "diet")
    @JsonIgnore
    private UserDiet diet;

    // @ManyToOne
    // @JoinColumn(name = "idDiario")
    // private Diario diario;

    @Column(length = 100, nullable = false)
    private String name;

    @OneToMany(mappedBy = "meal", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<UserFood> userFood = new ArrayList<>();

    public Integer getMealId() {
        return id;
    }

    public void setMealId(Integer mealId) {
        this.id = mealId;
    }

    public UserDiet getDiet() {
        return diet;
    }

    public void setDiet(UserDiet userDiet) {
        this.diet = userDiet;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<UserFood> getUserFood() {
        return userFood;
    }

    public void setUserFood(List<UserFood> userFood) {
        this.userFood = userFood;
    }

    
}
