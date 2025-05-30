package com.omarket.service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

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

    @Transactional(readOnly = true)
    public ProdutoDTO visualizar(Long id){
        Produto produto = produtoRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Produto não encontrado!"));

        return converterParaDTO(produto);
    }

    @Transactional(readOnly = true)
    public List<ProdutoDTO> listar(){
        List<Produto> produtos = produtoRepository.findAll(); 
        List<ProdutoDTO> produtosDTO = produtos.stream().map(this::converterParaDTO).toList();
        return produtosDTO;
    }

    @Transactional(readOnly = true)
    public List<ProdutoDTO> listarPorFornecedor(Long fornecedorId){
        Fornecedor fornecedor = fornecedorRepository.findById(fornecedorId)
            .orElseThrow(() -> (new ResponseStatusException(HttpStatus.NOT_FOUND, "Fornecedor não encontrado!")));

        List<Produto> produtos = produtoRepository.findByFornecedor(fornecedor);
        if (produtos.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Nenhum produto encontrado para a categoria com ID: " + fornecedorId);
        }
        List<ProdutoDTO> produtosDTO = produtos.stream().map(this::converterParaDTO).toList();
        return produtosDTO;
        
    }

    @Transactional(readOnly = true)
    public List<ProdutoDTO> listarPorCategoria(Long categoriaId){
        Categoria categoria = categoriaRepository.findById(categoriaId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Categoria não encontrada!"));

        List<Produto> produtos = produtoRepository.findByCategoria(categoria);
        if (produtos.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Nenhum produto encontrado para a categoria com ID: " + categoriaId);
        }
        
        List<ProdutoDTO> produtosDTO = produtos.stream().map(this::converterParaDTO).toList();
        return produtosDTO;
    }

    @Transactional
    public ProdutoDTO ativar(Long id) {
        Produto produto = produtoRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Produto não encontrado!"));

        produto.setStatus("ATIVO");

        return converterParaDTO(produto);
    }

    @Transactional
    public ProdutoDTO editar(Long id, ProdutoDTO produtoDTO) {
        Produto produto = produtoRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Produto não encontrado!"));

        // Atualiza os campos do produto
        produto.setNome(produtoDTO.getNome());
        produto.setDescricao(produtoDTO.getDescricao());
        produto.setPreco(produtoDTO.getPreco());
        produto.setEstoque(produtoDTO.getEstoque());
        
        // Atualiza a categoria e o fornecedor
        Categoria categoria = categoriaRepository.findById(produtoDTO.getCategoriaId())
            .orElseThrow(() -> new RuntimeException("Categoria não encontrada com o ID: " + produtoDTO.getCategoriaId()));
        produto.setCategoria(categoria);
        
        Fornecedor fornecedor = fornecedorRepository.findById(produtoDTO.getFornecedorId())
            .orElseThrow(() -> new RuntimeException("Fornecedor não encontrado com o ID: " + produtoDTO.getFornecedorId()));
        produto.setFornecedor(fornecedor);

        return converterParaDTO(produto);
    }

    @Transactional(readOnly = true)
    public List<ProdutoDTO> buscarPorNome(String nome) {
        List<Produto> produtos = produtoRepository.findByNomeContainingIgnoreCase(nome);
        if (produtos.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Nenhum produto encontrado com o nome: " + nome);
        }
        return produtos.stream().map(this::converterParaDTO).toList();
    }

    @Transactional(readOnly = true)
    public List<ProdutoDTO> filtrar(BigDecimal precoMin, BigDecimal precoMax, Integer notaMin, String order){
        // 1) Define os valores padrão, caso não venham da requisição
        BigDecimal min = precoMin != null ? precoMin : BigDecimal.ZERO;
        BigDecimal max = precoMax != null ? precoMax : BigDecimal.valueOf(Double.MAX_VALUE);
        Double minNota = notaMin != null ? notaMin.doubleValue() : 0.0;
        boolean asc = !"desc".equalsIgnoreCase(order);

        // 2) Chama o repositório com método custom (veja método @Query mais abaixo)
        Sort sort = Sort.by(asc ? Sort.Direction.ASC : Sort.Direction.DESC, "preco");
        List<Produto> produtos = produtoRepository
            .filtrarEOrdenar(min, max, sort);

        // 3) Converte para DTO e retorna
        return produtos.stream()
                       .map(this::converterParaDTO)
                       .toList();
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
