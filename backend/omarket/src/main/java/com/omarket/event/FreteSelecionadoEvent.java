package com.omarket.event;

import com.omarket.entity.Frete;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class FreteSelecionadoEvent {
    private final Frete frete;
    private final Long pedidoId;
}