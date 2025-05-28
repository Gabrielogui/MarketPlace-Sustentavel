package com.omarket.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CategoriaDTO {
    @NotBlank(message = "O nome da categoria deve ser preenchido!")
    private String nome;
    @NotBlank(message = "A descrição deve ser preenchida!")
    private String descricao;
}
