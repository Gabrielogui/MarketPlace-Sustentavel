package com.omarket.dto.produto;

import java.math.BigDecimal;
import java.util.List;

import com.omarket.dto.categoria.CategoriaDTO;
import com.omarket.dto.produto.imagemProduto.ImagemProdutoDTO;
import com.omarket.dto.usuario.fornecedor.FornecedorDTO;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProdutoDTO {
    private Long id;
    
    @Size(max = 70, message = "O nome do produto deve ter no máximo 70 caracteres!")
    private String nome;
    
    @Size(max = 500, message = "A descrição do produto deve ter no máximo 500 caracteres!")
    private String descricao;
    
    private Integer estoque;

    private String status;

    @Positive(message = "O preço deve ser um valor positivo!")
    @Digits(integer = 7, fraction = 2, message = "O preço deve ter no máximo 7 dígitos inteiros e 2 casas decimais.")
    private BigDecimal preco;
    
    @Valid
    private CategoriaDTO categoria;
   
    @Valid
    private FornecedorDTO fornecedor;
   
    @Valid
    private List<ImagemProdutoDTO> imagens;

}
