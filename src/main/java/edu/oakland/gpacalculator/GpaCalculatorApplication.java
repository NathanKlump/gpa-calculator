package edu.oakland.gpacalculator;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.apereo.portal.soffit.renderer.SoffitApplication;
import org.springframework.context.annotation.ComponentScan;

@SoffitApplication
@SpringBootApplication
@ComponentScan({"edu.oakland.soffit.auth", "edu.oakland.gpacalculator"})
public class GpaCalculatorApplication {

	public static void main(String[] args) {
		SpringApplication.run(GpaCalculatorApplication.class, args);
	}

}
