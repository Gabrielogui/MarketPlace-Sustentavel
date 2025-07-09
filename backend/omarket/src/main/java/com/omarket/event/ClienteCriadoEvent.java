package com.omarket.event;

import com.omarket.entity.Usuario;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class ClienteCriadoEvent {
    private final Usuario cliente;
}
