package com.omarket.dto.avaliacao;

import java.time.LocalDateTime;

import com.omarket.entity.Avaliacao;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AvaliacaoDTO {
    private Long clienteId;
    private Long produtoId;

    @NotBlank(message = "O comentário precisa ser preenchifo!")
    private String comentario;

    @NotNull(message = "A nota precisa ser preenchida!")
    private Integer nota;

    private LocalDateTime dataModificacao;

    public AvaliacaoDTO(){ }

    public AvaliacaoDTO(Avaliacao avaliacao){
        this.clienteId       = avaliacao.getCliente().getId();
        this.produtoId       = avaliacao.getProduto().getId();
        this.comentario      = avaliacao.getComentario();
        this.nota            = avaliacao.getNota();
        this.dataModificacao = avaliacao.getDataModificacao();
    }
}
