package com.omarket.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.omarket.entity.Favorito;

@Repository
public interface FavoritoRepository extends JpaRepository<Favorito, Long> {
    // Custom query methods can be defined here if needed
    // For example, to find all favorites for a specific user:
    // List<Favorito> findByUsuarioId(Long usuarioId);

}
