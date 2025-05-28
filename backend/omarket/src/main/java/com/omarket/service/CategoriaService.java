package com.omarket.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

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
    @Transactional
    public CategoriaDTO cadastrar(CategoriaDTO categoriaDTO){
        Categoria categoria = new Categoria();

        categoria.setNome(categoriaDTO.getNome());
        categoria.setDescricao(categoriaDTO.getDescricao());

        categoriaRepository.save(categoria);

        return converterParaDTO(categoria);

    }

    // LISTAR TODAS AS CATEGORIAS:
    @Transactional(readOnly = true)
    public List<CategoriaDTO> listar(){
        List<Categoria> categorias = categoriaRepository.findAll();
        List<CategoriaDTO> categoriasDTO = categorias.stream().map((categoria) -> new CategoriaDTO(categoria)).toList();
        return categoriasDTO;
    }

    // DELETAR UMA CATEGORIA:
    @Transactional
    public void deletar(Long id){
        Categoria categoria = categoriaRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Categoria não encontrada!"));
        categoriaRepository.delete(categoria);
    }

    // BUSCAR UMA CATEGORIA:
    @Transactional
    public CategoriaDTO buscar(Long id){
        Categoria categoria = categoriaRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Categoria não encontrada!"));
    
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
