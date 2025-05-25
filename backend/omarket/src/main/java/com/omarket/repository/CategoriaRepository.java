package com.omarket.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.omarket.entity.Categoria;

@Repository
public interface CategoriaRepository extends JpaRepository<Categoria, Long> {
    // Custom query methods can be defined here if needed
    // For example, to find all categories by a specific attribute:
    // List<Categoria> findByAttribute(String attribute);

}
