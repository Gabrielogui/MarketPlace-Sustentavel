package com.omarket.controller;

import java.net.URI;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.omarket.dto.CategoriaDTO;
import com.omarket.service.CategoriaService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/categoria")
@RequiredArgsConstructor
public class CategoriaController {
    // |=======| ATRIBUTOS |=======|
    private final CategoriaService categoriaService;

    @PostMapping("/cadastrar")
    public ResponseEntity<CategoriaDTO> cadastrar(@RequestBody @Validated CategoriaDTO categoriaDTO){
        CategoriaDTO categoriaNova = categoriaService.cadastrar(categoriaDTO);

        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
            .path("/{id}")
            .buildAndExpand(categoriaNova.getId())
            .toUri();

        return ResponseEntity.created(location).body(categoriaNova);
    }

    @GetMapping("/listar")
    public ResponseEntity<List<CategoriaDTO>> listat(){
        List<CategoriaDTO> categorias = categoriaService.listar();
        return ResponseEntity.ok(categorias);
    }
}
