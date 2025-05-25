package com.omarket.entity.id;

import java.io.Serializable;
import java.util.Objects;

import com.omarket.entity.Carrinho;
import com.omarket.entity.Produto;

import jakarta.persistence.Embeddable;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

@Embeddable
@Getter
@Setter
public class ItemCarrinhoId implements Serializable {

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "cliente_id", nullable = false)
    private Carrinho carrinho;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "produto_id", nullable = false)
    private Produto produto;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ItemCarrinhoId)) return false;
        ItemCarrinhoId that = (ItemCarrinhoId) o;
        return Objects.equals(carrinho, that.carrinho) &&
               Objects.equals(produto, that.produto);
    }

    @Override
    public int hashCode() {
        return Objects.hash(carrinho, produto);
    }
}
