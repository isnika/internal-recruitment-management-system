package backend.security;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import backend.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class AuthUser implements UserDetails {

  private final Long id;
  private final String email;
  private final String password;
  private final String status;
  private final Collection<? extends GrantedAuthority> authorities;

  public static AuthUser fromUser(User user) {
    return AuthUser.builder()
        .id(user.getId())
        .email(user.getEmail())
        .password(user.getPassword())
        .status(user.getStatus() != null ? user.getStatus().name() : null)
        .authorities(buildAuthorities(user))
        .build();
  }

  private static List<SimpleGrantedAuthority> buildAuthorities(User user) {
    if (user.getRole() == null) {
      return List.of();
    }
    return List.of(new SimpleGrantedAuthority("ROLE_" + user.getRole().name()));
  }

  @Override
  public String getUsername() {
    return email;
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return status == null || !status.equalsIgnoreCase("INACTIVE");
  }
}
