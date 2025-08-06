package com.omarket.dto.favorito;

import com.omarket.dto.ProdutoDTO;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FavoritoResponseDTO {
    private Long id;

    @Valid
    private ProdutoDTO produtoDTO;

    @NotBlank(message = "O cliente precisa ser passado!")
    private Long clienteId;
}
