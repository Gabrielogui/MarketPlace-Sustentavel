package com.omarket.controller;

import java.net.URI;

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

import com.omarket.dto.endereco.EnderecoDTO;
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

    @GetMapping("/{id}")
    public ResponseEntity<EnderecoDTO> buscar(@PathVariable Long id) {
        EnderecoDTO enderecoDTO = enderecoService.buscarPorId(id);
        return ResponseEntity.ok(enderecoDTO);
    }

    @PutMapping("/{id}")
    public ResponseEntity<EnderecoDTO> editar(@PathVariable Long id, @RequestBody @Validated EnderecoDTO enderecoDTO) {
        EnderecoDTO enderecoEditado = enderecoService.editar(id, enderecoDTO);
        return ResponseEntity.ok(enderecoEditado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        enderecoService.deletar(id);
        return ResponseEntity.noContent().build();
    }

}
