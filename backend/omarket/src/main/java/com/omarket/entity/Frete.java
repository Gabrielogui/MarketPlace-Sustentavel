package com.omarket.entity;

import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "frete")
@Getter
@Setter
public class Frete {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome", nullable = false)
    private String nome; // Ex: "Sedex", "PAC"
    
    @Column(name = "valor", precision = 19, scale = 4, nullable = false)
    private BigDecimal valor; // Valor do frete
    
    @Column(name = "prazo_entrega", nullable = false)
    private int prazoEntrega; // Prazo de entrega estimado

}
