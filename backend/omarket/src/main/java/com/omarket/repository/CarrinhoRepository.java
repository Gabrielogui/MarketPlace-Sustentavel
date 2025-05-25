package com.omarket.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.omarket.entity.Carrinho;

@Repository
public interface CarrinhoRepository extends JpaRepository<Carrinho, Long> {
    // Custom query methods can be defined here if needed
    // For example, to find all items in a cart by a specific user:
    // List<Carrinho> findByUsuarioId(Long usuarioId);

}
