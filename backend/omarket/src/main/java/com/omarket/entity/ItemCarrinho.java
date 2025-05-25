package com.omarket.entity;

import com.omarket.entity.id.ItemCarrinhoId;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "item_carrinho")
@Getter
@Setter
public class ItemCarrinho {

    @EmbeddedId
    private ItemCarrinhoId id = new ItemCarrinhoId();

    @Column(nullable = false)
    private Integer quantidade;

    // Navegação “virtual” para Carrinho e Produto
    public Carrinho getCarrinho() {
        return id.getCarrinho();
    }

    public void setCarrinho(Carrinho carrinho) {
        id.setCarrinho(carrinho);
    }

    public Produto getProduto() {
        return id.getProduto();
    }

    public void setProduto(Produto produto) {
        id.setProduto(produto);
    }
}
