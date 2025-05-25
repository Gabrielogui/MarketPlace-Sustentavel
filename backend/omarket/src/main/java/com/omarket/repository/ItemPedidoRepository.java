package com.omarket.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.omarket.entity.ItemPedido;
import com.omarket.entity.Pedido;
import com.omarket.entity.Produto;
import com.omarket.entity.id.ItemPedidoId;

public interface ItemPedidoRepository extends JpaRepository<ItemPedido, ItemPedidoId> {
    // ENCONTRAR PELO PEDIDO
    List<ItemPedido> findByIdPedido(Pedido pedido);

    // ENCONTRAR PELO PRODUTO
    List<ItemPedido> findByIdProduto(Produto produto);
}
