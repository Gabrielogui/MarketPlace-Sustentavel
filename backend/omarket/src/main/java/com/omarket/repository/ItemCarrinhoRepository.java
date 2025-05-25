package com.omarket.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.omarket.entity.Carrinho;
import com.omarket.entity.ItemCarrinho;
import com.omarket.entity.Produto;
import com.omarket.entity.id.ItemCarrinhoId;

public interface ItemCarrinhoRepository extends JpaRepository<ItemCarrinho, ItemCarrinhoId> {
    // ENCONTRA PELO PRODUTO
    List<ItemCarrinho> findByIdProduto(Produto produto);

    // ENCONTRA PELO CARRINHO
    List<ItemCarrinho> findByIdCarrinho(Carrinho carrinho);
    
}
