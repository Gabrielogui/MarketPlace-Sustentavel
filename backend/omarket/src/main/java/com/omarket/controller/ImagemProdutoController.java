package com.omarket.controller;

import java.net.URI;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.omarket.dto.ImagemProdutoDTO;
import com.omarket.entity.ImagemProduto;
import com.omarket.service.ImagemProdutoService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/imagem-produto")
@RequiredArgsConstructor
public class ImagemProdutoController {
    private final ImagemProdutoService imagemProdutoService;

    @PostMapping(/upload-imagem-produto)
    public ImagemProdutoDTO uploadImagem(@RequestBody @Validated ImagemProdutoDTO imagemProdutoDTO) {
        ImagemProdutoDTO imagemProdutoNovo = imagemProdutoService.uploadImagem(imagemProdutoDTO);

        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
            .path("/{id}")
            .buildAndExpand(imagemProdutoNovo.getId())
            .toUri();

        return ResponseEntity.created(location).body(imagemProdutoNovo);

    }
    private ImagemProdutoDTO converterParaDTO(ImagemProduto img) {
        ImagemProdutoDTO dto = new ImagemProdutoDTO();
        dto.setId(img.getId());
        dto.setProdutoId(img.getProduto().getId()); // só o ID, não o objeto
        dto.setFileName(img.getFileName());
        dto.setFilePath(img.getFilePath());
        dto.setUploadedAt(img.getUploadedAt());
        return dto;
    }
}
