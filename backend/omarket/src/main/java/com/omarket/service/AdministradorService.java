package com.omarket.service;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.omarket.dto.UsuarioDTO;
import com.omarket.dto.UsuarioEditarDTO;
import com.omarket.entity.Usuario;
import com.omarket.entity.enum_.StatusUsuario;
import com.omarket.entity.enum_.TipoUsuario;
import com.omarket.repository.UsuarioRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdministradorService implements UsuarioService {
    // |=======| ATRIBUTOS |=======|
    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    // |=======| MÉTODOS |=======|

    // CADASTRAR:
    @Override
    public UsuarioDTO cadastrar(UsuarioDTO usuarioDTO){
        throw new UnsupportedOperationException("Administradores não podem se cadastrar diretamente.");
    }

    // BUSCAR:
    @Override
    @Transactional(readOnly = true)
    public UsuarioDTO buscar(Long id){
        Usuario usuario = usuarioRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuário não encontrado!"));
    
        return converterParaDTO(usuario);
    }

    @Transactional
    public UsuarioDTO inativar(Long id){
        Usuario usuario = usuarioRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuário não encontrado!"));

        // VERIFICAR SE O USUÁRIO JÁ ESTÁ INATIVO
        if(usuario.getStatus() == StatusUsuario.INATIVO){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Usuário já está inativo!");
        }

        // SETANDO O STATUS COMO INATIVO
        usuario.setStatus(StatusUsuario.INATIVO);

        return converterParaDTO(usuario);
    }

    @Override
    @Transactional
    public UsuarioDTO editar(Long id, UsuarioEditarDTO usuarioEditarDTO){ 
        Usuario usuario = usuarioRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuário não encontrado!"));

        // VERIFICAR SE O EMAIL JÁ ESTÁ CADASTRADO
        if(!usuario.getEmail().equals(usuarioEditarDTO.getEmail()) && 
            usuarioRepository.findByEmail(usuarioEditarDTO.getEmail()).isPresent()){
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email já cadastrado!");
        }

        // ATUALIZANDO OS DADOS DO USUÁRIO
        usuario.setNome(usuarioEditarDTO.getNome());
        usuario.setEmail(usuarioEditarDTO.getEmail());
        usuario.setTelefone(usuarioEditarDTO.getTelefone());

        if (usuarioEditarDTO.getSenha() != null && !usuarioEditarDTO.getSenha().trim().isEmpty()) {
            // Opcional: verificar se a nova senha é diferente da antiga
            if (!passwordEncoder.matches(usuarioEditarDTO.getSenha(), usuario.getSenha())) {
                usuario.setSenha(passwordEncoder.encode(usuarioEditarDTO.getSenha()));
            }
        }

        return converterParaDTO(usuario);
    }

    @Transactional
    public UsuarioDTO ativar(Long id) {
        Usuario usuario = usuarioRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuário não encontrado!"));

        // VERIFICAR SE O USUÁRIO JÁ ESTÁ ATIVO
        if (usuario.getStatus() == StatusUsuario.ATIVO) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Usuário já está ativo!");
        }

        // SETANDO O STATUS COMO ATIVO
        usuario.setStatus(StatusUsuario.ATIVO);

        return converterParaDTO(usuario);
    }

    @Override
    public UsuarioDTO converterParaDTO(Usuario usuario) {
        UsuarioDTO usuarioDTO = new UsuarioDTO();
        usuarioDTO.setId(usuario.getId());
        usuarioDTO.setNome(usuario.getNome());
        usuarioDTO.setEmail(usuario.getEmail());
        usuarioDTO.setTelefone(usuario.getTelefone());
        usuarioDTO.setStatus(usuario.getStatus());

        usuarioDTO.setTipoUsuario(TipoUsuario.ADMINISTRADOR);

        return usuarioDTO;
    }
}
