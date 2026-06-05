package backend.Enum;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum ApplicationStatus {
  APPLIED,
  PENDING,
  REVIEWING,
  SHORTLISTED,
  REJECTED,
  WITHDRAWN,
  INTERVIEWING,
  ACCEPTED,
  HIRED;

  @JsonValue
  public String toValue() {
    return name().toLowerCase();
  }

  @JsonCreator
  public static ApplicationStatus fromValue(String value) {
    if (value == null) {
      return null;
    }

    return ApplicationStatus.valueOf(value.trim().toUpperCase());
  }
}
