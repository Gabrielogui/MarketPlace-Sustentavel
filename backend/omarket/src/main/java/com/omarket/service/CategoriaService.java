package com.omarket.service;

import org.springframework.stereotype.Service;

import com.omarket.repository.CategoriaRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CategoriaService {
    // |=======| ATRIBUTOS |=======|
    private final CategoriaRepository categoriaRepository;
}
