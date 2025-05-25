package com.omarket.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.omarket.entity.Cliente;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long> {
    // Custom query methods can be defined here if needed
    // For example, to find all clients by a specific attribute:
    // List<Cliente> findByAttribute(String attribute);

}
