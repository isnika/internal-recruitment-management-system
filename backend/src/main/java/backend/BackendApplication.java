package backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import backend.config.EnvFileLoader;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		EnvFileLoader.loadIntoSystemProperties();
		SpringApplication.run(BackendApplication.class, args);
	}

}
