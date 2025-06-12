package com.omarket.service;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.omarket.dto.EnderecoDTO;
import com.omarket.dto.UsuarioDTO;
import com.omarket.entity.Cliente;
import com.omarket.entity.Endereco;
import com.omarket.entity.Usuario;
import com.omarket.entity.enum_.StatusUsuario;
import com.omarket.entity.enum_.TipoUsuario;
import com.omarket.repository.UsuarioRepository;

public class ClienteService implements UsuarioService {
    // |=======| ATRIBUTOS |=======|
    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    // |  
    @Override
    @Transactional
    public UsuarioDTO cadastrar(UsuarioDTO usuarioDTO){
        // VERIFICAR SE JÁ  EXISTE EMAIL CADASTRADO
        if(usuarioRepository.findByEmail(usuarioDTO.getEmail()).isPresent()){ 
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email já cadastrado!");
        }

        Usuario usuario;
        Cliente cliente = new Cliente();
        
        // VERIFICAR SE O CPF JÁ ESTÁ CADASTRADO
        cliente.setCpf(usuarioDTO.getCpf());

        cliente.setDataNascimento(usuarioDTO.getDataNascimento());
        cliente.setStatus(StatusUsuario.ATIVO);

        usuario = cliente;

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

    @Override
    @Transactional
    public UsuarioDTO converterParaDTO(Usuario usuario){
        UsuarioDTO usuarioDTO = new UsuarioDTO();
        usuarioDTO.setId(usuario.getId());
        usuarioDTO.setNome(usuario.getNome());
        usuarioDTO.setEmail(usuario.getEmail());
        usuarioDTO.setTelefone(usuario.getTelefone());
        usuarioDTO.setStatus(usuario.getStatus());

        Cliente cliente = (Cliente) usuario;
        usuarioDTO.setCpf(cliente.getCpf());
        usuarioDTO.setDataNascimento(cliente.getDataNascimento());
        usuarioDTO.setTipoUsuario(TipoUsuario.CLIENTE);

        if(cliente.getEndereco() != null){
            EnderecoDTO enderecoDTO = new EnderecoDTO();
            Endereco endereco = cliente.getEndereco();
            enderecoDTO.setCep(endereco.getCep());
            enderecoDTO.setComplemento(endereco.getComplemento());
            enderecoDTO.setId(endereco.getId());
            enderecoDTO.setNumero(endereco.getNumero());
            usuarioDTO.setEnderecoDTO(enderecoDTO);
        } 

        return usuarioDTO;
    }
}
