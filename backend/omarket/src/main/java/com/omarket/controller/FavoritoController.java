package com.omarket.controller;

import java.net.URI;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.omarket.dto.favorito.FavoritoRequestDTO;
import com.omarket.dto.favorito.FavoritoResponseDTO;
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
    public ResponseEntity<FavoritoRequestDTO> favoritar(@RequestBody FavoritoRequestDTO favoritoDTO){
        FavoritoRequestDTO favoritoNovo = favoritoService.favoritar(favoritoDTO);

        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
            .path("/{id}")
            .buildAndExpand(favoritoDTO.getId())
            .toUri();

        return ResponseEntity.created(location).body(favoritoNovo);
    }

    // |=======| MÉTODO PARA DELETAR O FAVORITO (DESFAVORITAR) |=======|
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletar(@PathVariable Long id){
        favoritoService.desfavoritar(id);
        return ResponseEntity.ok("Produto foi desfavoritado!");
    }

    // |=======| MÉTODO PARA LISTAR OS FAVORITOS POR CLIENTE |=======|
    @GetMapping("/{clienteId}")
    public ResponseEntity<List<FavoritoResponseDTO>> listarFavoritoPorCliente(@PathVariable Long clienteId){
        List<FavoritoResponseDTO> favoritosResponseDTO = favoritoService.listarFavoritoPorCliente(clienteId);
        return ResponseEntity.ok(favoritosResponseDTO);
    } 
}
