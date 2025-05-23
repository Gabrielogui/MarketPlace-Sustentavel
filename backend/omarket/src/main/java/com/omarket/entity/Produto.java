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
@Table(name = "produto")
@Getter
@Setter
public class Produto {
    // |=======| ATRIBUTOS |======|
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String descricao;
    private int estoque;

    @Column(name="preco", precision = 19, scale = 4, nullable = false)
    private BigDecimal preco;

    // FAZER RELACIONAMENTO COM CATEGORIA
    // FAZER RELACIONAMENTO COM FORNECEDOR

}
