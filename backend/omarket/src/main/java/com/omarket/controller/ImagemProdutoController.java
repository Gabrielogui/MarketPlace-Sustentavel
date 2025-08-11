package com.omarket.controller;

import java.net.URI;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.omarket.dto.produto.imagemProduto.ImagemProdutoDTO;
import com.omarket.dto.produto.imagemProduto.ImagemProdutoInputDTO;
import com.omarket.service.ImagemProdutoService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/imagem-produto")
@RequiredArgsConstructor
public class ImagemProdutoController {
    private final ImagemProdutoService imagemProdutoService;

    @PostMapping("/upload")
    public ResponseEntity<ImagemProdutoDTO> upload(@RequestBody @Validated ImagemProdutoInputDTO imagemProdutoInputDTO) {
        ImagemProdutoDTO imagemProdutoNovo = imagemProdutoService.upload(imagemProdutoInputDTO);

        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
            .path("/{id}")
            .buildAndExpand(imagemProdutoNovo.getId())
            .toUri();

        return ResponseEntity.created(location).body(imagemProdutoNovo);

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        imagemProdutoService.deletar(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ImagemProdutoDTO> buscar(@PathVariable Long id) {
        ImagemProdutoDTO imagemProdutoDTO = imagemProdutoService.buscarPorId(id);
        return ResponseEntity.ok(imagemProdutoDTO);
    }
    
}
