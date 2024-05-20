package com.happyfit.happyfit.models.dto;

import jakarta.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class AddUserProfileDto {

    @NotNull
    private Float weight;

    @NotNull
    private Float height;

    @NotNull
    private Integer age;

    @NotNull
    private Integer gender;

    @NotNull
    private Float hip;

    @NotNull
    private Float waist;

    @NotNull
    private Float neck;

    @NotNull
    private Boolean smokes;

    @NotNull
    private Boolean drinks;

    @NotNull
    private Integer currentGoal;

    @NotNull
    private Boolean hadSurgeries;

    @NotNull
    private Boolean hasDiseases;

    @NotNull
    private Boolean hasPain;

    @NotNull
    private Float pal;

}