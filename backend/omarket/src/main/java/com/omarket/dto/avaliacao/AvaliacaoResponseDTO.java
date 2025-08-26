package com.omarket.dto.avaliacao;

import java.time.LocalDateTime;

import com.omarket.dto.produto.ProdutoDTO;
import com.omarket.dto.usuario.cliente.ClienteDTO;
import com.omarket.entity.Avaliacao;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AvaliacaoResponseDTO {

    private ClienteDTO cliente;
    private ProdutoDTO produto;

    @NotBlank(message = "O comentário precisa ser preenchifo!")
    private String comentario;

    @NotNull(message = "A nota precisa ser preenchida!")
    private Integer nota;

    private LocalDateTime dataModificacao;

}
