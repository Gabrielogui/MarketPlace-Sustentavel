package com.omarket.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.omarket.dto.avaliacao.AvaliacaoDTO;
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
    private final ClienteService clienteService; 
    private final ProdutoService produtoService;

    // |=======| MÉTODOS |=======|
    @Transactional
    public AvaliacaoDTO adicionar(AvaliacaoDTO avaliacaoDTO){

        Cliente cliente = clienteRepository.findById(avaliacaoDTO.getCliente().getId())
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente não encontrado!"));

        Produto produto = produtoRepository.findById(avaliacaoDTO.getProduto().getId())
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Produto não encontrado!"));

        Avaliacao avaliacao = new Avaliacao();
        
        avaliacao.setCliente(cliente);
        avaliacao.setProduto(produto);
        avaliacao.setComentario(avaliacaoDTO.getComentario());
        avaliacao.setNota(avaliacaoDTO.getNota());

        LocalDateTime dataHoraCriacao = LocalDateTime.now(); 
        avaliacao.setDataModificacao(dataHoraCriacao);

        avaliacaoRepository.save(avaliacao);

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

    // MÉTODO DE LISTAR TODAS AS AVALIAÇÕES POR CLIENTE (REFATORADO)
    @Transactional(readOnly = true)
    public List<AvaliacaoDTO> listarPorCliente(Long clienteId) {
        Cliente cliente = clienteRepository.findById(clienteId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente não encontrado!"));

        List<Avaliacao> avaliacoes = avaliacaoRepository.findByIdCliente(cliente);

        // Substituímos a criação direta do DTO pela chamada ao nosso novo método conversor
        return avaliacoes.stream()
                        .map(this::converterParaDTO)
                        .toList();
    }

    // MÉTODO DE LISTAR TODAS AS AVALIAÇÕES POR PRODUTO (REFATORADO)
    @Transactional(readOnly = true)
    public List<AvaliacaoDTO> listarPorProduto(Long produtoId) {
        Produto produto = produtoRepository.findById(produtoId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Produto não encontrado!"));

        List<Avaliacao> avaliacoes = avaliacaoRepository.findByIdProduto(produto);

        // Usamos a mesma abordagem aqui
        return avaliacoes.stream()
                        .map(this::converterParaDTO)
                        .toList();
    }

    // MÉTODO DE CONVERTER PARA DTO
    private AvaliacaoDTO converterParaDTO(Avaliacao avaliacao) {
    if (avaliacao == null) {
        return null;
    }

    AvaliacaoDTO dto = new AvaliacaoDTO();
    dto.setComentario(avaliacao.getComentario());
    dto.setNota(avaliacao.getNota());
    dto.setDataModificacao(avaliacao.getDataModificacao());

    // Usamos os serviços injetados para converter as entidades relacionadas
    if (avaliacao.getCliente() != null) {
        // Supondo que ClienteService tenha um método converterParaDTO
        dto.setCliente(clienteService.converterParaClienteDTO(avaliacao.getCliente()));
    }
    
    if (avaliacao.getProduto() != null) {
        // Usamos o converterParaDTO que já existe no ProdutoService
        dto.setProduto(produtoService.converterParaDTO(avaliacao.getProduto()));
    }

    return dto;
}
}
