package com.omarket.dto.pagamento;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import java.math.BigDecimal;

@Data
public class PagamentoRequestDTO {
    
    @JsonProperty("transaction_amount")
    private BigDecimal transactionAmount; // Valor total do pagamento

    private String description; // Descrição do pedido

    @JsonProperty("payment_method_id")
    private String paymentMethodId; // Ex: "pix", "master" (cartão)

    private PayerDTO payer; // Dados do pagador

    // Referência externa para ligar este pagamento ao seu pedido no banco de dados
    @JsonProperty("external_reference")
    private String externalReference;
}