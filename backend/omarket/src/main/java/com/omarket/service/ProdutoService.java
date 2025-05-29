package com.omarket.service;

import java.util.ArrayList;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.omarket.dto.ProdutoDTO;
import com.omarket.entity.Categoria;
import com.omarket.entity.Fornecedor;
import com.omarket.entity.ImagemProduto;
import com.omarket.entity.Produto;
import com.omarket.repository.CategoriaRepository;
import com.omarket.repository.FornecedorRepository;
import com.omarket.repository.ProdutoRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProdutoService {

    private final ProdutoRepository produtoRepository;
    private final CategoriaRepository categoriaRepository;
    private final FornecedorRepository fornecedorRepository;

    @Transactional
    public ProdutoDTO cadastrar(ProdutoDTO produtoDTO) {
        Produto produto = new Produto();
        produto.setNome(produtoDTO.getNome());
        produto.setDescricao(produtoDTO.getDescricao());
        produto.setPreco(produtoDTO.getPreco());
        produto.setEstoque(produtoDTO.getEstoque());
        produto.setStatus("INATIVO");
        Categoria categoria = categoriaRepository.findById(produtoDTO.getCategoriaId())
            .orElseThrow(() -> new RuntimeException("Categoria não encontrada com o ID: " + produtoDTO.getCategoriaId()));
        produto.setCategoria(categoria);
        Fornecedor fornecedor = fornecedorRepository.findById(produtoDTO.getFornecedorId())
            .orElseThrow(() -> new RuntimeException("Fornecedor não encontrado com o ID: " + produtoDTO.getFornecedorId()));
        produto.setFornecedor(fornecedor);
        produto.setImagens(new ArrayList<ImagemProduto>());
        
        // Salva o novo produto
        produtoRepository.save(produto);

    

        return converterParaDTO(produto);
    }

    @Transactional
    public ProdutoDTO visualizar(Long id){
        Produto produto = produtoRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Produto não encontrado!"));

        return converterParaDTO(produto);
    }

    private ProdutoDTO converterParaDTO(Produto produto) {
        ProdutoDTO produtoDTO = new ProdutoDTO();
        produtoDTO.setId(produto.getId());
        produtoDTO.setNome(produto.getNome());
        produtoDTO.setDescricao(produto.getDescricao());
        produtoDTO.setPreco(produto.getPreco());
        produtoDTO.setEstoque(produto.getEstoque());
        produtoDTO.setStatus(produto.getStatus());
        produtoDTO.setCategoriaId(produto.getCategoria().getId());
        produtoDTO.setFornecedorId(produto.getFornecedor().getId());
        
        // Converte as imagens, se necessário
        if (produto.getImagens() != null && !produto.getImagens().isEmpty()) {
            produtoDTO.setImagens(produto.getImagens().stream()
                .map(ImagemProdutoService::converterParaDTO) // Usa o método de conversão aqui
                // .map(imagem -> converterImagemParaDTO(imagem)) // Alternativa se não usar method reference
                .toList());
        } else {
            produtoDTO.setImagens(new ArrayList<>()); // Define uma lista vazia se não houver imagens
        }

        return produtoDTO;
    }
}
