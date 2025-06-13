package com.omarket.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.omarket.dto.UsuarioDTO;
import com.omarket.entity.enum_.TipoUsuario;
import com.omarket.service.UsuarioService;
import com.omarket.service.UsuarioServiceFactory;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/administrador")
@RequiredArgsConstructor
public class AdministradorController {
    // |=======| ATRIBUTOS |=======|
    private final UsuarioServiceFactory usuarioServiceFactory;

    // |=======| MÉTODOS |=======|
    // CRIAR MÉTODO PARA PROMOVER ADMINISTRADOR

    // ======= GET DE UM ADMINISTRADOR =======
    @GetMapping("/{id}")
    public ResponseEntity<UsuarioDTO> buscar(@PathVariable Long id){
        UsuarioService administradorService = usuarioServiceFactory.getUsuarioService(TipoUsuario.ADMINISTRADOR);
        UsuarioDTO usuarioDTO = administradorService.buscar(id);

        return ResponseEntity.ok(usuarioDTO);
    }

    // ======= INATIVAR ADMINISTRADOR =======
    @PatchMapping("/{id}/inativar")
    public ResponseEntity<UsuarioDTO> inativar(@PathVariable Long id){
        UsuarioService administradorService = usuarioServiceFactory.getUsuarioService(TipoUsuario.ADMINISTRADOR);
        UsuarioDTO administradorInativado = administradorService.inativar(id);

        return ResponseEntity.ok(administradorInativado);
    }

    // ======= EDITAR ADMINISTRADOR =======
    @PutMapping("/{id}")
    public ResponseEntity<UsuarioDTO> editar(@PathVariable Long id, @RequestBody @Validated UsuarioDTO usuarioDTO){
        UsuarioService administradorService = usuarioServiceFactory.getUsuarioService(TipoUsuario.ADMINISTRADOR);
        UsuarioDTO administradorEditado = administradorService.editar(id, usuarioDTO);

        return ResponseEntity.ok(administradorEditado);
    }

}
