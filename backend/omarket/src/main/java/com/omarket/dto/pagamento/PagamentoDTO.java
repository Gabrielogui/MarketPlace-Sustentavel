package com.omarket.dto.pagamento;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PagamentoDTO {

    private Long id;
    private String metodo; // Ex: "Cartão de Crédito", "Boleto", etc.
    //private String status; // Ex: "Pendente", "Aprovado", "Recusado"
    private LocalDateTime dataPagamento; // Data do pagamento no formato ISO 8601
    private BigDecimal valorPago; // Valor pago no formato monetário
    private Long mercadoPagoId; // ID externo do Mercado Pago, se aplicável
}
