package com.omarket.dto;

import java.math.BigDecimal;
import java.util.List;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProdutoDTO {
    private Long id;
    
    @NotBlank(message = "O nome do produto é obrigatório!")
    @Size(max = 70, message = "O nome do produto deve ter no máximo 70 caracteres!")
    private String nome;
    
    @NotBlank(message = "A descrição do produto é obrigatória!")
    @Size(max = 500, message = "A descrição do produto deve ter no máximo 500 caracteres!")
    private String descricao;
    
    @NotNull(message = "O estoque é obrigatório!")
    private Integer estoque;

    private String status;

    @NotNull(message = "O preço é obrigatório!")
    @Positive(message = "O preço deve ser um valor positivo!")
    @Digits(integer = 7, fraction = 2, message = "O preço deve ter no máximo 7 dígitos inteiros e 2 casas decimais.")
    private BigDecimal preco;
    
    @NotNull(message = "A categoria é obrigatória!")
    @Valid
    private Long categoriaId;
   
    @NotNull(message = "A categoria é obrigatória!")
    @Valid
    private Long fornecedorId;
   
    @Valid
    private List<ImagemProdutoDTO> imagens;
}
