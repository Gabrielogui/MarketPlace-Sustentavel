package com.omarket.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
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

    private String status;

    @Column(name="data_pedido", nullable = false)
    private LocalDateTime dataPedido;

    @Column(name="valor_total", precision = 19, scale = 4, nullable = false)
    private BigDecimal valorTotal;

    @Column(name="frete", precision = 19, scale = 4, nullable = false)
    private BigDecimal frete;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "pagamento_id")
    private Pagamento pagamento;

    @OneToMany(mappedBy = "id.pedido")
    private List<ItemPedido> itens;

    // CRIAR RELACIONAMENTO COM CLIENTE
}
