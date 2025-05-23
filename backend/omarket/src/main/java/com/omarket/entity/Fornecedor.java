package com.omarket.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.Getter;
import lombok.Setter;

@Entity
@DiscriminatorValue("FORNECEDOR")
@Getter
@Setter
public class Fornecedor extends Usuario {
  
    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL, optional = true)
    @JoinColumn(name = "endereco_id", nullable = true, unique = true)
    private Endereco endereco;
    private String cpnj;
    
}
