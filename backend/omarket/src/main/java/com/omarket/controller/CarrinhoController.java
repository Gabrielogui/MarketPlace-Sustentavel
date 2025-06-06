 /*package com.omarket.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/carrinho")
@RequiredArgsConstructor
public class CarrinhoController {

    private final CarrinhoService carrinhoService;

    @PostMapping("/criar")
    public ResponseEntity<CarrinhoDTO> criarCarrinho(@RequestBody @Validated CarrinhoDTO carrinhoDTO) {
        CarrinhoDTO novoCarrinho = carrinhoService.criarCarrinho(carrinhoDTO);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
            .path("/{id}")
            .buildAndExpand(novoCarrinho.getId())
            .toUri();
        return ResponseEntity.created(location).body(novoCarrinho);
    } 

} */
