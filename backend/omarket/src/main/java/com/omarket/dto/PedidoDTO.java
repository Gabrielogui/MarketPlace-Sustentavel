package com.omarket.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.omarket.dto.frete.FreteDTO;
import com.omarket.dto.pagamento.PagamentoDTO;
import com.omarket.dto.pagamento.PagamentoResponseDTO;
import com.omarket.entity.enum_.StatusPedido;

import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PedidoDTO {
   
    private Long id;

    @NotNull(message = "O status do pedido é obrigatório!")
    private StatusPedido status;

    private LocalDateTime dataPedido;

    @NotNull(message = "Subtotal é obrigatório!")
    @Digits(integer = 9, fraction = 4, message = "O subtotal deve ter no máximo 9 dígitos inteiros e 4 casas decimais.")
    @PositiveOrZero(message = "O subtotal deve ser um valor positivo ou nulo!")
    private BigDecimal valorTotal = BigDecimal.ZERO;
    
    @NotNull(message = "Subtotal é obrigatório!")
    @Digits(integer = 9, fraction = 4, message = "O subtotal deve ter no máximo 9 dígitos inteiros e 4 casas decimais.")
    @PositiveOrZero(message = "O subtotal deve ser um valor positivo ou nulo!")
    private BigDecimal subtotal = BigDecimal.ZERO;

    private FreteDTO frete; 

    private PagamentoDTO pagamento;

    @NotNull(message = "A lista de itens do pedido é obrigatória!")
    private List<ItemPedidoDTO> itens = new ArrayList<>();

    @NotNull(message = "O endereço do pedido é obrigatório!")
    private EnderecoDTO endereco;

    @NotNull(message = "O cliente do pedido é obrigatório!")
    private UsuarioDTO cliente;
}
