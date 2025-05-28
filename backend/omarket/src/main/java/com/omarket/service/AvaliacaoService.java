package com.omarket.service;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.omarket.dto.AvaliacaoDTO;
import com.omarket.entity.Avaliacao;
import com.omarket.entity.Cliente;
import com.omarket.entity.Produto;
import com.omarket.entity.id.AvaliacaoId;
import com.omarket.repository.AvaliacaoRepository;
import com.omarket.repository.ClienteRepository;
import com.omarket.repository.ProdutoRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AvaliacaoService {

    // |=======| ATRIBUTOS |=======|
    private final AvaliacaoRepository avaliacaoRepository;
    private final ClienteRepository clienteRepository;
    private final ProdutoRepository produtoRepository;

    // |=======| MÉTODOS |=======|
    public AvaliacaoDTO adicionar(AvaliacaoDTO avaliacaoDTO){

        Cliente cliente = clienteRepository.findById(avaliacaoDTO.getClienteId())
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente não encontrado!"));

        Produto produto = produtoRepository.findById(avaliacaoDTO.getProdutoId())
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Produto não encontrado!"));

        Avaliacao avaliacao = new Avaliacao();
        
        avaliacao.setCliente(cliente);
        avaliacao.setProduto(produto);
        avaliacao.setComentario(avaliacaoDTO.getComentario());
        avaliacao.setNota(avaliacaoDTO.getNota());

        LocalDateTime dataHoraCriacao = LocalDateTime.now(); 
        avaliacao.setDataModificacao(dataHoraCriacao);

        return converterParaDTO(avaliacao);
    }

    // MÉTODO DE DELETAR AVALIAÇÃO
    public void deletar(Long clienteId, Long produtoId){
        AvaliacaoId id = new AvaliacaoId();
        
        id.setCliente(clienteRepository.findById(clienteId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente não encontrado!")));
        id.setProduto(produtoRepository.findById(produtoId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Produto não encontrado!")));

        Avaliacao avaliacao = avaliacaoRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Avaliação não encontrada!"));
    
        avaliacaoRepository.delete(avaliacao);
    }

    // MÉTODO DE CONVERTER PARA DTO
    public AvaliacaoDTO converterParaDTO(Avaliacao avaliacao){
        AvaliacaoDTO avaliacaoDTO = new AvaliacaoDTO();

        avaliacaoDTO.setClienteId(avaliacao.getCliente().getId());
        avaliacaoDTO.setProdutoId(avaliacao.getProduto().getId());
        avaliacaoDTO.setComentario(avaliacao.getComentario());
        avaliacaoDTO.setNota(avaliacao.getNota());
        avaliacaoDTO.setDataModificacao(avaliacao.getDataModificacao());

        return avaliacaoDTO;
    }
}
