package com.omarket.controller;

import java.net.URI;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.omarket.dto.categoria.CategoriaDTO;
import com.omarket.service.CategoriaService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/categoria")
@RequiredArgsConstructor
public class CategoriaController {
    // |=======| ATRIBUTOS |=======|
    private final CategoriaService categoriaService;

    // ======= MÉTODO POST DE CADASTRAR =======
    @PostMapping("/cadastrar")
    public ResponseEntity<CategoriaDTO> cadastrar(@RequestBody @Validated CategoriaDTO categoriaDTO){
        CategoriaDTO categoriaNova = categoriaService.cadastrar(categoriaDTO);

        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
            .path("/{id}")
            .buildAndExpand(categoriaNova.getId())
            .toUri();

        return ResponseEntity.created(location).body(categoriaNova);
    }

    // ======= MÉTODO GET PARA LISTAR AS CATEGORIAS =======
    @GetMapping("/listar")
    public ResponseEntity<List<CategoriaDTO>> listat(){
        List<CategoriaDTO> categorias = categoriaService.listar();
        return ResponseEntity.ok(categorias);
    }

    // ======= MÉTODO DELETE PARA DELETAR UMA CATEGORIA =======
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletar(@PathVariable Long id){
        categoriaService.deletar(id);
        return ResponseEntity.ok("Categoria deletada com sucesso!");
    }

    // ======= MÉTODO GET PARA BUSCAR UMA CATEGORIA =======
    @GetMapping("/{id}")
    public ResponseEntity<CategoriaDTO> buscar(@PathVariable Long id){
        CategoriaDTO categoriaDTO = categoriaService.buscar(id);
        return ResponseEntity.ok(categoriaDTO);
    }

    // ======= MÉTODO PUT PARA EDITAR UMA CATEGORIA =======
    @PutMapping("/{id}")
    public ResponseEntity<CategoriaDTO> editar(@PathVariable Long id, @RequestBody @Validated CategoriaDTO categoriaDTO){
        CategoriaDTO categoriaEditada = categoriaService.editar(id, categoriaDTO);
        return ResponseEntity.ok(categoriaEditada);
    }
}
