package com.yuti.analytics.global.config;



import com.yuti.analytics.domain.accounts.repository.UserRepository;
import com.yuti.analytics.global.filter.JwtAuthorizationFilter;
import com.yuti.analytics.global.util.JWTUtil;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;

@Configuration
@EnableWebSecurity
@AllArgsConstructor
@RequiredArgsConstructor
public class SpringSecurity {

    @Bean
    public JWTUtil jwtUtil(UserRepository userRepository) {
        return new JWTUtil(userRepository);
    }



    private UserRepository userRepository;



    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
            .addFilterBefore(new JwtAuthorizationFilter(jwtUtil(userRepository)), UsernamePasswordAuthenticationFilter.class)
            .authorizeRequests()
            .antMatchers("/analytics/v1/accounts/**").permitAll()
            .and()
            .cors().configurationSource(corsConfigurationSource()).and()
            .csrf().disable()
            .formLogin().disable()
            .sessionManagement().sessionCreationPolicy(STATELESS)
            .and()
            .headers().frameOptions().disable().and().build();

    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost", "https://j7a502.p.ssafy.io"));
        configuration.setAllowedMethods(Arrays.asList("HEAD", "GET", "POST", "PUT", "DELETE"));
        configuration.setAllowCredentials(true);
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "TOKEN_ID", "X-Requested-With", "Authorization", "Content-Type", "Content-Length", "Cache-Control"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;

    }


    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
