package com.omarket.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.omarket.entity.ImagemProduto;

public interface ImagemProdutoRepository extends JpaRepository<ImagemProduto, Long> {
    
}
