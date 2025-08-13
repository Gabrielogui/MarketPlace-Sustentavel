package com.omarket.service;

import org.hibernate.Hibernate;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.omarket.dto.endereco.EnderecoDTO;
import com.omarket.dto.usuario.UsuarioDTO;
import com.omarket.dto.usuario.UsuarioEditarDTO;
import com.omarket.dto.usuario.cliente.ClienteDTO;
import com.omarket.dto.usuario.fornecedor.FornecedorDTO;
import com.omarket.entity.Cliente;
import com.omarket.entity.Endereco;
import com.omarket.entity.Fornecedor;
import com.omarket.entity.Usuario;
import com.omarket.entity.enum_.StatusUsuario;
import com.omarket.entity.enum_.TipoUsuario;
import com.omarket.event.ClienteCriadoEvent;
import com.omarket.repository.EnderecoRepository;
import com.omarket.repository.UsuarioRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ClienteService implements UsuarioService {
    // |=======| ATRIBUTOS |=======|
    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final ApplicationEventPublisher eventPublisher;
    private final EnderecoRepository enderecoRepository;

    // |=======| MÉTODOS |=======|
    
    // CADASTRAR
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

        eventPublisher.publishEvent(new ClienteCriadoEvent(usuario));
        
        // PREPARAR RESPOSTA DTO PARA O CONTROLLER
        return converterParaDTO(usuario);
    }

    //BUSCAR:
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
    public UsuarioDTO editar(Long id, UsuarioEditarDTO usuarioEditarDTO) {
        Usuario usuario = usuarioRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuário não encontrado!"));

        // Lógica de atualização parcial
        if (usuarioEditarDTO.getNome() != null) {
            usuario.setNome(usuarioEditarDTO.getNome());
        }
        if (usuarioEditarDTO.getEmail() != null && !usuario.getEmail().equals(usuarioEditarDTO.getEmail())) {
            if (usuarioRepository.findByEmail(usuarioEditarDTO.getEmail()).isPresent()) {
                throw new ResponseStatusException(HttpStatus.CONFLICT, "Email já cadastrado!");
            }
            usuario.setEmail(usuarioEditarDTO.getEmail());
        }
        if (usuarioEditarDTO.getTelefone() != null) {
            usuario.setTelefone(usuarioEditarDTO.getTelefone());
        }
        if (usuarioEditarDTO.getSenha() != null && !usuarioEditarDTO.getSenha().trim().isEmpty()) {
            usuario.setSenha(passwordEncoder.encode(usuarioEditarDTO.getSenha()));
        }

        // Lógica para associar/atualizar endereço
        if (usuario instanceof Cliente && usuarioEditarDTO.getEnderecoDTO() != null) {
            Cliente cliente = (Cliente) usuario;
            Long enderecoId = usuarioEditarDTO.getEnderecoDTO().getId();
            
            if (enderecoId != null) {
                // Busca a entidade Endereco para garantir que ela exista e esteja gerenciada pelo JPA
                Endereco endereco = enderecoRepository.findById(enderecoId)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Endereço com ID " + enderecoId + " não encontrado."));
                
                // Associa a entidade completa e gerenciada
                cliente.setEndereco(endereco);
            }
        }
        
        // O Spring/JPA salvará as alterações na entidade 'usuario' ao final da transação.
        return converterParaDTO(usuario);
    }

    @Override
    public UsuarioDTO ativar(Long id) {
        // CORRETO: Lança uma exceção para proibir esta operação.
        throw new UnsupportedOperationException("A operação 'ativar' não é suportada para o serviço de Cliente.");
    }

    // CONVERTER PARA DTO
    @Override
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

        if(cliente.getEndereco() != null) {
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

    public ClienteDTO converterParaClienteDTO(Cliente cliente) {
        ClienteDTO ClienteDTO = new ClienteDTO();
        ClienteDTO.setId(cliente.getId());
        ClienteDTO.setNome(cliente.getNome());
        ClienteDTO.setEmail(cliente.getEmail());
        ClienteDTO.setTelefone(cliente.getTelefone());
        ClienteDTO.setStatus(cliente.getStatus());
        ClienteDTO.setCpf(cliente.getCpf());
        ClienteDTO.setTipoUsuario(TipoUsuario.CLIENTE);
        ClienteDTO.setDataNascimento(cliente.getDataNascimento());

        if (cliente.getEndereco() != null) {
            EnderecoDTO enderecoDTO = new EnderecoDTO();
            Endereco endereco = cliente.getEndereco();
            enderecoDTO.setId(endereco.getId());
            enderecoDTO.setCep(endereco.getCep());
            enderecoDTO.setComplemento(endereco.getComplemento());
            enderecoDTO.setNumero(endereco.getNumero());
            ClienteDTO.setEnderecoDTO(enderecoDTO);
        }

        return ClienteDTO;
    }
}
