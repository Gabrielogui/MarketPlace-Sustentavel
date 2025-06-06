package com.omarket.security;

import java.util.Collection;
import java.util.Collections;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.omarket.entity.Usuario;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class CustomUserDetails implements UserDetails{

    private final Usuario usuario;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(
            new SimpleGrantedAuthority(usuario.getTipoUsuario().toString())
        ); // Retorna uma lista vazia de autoridades
    }

    @Override
    public String getPassword() {
        return usuario.getSenha(); // Retorna a senha do usuário   
    }

    @Override
    public String getUsername() {
        return usuario.getEmail(); // Retorna o email do usuário como nome de usuário
    }

    @Override
    public boolean isAccountNonExpired() {
        return true; // Indica que a conta não está expirada
    }

    @Override
    public boolean isAccountNonLocked() {
        return usuario.getStatus().equals("ATIVO"); // Indica que a conta não está bloqueada
    }
    
    @Override
    public boolean isCredentialsNonExpired() {
        return true; // Indica que as credenciais não estão expiradas
    }

    @Override
    public boolean isEnabled() {
        return usuario.getStatus().equals("ATIVO"); // Indica que a conta está habilitada
    }

}
