package com.omarket.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.omarket.dto.frete.request.PacoteRequest;
import com.omarket.dto.frete.response.OpcaoFreteResponse;
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
            @RequestParam String cepDestino
            //, @RequestBody PacoteRequest pacote
            ) {

        PacoteRequest pacote = new PacoteRequest();

        List<OpcaoFreteResponse> opcoes = freteService.calcularFrete(cepOrigem, cepDestino, pacote);
        
        if (opcoes.isEmpty()) {
            return ResponseEntity.noContent().build(); // Retorna 204 se não houver opções
        }
        
        return ResponseEntity.ok(opcoes);
    }
    
}
