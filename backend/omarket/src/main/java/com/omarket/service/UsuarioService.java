package com.omarket.service;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.omarket.dto.UsuarioDTO;
import com.omarket.entity.Administrador;
import com.omarket.entity.Cliente;
import com.omarket.entity.Fornecedor;
import com.omarket.entity.Usuario;
import com.omarket.repository.UsuarioRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UsuarioService {
    // |=======| ATRIBUTOS |=======|
    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    // |=======| MÉTODOS |=======|

    // CADASTRAR:
    @Transactional
    public UsuarioDTO cadastrar(UsuarioDTO usuarioDTO){
        // CONFERIR SE JÁ EXISTE EMAIL CADASTRADO
        if(usuarioRepository.findByEmail(usuarioDTO.getEmail()).isPresent()){
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email já cadastrado!");
        }

        Usuario usuario;

        // ATRIBUINDO OS ATRIBUTOS ESPECÍFICOS
        switch (usuarioDTO.getTipoConta()) {
            case CLIENTE: // REVER A QUESTÃO DO ENDEREÇO
                Cliente cliente = new Cliente();
                cliente.setCpf(usuarioDTO.getCpf());
                cliente.setDataNascimento(usuarioDTO.getDataNascimento());
                cliente.setStatus("ATIVO");
                usuario = cliente;
                break;
        
            case FORNECEDOR:
                Fornecedor fornecedor = new Fornecedor();
                fornecedor.setCnpj(usuarioDTO.getCnpj());
                fornecedor.setStatus("INATIVO");
                usuario = fornecedor;
                break;

            case ADMINISTRADOR:
                Administrador administrador = new Administrador(); // COLOCAR ERRO
                usuario = administrador;
                break;

            default:
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Tipo de conta inválido!");
        }

        // ATRIBUINDO OS ATRIBUTOS EM COMUM
        usuario.setNome(usuarioDTO.getNome());
        usuario.setEmail(usuarioDTO.getEmail());
        usuario.setTelefone(usuarioDTO.getTelefone());

        String senhaString = usuarioDTO.getSenha();
        String senhaHash = passwordEncoder.encode(senhaString);
        usuario.setSenha(senhaHash);
        

        // SALVANDO USUÁRIO NO BANCO DE DADOS
        usuarioRepository.save(usuario);

        // PREPARAR RESPOSTA DTO PARA O CONTROLLER
        UsuarioDTO usuarioDTORetorno = new UsuarioDTO();

        usuarioDTORetorno.setId(usuario.getId());
        usuarioDTORetorno.setNome(usuario.getNome());
        usuarioDTORetorno.setEmail(usuario.getEmail());
        usuarioDTORetorno.setTelefone(usuario.getTelefone());
        usuarioDTORetorno.setStatus(usuario.getStatus());
        usuarioDTORetorno.setTipoConta(usuarioDTO.getTipoConta());

        switch (usuarioDTO.getTipoConta()) {
            case CLIENTE: // REVER A QUESTÃO DO ENDEREÇO
                usuarioDTORetorno.setCpf(((Cliente)usuario).getCpf());
                usuarioDTORetorno.setDataNascimento(((Cliente)usuario).getDataNascimento());
                break;
        
            case FORNECEDOR:
                usuarioDTORetorno.setCnpj(((Fornecedor)usuario).getCnpj());
                break;

            case ADMINISTRADOR:
                // COLOCAR ERRO
                break;

            default:
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Tipo de conta inválido!");
        }

        return usuarioDTORetorno;
    }
}
