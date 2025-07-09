package com.omarket.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.omarket.entity.Frete;

@Repository
public interface FreteRepository extends JpaRepository<Frete, Long> {

}
