package com.omarket.service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.omarket.dto.AdicionarItemRequestDTO;
import com.omarket.dto.AtualizarQuantidadeDTO;
import com.omarket.dto.CarrinhoDTO;
import com.omarket.dto.ItemCarrinhoDTO;
import com.omarket.entity.Carrinho;
import com.omarket.entity.Cliente;
import com.omarket.entity.ItemCarrinho;
import com.omarket.entity.Produto;
import com.omarket.repository.CarrinhoRepository;
import com.omarket.repository.ProdutoRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CarrinhoService {
    private final CarrinhoRepository carrinhoRepository;
    private final ProdutoRepository produtoRepository;

    @Transactional
    // Altere a assinatura do método para aceitar o novo DTO
    public CarrinhoDTO adicionarItemCarrinho(Cliente cliente, AdicionarItemRequestDTO requestDTO) {
        
        // Validação de entrada
        if (requestDTO.getQuantidade() <= 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "A quantidade do item deve ser positiva.");
        }
        
        Carrinho carrinho = carrinhoRepository.findById(cliente.getId())
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Carrinho não encontrado!"));
        
        // Use o produtoId do novo DTO
        Produto produto = produtoRepository.findById(requestDTO.getProdutoId())
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Produto não encontrado!"));

        Optional<ItemCarrinho> itemExistenteOpt = carrinho.getItens().stream()
            .filter(item -> item.getProduto().getId().equals(produto.getId()))
            .findFirst();

        if (itemExistenteOpt.isPresent()) {
            ItemCarrinho itemExistente = itemExistenteOpt.get();
            // Use a quantidade do novo DTO
            itemExistente.setQuantidade(itemExistente.getQuantidade() + requestDTO.getQuantidade());
        } else {
            ItemCarrinho novoItem = new ItemCarrinho();
            novoItem.setProduto(produto);
            novoItem.setQuantidade(requestDTO.getQuantidade()); // Use a quantidade do novo DTO
            novoItem.setCarrinho(carrinho);
            carrinho.getItens().add(novoItem);
        }

        BigDecimal subtotal = calcularSubtotalComEntidades(carrinho.getItens());
        carrinho.setSubtotal(subtotal);
        carrinho.setDataModificacao(LocalDateTime.now());
        
        carrinhoRepository.save(carrinho);

        return converterCarrinhoParaDto(carrinho);
    }

    @Transactional
    public void removerItemCarrinho(Long clienteId, Long produtoId) {
        // 1. Busca o carrinho pelo ID
        Carrinho carrinho = carrinhoRepository.findById(clienteId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Carrinho não encontrado!"));

        // 2. Busca o item do carrinho pelo ID do produto
        ItemCarrinho item = carrinho.getItens().stream()
            .filter(i -> i.getProduto().getId().equals(produtoId))
            .findFirst()
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Item do carrinho não encontrado!"));

        // 3. Remove o item do carrinho
        carrinho.getItens().remove(item);

        // 4. Recalcula o subtotal de forma otimizada, usando as entidades já carregadas
        BigDecimal subtotal = calcularSubtotalComEntidades(carrinho.getItens());
        carrinho.setSubtotal(subtotal);
        carrinho.setDataModificacao(LocalDateTime.now());

        // 5. Salva as alterações no carrinho
        carrinhoRepository.save(carrinho);
    }

    @Transactional
    public CarrinhoDTO atualizarQuantidadeItemCarrinho(Long clienteId, Long produtoId, AtualizarQuantidadeDTO quantidadeDTO) {
        // 1. Busca o carrinho pelo ID
        Carrinho carrinho = carrinhoRepository.findById(clienteId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Carrinho não encontrado!"));

        // 2. Busca o item do carrinho pelo ID do produto
        ItemCarrinho item = carrinho.getItens().stream()
            .filter(i -> i.getProduto().getId().equals(produtoId))
            .findFirst()
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Item do carrinho não encontrado!"));

        // 3. Atualiza a quantidade do item
        if (quantidadeDTO.getQuantidade() < 0) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "A quantidade deve ser maior que 0.");
        
        if(quantidadeDTO.getQuantidade() == 0) carrinho.getItens().remove(item);
     
        else item.setQuantidade(quantidadeDTO.getQuantidade());

        // 4. Recalcula o subtotal de forma otimizada, usando as entidades já carregadas
        BigDecimal subtotal = calcularSubtotalComEntidades(carrinho.getItens());
        carrinho.setSubtotal(subtotal);
        carrinho.setDataModificacao(LocalDateTime.now());

        // 5. Salva as alterações no carrinho
        carrinhoRepository.save(carrinho);

        return converterCarrinhoParaDto(carrinho);
    }

    @Transactional(readOnly = true)
    public CarrinhoDTO buscarCarrinhoDoCliente(Long clienteId) {
        // 1. Busca o carrinho pelo ID
        Carrinho carrinho = carrinhoRepository.findById(clienteId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Carrinho não encontrado!"));

        // 2. Converte o carrinho para DTO
        return converterCarrinhoParaDto(carrinho);
    }

    public BigDecimal calcularSubtotalComEntidades(List<ItemCarrinho> itens) {
        if (itens == null || itens.isEmpty()) {
            return BigDecimal.ZERO;
        }
        return itens.stream()
            .map(item -> item.getProduto().getPreco().multiply(BigDecimal.valueOf(item.getQuantidade())))
            .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    // --FAZER-- GET ITENS CARRINHO POR FORNECEDOR --FAZER-- 

    public CarrinhoDTO converterCarrinhoParaDto(Carrinho carrinho) {
        CarrinhoDTO carrinhoDTO = new CarrinhoDTO();
        carrinhoDTO.setClienteId(carrinho.getId());
        carrinhoDTO.setDataModificacao(carrinho.getDataModificacao());
        carrinhoDTO.setSubtotal(carrinho.getSubtotal());

        List<ItemCarrinhoDTO> itensDTO = carrinho.getItens().stream()
            .map(this::converterItemCarrinhoParaDTO)
            .toList();
        carrinhoDTO.setItens(itensDTO);

        return carrinhoDTO;
    }

    public ItemCarrinhoDTO converterItemCarrinhoParaDTO(ItemCarrinho itemCarrinho) {
        ItemCarrinhoDTO itemCarrinhoDTO = new ItemCarrinhoDTO();
        itemCarrinhoDTO.setCarrinhoId(itemCarrinho.getCarrinho().getId());
        itemCarrinhoDTO.setProdutoId(itemCarrinho.getProduto().getId());
        itemCarrinhoDTO.setQuantidade(itemCarrinho.getQuantidade());

        return itemCarrinhoDTO;
    }

}
