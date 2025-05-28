package com.omarket.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
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
    @Transactional
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
    @Transactional
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

    // MÉTODO DE EDITAR UMA AVALIAÇÃO
    @Transactional
    public AvaliacaoDTO editar(Long clienteId, Long produtoId, AvaliacaoDTO avaliacaoDTO){
        
        AvaliacaoId id = new AvaliacaoId();

        Cliente cliente = clienteRepository.findById(clienteId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente não encontrado!"));

        Produto produto = produtoRepository.findById(produtoId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Produto não encontrado!"));
     
        id.setCliente(cliente);
        id.setProduto(produto);

        Avaliacao avaliacao = avaliacaoRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Avaliação não encontrada!"));

        avaliacao.setComentario(avaliacaoDTO.getComentario());
        avaliacao.setNota(avaliacaoDTO.getNota());

        LocalDateTime dataHoraCriacao = LocalDateTime.now(); 
        avaliacao.setDataModificacao(dataHoraCriacao); 

        return converterParaDTO(avaliacao);
    }

    // MÉTODO DE LISTAR TODAS AS AVALIAÇÕES POR CLIENTE
    @Transactional(readOnly = true)
    public List<AvaliacaoDTO> listarPorCliente(Long clienteId){
        
         Cliente cliente = clienteRepository.findById(clienteId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente não encontrado!"));

        List<Avaliacao> avaliacoes = avaliacaoRepository.findByIdCliente(cliente);
        List<AvaliacaoDTO> avaliacoesDTO = avaliacoes.stream().map((avaliacao) -> new AvaliacaoDTO(avaliacao)).toList();
        return avaliacoesDTO;
    }

    // MÉTODO DE LISTAR TODAS AS AVALIAÇÕES POR PRODUTO
    @Transactional(readOnly = true)
    public List<AvaliacaoDTO> listarPorProduto(Long produtoId){
        Produto produto = produtoRepository.findById(produtoId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Produto não encontrado!"));

        List<Avaliacao> avaliacoes = avaliacaoRepository.findByIdProduto(produto);
        List<AvaliacaoDTO> avaliacoesDTO = avaliacoes.stream().map((avaliacao) -> new AvaliacaoDTO(avaliacao)).toList();
        return avaliacoesDTO;
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
