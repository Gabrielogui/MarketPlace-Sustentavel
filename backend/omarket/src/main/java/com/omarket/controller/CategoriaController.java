package com.omarket.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.omarket.dto.CategoriaDTO;
import com.omarket.service.CategoriaService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/categoria")
@RequiredArgsConstructor
public class CategoriaController {
    // |=======| ATRIBUTOS |=======|
    private final CategoriaService categoriaService;

    public ResponseEntity<CategoriaDTO> cadastrar(@RequestBody @Validated CategoriaDTO categoriaDTO){

    }
}
