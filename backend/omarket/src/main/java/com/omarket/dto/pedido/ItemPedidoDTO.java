package com.omarket.dto.pedido;

import java.math.BigDecimal;

import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ItemPedidoDTO {

    @NotNull(message = "O ID do pedido é obrigatório!")
    private Long pedidoId;

    @NotNull(message = "O ID do produto é obrigatório!")
    private Long produtoId;

    @NotNull(message = "A quantidade é obrigatória!")
    @PositiveOrZero(message = "A quantidade deve ser um valor positivo ou nulo!")
    private Integer quantidade;

    @PositiveOrZero(message = "O preço unitário deve ser um valor positivo ou nulo!")
    @NotNull(message = "O preço unitário é obrigatório!")
    @Digits(integer = 9, fraction = 4, message = "O preço unitário deve ter no máximo 9 dígitos inteiros e 4 casas decimais.")
    private BigDecimal precoUnitario = BigDecimal.ZERO;

}
