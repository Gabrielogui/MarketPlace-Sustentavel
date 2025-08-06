package com.omarket.dto.favorito;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FavoritoRequestDTO {
    private Long id;

    @NotBlank(message = "O produto precisa ser passado!")
    private Long produtoId;

    @NotBlank(message = "O cliente precisa ser passado!")
    private Long clienteId;
}
