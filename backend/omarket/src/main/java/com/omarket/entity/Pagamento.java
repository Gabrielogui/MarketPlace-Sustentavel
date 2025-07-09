package com.omarket.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "pagamento")
@Getter
@Setter
public class Pagamento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String metodo;

    @Column(name="valor_pago", precision = 19, scale = 4, nullable = false)
    private BigDecimal valorPago;

    @Column(name="data_pagamento", nullable = false)
    private LocalDateTime dataPagamento;

    @Column(name = "mercado_pago_id", unique = true)
    private Long mercadoPagoId; // ID externo do Mercado Pago

}
