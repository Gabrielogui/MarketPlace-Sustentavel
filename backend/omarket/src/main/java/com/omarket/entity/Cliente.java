package com.omarket.entity;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.omarket.entity.enum_.TipoUsuario;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.PrePersist;
import lombok.Getter;
import lombok.Setter;

@Entity
@DiscriminatorValue("CLIENTE")
@Getter
@Setter
public class Cliente extends Usuario {
     
    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL, optional = true)
    @JoinColumn(name = "endereco_id", nullable = true, unique = true)
    private Endereco endereco;
    
    private String cpf;

    @Column(name="data_nascimento", nullable = true)
    private LocalDate dataNascimento;

    @OneToMany(mappedBy = "cliente", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Pedido> pedidos = new ArrayList<>();

    @OneToMany(mappedBy = "cliente")
    private List<Favorito> favoritos = new ArrayList<>();

    @OneToOne(mappedBy = "cliente", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Carrinho carrinho;

    @PrePersist
    public void prePersistRole() {
        // Ao persistir pela primeira vez, garante que role seja ROLE_CLIENTE
        if (getTipoUsuario() == null) {
            setTipoUsuario(TipoUsuario.CLIENTE);
        }
    }

}
