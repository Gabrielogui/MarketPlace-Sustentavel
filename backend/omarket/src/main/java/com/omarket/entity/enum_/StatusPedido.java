package com.omarket.entity.enum_;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum StatusPedido {
    
    AGUARDANDO_PAGAMENTO("Aguardando Pagamento"),
    PAGAMENTO_APROVADO("Pagamento Aprovado"),
    EM_SEPARACAO("Em Separação"),
    ENVIADO("Enviado"),
    ENTREGUE("Entregue"),
    FINALIZADO("Finalizado"),
    PAGAMENTO_RECUSADO("Pagamento Recusado"),
    CANCELADO("Cancelado"),
    AGUARDANDO_DEVOLUCAO("Aguardando Devolução"),
    DEVOLVIDO("Devolvido"),
    REEMBOLSADO("Reembolsado");

    private final String descricao;
}
