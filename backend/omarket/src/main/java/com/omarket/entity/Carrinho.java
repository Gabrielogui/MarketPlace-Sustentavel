package com.omarket.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "carrinho")
@Getter
@Setter
public class Carrinho {
    @Id
    @Column(name = "cliente_id")
    private Long id;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @MapsId
    @JoinColumn(name = "cliente_id", nullable = false)
    private Cliente cliente;

    private LocalDateTime dataModificacao;

    @Column(name="subtotal", precision = 19, scale = 4, nullable = false)
    private BigDecimal subtotal = BigDecimal.ZERO;

    @OneToMany(mappedBy = "id.carrinho",
               cascade = CascadeType.ALL,
               orphanRemoval = true)
    private List<ItemCarrinho> itens = new ArrayList<>();
}
