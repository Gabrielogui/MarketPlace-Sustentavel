package com.omarket.controller;

import java.net.URI;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.omarket.dto.FavoritoDTO;
import com.omarket.service.FavoritoService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/favorito")
@RequiredArgsConstructor
public class FavoritoController {

    // |=======| ATRIBUTOS DE SERVICE |=======|
    private final FavoritoService favoritoService;
    
    // |=======| MÉTODO PARA FAVORITAR UM PRODUTO |=======|
    @PostMapping("/favoritar")
    public ResponseEntity<FavoritoDTO> favoritar(@RequestBody FavoritoDTO favoritoDTO){
        FavoritoDTO favoritoNovo = favoritoService.favoritar(favoritoDTO);

        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
            .path("/{id}")
            .buildAndExpand(favoritoDTO.getId())
            .toUri();

        return ResponseEntity.created(location).body(favoritoNovo);
    }
}
