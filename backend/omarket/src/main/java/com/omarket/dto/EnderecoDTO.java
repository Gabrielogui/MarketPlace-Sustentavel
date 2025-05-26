package com.omarket.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EnderecoDTO {
    
    @NotBlank(message = "CEP é obrigatório!")
    private String cep;

    private String complemento;

    @NotNull(message = "Número é obrigatório!")
    private Integer numero;
}
