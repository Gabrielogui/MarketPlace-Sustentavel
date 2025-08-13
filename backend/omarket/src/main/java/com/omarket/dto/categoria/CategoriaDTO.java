package com.omarket.dto.categoria;

import com.omarket.entity.Categoria;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CategoriaDTO {
    private Long id;

    @NotBlank(message = "O nome da categoria deve ser preenchido!")
    private String nome;

    @NotBlank(message = "A descrição deve ser preenchida!")
    private String descricao;

    // CONSTRUTOR VAZIO
    public CategoriaDTO(){ }

    // CONSTRUTOR COM AS INFORMAÇÕES DE CATEGORIA
    public CategoriaDTO(Categoria categoria){
        this.id        = categoria.getId();
        this.nome      = categoria.getNome();
        this.descricao = categoria.getDescricao();
    }
}
