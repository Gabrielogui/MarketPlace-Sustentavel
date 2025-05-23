package com.omarket.entity;

import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "item_pedido")
@Getter
@Setter
public class ItemPedido {
    // |=======| ATRIBUTOS |=======|
    @EmbeddedId
    private ItemPedidoId id = new ItemPedidoId();

    @Column(nullable = false)
    private Integer quantidade;

    @Column(name="preco_unitario", precision = 19, scale = 4, nullable = false)    
    private BigDecimal precoUnitario;

    // |=======| GET E SETS DO ID (PRODUTO E PEDIDO) |=======|
    public Pedido getPedido() {
        return id.getPedido();
    }

    public void setPedido(Pedido pedido) {
        id.setPedido(pedido);
    }

    public Produto getProduto() {
        return id.getProduto();
    }

    public void setProduto(Produto produto) {
        id.setProduto(produto);
    }
}
