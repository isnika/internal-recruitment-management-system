package backend.security;

import java.io.IOException;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

  private final JwtUtil jwtUtil;
  private final CustomUserDetailsService customUserDetailsService;
  private final AuthenticationEntryPoint customAuthenticationEntryPoint;

  @Override
  protected void doFilterInternal(
      HttpServletRequest request,
      HttpServletResponse response,
      FilterChain filterChain) throws ServletException, IOException {

    try {
      String authHeader = request.getHeader("Authorization");
      if (!StringUtils.hasText(authHeader) || !authHeader.startsWith("Bearer ")) {
        filterChain.doFilter(request, response);
        return;
      }

      String jwt = authHeader.substring(7);
      String username = jwtUtil.extractUsername(jwt);

      if (StringUtils.hasText(username) && SecurityContextHolder.getContext().getAuthentication() == null) {
        UserDetails userDetails = customUserDetailsService.loadUserByUsername(username);

        if (jwtUtil.isTokenValid(jwt, userDetails)) {
          UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
              userDetails,
              null,
              userDetails.getAuthorities());

          authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
          SecurityContextHolder.getContext().setAuthentication(authenticationToken);
        }
      }

      filterChain.doFilter(request, response);
    } catch (RuntimeException ex) {
      SecurityContextHolder.clearContext();
      customAuthenticationEntryPoint.commence(
          request,
          response,
          new BadCredentialsException(ex.getMessage(), ex));
    }
  }
}
