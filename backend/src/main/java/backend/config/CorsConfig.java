package backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {
  @Bean
  public WebMvcConfigurer webMvcConfigurer() {
    return new WebMvcConfigurer() {
      @Override
      public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // tất cả endpoint trong project đều được áp dụng CORS
            .allowedMethods("GET", "PUT", "POST", "DELETE") // cho phép các method này
            .allowedOrigins("*"); // tất cả domain front end đều gọi được API từ backend
      }
    };
  }
}
