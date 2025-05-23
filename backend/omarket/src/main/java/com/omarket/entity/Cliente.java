package com.omarket.entity;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@DiscriminatorValue("CLIENTE")
@Getter
@Setter

public class Cliente extends Usuario {
     // Relação bidirecional cliente ↔ endereço
   /*  @OneToOne(mappedBy = "cliente",
              cascade = CascadeType.ALL,
              orphanRemoval = true,
              fetch = FetchType.LAZY,
              optional = true)
    private Endereco endereco; */
    private String cpf;
    private String dataNascimento;

    // Adicione outros atributos específicos do Cliente, se necessário

}
