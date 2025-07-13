package com.omarket.dto.pagamento;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

// Vamos modelar o essencial para um pagamento PIX
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class PagamentoResponseDTO {
    
    private Long id; // ID do pagamento no Mercado Pago
    private String status; // "pending", "approved", "rejected", etc.
    
    @JsonProperty("status_detail")
    private String statusDetail;

    @JsonProperty("point_of_interaction")
    private PointOfInteractionDTO pointOfInteraction;
    
    // Classes aninhadas para representar a estrutura do JSON de resposta
    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class PointOfInteractionDTO {
        @JsonProperty("transaction_data")
        private TransactionDataDTO transactionData;
    }

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class TransactionDataDTO {
        @JsonProperty("qr_code")
        private String qrCode; // O QR Code em formato de texto (copia e cola)

        @JsonProperty("qr_code_base64")
        private String qrCodeBase64; // A imagem do QR Code em Base64
    }
}
