package com.omarket.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.omarket.entity.Pedido;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {
    
}
