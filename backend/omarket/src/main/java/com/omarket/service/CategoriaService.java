package com.omarket.service;

import org.springframework.stereotype.Service;

import com.omarket.dto.CategoriaDTO;
import com.omarket.entity.Categoria;
import com.omarket.repository.CategoriaRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CategoriaService {
    // |=======| ATRIBUTOS |=======|
    private final CategoriaRepository categoriaRepository;

    // |=======| MÉTODOS |=======|
    public CategoriaDTO cadastrar(CategoriaDTO categoriaDTO){
        Categoria categoria = new Categoria();

        categoria.setNome(categoriaDTO.getNome());
        categoria.setDescricao(categoriaDTO.getDescricao());

        categoriaRepository.save(categoria);

        return converterParaDTO(categoria);

    }

    // CONVERTER PARA DTO:
    public CategoriaDTO converterParaDTO(Categoria categoria){
        CategoriaDTO categoriaDTO = new CategoriaDTO();
        categoriaDTO.setId(categoria.getId());
        categoriaDTO.setNome(categoria.getNome());
        categoriaDTO.setDescricao(categoria.getDescricao());

        return categoriaDTO;
    }
}
