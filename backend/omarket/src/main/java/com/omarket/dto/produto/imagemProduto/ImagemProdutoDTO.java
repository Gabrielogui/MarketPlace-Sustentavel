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

    @NotBlank(message = "O produto é obrigatório!")
    private ProdutoDTO produto;

    @NotBlank(message = "O nome do arquivo é obrigatório!")
    private String fileName;

    @NotBlank(message = "O caminho do arquivo é obrigatório!")
    private String filePath;

    private LocalDateTime uploadedAt;
}
