package com.omarket.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.omarket.service.CategoriaService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/categoria")
@RequiredArgsConstructor
public class CategoriaController {
    // |=======| ATRIBUTOS |=======|
    private final CategoriaService categoriaService;
}
