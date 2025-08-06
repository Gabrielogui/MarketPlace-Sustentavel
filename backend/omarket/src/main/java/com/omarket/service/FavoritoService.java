package com.omarket.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.omarket.dto.ProdutoDTO;
import com.omarket.dto.favorito.FavoritoRequestDTO;
import com.omarket.dto.favorito.FavoritoResponseDTO;
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

    // |=======| ATRIBUTOS DE SERVICE |=======|
    private final ProdutoService produtoService;

    // |=======| MÉTODO PARA FAVORITAR O PRODUTO |=======|
    @Transactional
    public FavoritoRequestDTO favoritar(FavoritoRequestDTO favoritoDTO) {
        
        Cliente cliente = clienteRepository.findById(favoritoDTO.getClienteId())
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente não encontrado!"));

        Produto produto = produtoRepository.findById(favoritoDTO.getProdutoId())
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Produto não encontrado!"));

        Favorito favorito = new Favorito();

        favorito.setCliente(cliente);
        favorito.setProduto(produto);

        favoritoRepository.save(favorito);

        return converterParaRequestDTO(favorito);
    }

    // |=======| MÉTODO PARA DESFAVORITAR (DELETAR) |=======|
    public void desfavoritar(Long id) {
        Favorito favorito = favoritoRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Favorito não encontrado"));

        favoritoRepository.delete(favorito);
    }

    // |=======| MÉTODO PARA LISTAR OS FAVORITOS DE UM CLIENTE |=======|
    public List<FavoritoResponseDTO> listarFavoritoPorCliente(Long clienteId) {
        Cliente cliente = clienteRepository.findById(clienteId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente não encontrado!"));

        List<Favorito> favoritos = favoritoRepository.findByCliente(cliente);
        if(favoritos.isEmpty()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente não favoritou nenhum produto ainda!");
        }

        List<FavoritoResponseDTO> favoritosResponseDTO = favoritos.stream().map(this::converterParaResponseDTO).toList();
        return favoritosResponseDTO;
    }

    // |=======| MÉTODO PARA CONVERTER PARA REQUEST DTO |=======|
    public FavoritoRequestDTO converterParaRequestDTO(Favorito favorito){
        FavoritoRequestDTO favoritoDTO = new FavoritoRequestDTO();

        favoritoDTO.setId(favorito.getId());
        favoritoDTO.setClienteId(favorito.getCliente().getId());
        favoritoDTO.setProdutoId(favorito.getProduto().getId());

        return favoritoDTO;
    }

    // |=======| MÉTODO PARA CONVERTER PARA RESPONSE DTO |=======|
    public FavoritoResponseDTO converterParaResponseDTO(Favorito favorito){
        FavoritoResponseDTO favoritoResponseDTO = new FavoritoResponseDTO();

        favoritoResponseDTO.setId(favorito.getId());
        favoritoResponseDTO.setClienteId(favorito.getCliente().getId());

        ProdutoDTO produtoDTO = produtoService.converterParaDTO(favorito.getProduto());

        favoritoResponseDTO.setProdutoDTO(produtoDTO);

        return favoritoResponseDTO;
    }

}
