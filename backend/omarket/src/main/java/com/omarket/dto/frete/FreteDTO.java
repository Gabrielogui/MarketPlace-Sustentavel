package com.omarket.dto.frete;

import java.math.BigDecimal;

import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FreteDTO {

    private Long id;

    @NotNull(message = "O nome da prestadora de serviço de frete é obrigatório!")
    private String nome;

    @Digits(integer = 9, fraction = 4, message = "O valor do frete deve ter no máximo 9 dígitos inteiros e 4 casas decimais.")
    @NotNull(message = "O valor do frete é obrigatório!")
    @PositiveOrZero(message = "O valor do frete deve ser um valor positivo ou nulo!")
    private BigDecimal valor;

    @NotNull(message = "O prazo de entrega é obrigatório!")
    @PositiveOrZero(message = "O prazo de entrega deve ser um valor positivo ou nulo!")
    private int prazoEntrega;

}
