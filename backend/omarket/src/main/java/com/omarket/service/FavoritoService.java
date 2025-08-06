package com.omarket.service;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.omarket.dto.FavoritoDTO;
import com.omarket.entity.Cliente;
import com.omarket.entity.Favorito;
import com.omarket.entity.Produto;
import com.omarket.repository.ClienteRepository;
import com.omarket.repository.FavoritoRepository;
import com.omarket.repository.ProdutoRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FavoritoService {
    
    // |=======| ATRIBUTOS DE REPOSITORY |=======|
    private final FavoritoRepository favoritoRepository;
    private final ClienteRepository clienteRepository;
    private final ProdutoRepository produtoRepository;

    // |=======| MÉTODO PARA FAVORITAR O PRODUTO |=======|
    @Transactional
    public FavoritoDTO favoritar(FavoritoDTO favoritoDTO) {
        
        Cliente cliente = clienteRepository.findById(favoritoDTO.getClienteId())
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente não encontrado!"));

        Produto produto = produtoRepository.findById(favoritoDTO.getProdutoId())
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Produto não encontrado!"));

        Favorito favorito = new Favorito();

        favorito.setCliente(cliente);
        favorito.setProduto(produto);

        favoritoRepository.save(favorito);

        return converterParaDTO(favorito);
    }

    // |=======| MÉTODO PARA CONVERTER PARA DTO |=======|
    public FavoritoDTO converterParaDTO(Favorito favorito){
        FavoritoDTO favoritoDTO = new FavoritoDTO();

        favoritoDTO.setId(favorito.getId());
        favoritoDTO.setClienteId(favorito.getCliente().getId());
        favoritoDTO.setProdutoId(favorito.getProduto().getId());

        return favoritoDTO;
    }

}
