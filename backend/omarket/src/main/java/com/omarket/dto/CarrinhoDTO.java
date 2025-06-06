package com.omarket.dto;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.cglib.core.Local;

import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CarrinhoDTO {
    private Long clienteId;

    private Local dataModificacao;

    @NotNull(message = "Subtotal é obrigatório!")
    @Digits(integer = 9, fraction = 4, message = "O subtotal deve ter no máximo 9 dígitos inteiros e 4 casas decimais.")
    @Positive(message = "O subtotal deve ser um valor positivo!")
    private BigDecimal subtotal = BigDecimal.ZERO;

    @NotNull(message = "A lista de itens é obrigatória!")
    private List<ItemCarrinhoDTO> itens;
}
