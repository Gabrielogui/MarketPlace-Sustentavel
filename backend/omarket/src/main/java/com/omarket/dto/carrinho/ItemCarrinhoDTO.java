package com.omarket.dto.carrinho;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ItemCarrinhoDTO {

    private Long carrinhoId;

    @NotNull(message = "O ID do produto é obrigatório!")
    private Long produtoId;

    @Min(value = 1, message = "A quantidade mínima é 1")
    private Integer quantidade;
}
