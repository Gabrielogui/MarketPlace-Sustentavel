package com.omarket.entity;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToOne;
import lombok.Getter;
import lombok.Setter;

@Entity
@DiscriminatorValue("FORNECEDOR")
@Getter
@Setter
public class Fornecedor extends Usuario {
    // Relação bidirecional cliente ↔ endereço
   /*  @OneToOne(mappedBy = "fornecedor",
              cascade = CascadeType.ALL,
              orphanRemoval = true,
              fetch = FetchType.LAZY,
              optional = true)
    private Endereco endereco; */
    private String cpnj;
}
