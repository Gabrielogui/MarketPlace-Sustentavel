package com.omarket.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.omarket.dto.EnderecoDTO;
import com.omarket.entity.Endereco;
import com.omarket.repository.EnderecoRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EnderecoService {

    private final EnderecoRepository enderecoRepository;

    @Transactional
    public EnderecoDTO cadastrar(EnderecoDTO enderecoDTO) {
        Endereco endereco = new Endereco();
        endereco.setCep(enderecoDTO.getCep());
        endereco.setComplemento(enderecoDTO.getComplemento());
        endereco.setNumero(enderecoDTO.getNumero());
        // Cria e salva o novo endereço
        enderecoRepository.save(endereco);

        return conventerParaDTO(endereco);
    }

    @Transactional(readOnly = true)
    public EnderecoDTO buscarPorId(Long id) {
        Endereco endereco = enderecoRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Endereço não encontrado com o ID: " + id));
        return conventerParaDTO(endereco);
    }

    @Transactional
    public EnderecoDTO editar(Long id, EnderecoDTO enderecoDTO) {
        Endereco endereco = enderecoRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Endereço não encontrado com o ID: " + id));

        // Atualiza os campos do endereço
        endereco.setCep(enderecoDTO.getCep());
        endereco.setComplemento(enderecoDTO.getComplemento());
        endereco.setNumero(enderecoDTO.getNumero());

        return conventerParaDTO(endereco);
    }

    private EnderecoDTO conventerParaDTO(Endereco endereco) {
        EnderecoDTO enderecoDTO = new EnderecoDTO();
        enderecoDTO.setId(endereco.getId());
        enderecoDTO.setCep(endereco.getCep());
        enderecoDTO.setComplemento(endereco.getComplemento());
        enderecoDTO.setNumero(endereco.getNumero());
        return enderecoDTO;
    }
}
