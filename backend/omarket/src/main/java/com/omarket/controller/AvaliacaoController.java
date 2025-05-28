package com.omarket.controller;

import java.net.URI;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.omarket.dto.AvaliacaoDTO;
import com.omarket.service.AvaliacaoService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/avaliacao")
@RequiredArgsConstructor
public class AvaliacaoController {
    // |=======| ATRIBUTOS |=======|
    private final AvaliacaoService avaliacaoService;

    // |=======| MÉTODOS |=======|

    // ======= MÉTODO POST DE ADICIONAR UMA AVALIACAO =======
    @PostMapping("/adicionar")
    public ResponseEntity<AvaliacaoDTO> adicionar(@RequestBody @Validated AvaliacaoDTO avaliacaoDTO){
        AvaliacaoDTO avaliacaoNova = avaliacaoService.adicionar(avaliacaoDTO);

        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
            .path("/{clienteId}/{produtoId}")
            .buildAndExpand(avaliacaoNova.getClienteId(), avaliacaoNova.getProdutoId())
            .toUri();

        return ResponseEntity.created(location).body(avaliacaoNova);
    }

}
