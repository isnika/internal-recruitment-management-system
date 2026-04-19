package backend.config;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.util.StringUtils;

public final class EnvFileLoader {

  private static final List<Path> CANDIDATE_PATHS = List.of(
      Path.of(".env"),
      Path.of("backend", ".env"));
  private static final Map<String, String> SPRING_PROPERTY_MAPPINGS = createSpringPropertyMappings();

  private EnvFileLoader() {
  }

  public static void loadIntoSystemProperties() {
    for (Path path : CANDIDATE_PATHS) {
      if (!Files.exists(path)) {
        continue;
      }

      try {
        for (String line : Files.readAllLines(path)) {
          parseLine(line);
        }
        return;
      } catch (IOException exception) {
        throw new IllegalStateException("Khong the doc file .env tai " + path.toAbsolutePath(), exception);
      }
    }
  }

  private static void parseLine(String rawLine) {
    String line = rawLine.trim();
    if (!StringUtils.hasText(line) || line.startsWith("#")) {
      return;
    }

    int separatorIndex = line.indexOf('=');
    if (separatorIndex <= 0) {
      return;
    }

    String key = line.substring(0, separatorIndex).trim();
    String value = line.substring(separatorIndex + 1).trim();

    if (!StringUtils.hasText(key) || System.getProperty(key) != null || System.getenv(key) != null) {
      return;
    }

    String resolvedValue = stripWrappingQuotes(value);
    System.setProperty(key, resolvedValue);

    String springPropertyKey = SPRING_PROPERTY_MAPPINGS.get(key);
    if (springPropertyKey != null && System.getProperty(springPropertyKey) == null) {
      System.setProperty(springPropertyKey, resolvedValue);
    }
  }

  private static String stripWrappingQuotes(String value) {
    if (value.length() >= 2) {
      char firstChar = value.charAt(0);
      char lastChar = value.charAt(value.length() - 1);
      if ((firstChar == '"' && lastChar == '"') || (firstChar == '\'' && lastChar == '\'')) {
        return value.substring(1, value.length() - 1);
      }
    }

    return value;
  }

  private static Map<String, String> createSpringPropertyMappings() {
    Map<String, String> mappings = new HashMap<>();
    mappings.put("DB_URL", "spring.datasource.url");
    mappings.put("DB_USERNAME", "spring.datasource.username");
    mappings.put("DB_PASSWORD", "spring.datasource.password");
    mappings.put("JWT_SECRET", "jwt.secret");
    mappings.put("JWT_EXPIRATION", "jwt.expiration");
    mappings.put("CLOUDINARY_CLOUD_NAME", "cloudinary.cloud-name");
    mappings.put("CLOUDINARY_API_KEY", "cloudinary.api-key");
    mappings.put("CLOUDINARY_API_SECRET", "cloudinary.api-secret");
    mappings.put("CLOUDINARY_CV_FOLDER", "cloudinary.cv-folder");
    mappings.put("CLOUDINARY_COMPANY_LOGO_FOLDER", "cloudinary.company-logo-folder");
    mappings.put("CLOUDINARY_CANDIDATE_AVATAR_FOLDER", "cloudinary.candidate-avatar-folder");
    return Map.copyOf(mappings);
  }
}
