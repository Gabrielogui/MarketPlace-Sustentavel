package com.omarket.controller;

import java.net.URI;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.security.core.Authentication;

import com.omarket.dto.frete.FreteDTO;
import com.omarket.dto.frete.request.PacoteRequest;
import com.omarket.dto.frete.response.OpcaoFreteResponse;
import com.omarket.entity.Cliente;
import com.omarket.security.CustomUserDetails;
import com.omarket.service.FreteService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/frete")
@RequiredArgsConstructor   
public class FreteController {

    private final FreteService freteService;

    // CEP de origem pode ser fixo (o da sua loja)
    //private static final String CEP_ORIGEM = "01001000"; // Ex: Praça da Sé, SP

    @PostMapping("/calcular")
    public ResponseEntity<List<OpcaoFreteResponse>> calcular(
            @RequestParam String cepOrigem,
            @RequestParam String cepDestino,
            Authentication authentication
            //, @RequestBody PacoteRequest pacote
            ) {

        PacoteRequest pacote = new PacoteRequest();

        List<OpcaoFreteResponse> opcoes = freteService.calcularFrete(cepOrigem, cepDestino, pacote);
        
        if (opcoes.isEmpty()) {
            return ResponseEntity.noContent().build(); // Retorna 204 se não houver opções
        }
        
        return ResponseEntity.ok(opcoes);
    }

    @PostMapping("/selecionar/{pedidoId}")
    public ResponseEntity<FreteDTO> selecionarOpcao(
            
            @RequestBody OpcaoFreteResponse freteResponse,
            Authentication authentication, 
            @PathVariable Long pedidoId
        ){

        FreteDTO freteNovo = freteService.selecionarOpcaoFrete(freteResponse, pedidoId);
        
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
            .path("/{id}")
            .buildAndExpand(freteNovo.getId())
            .toUri();
        
        return ResponseEntity.created(location).body(freteNovo);
    }
    
}
