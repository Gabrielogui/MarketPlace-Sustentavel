package com.omarket.dto.endereco;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EnderecoDTO {
    private Long id;

   // @Pattern(regexp="^\\d{5}-?\\d{3}$", message="CEP inválido")
    //@NotBlank(message = "CEP é obrigatório!")
    private String cep;

    private String complemento;

   // @NotNull(message = "Número é obrigatório!")
    private Integer numero;
}
