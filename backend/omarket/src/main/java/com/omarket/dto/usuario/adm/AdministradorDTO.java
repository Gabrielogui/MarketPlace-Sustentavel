package com.omarket.dto.usuario.adm;

import com.omarket.entity.enum_.StatusUsuario;
import com.omarket.entity.enum_.TipoUsuario;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdministradorDTO {

    private Long id;

    private String nome;

    private String email;

    private String senha;

    private String telefone;

    private StatusUsuario status;

    private TipoUsuario tipoUsuario;

}