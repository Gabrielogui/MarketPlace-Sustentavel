package com.omarket.dto.frete.request;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CalculoFreteRequest {

    private EnderecoCepRequest from;
    private EnderecoCepRequest to;

    // A anotação @JsonProperty é necessária porque "package" é uma palavra reservada do Java.
    // Ela garante que no JSON final, o campo será chamado "package".
    @JsonProperty("package")
    private PacoteRequest pacote;

}
