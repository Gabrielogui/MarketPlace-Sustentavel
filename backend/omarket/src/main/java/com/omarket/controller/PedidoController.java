package com.omarket.controller;

import org.springframework.security.core.Authentication;

import java.net.URI;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.omarket.dto.ItemCarrinhoDTO;
import com.omarket.dto.PedidoDTO;
import com.omarket.dto.pagamento.PagamentoResponseDTO;
import com.omarket.entity.Pedido;
import com.omarket.entity.Usuario;
import com.omarket.security.CustomUserDetails;
import com.omarket.service.PedidoService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/pedidos")
@RequiredArgsConstructor
public class PedidoController {

    private final PedidoService pedidoService;
    
    @PostMapping("/criar")
    public ResponseEntity<PedidoDTO> criarPedido(Authentication authentication, @RequestBody List<ItemCarrinhoDTO> itensCarrinhoDTO) {
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        Usuario cliente = userDetails.getUsuario(); 

        PedidoDTO pedidoCriado = pedidoService.criarPedidoAPartirDoCarrinho(cliente, itensCarrinhoDTO);
        
        // Retorna 201 Created com a localização e os dados do novo pedido
        URI location = ServletUriComponentsBuilder
            .fromCurrentRequest()
            .path("/{id}")
            .buildAndExpand(pedidoCriado.getId())
            .toUri();

        return ResponseEntity.created(location).body(pedidoCriado);
    }
    /* 
    @PostMapping("/{pedidoId}/pagamentos")
    public ResponseEntity<PagamentoResponseDTO> pagarPedido(
        @PathVariable Long pedidoId,
        Authentication authentication) 
    {
            
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        Usuario cliente = userDetails.getUsuario();

        PagamentoResponseDTO dadosPagamento = pedidoService.processarPagamentoDoPedido(pedidoId, cliente);
        
        return ResponseEntity.ok(dadosPagamento);
        
    }*/
}
