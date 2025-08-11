package com.omarket.dto.produto.imagemProduto;

import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ImagemProdutoInputDTO {
    @NotNull
    private Long produtoId;
    @NotNull
    private MultipartFile file;    // receba o arquivo diretamente
}