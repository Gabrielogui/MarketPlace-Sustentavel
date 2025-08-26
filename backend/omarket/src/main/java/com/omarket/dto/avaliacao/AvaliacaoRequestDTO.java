package com.omarket.dto.avaliacao;

import java.time.LocalDateTime;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AvaliacaoRequestDTO {
    
    private Long clienteId;
    private Long produtoId;

    @NotBlank(message = "O comentário precisa ser preenchifo!")
    private String comentario;

    @NotNull(message = "A nota precisa ser preenchida!")
    private Integer nota;

    private LocalDateTime dataModificacao;

}
