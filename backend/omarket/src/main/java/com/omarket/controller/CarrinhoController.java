package com.omarket.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.Authentication;

import com.omarket.dto.AtualizarQuantidadeDTO;
import com.omarket.dto.CarrinhoDTO;
import com.omarket.dto.ItemCarrinhoDTO;
import com.omarket.entity.Cliente;
import com.omarket.security.CustomUserDetails;
import com.omarket.service.CarrinhoService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/carrinho")
@RequiredArgsConstructor
public class CarrinhoController {

    private final CarrinhoService carrinhoService;

    @PostMapping("/itens")
    public ResponseEntity<CarrinhoDTO> adicionarItemCarrinho(@RequestBody @Validated ItemCarrinhoDTO itemCarrinhoDTO, Authentication authentication) {
        
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        CarrinhoDTO carrinhoAtualizado = carrinhoService.adicionarItemCarrinho((Cliente)userDetails.getUsuario(), itemCarrinhoDTO);
        
        return ResponseEntity.ok(carrinhoAtualizado);
    }

    @DeleteMapping("/itens/{produtoId}")
    public ResponseEntity<?> removerItemCarrinho(Authentication authentication, @PathVariable Long produtoId) {
        
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        // Delega a lógica para o serviço usando os IDs da URL
        carrinhoService.removerItemCarrinho(userDetails.getUsuario().getId(), produtoId);

        // Significa que a operação foi um sucesso e não há corpo na resposta.
        return ResponseEntity.noContent().build(); 
    }

    @PatchMapping("/itens/{produtoId}")
    public ResponseEntity<CarrinhoDTO> atualizarQuantidadeItemCarrinho(Authentication authentication, @PathVariable Long produtoId, 
        @RequestBody @Validated AtualizarQuantidadeDTO quantidadeDTO) {

        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        CarrinhoDTO carrinhoAtualizado = carrinhoService.atualizarQuantidadeItemCarrinho(userDetails.getUsuario().getId(), produtoId, quantidadeDTO);
        
        return ResponseEntity.ok(carrinhoAtualizado);
    }

    @GetMapping
    public ResponseEntity<CarrinhoDTO> buscarMeuCarrinho(Authentication authentication) {
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        CarrinhoDTO carrinhoDTO = carrinhoService.buscarCarrinhoDoCliente(userDetails.getUsuario().getId());
        return ResponseEntity.ok(carrinhoDTO);
    }
} 
