package com.omarket.service;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.omarket.dto.UsuarioDTO;
import com.omarket.entity.Fornecedor;
import com.omarket.entity.Usuario;
import com.omarket.entity.enum_.StatusUsuario;
import com.omarket.repository.UsuarioRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FornecedorService implements UsuarioService {
    // |=======| ATRIBUTOS |=======|
    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    // |=======| MÉTODOS |=======|

    // CADASTRAR
    @Override
    @Transactional
    public UsuarioDTO cadastrar(UsuarioDTO usuarioDTO){
        // CONFERIR SE JÁ EXISTE EMAIL CADASTRADO
        if(usuarioRepository.findByEmail(usuarioDTO.getEmail()).isPresent()){ 
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email já cadastrado!");
        }

        Usuario usuario;
        Fornecedor fornecedor = new Fornecedor();

        // VERIFICAR SE O CNPJ JÁ ESTÁ CADASTRADO
        fornecedor.setCnpj(usuarioDTO.getCnpj());
        
        // INICIANDO STATUS COMO INATIVO
        fornecedor.setStatus(StatusUsuario.INATIVO);
        usuario = fornecedor;

        // ATRIBUINDO OS ATRIBUTOS EM COMUM
        usuario.setNome(usuarioDTO.getNome());
        usuario.setEmail(usuarioDTO.getEmail());
        usuario.setTelefone(usuarioDTO.getTelefone());

        // CRIPTOGRAFANDO SENHA
        String senhaString = usuarioDTO.getSenha();
        String senhaHash = passwordEncoder.encode(senhaString);
        usuario.setSenha(senhaHash);
        

        // SALVANDO USUÁRIO NO BANCO DE DADOS
        usuarioRepository.save(usuario);

        // PREPARAR RESPOSTA DTO PARA O CONTROLLER
        
        return converterParaDTO(usuario);
    }
}
