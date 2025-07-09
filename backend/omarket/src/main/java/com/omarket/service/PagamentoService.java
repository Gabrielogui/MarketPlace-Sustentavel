package com.omarket.service;

import com.mercadopago.MercadoPagoConfig;
import com.mercadopago.client.common.IdentificationRequest;
import com.mercadopago.client.payment.PaymentClient;
import com.mercadopago.client.payment.PaymentCreateRequest;
import com.mercadopago.client.payment.PaymentPayerRequest;
import com.mercadopago.exceptions.MPApiException;
import com.mercadopago.exceptions.MPException;
import com.mercadopago.resources.payment.Payment;
import com.omarket.dto.pagamento.PagamentoResponseDTO;
import com.omarket.entity.Cliente;
import com.omarket.entity.Pedido;
import com.omarket.entity.Usuario;
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
    public PagamentoResponseDTO criarPagamento(Long pedidoId, Usuario usuario) {
        if (!(usuario instanceof Cliente)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Apenas clientes podem realizar pagamentos.");
        }
        Cliente cliente = (Cliente) usuario;

        Pedido pedido = pedidoRepository.findById(pedidoId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Pedido não encontrado!"));

        if (pedido.getStatus() != StatusPedido.AGUARDANDO_PAGAMENTO) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Este pedido não está aguardando pagamento.");
        }

        try {
            PaymentClient client = new PaymentClient();

            PaymentCreateRequest createRequest = PaymentCreateRequest.builder()
                .transactionAmount(pedido.getValorTotal())
                .description("Pagamento para o pedido " + pedido.getId())
                .paymentMethodId("pix") // ou outro método de pagamento
                .payer(PaymentPayerRequest.builder()
                        .email(cliente.getEmail())
                        .firstName(cliente.getNome())
                        .identification(IdentificationRequest.builder()
                            .type("CPF")
                            .number(cliente.getCpf())
                            .build())
                        .build())
                .build();

            Payment payment = client.create(createRequest);

            // Persistir os dados do pagamento no seu banco de dados
            com.omarket.entity.Pagamento pagamentoEntity = new com.omarket.entity.Pagamento();
            pagamentoEntity.setId(payment.getId()); // Usa o ID do Mercado Pago
            pagamentoEntity.setMetodo(payment.getPaymentMethodId());
            pagamentoEntity.setValorPago(payment.getTransactionAmount());
            pagamentoEntity.setDataPagamento(payment.getDateCreated().toLocalDateTime());
            pagamentoRepository.save(pagamentoEntity);

            // Atualiza o pedido
            pedido.setPagamento(pagamentoEntity);
            pedido.setStatus(StatusPedido.PAGAMENTO_APROVADO); // Ou o status retornado pelo MP
            pedidoRepository.save(pedido);


            return converterParaResponseDTO(payment);

        } catch (MPApiException apiException) {
            throw new ResponseStatusException(HttpStatus.valueOf(apiException.getApiResponse().getStatusCode()), "Erro da API do Mercado Pago: " + apiException.getApiResponse().getContent());
        } catch (MPException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Erro ao processar pagamento com Mercado Pago.", e);
        }
    }

    private PagamentoResponseDTO converterParaResponseDTO(Payment payment) {
        PagamentoResponseDTO dto = new PagamentoResponseDTO();
        dto.setId(payment.getId());
        dto.setStatus(payment.getStatus());
        dto.setStatusDetail(payment.getStatusDetail());

        if (payment.getPointOfInteraction() != null && payment.getPointOfInteraction().getTransactionData() != null) {
            PagamentoResponseDTO.PointOfInteractionDTO poiDTO = new PagamentoResponseDTO.PointOfInteractionDTO();
            PagamentoResponseDTO.TransactionDataDTO transactionDataDTO = new PagamentoResponseDTO.TransactionDataDTO();
            transactionDataDTO.setQrCode(payment.getPointOfInteraction().getTransactionData().getQrCode());
            transactionDataDTO.setQrCodeBase64(payment.getPointOfInteraction().getTransactionData().getQrCodeBase64());
            poiDTO.setTransactionData(transactionDataDTO);
            dto.setPointOfInteraction(poiDTO);
        }

        return dto;
    }
}