package com.omarket.controller;

import java.net.URI;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.omarket.dto.EnderecoDTO;
import com.omarket.service.EnderecoService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/endereco")
@RequiredArgsConstructor
public class EnderecoController {

    private final EnderecoService enderecoService;

    @PostMapping("/cadastrar")
    public ResponseEntity<EnderecoDTO> cadastrar(@RequestBody @Validated EnderecoDTO enderecoDTO) {
        EnderecoDTO enderecoNovo = enderecoService.cadastrar(enderecoDTO);

        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
            .path("/{id}")
            .buildAndExpand(enderecoNovo.getId())
            .toUri();

        return ResponseEntity.created(location).body(enderecoNovo);
    }

}
