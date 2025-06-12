package com.omarket.controller;

import java.net.URI;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.omarket.dto.AuthRequestDTO;
import com.omarket.dto.AuthResponseDTO;
import com.omarket.dto.UsuarioDTO;
import com.omarket.security.CustomUserDetails;
import com.omarket.security.TokenService;
import com.omarket.service.UsuarioService2;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UsuarioService2 usuarioService;
    private final TokenService tokenService;


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Valid AuthRequestDTO loginRequest) {
        var usernamePassword = new UsernamePasswordAuthenticationToken(
            loginRequest.getEmail(), 
            loginRequest.getSenha()
        );
        var auth = authenticationManager.authenticate(usernamePassword);

        var token = tokenService.generateToken((CustomUserDetails) auth.getPrincipal());

        return ResponseEntity.ok(new AuthResponseDTO(token));
    }

    @PostMapping("/cadastrar")
    public ResponseEntity<UsuarioDTO> cadastrar(@RequestBody @Validated UsuarioDTO usuarioDTO){
        UsuarioDTO usuarioNovo = usuarioService.cadastrar(usuarioDTO);

        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
            .path("/{id}")
            .buildAndExpand(usuarioNovo.getId())
            .toUri();

        return ResponseEntity.created(location).body(usuarioNovo);
    }

}
