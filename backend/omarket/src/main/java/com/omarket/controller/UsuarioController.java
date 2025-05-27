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
import com.omarket.service.UsuarioService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/usuario")
@RequiredArgsConstructor
public class UsuarioController {
    // |=======| ATRIBUTOS |=======|
    //private final UsuarioRepository usuarioRepository; 
    private final UsuarioService usuarioService;

    // ======= POST PARA CADASTRO DO USUÁRIO =======
    @PostMapping("/cadastrar")
    public ResponseEntity<UsuarioDTO> cadastrar(@RequestBody @Validated UsuarioDTO usuarioDTO){
        UsuarioDTO usuarioNovo = usuarioService.cadastrar(usuarioDTO);

        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
            .path("/{id}")
            .buildAndExpand(usuarioNovo.getId())
            .toUri();

        return ResponseEntity.created(location).body(usuarioNovo);
    }

    // ======= GET DE UM USUÁRIO =======
    @GetMapping("/{id}")
    public ResponseEntity<UsuarioDTO> buscar(@PathVariable Long id){
        UsuarioDTO usuarioDTO = usuarioService.buscar(id);
        return ResponseEntity.ok(usuarioDTO);
    }

    @PatchMapping("/{id}/inativar")
    public ResponseEntity<UsuarioDTO> inativar(@PathVariable Long id){
        UsuarioDTO usuarioInativado = usuarioService.inativar(id);
        return ResponseEntity.ok(usuarioInativado);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UsuarioDTO> editar(@PathVariable Long id, @RequestBody @Validated UsuarioDTO usuarioDTO){
        UsuarioDTO usuarioEditado = usuarioService.editar(id, usuarioDTO);
        return ResponseEntity.ok(usuarioEditado);
    }
    // ======= DELETE PARA USUÁRIO =======
}
