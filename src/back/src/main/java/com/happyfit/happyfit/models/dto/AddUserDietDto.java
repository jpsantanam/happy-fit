package com.happyfit.happyfit.models.dto;

import jakarta.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class AddUserDietDto {

    @NotNull
    private Float totalCalories;

    @NotNull
    private Float totalProteins;

    @NotNull
    private Float totalCarbs;

    @NotNull
    private Float totalFats;
}