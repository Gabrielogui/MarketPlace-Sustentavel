package com.omarket.entity;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;

@Entity
@DiscriminatorValue("ADMINISTRADOR")
@Getter
@Setter
public class Administrador extends Usuario {

}
