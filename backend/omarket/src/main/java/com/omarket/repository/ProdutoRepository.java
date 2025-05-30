package com.omarket.repository;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.omarket.entity.Categoria;
import com.omarket.entity.Fornecedor;
import com.omarket.entity.Produto;

@Repository
public interface ProdutoRepository extends JpaRepository<Produto, Long> {
    List<Produto> findByFornecedor(Fornecedor fornecedor);
    List<Produto> findByCategoria(Categoria categoria);

    List<Produto> findByNomeContainingIgnoreCase(String nome);

    @Query("""
    SELECT p
    FROM   Produto p, Avaliacao a
    WHERE  p.preco BETWEEN :min AND :max
    """)
  List<Produto> filtrarEOrdenar(
      @Param("min")     BigDecimal min,
      @Param("max")     BigDecimal max,
      Sort sort
  );
}
