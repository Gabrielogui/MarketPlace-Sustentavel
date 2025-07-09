package com.omarket.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AtualizarQuantidadeDTO {

    @NotNull
    private Integer quantidade;

}