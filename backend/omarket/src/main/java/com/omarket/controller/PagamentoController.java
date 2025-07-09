package com.omarket.controller;

import com.omarket.dto.pagamento.PagamentoResponseDTO;
import com.omarket.entity.Usuario;
import com.omarket.security.CustomUserDetails;
import com.omarket.service.PagamentoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/pagamentos")
@RequiredArgsConstructor
public class PagamentoController {

    private final PagamentoService pagamentoService;

    @PostMapping("/pedido/{pedidoId}")
    public ResponseEntity<PagamentoResponseDTO> criarPagamento(
            @PathVariable Long pedidoId,
            Authentication authentication) {

        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        Usuario usuario = userDetails.getUsuario();

        PagamentoResponseDTO responseDTO = pagamentoService.criarPagamento(pedidoId, usuario);

        return ResponseEntity.ok(responseDTO);
    }
}