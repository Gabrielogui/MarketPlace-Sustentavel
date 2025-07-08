package com.omarket.service;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.*;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import com.omarket.dto.frete.FreteDTO;
import com.omarket.dto.frete.request.CalculoFreteRequest;
import com.omarket.dto.frete.request.EnderecoCepRequest;
import com.omarket.dto.frete.request.PacoteRequest;
import com.omarket.dto.frete.response.OpcaoFreteResponse;
import com.omarket.entity.Frete;
import com.omarket.event.FreteSelecionadoEvent;
import com.omarket.repository.FreteRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class FreteService {
    
    private final RestTemplate restTemplate = new RestTemplate();
    private final FreteRepository freteRepository;
    private final ApplicationEventPublisher eventPublisher;

    @Value("${melhorenvio.api.url}")
    private String apiUrl;

    @Value("${melhorenvio.api.token}")
    private String apiToken;

    public List<OpcaoFreteResponse> calcularFrete(String cepOrigem, String cepDestino, PacoteRequest pacote) {
        
        // 1. Monta o corpo da requisição com os dados recebidos
        EnderecoCepRequest from = new EnderecoCepRequest(cepOrigem);
        EnderecoCepRequest to = new EnderecoCepRequest(cepDestino);
        CalculoFreteRequest requestBody = new CalculoFreteRequest(from, to, pacote);

        // 2. Monta os headers com o token de autenticação
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + apiToken);
        headers.set("Accept", "application/json");
        headers.set("User-Agent", "Aplicação OMarket (luizvinicius128@gmail.com)"); // Boa prática
        headers.setContentType(MediaType.APPLICATION_JSON);

        // 3. Cria a entidade da requisição HTTP
        HttpEntity<CalculoFreteRequest> requestEntity = new HttpEntity<>(requestBody, headers);

        try {
            // 4. Executa a chamada POST para a API
            ResponseEntity<OpcaoFreteResponse[]> response = restTemplate.exchange(
                apiUrl,
                HttpMethod.POST,
                requestEntity,
                OpcaoFreteResponse[].class // Esperamos receber um array de opções de frete
            );
            
            // 5. Se a resposta for bem-sucedida, retorna a lista de opções
            if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                // Retorna lista de opções de frete
                return Arrays.asList(response.getBody());
            }

        } catch (HttpClientErrorException e) {
            // Em caso de erro (ex: CEP inválido), loga o erro e continua
            System.err.println("Erro ao chamar API de frete: " + e.getStatusCode() + " - " + e.getResponseBodyAsString());
        }
        
        // Retorna uma lista vazia se a chamada falhar
        return Collections.emptyList();
    }

    @Transactional
    public FreteDTO selecionarOpcaoFrete(OpcaoFreteResponse opcaoFrete, Long pedidoId) {

        if (opcaoFrete == null || pedidoId == null) {
            throw new IllegalArgumentException("A opção de frete e o ID do pedido não podem ser nulos.");
        }
        
        Frete frete = new Frete();
        frete.setValor(opcaoFrete.getPrice());
        frete.setPrazoEntrega(opcaoFrete.getDeliveryTime());
        frete.setNome(opcaoFrete.getName());

        Frete freteSalvo = freteRepository.save(frete);

        eventPublisher.publishEvent(new FreteSelecionadoEvent(freteSalvo, pedidoId));
        
        return converterParaDTO(frete);
    }

    public FreteDTO converterParaDTO(Frete frete) {
        FreteDTO freteDTO = new FreteDTO();
        freteDTO.setValor(frete.getValor());
        freteDTO.setPrazoEntrega(frete.getPrazoEntrega());
        freteDTO.setNome(frete.getNome());
        freteDTO.setId(frete.getId());
        return freteDTO;
    }
}
