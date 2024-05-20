package com.happyfit.happyfit.models;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data

@Entity
@Table(name = "userDiet")
public class UserDiet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private Float totalCalories;

    @Column(nullable = false)
    private Float totalCarbs;

    @Column(nullable = false)
    private Float totalProteins;

    @Column(nullable = false)
    private Float totalFats;

    @OneToOne(mappedBy = "diet")
    @JsonProperty(access = Access.WRITE_ONLY)
    private User user;

    @OneToMany(mappedBy = "diet")
    @JsonManagedReference
    private List<UserMeal> meals = new ArrayList<UserMeal>();
}