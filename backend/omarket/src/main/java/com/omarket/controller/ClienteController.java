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

import com.omarket.dto.usuario.UsuarioDTO;
import com.omarket.dto.usuario.UsuarioEditarDTO;
import com.omarket.entity.enum_.TipoUsuario;
import com.omarket.service.ClienteService;
import com.omarket.service.UsuarioService;
import com.omarket.service.UsuarioServiceFactory;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/cliente")
@RequiredArgsConstructor
public class ClienteController {
    // |=======| ATRIBUTOS |=======|
    private final UsuarioServiceFactory usuarioServiceFactory;

    // |=======| MÉTODOS |=======|

    // ======= POST PARA CADASTRO DO CLIENTE ======= (PROVAVELMENTE FIQUE APENAS EM AUTHCONTROLLER)
    @PostMapping("/cadastrar")
    public ResponseEntity<UsuarioDTO> cadastrar(@RequestBody @Validated UsuarioDTO usuarioDTO){
        UsuarioService clienteService = (ClienteService)usuarioServiceFactory.getUsuarioService(TipoUsuario.CLIENTE);
        UsuarioDTO clienteNovo = clienteService.cadastrar(usuarioDTO);

        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
            .path("/{id}")
            .buildAndExpand(clienteNovo.getId())
            .toUri();

        return ResponseEntity.created(location).body(clienteNovo);
    }

    // ======= GET DE UM USUÁRIO =======
    @GetMapping("/{id}")
    public ResponseEntity<UsuarioDTO> buscar(@PathVariable Long id){
        UsuarioService clienteService = usuarioServiceFactory.getUsuarioService(TipoUsuario.CLIENTE);
        UsuarioDTO usuarioDTO = clienteService.buscar(id);

        return ResponseEntity.ok(usuarioDTO);
    }

    // ======= INATIVAR USUÁRIO =======
    @PatchMapping("/{id}/inativar")
    public ResponseEntity<UsuarioDTO> inativar(@PathVariable Long id){
        UsuarioService clienteService = usuarioServiceFactory.getUsuarioService(TipoUsuario.CLIENTE);
        UsuarioDTO clienteInativado = clienteService.inativar(id);

        return ResponseEntity.ok(clienteInativado);
    }

    // ======= EDITAR CLIENTE =======
    @PutMapping("/{id}")
    public ResponseEntity<UsuarioDTO> editar(@PathVariable Long id, @RequestBody @Validated UsuarioEditarDTO usuarioEditarDTO){
        UsuarioService clienteService = usuarioServiceFactory.getUsuarioService(TipoUsuario.CLIENTE);
        UsuarioDTO clienteEditado = clienteService.editar(id, usuarioEditarDTO);

        return ResponseEntity.ok(clienteEditado);
    }
}
