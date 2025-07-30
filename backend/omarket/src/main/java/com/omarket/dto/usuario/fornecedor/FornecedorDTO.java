package com.omarket.dto.usuario.fornecedor;

import com.omarket.dto.EnderecoDTO;
import com.omarket.entity.enum_.StatusUsuario;
import com.omarket.entity.enum_.TipoUsuario;

import jakarta.validation.Valid;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FornecedorDTO {

    private Long id;
    
    private String nome;

    private String email;

    private String senha;

    private String telefone;

    private StatusUsuario status;

    private TipoUsuario tipoUsuario;

    @Valid
    private EnderecoDTO enderecoDTO;

    // ======= CAMPOS ESPECÍFICOS PARA FORNECEDOR =======
    private String cnpj;

}
