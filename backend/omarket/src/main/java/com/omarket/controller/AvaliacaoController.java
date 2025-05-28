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

    // ======= MÉTODO PARA EXCLUIR AVALIACAO =======
    @DeleteMapping("/{clienteId}/{produtoId}")
    public ResponseEntity<String> deletar(@PathVariable Long clienteId, @PathVariable Long produtoId){
        avaliacaoService.deletar(clienteId, produtoId);
        return ResponseEntity.ok("Avaliação deletada com sucesso!");
    }

    // ======= MÉTODO PARA EDITAR AVALIAÇÃO =======
    @PutMapping("/{clienteId}/{produtoId}")
    public ResponseEntity<AvaliacaoDTO> editar(@PathVariable Long clienteId, @PathVariable Long produtoId ,@RequestBody AvaliacaoDTO avaliacaoDTO){
        AvaliacaoDTO avaliacaoEditada = avaliacaoService.editar(clienteId, produtoId, avaliacaoDTO);
        return ResponseEntity.ok(avaliacaoEditada);
    }

    // ======= MÉTODO PARA LISTAR POR CLIENTE =======
    @GetMapping("/listar/{clienteId}")
    public ResponseEntity<List<AvaliacaoDTO>> listarPorCliente(@PathVariable Long clienteId){
        List<AvaliacaoDTO> avaliacoes = avaliacaoService.listarPorCliente(clienteId);
        return ResponseEntity.ok(avaliacoes);
    }
 
    // ======= MÉTPDP PARA LISTAR POR PRODUTO =======

}
