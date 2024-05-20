package com.happyfit.happyfit.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data

@Entity
@Table(name = "userGoals")
public class UserGoals {
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

    @OneToOne(mappedBy = "goals")
    @JsonProperty(access = Access.WRITE_ONLY)
    private User user;
}