package com.omarket.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.omarket.entity.Avaliacao;
import com.omarket.entity.Cliente;
import com.omarket.entity.Produto;
import com.omarket.entity.id.AvaliacaoId;

@Repository
public interface AvaliacaoRepository extends JpaRepository<Avaliacao, AvaliacaoId> {
    // Custom query methods can be defined here if needed
    // For example, to find all evaluations for a specific product:
    List<Avaliacao> findByIdProduto(Produto produto);
    List<Avaliacao> findByIdCliente(Cliente cliente);

}
