package com.omarket.dto;

import com.omarket.entity.enum_.TipoUsuario;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterDTO {

    private String email;
    private String password;
    private TipoUsuario tipoUsuario;
}
