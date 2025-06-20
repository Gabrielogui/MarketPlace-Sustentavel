package com.omarket.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.omarket.entity.Fornecedor;

@Repository
public interface FornecedorRepository extends JpaRepository<Fornecedor, Long> {

}
