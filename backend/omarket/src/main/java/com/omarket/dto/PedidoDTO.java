package com.omarket.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.omarket.dto.frete.FreteDTO;
import com.omarket.entity.enum_.StatusPedido;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PedidoDTO {
   
    private Long id;

    private StatusPedido status;

    private LocalDateTime dataPedido;

    private BigDecimal valorTotal;

    private FreteDTO frete;

    private PagamentoDTO pagamento;

    private EnderecoDTO endereco;

    private CarrinhoDTO carrinho;
}
