package com.omarket.service;

import com.mercadopago.MercadoPagoConfig;
import com.mercadopago.client.common.IdentificationRequest;
import com.mercadopago.client.payment.PaymentClient;
import com.mercadopago.client.payment.PaymentCreateRequest;
import com.mercadopago.client.payment.PaymentPayerRequest;
import com.mercadopago.exceptions.MPApiException;
import com.mercadopago.exceptions.MPException;
import com.mercadopago.resources.payment.Payment;
import com.omarket.dto.pagamento.PagamentoDTO;
import com.omarket.dto.pagamento.PagamentoResponseDTO;
import com.omarket.entity.Cliente;
import com.omarket.entity.Pagamento;
import com.omarket.entity.Pedido;
import com.omarket.entity.Usuario;
import com.omarket.entity.enum_.StatusPagamento;
import com.omarket.entity.enum_.StatusPedido;
import com.omarket.repository.PagamentoRepository;
import com.omarket.repository.PedidoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import jakarta.annotation.PostConstruct;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.concurrent.ThreadLocalRandom;

@Service
@RequiredArgsConstructor
public class PagamentoService {

    private final PedidoRepository pedidoRepository;
    private final PagamentoRepository pagamentoRepository; // Supondo que você tenha este repositório

    @Value("${mercadopago.access.token}")
    private String mercadoPagoAccessToken;

    @PostConstruct
    public void init() {
        MercadoPagoConfig.setAccessToken(mercadoPagoAccessToken);
    }

    @Transactional
    public PagamentoDTO criarPagamento(Long pedidoId, Usuario usuario) {
        if (!(usuario instanceof Cliente)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Apenas clientes podem realizar pagamentos.");
        }

        Cliente cliente = (Cliente) usuario;

        if (cliente.getCpf() == null || cliente.getCpf().trim().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "O CPF do cliente é obrigatório para realizar o pagamento.");
        }

        Pedido pedido = pedidoRepository.findById(pedidoId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Pedido não encontrado!"));

        if (pedido.getStatus() != StatusPedido.AGUARDANDO_PAGAMENTO) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Este pedido não está aguardando pagamento.");
        }

        //try {
           /*  PaymentClient client = new PaymentClient();

            // --- Lógica CORRETA de pagamento com Token de Cartão de Teste ---
            PaymentCreateRequest createRequest = PaymentCreateRequest.builder()
                .transactionAmount(pedido.getValorTotal())
                .token("6e32f14a3f53b5a97edda8c4d89bb8ae") // Token de cartão de teste que sempre aprova
                .description("Pagamento para o pedido #" + pedido.getId())
                .installments(1)
                .paymentMethodId("visa")
                .payer(PaymentPayerRequest.builder()
                        // E-mail de um comprador de teste genérico
                        .email("test_user_12345678@testuser.com") 
                        .build())
                .build();

            Payment payment = client.create(createRequest);

            // Verifica se o pagamento foi aprovado
            if (!"approved".equals(payment.getStatus())) {
                 throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Pagamento não aprovado. Status: " + payment.getStatusDetail());
            }
                 */

            Pagamento pagamento = new Pagamento();
            long mockMercadoPagoId = ThreadLocalRandom.current().nextLong(-1_000_000L, -1L);
            pagamento.setMercadoPagoId(mockMercadoPagoId);
            pagamento.setMetodo("mock");
            pagamento.setValorPago(pedido.getValorTotal());
            pagamento.setDataPagamento(LocalDateTime.now());
            pagamento.setStatus(StatusPagamento.APROVADO); // Simulando pagamento aprovado
            pagamentoRepository.save(pagamento);

            pedido.setPagamento(pagamento);
            pedido.setStatus(StatusPedido.PAGAMENTO_APROVADO);
            pedidoRepository.save(pedido);

            return converterParaDTO(pagamento);

        /* } catch (MPApiException apiException) {
            // Tratamento de erro mais detalhado
            System.err.println("Erro da API do Mercado Pago: " + apiException.getApiResponse().getContent());
            throw new ResponseStatusException(HttpStatus.valueOf(apiException.getApiResponse().getStatusCode()), "Erro da API do Mercado Pago: " + apiException.getApiResponse().getContent());
        } catch (MPException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Erro ao processar pagamento com Mercado Pago.", e);
        } */
    }

    @Transactional
    public PagamentoDTO cancelarPagamento(Long pedidoId) {
        Pedido pedido = pedidoRepository.findById(pedidoId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Pedido não encontrado para cancelar pagamento."));

        Pagamento pagamento = pedido.getPagamento();
        if (pagamento == null) {
            // Se não há pagamento, não há o que cancelar.
            // Isso pode acontecer se o pedido for cancelado antes mesmo de tentar pagar.
            return null;
        }

        if (pagamento.getStatus() == StatusPagamento.REEMBOLSADO) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Este pagamento já foi cancelado.");
        }
        
        // --- Lógica de Cancelamento (MOCK) ---
        // Em um cenário real, aqui você chamaria a API do Mercado Pago para estornar o pagamento.
        // Exemplo (não funcional, apenas para ilustração):
        /*
        try {
            PaymentClient client = new PaymentClient();
            Payment cancelledPayment = client.cancel(pagamento.getMercadoPagoId());
            if ("cancelled".equals(cancelledPayment.getStatus())) {
                 pagamento.setStatus(StatusPagamento.CANCELADO);
            }
        } catch (MPException | MPApiException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Erro ao cancelar pagamento no gateway.", e);
        }
        */

        // Para nosso mock, simplesmente atualizamos o status.
        pagamento.setStatus(StatusPagamento.REEMBOLSADO);
        pagamento.setDataPagamento(LocalDateTime.now()); // Atualiza a data do pagamento para o cancelamento
        Pagamento pagamentoCancelado = pagamentoRepository.save(pagamento);

        return converterParaDTO(pagamentoCancelado);
    }

    

    public PagamentoDTO converterParaDTO(Pagamento pagamento) {
        PagamentoDTO dto = new PagamentoDTO();
        dto.setId(pagamento.getId());
        dto.setMetodo(pagamento.getMetodo());
        dto.setValorPago(pagamento.getValorPago());
        dto.setDataPagamento(pagamento.getDataPagamento());
        dto.setMercadoPagoId(pagamento.getMercadoPagoId()); // ID do Mercado Pago
        return dto;
    }

    private PagamentoResponseDTO converterParaResponseDTO(Payment payment) {
        PagamentoResponseDTO dto = new PagamentoResponseDTO();
        dto.setId(payment.getId());
        dto.setStatus(payment.getStatus());
        dto.setStatusDetail(payment.getStatusDetail());
        return dto;
    }
}