package com.omarket;

import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.omarket.security.SecurityFilter;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    
    private final SecurityFilter securityFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            // Regras de autorização
            .authorizeHttpRequests(auth -> auth
                // 1) Endpoints totalmente públicos (não exigem token)
                .requestMatchers(
                    HttpMethod.POST, "/usuario/cadastrar"
                ).permitAll()
                .requestMatchers(
                    HttpMethod.POST, "/auth/**"
                ).permitAll()
                .requestMatchers(
                    HttpMethod.GET, "/api/produtos/**"
                ).permitAll()

                // 2) Endpoints do administrador: só ROLE_ADMINISTRADOR
                // OBS: usando hasRole("ADMINISTRADOR") equivale a hasAuthority("ROLE_ADMINISTRADOR")
                .requestMatchers("/api/admin/**").hasRole("ADMINISTRADOR")

                // 3) Endpoints do fornecedor: só ROLE_FORNECEDOR
                .requestMatchers("/api/fornecedor/**").hasRole("FORNECEDOR")

                // 4) Endpoints do cliente: só ROLE_CLIENTE
                .requestMatchers("/api/cliente/**").hasRole("CLIENTE")
                .requestMatchers("/api/carrinhos/**").hasRole("CLIENTE")
                .requestMatchers("/api/pedidos/**").hasRole("CLIENTE")

                // 5) Quaisquer outras requisições exigem autenticação genérica
                .anyRequest().authenticated()               
            )
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .csrf(csrf -> csrf.disable())
            .sessionManagement(session -> session
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS) // Configura a política de sessão como stateless
            )
            .addFilterBefore(securityFilter, UsernamePasswordAuthenticationFilter.class);
        
        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("*")); // Ou List.of("*") no Java 11+
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE, PATCH", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(false); // Mude para true se usar credenciais
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        // força a criação de um salt único e um custo de trabalho configurável
        return new BCryptPasswordEncoder();
    }

}