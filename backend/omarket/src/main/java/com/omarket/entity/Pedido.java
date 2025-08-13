package com.omarket.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.omarket.entity.enum_.StatusPedido;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "pedido")
@Getter
@Setter
public class Pedido {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name="status", nullable = false)
    private StatusPedido status;

    @Column(name="data_pedido", nullable = false)
    private LocalDateTime dataPedido;

    @Column(name="valor_total", precision = 19, scale = 4, nullable = false)
    private BigDecimal valorTotal;

    @Column(name="sub_total", precision = 19, scale = 4, nullable = false)
    private BigDecimal subTotal;

    @JoinColumn(name = "frete_id", nullable = true)
    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL, optional = true)
    private Frete frete;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "pagamento_id", nullable = true)
    private Pagamento pagamento;

    @OneToMany(mappedBy = "id.pedido", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ItemPedido> itens = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "endereco_id")
    private Endereco endereco;

    // CRIAR RELACIONAMENTO COM CLIENTE
    @ManyToOne
    @JoinColumn(name = "cliente_id", nullable = false)
    private Cliente cliente;
}
