package com.omarket.dto.usuario.cliente;

import java.time.LocalDate;

import com.omarket.dto.EnderecoDTO;
import com.omarket.entity.enum_.StatusUsuario;
import com.omarket.entity.enum_.TipoUsuario;

import jakarta.validation.Valid;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ClienteDTO {
    
    private Long id;
    
    private String nome;

    private String email;

    private String senha;

    private String telefone;

    private StatusUsuario status;

    private TipoUsuario tipoUsuario;

    @Valid
    private EnderecoDTO enderecoDTO;

    // ======= CAMPOS ESPECÍFICOS PARA CLIENTE    =======
    private String cpf;

    private LocalDate dataNascimento;

}
