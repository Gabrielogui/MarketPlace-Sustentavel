package com.omarket.controller;

import java.net.URI;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.omarket.dto.UsuarioDTO;
import com.omarket.dto.UsuarioEditarDTO;
import com.omarket.entity.enum_.TipoUsuario;
import com.omarket.service.UsuarioService;
import com.omarket.service.UsuarioServiceFactory;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/fornecedor")
@RequiredArgsConstructor
public class FornecedorController {
    // |=======| ATRIBUTOS |=======|
    private final UsuarioServiceFactory usuarioServiceFactory;

    // |=======| MÉTODOS |=======|

    // ======= POST PARA CADASTRO DO FORNECEDOR ======= (PROVAVELMENTE FIQUE APENAS EM AUTHCONTROLLER)
    @PostMapping("/cadastrar")
    public ResponseEntity<UsuarioDTO> cadastrar(@RequestBody @Validated UsuarioDTO usuarioDTO){
        UsuarioService fornecedorService = usuarioServiceFactory.getUsuarioService(TipoUsuario.FORNECEDOR);
        UsuarioDTO fornecedorNovo = fornecedorService.cadastrar(usuarioDTO);

        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
            .path("/{id}")
            .buildAndExpand(fornecedorNovo.getId())
            .toUri();

        return ResponseEntity.created(location).body(fornecedorNovo);
    }

    // ======= GET DE UM FORNECEDOR =======
    @GetMapping("/{id}")
    public ResponseEntity<UsuarioDTO> buscar(@PathVariable Long id){
        UsuarioService fornecedorService = usuarioServiceFactory.getUsuarioService(TipoUsuario.FORNECEDOR);
        UsuarioDTO usuarioDTO = fornecedorService.buscar(id);

        return ResponseEntity.ok(usuarioDTO);
    }

    // ======= INATIVAR FORNECEDOR =======
    @PatchMapping("/{id}/inativar")
    public ResponseEntity<UsuarioDTO> inativar(@PathVariable Long id){
        UsuarioService fornecedorService = usuarioServiceFactory.getUsuarioService(TipoUsuario.FORNECEDOR);
        UsuarioDTO fornecedorInativado = fornecedorService.inativar(id);

        return ResponseEntity.ok(fornecedorInativado);
    }

    // ======= EDITAR FORNECEDOR =======
    @PutMapping("/{id}")
    public ResponseEntity<UsuarioDTO> editar(@PathVariable Long id, @RequestBody @Validated UsuarioEditarDTO usuarioEditarDTO){
        UsuarioService fornecedorService = usuarioServiceFactory.getUsuarioService(TipoUsuario.FORNECEDOR);
        UsuarioDTO fornecedorEditado = fornecedorService.editar(id, usuarioEditarDTO);

        return ResponseEntity.ok(fornecedorEditado);
    }
}
