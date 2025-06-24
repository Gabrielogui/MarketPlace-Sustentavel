package com.omarket.dto.frete.response;

import java.math.BigDecimal;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;

// Ignora quaisquer outros campos que a API possa retornar e que não mapeamos aqui.
@JsonIgnoreProperties(ignoreUnknown = true)
@Getter
@Setter
public class OpcaoFreteResponse {

    private int id;
    private String name;
    private BigDecimal price;

    @JsonProperty("delivery_time")
    private int deliveryTime; // em dias

}
