package com.omarket.entity;

import com.omarket.entity.enum_.TipoUsuario;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.PrePersist;
import lombok.Getter;
import lombok.Setter;

@Entity
@DiscriminatorValue("ADMINISTRADOR")
@Getter
@Setter
public class Administrador extends Usuario {
    @PrePersist
    public void prePersistRole() {
        // Ao persistir pela primeira vez, garante que TipoUsuario seja ADMINISTRADOR
        if (getTipoUsuario() == null) {
            setTipoUsuario(TipoUsuario.ADMINISTRADOR);
        }
    }
}
