package com.omarket.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.omarket.entity.Administrador;

@Repository
public interface AdministradorRepository extends JpaRepository<Administrador, Long> {
    // Custom query methods can be defined here if needed
    // For example, to find all administrators by a specific attribute:
    // List<Administrador> findByAttribute(String attribute);

}
