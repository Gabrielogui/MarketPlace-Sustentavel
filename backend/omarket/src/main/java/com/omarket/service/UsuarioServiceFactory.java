package com.omarket.service;

import org.springframework.stereotype.Component;

import com.omarket.entity.enum_.TipoUsuario;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class UsuarioServiceFactory {
    private final ClienteService clienteService;
    private final FornecedorService fornecedorService;
    private final AdministradorService administradorService;

    public UsuarioService getUsuarioService(TipoUsuario tipoUsuario){
        switch (tipoUsuario) {
            case CLIENTE:
                return clienteService;
            case FORNECEDOR:
                return fornecedorService;
            case ADMINISTRADOR:
                return administradorService;
            default:
                throw new IllegalArgumentException("Tipo de usuário desconhecido: " + tipoUsuario);
        }
    }
}
