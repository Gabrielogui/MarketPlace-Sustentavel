package com.omarket.dto.carrinho;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CarrinhoDTO {
    private Long clienteId;

    private LocalDateTime dataModificacao;

    @NotNull(message = "Subtotal é obrigatório!")
    @Digits(integer = 9, fraction = 4, message = "O subtotal deve ter no máximo 9 dígitos inteiros e 4 casas decimais.")
    @PositiveOrZero(message = "O subtotal deve ser um valor positivo ou nulo!")
    private BigDecimal subtotal = BigDecimal.ZERO;

    @NotNull(message = "A lista de itens é obrigatória!")
    private List<ItemCarrinhoDTO> itens;
}
