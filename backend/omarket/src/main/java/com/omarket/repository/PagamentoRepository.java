package com.omarket.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.omarket.entity.Pagamento;

public interface PagamentoRepository extends JpaRepository<Pagamento, Long> {
    
}
