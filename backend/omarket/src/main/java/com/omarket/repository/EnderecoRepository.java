package com.omarket.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.omarket.entity.Endereco;

@Repository
public interface EnderecoRepository extends JpaRepository<Endereco, Long> {
    // Custom query methods can be defined here if needed
    // For example, to find all addresses for a specific user:
    // List<Endereco> findByUsuarioId(Long usuarioId);

}
