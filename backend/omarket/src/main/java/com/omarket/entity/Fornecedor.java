package com.omarket.entity;

import java.util.ArrayList;
import java.util.List;

import com.omarket.entity.enum_.TipoUsuario;

import jakarta.persistence.CascadeType;
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
@DiscriminatorValue("FORNECEDOR")
@Getter
@Setter
public class Fornecedor extends Usuario {
  
    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL, optional = true)
    @JoinColumn(name = "endereco_id", nullable = true, unique = true)
    private Endereco endereco;
    private String cnpj;

    @OneToMany(mappedBy = "fornecedor", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Produto> produtos = new ArrayList<>();

    @OneToMany(mappedBy = "fornecedor", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ImagemFornecedor> imagens = new ArrayList<>();

    @PrePersist
    public void prePersistRole() {
        // Ao persistir pela primeira vez, garante que TipoUsuario seja FORNECEDOR
        if (getTipoUsuario() == null) {
            setTipoUsuario(TipoUsuario.FORNECEDOR);
        }
    }

    
}
