package com.happyfit.happyfit;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class HappyfitApplication {

	public static void main(String[] args) {
		SpringApplication.run(HappyfitApplication.class, args);
	}

}