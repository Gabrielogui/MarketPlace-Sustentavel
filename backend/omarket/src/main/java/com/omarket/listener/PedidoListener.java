package com.omarket.listener;

import java.math.BigDecimal;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;
import org.springframework.web.server.ResponseStatusException;

import com.omarket.entity.Frete;
import com.omarket.entity.Pedido;
import com.omarket.event.FreteSelecionadoEvent;
import com.omarket.repository.PedidoRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class PedidoListener {

    private final PedidoRepository pedidoRepository;

    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void handleFreteSelecionado(FreteSelecionadoEvent event) {
        Long pedidoId = event.getPedidoId();
        Frete frete = event.getFrete();

        System.out.println("Listener 'handleFreteSelecionado' ativado para o pedido ID: " + pedidoId);

        // 1. Busca o pedido que precisa ser atualizado
        Pedido pedido = pedidoRepository.findById(pedidoId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, 
                "Pedido com ID " + pedidoId + " não encontrado para associar o frete."));

        // 2. Associa o frete ao pedido
        pedido.setFrete(frete);
        
        // 3. ATUALIZA O VALOR TOTAL DO PEDIDO para incluir o frete
        // (Supondo que `valorTotal` inicialmente continha apenas o subtotal dos produtos)
        BigDecimal valorTotalAnterior = pedido.getValorTotal();
        BigDecimal valorDoFrete = frete.getValor();
        pedido.setValorTotal(valorTotalAnterior.add(valorDoFrete));
        
        // 4. Salva o pedido atualizado
        pedidoRepository.save(pedido);
        
        System.out.println("Frete ID " + frete.getId() + " associado ao Pedido ID " + pedido.getId() + ". Novo valor total: " + pedido.getValorTotal());
    }
}