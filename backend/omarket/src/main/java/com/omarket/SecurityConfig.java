package com.omarket;

import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
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
@EnableMethodSecurity
public class SecurityConfig {
    
    private final SecurityFilter securityFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(auth -> auth
                // =================================================================
                // 1) Endpoints Totalmente Públicos (Regras mais específicas primeiro)
                // =================================================================
                .requestMatchers(HttpMethod.POST, "/auth/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/produto/listar").permitAll()   // Regra específica para listar
                .requestMatchers(HttpMethod.GET, "/produto/{id}").permitAll()    // Regra específica para ver um produto
                .requestMatchers("/error").permitAll()
                
                // =================================================================
                // 2) Endpoints do Administrador
                // =================================================================
                .requestMatchers("/administrador/**").hasRole("ADMINISTRADOR")
                .requestMatchers("/categoria/**").hasRole("ADMINISTRADOR") // Corrigido para ser acessível apenas por ADMIN
                
                // =================================================================
                // 3) Endpoints do Fornecedor (Regra geral para produto vem DEPOIS das públicas)
                // =================================================================
                .requestMatchers("/fornecedor/**").hasRole("FORNECEDOR")
                .requestMatchers("/produto/**").hasRole("FORNECEDOR") // Restringe POST, PUT, etc. para FORNECEDOR
                
                // =================================================================
                // 4) Endpoints do Cliente
                // =================================================================
                .requestMatchers("/cliente/**").hasRole("CLIENTE")
                .requestMatchers("/carrinho/**").hasRole("CLIENTE")
                .requestMatchers("/pedidos/**").hasRole("CLIENTE")
                .requestMatchers("/frete/**").hasRole("CLIENTE")

                // =================================================================
                // 5) Qualquer outra requisição exige autenticação
                // =================================================================
                .anyRequest().authenticated()
            )
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .csrf(csrf -> csrf.disable())
            .sessionManagement(session -> session
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
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
        /* Exemplo para produção
        configuration.setAllowedOrigins(Arrays.asList(
            "https://www.meu-omarket.com", 
            "https://app.meu-omarket.com"
        )); */ 
        configuration.setAllowedOrigins(Arrays.asList("*")); // Ou List.of("*") no Java 11+
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));
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