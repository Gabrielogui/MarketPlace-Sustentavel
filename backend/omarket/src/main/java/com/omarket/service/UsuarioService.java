package com.omarket.service;

import com.omarket.dto.UsuarioDTO;
import com.omarket.entity.Usuario;

public interface UsuarioService {
    UsuarioDTO cadastrar(UsuarioDTO usuarioDTO);
    UsuarioDTO buscar(Long id);
    UsuarioDTO inativar(Long id);
    UsuarioDTO editar(Long id, UsuarioDTO usuarioDTO);
    UsuarioDTO ativar(Long id); // <-- CORRETO: Mantenha aqui
    UsuarioDTO converterParaDTO(Usuario usuario);

}
