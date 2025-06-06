package com.omarket.service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.omarket.entity.Usuario;
import com.omarket.repository.UsuarioRepository;
import com.omarket.security.CustomUserDetails;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService implements UserDetailsService {

    private final UsuarioRepository usuarioRepository;

    // Implementação do método loadUserByUsername
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Aqui você deve buscar o usuário no banco de dados usando o username
        // e retornar um objeto UserDetails correspondente.
        // Exemplo:
        Usuario usuario = usuarioRepository.findByEmail(username).orElseThrow(() -> 
            new UsernameNotFoundException("Usuário não encontrado: " + username)
        );
        return new CustomUserDetails(usuario);
    }

}
