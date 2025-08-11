package com.omarket.dto.usuario.auth;

import com.omarket.entity.enum_.TipoUsuario;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class AuthResponseDTO {

    private String token;
    private TipoUsuario tipoUsuario;
    private Long id;

}
