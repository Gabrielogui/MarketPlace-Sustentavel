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

import com.omarket.dto.avaliacao.AvaliacaoRequestDTO;
import com.omarket.dto.avaliacao.AvaliacaoResponseDTO;
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
    public ResponseEntity<AvaliacaoResponseDTO> adicionar(@RequestBody @Validated AvaliacaoRequestDTO avaliacaoDTO){
        AvaliacaoResponseDTO avaliacaoNova = avaliacaoService.adicionar(avaliacaoDTO);

        URI location = ServletUriComponentsBuilder
            .fromCurrentRequest()
            .path("/{clienteId}/{produtoId}")
            .buildAndExpand(avaliacaoNova.getCliente().getId(), avaliacaoNova.getProduto().getId())
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
    public ResponseEntity<AvaliacaoResponseDTO> editar(@PathVariable Long clienteId, @PathVariable Long produtoId ,@RequestBody AvaliacaoResponseDTO avaliacaoDTO){
        AvaliacaoResponseDTO avaliacaoEditada = avaliacaoService.editar(clienteId, produtoId, avaliacaoDTO);
        return ResponseEntity.ok(avaliacaoEditada);
    }

    // ======= MÉTODO PARA LISTAR POR CLIENTE =======
    @GetMapping("/listar/cliente/{clienteId}")
    public ResponseEntity<List<AvaliacaoResponseDTO>> listarPorCliente(@PathVariable Long clienteId){
        List<AvaliacaoResponseDTO> avaliacoes = avaliacaoService.listarPorCliente(clienteId);
        return ResponseEntity.ok(avaliacoes);
    }
 
    // ======= MÉTPDP PARA LISTAR POR PRODUTO =======
    @GetMapping("/listar/produto/{produtoId}")
    public ResponseEntity<List<AvaliacaoResponseDTO>> listarPorProduto(@PathVariable Long produtoId){
        List<AvaliacaoResponseDTO> avaliacoes = avaliacaoService.listarPorProduto(produtoId);
        return ResponseEntity.ok(avaliacoes);
    }

}
