package com.omarket.service;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.omarket.dto.EnderecoDTO;
import com.omarket.dto.UsuarioDTO;
import com.omarket.entity.Endereco;
import com.omarket.entity.Fornecedor;
import com.omarket.entity.Usuario;
import com.omarket.entity.enum_.StatusUsuario;
import com.omarket.entity.enum_.TipoUsuario;
import com.omarket.repository.UsuarioRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FornecedorService implements UsuarioService {
    // |=======| ATRIBUTOS |=======|
    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    // |=======| MÉTODOS |=======|

    // CADASTRAR:
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

    // BUSCAR:
    @Override
    @Transactional(readOnly = true)
    public UsuarioDTO buscar(Long id){
        Usuario usuario = usuarioRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuário não encontrado!"));
    
        return converterParaDTO(usuario);
    }

    // INATIVAR:
    @Override
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

    // EDITAR:
    @Override
    @Transactional
    public UsuarioDTO editar(Long id, UsuarioDTO usuarioDTO){
        Usuario usuario = usuarioRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuário não encontrado!"));

        // VERIFICAR SE O EMAIL JÁ ESTÁ CADASTRADO
        if(!usuario.getEmail().equals(usuarioDTO.getEmail()) && 
            usuarioRepository.findByEmail(usuarioDTO.getEmail()).isPresent()){
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email já cadastrado!");
        }

        Fornecedor fornecedor = (Fornecedor) usuario;
        // ATUALIZANDO O ENDEREÇO SE EXISTIR
        if (usuarioDTO.getEnderecoDTO() != null) {
            Endereco endereco = new Endereco();
            endereco.setCep(usuarioDTO.getEnderecoDTO().getCep());
            endereco.setComplemento(usuarioDTO.getEnderecoDTO().getComplemento());
            endereco.setNumero(usuarioDTO.getEnderecoDTO().getNumero());
            fornecedor.setEndereco(endereco);
            usuario = fornecedor;
        }

        // ATUALIZANDO OS DADOS DO USUÁRIO
        usuario.setNome(usuarioDTO.getNome());
        usuario.setEmail(usuarioDTO.getEmail());
        usuario.setTelefone(usuarioDTO.getTelefone());

        // ATUALIZANDO A SENHA SE FOR DIFERENTE
        if (!passwordEncoder.matches(usuarioDTO.getSenha(), usuario.getSenha())) {
            usuario.setSenha(passwordEncoder.encode(usuarioDTO.getSenha()));
        }

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

        Fornecedor fornecedor = (Fornecedor) usuario;
        usuarioDTO.setCnpj(fornecedor.getCnpj());
        usuarioDTO.setTipoUsuario(TipoUsuario.FORNECEDOR);

        if(fornecedor.getEndereco() != null){
            EnderecoDTO enderecoDTO = new EnderecoDTO();
            Endereco endereco = fornecedor.getEndereco();
            enderecoDTO.setCep(endereco.getCep());
            enderecoDTO.setComplemento(endereco.getComplemento());
            enderecoDTO.setId(endereco.getId());
            enderecoDTO.setNumero(endereco.getNumero());
            usuarioDTO.setEnderecoDTO(enderecoDTO);
        }

        return usuarioDTO;
    }
}
