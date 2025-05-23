package com.omarket.entity;

import java.time.LocalDateTime;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "avaliacao")
@Getter
@Setter
public class Avaliacao {

    @EmbeddedId
    private AvaliacaoId id = new AvaliacaoId();

    private String comentario;
    private Integer nota;
    private LocalDateTime dataModificacao;

    public Cliente getCliente() {
        return id.getCliente();
    }

    public void setCliente(Cliente cliente) {
        id.setCliente(cliente);
    }

    public Produto getProduto() {
        return id.getProduto();
    }

    public void setProduto(Produto produto) {
        id.setProduto(produto);
    }
}
