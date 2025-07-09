package com.omarket.dto.frete.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PacoteRequest {

    private Double weight;
    private Double width;
    private Double height;
    private Double length;

    public PacoteRequest() {
        this.weight = 20.0;
        this.width = 20.0;
        this.height = 20.0;
        this.length = 20.0;
    }

}
