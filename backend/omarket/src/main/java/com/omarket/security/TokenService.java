package com.omarket.security;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;

@Service
public class TokenService {

    @Value("${api.security.token.secret}")
    private String secret;

    public String generateToken(CustomUserDetails custonUserDetails) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            String token = JWT.create()
                    .withIssuer("Omarket API")
                    .withSubject(custonUserDetails.getUsername())
                    .withClaim("tipoUsuario", custonUserDetails.getUsuario().getTipoUsuario().toString())
                    .withExpiresAt(this.getExpirationDate())
                    .sign(algorithm);
            return token;
        } catch (JWTCreationException exception) {
            // Em caso de erro na criação do token, você pode lançar uma exceção ou lidar com o erro de outra forma
            throw new RuntimeException("Erro ao gerar o token JWT", exception);      
        }
    }

    public String validateToken(String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            return JWT.require(algorithm)
                    .withIssuer("Omarket API")
                    .build()
                    .verify(token)
                    .getSubject();
        } catch (JWTVerificationException exception) {
            return "";
        }
    }

    private Instant getExpirationDate() {
        return LocalDateTime.now().plusDays(1).toInstant(ZoneOffset.of("-03:00")); // Define a data de expiração do token para 1 dia a partir de agora
    }

}
