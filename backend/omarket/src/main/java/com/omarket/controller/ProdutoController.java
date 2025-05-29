package com.omarket.controller;

import java.net.URI;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.omarket.dto.ProdutoDTO;
import com.omarket.service.ProdutoService;

import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("/produto")
@RequiredArgsConstructor
public class ProdutoController {

    private final ProdutoService produtoService;

    @PostMapping("/cadastrar")
    public ResponseEntity<ProdutoDTO> cadastrar(@RequestBody @Validated ProdutoDTO produtoDTO){ 
        ProdutoDTO produtoNovo = produtoService.cadastrar(produtoDTO);

        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
            .path("/{id}")
            .buildAndExpand(produtoNovo.getId())
            .toUri();

        return ResponseEntity.created(location).body(produtoNovo);
        
    }

    // ======= MÉTODO GET PARA VISUALIZAR UM PRODUTO =======
    @GetMapping("/{id}")
    public ResponseEntity<ProdutoDTO> visualizar(@PathVariable Long id){
        ProdutoDTO produtoDTO = produtoService.visualizar(id);
        return ResponseEntity.ok(produtoDTO);
    }

}
