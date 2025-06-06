package com.omarket.entity.enum_;

public enum TipoUsuario {

    ADMINISTRADOR("ADMINISTRADOR"),
    CLIENTE("CLIENTE"),
    FORNECEDOR("FORNECEDOR");

    private final String tipo;

    TipoUsuario(String tipo) {
        this.tipo = tipo;
    }

    public String getTipo() {
        return tipo;
    }
}
