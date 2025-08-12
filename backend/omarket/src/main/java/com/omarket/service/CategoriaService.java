package com.omarket.service;

import java.util.List;

import org.hibernate.annotations.Cache;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.omarket.dto.categoria.CategoriaDTO;
import com.omarket.entity.Categoria;
import com.omarket.repository.CategoriaRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CategoriaService {
    // |=======| ATRIBUTOS |=======|
    private final CategoriaRepository categoriaRepository;

    // |=======| MÉTODOS |=======|
    @CacheEvict(value = "categorias-lista", allEntries = true)
    @Transactional
    public CategoriaDTO cadastrar(CategoriaDTO categoriaDTO){
        Categoria categoria = new Categoria();

        categoria.setNome(categoriaDTO.getNome());
        categoria.setDescricao(categoriaDTO.getDescricao());

        categoriaRepository.save(categoria);

        return converterParaDTO(categoria);

    }

    // LISTAR TODAS AS CATEGORIAS:
    @Cacheable("categorias-lista")
    @Transactional(readOnly = true)
    public List<CategoriaDTO> listar(){
        List<Categoria> categorias = categoriaRepository.findAll();
        List<CategoriaDTO> categoriasDTO = categorias.stream().map((categoria) -> new CategoriaDTO(categoria)).toList();
        return categoriasDTO;
    }

    // DELETAR UMA CATEGORIA:
    @Caching(evict = {
        @CacheEvict(value = "categorias", key = "#id"),
        @CacheEvict(value = "categorias-lista", allEntries = true)
    })
    @Transactional
    public void deletar(Long id){
        Categoria categoria = categoriaRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Categoria não encontrada!"));
        categoriaRepository.delete(categoria);
    }

    // BUSCAR UMA CATEGORIA:
    @Cacheable(value = "categorias", key = "#id")
    @Transactional
    public CategoriaDTO buscar(Long id){
        Categoria categoria = categoriaRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Categoria não encontrada!"));
    
        return converterParaDTO(categoria);
    }

    // MÉTODO EDITAR
    @Caching(
        put = { @CachePut(value = "categorias", key = "#id") },
        evict = { @CacheEvict(value = "categorias-lista", allEntries = true) }
    )
    @Transactional
    public CategoriaDTO editar(Long id, CategoriaDTO categoriaDTO){
        Categoria categoria = categoriaRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Categoria não encontrada!"));

        categoria.setNome(categoriaDTO.getNome());
        categoria.setDescricao(categoriaDTO.getDescricao());

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
