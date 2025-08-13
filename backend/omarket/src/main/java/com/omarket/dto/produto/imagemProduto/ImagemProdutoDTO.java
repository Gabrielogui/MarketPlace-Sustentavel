package com.omarket.dto.produto.imagemProduto;

import java.time.LocalDateTime;

import com.omarket.dto.produto.ProdutoDTO;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ImagemProdutoDTO {
    private Long id;

    @NotBlank(message = "O id do produto é obrigatório!")
    private Long produtoId;

    @NotBlank(message = "O nome do arquivo é obrigatório!")
    private String fileName;

    @NotBlank(message = "O caminho do arquivo é obrigatório!")
    private String filePath;

    private LocalDateTime uploadedAt;
}
