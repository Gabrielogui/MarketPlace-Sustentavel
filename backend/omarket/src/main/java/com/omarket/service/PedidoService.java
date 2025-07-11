package com.omarket.service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.omarket.dto.EnderecoDTO;
import com.omarket.dto.ItemCarrinhoDTO;
import com.omarket.dto.ItemPedidoDTO;
import com.omarket.dto.PedidoDTO;
import com.omarket.dto.pagamento.PagamentoDTO;
import com.omarket.entity.Carrinho;
import com.omarket.entity.Cliente;
import com.omarket.entity.Endereco;
import com.omarket.entity.ItemCarrinho;
import com.omarket.entity.ItemPedido;
import com.omarket.entity.Pedido;
import com.omarket.entity.Usuario;
import com.omarket.entity.enum_.StatusPedido;
import com.omarket.repository.CarrinhoRepository;
import com.omarket.repository.PedidoRepository;
import com.omarket.repository.ProdutoRepository;
import com.omarket.service.CarrinhoService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PedidoService {

    private final FreteService freteService;
    private final PedidoRepository pedidoRepository;
    private final CarrinhoRepository carrinhoRepository;
    private final PagamentoService pagamentoService; // Manteremos injetado para a Etapa 2
    private final ProdutoRepository produtoRepository;
    private final CarrinhoService carrinhoService;
    private final ClienteService clienteService;

    @Transactional
    public PedidoDTO criarPedidoAPartirDoCarrinho(Usuario cliente, List<ItemCarrinhoDTO> itensCarrinhoDTO) {

        if (!(cliente instanceof Cliente)) {
            throw new RuntimeException("Usuário não é um cliente válido.");
        }
        // 1. Busca o carrinho do cliente
        Carrinho carrinho = carrinhoRepository.findById(cliente.getId())
            .orElseThrow(() -> new RuntimeException("Carrinho não encontrado"));

        if (carrinho.getItens().isEmpty()) {
            throw new RuntimeException("Não é possível criar um pedido com o carrinho vazio.");
        }

        // 2. Cria um novo Pedido com os dados do carrinho
        Pedido novoPedido = new Pedido();
        novoPedido.setCliente((Cliente)cliente);
        novoPedido.setDataPedido(LocalDateTime.now());
        novoPedido.setStatus(StatusPedido.AGUARDANDO_PAGAMENTO); // <-- NOVO STATUS INICIAL

        // Lógica para converter ItemCarrinho em ItemPedido e associar ao novoPedido
        converterItemCarrinhoParaItemPedido(itensCarrinhoDTO, novoPedido);
        novoPedido.setSubTotal(BigDecimal.ZERO);
        for(ItemPedido item : novoPedido.getItens()) {
            novoPedido.setSubTotal(novoPedido.getSubTotal()
            .add(item.getPrecoUnitario().
            multiply(BigDecimal.valueOf(item.getQuantidade())))
            );
        }
        novoPedido.setValorTotal(novoPedido.getSubTotal());

        // 3. Salva o pedido no banco para gerar um ID
        Pedido pedidoSalvo = pedidoRepository.save(novoPedido);

        // 4. Limpa o carrinho do cliente, pois os itens agora estão no pedido
        carrinho.getItens().removeIf(item ->
        pedidoSalvo.getItens().stream()
            .anyMatch(itemPedido -> itemPedido.getProduto().getId().equals(item.getProduto().getId()))
        );

        carrinho.setSubtotal(carrinhoService.calcularSubtotalComEntidades(carrinho.getItens()));
        carrinhoRepository.save(carrinho);

        // 5. Retorna a entidade Pedido completa
        return converterPedidoParaDto(pedidoSalvo);
    }

    @Transactional(readOnly = true)
    public PedidoDTO buscar(Usuario usuario, Long id){
        if (!(usuario instanceof Cliente)) {
            throw new RuntimeException("Usuário não é um cliente válido.");
        }
        Pedido pedido = pedidoRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Pedido não encontrado."));

        if(!(pedido.getCliente().getId().equals(usuario.getId()))){
            throw new RuntimeException("Pedido não pertence ao cliente.");
        }

        return converterPedidoParaDto(pedido);
    }

    @Transactional
    public PedidoDTO cancelarPedido(Usuario usuario, Long id) {
        if (!(usuario instanceof Cliente)) {
            throw new RuntimeException("Usuário não é um cliente válido.");
        }
        Pedido pedido = pedidoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pedido não encontrado."));

        if (!pedido.getCliente().getId().equals(usuario.getId())) {
            throw new RuntimeException("Pedido não pertence ao cliente.");
        }

        if (pedido.getStatus() == StatusPedido.CANCELADO) {
            throw new RuntimeException("Pedido já está cancelado.");
        }

        // --- NOVA LÓGICA DE CANCELAMENTO ---
        
        // Se o pagamento foi aprovado, primeiro precisamos cancelar/estornar o pagamento.
        if (pedido.getStatus() == StatusPedido.PAGAMENTO_APROVADO || pedido.getStatus() == StatusPedido.EM_SEPARACAO) {
            pagamentoService.cancelarPagamento(id); // Chama o serviço de pagamento
        }

        // Se o pedido estiver em qualquer um desses estágios, ele pode ser cancelado.
        if (pedido.getStatus() == StatusPedido.PAGAMENTO_APROVADO ||
            pedido.getStatus() == StatusPedido.AGUARDANDO_PAGAMENTO ||
            pedido.getStatus() == StatusPedido.EM_SEPARACAO) {

            pedido.setStatus(StatusPedido.CANCELADO);
            Pedido pedidoCancelado = pedidoRepository.save(pedido);
            return converterPedidoParaDto(pedidoCancelado);

        } else {
            // Se o pedido já foi enviado, por exemplo, não pode mais ser cancelado por esta rota.
            throw new RuntimeException("Pedido não pode ser cancelado neste estado: " + pedido.getStatus());
        }
    }

    @Transactional(readOnly = true)
    public List<PedidoDTO> listarPedidosPorCliente(Usuario usuario) {
        if (!(usuario instanceof Cliente)) {
            throw new RuntimeException("Usuário não é um cliente válido.");
        }
        
        List<Pedido> pedidos = pedidoRepository.findByClienteId(usuario.getId());
        
        if (pedidos.isEmpty()) {
            throw new RuntimeException("Nenhum pedido encontrado para o cliente.");
        }

        List<Pedido> pedidosOrdenados = pedidos.stream()
            .sorted(Comparator.comparing(Pedido::getDataPedido).reversed())
            .toList();

        return pedidosOrdenados.stream()
            .map(this::converterPedidoParaDto)
            .toList();
    }

    @Transactional
    public PagamentoDTO processarPagamentoDoPedido(Long pedidoId, Usuario cliente) {
        // 1. Validação (garantir que o pedido pertence ao cliente, etc.)
        Pedido pedido = pedidoRepository.findById(pedidoId)
            .orElseThrow(() -> new RuntimeException("Pedido não encontrado."));

        if (!pedido.getCliente().getId().equals(cliente.getId())) {
            throw new RuntimeException("Acesso negado. O pedido não pertence a este cliente.");
        }

        // 2. Chamar o seu PagamentoService, que contém a lógica do mock/gateway
        PagamentoDTO pagamentoDTO = pagamentoService.criarPagamento(pedidoId, cliente);

        // 3. O PagamentoService já atualiza o status do pedido, então aqui
        // apenas retornamos o DTO do pagamento.
        return pagamentoDTO;
    }
    
    // ... outros métodos que criaremos para a Etapa 2 ...

    private void converterItemCarrinhoParaItemPedido(List<ItemCarrinhoDTO> itensCarrinhoDTO, Pedido pedido) {
        for(ItemCarrinhoDTO item : itensCarrinhoDTO) {      
            ItemPedido itemPedido = new ItemPedido();
            produtoRepository.findById(item.getProdutoId())
                .ifPresent(itemPedido::setProduto);
            itemPedido.setPedido(pedido);
            itemPedido.setQuantidade(item.getQuantidade());
            itemPedido.setPrecoUnitario(itemPedido.getProduto().getPreco());
            pedido.getItens().add(itemPedido);
        }
    }

    private PedidoDTO converterPedidoParaDto(Pedido pedido) {
        PedidoDTO pedidoDTO = new PedidoDTO();
        pedidoDTO.setId(pedido.getId());
        pedidoDTO.setCliente(clienteService.converterParaDTO(pedido.getCliente()));
        pedidoDTO.setDataPedido(pedido.getDataPedido());
        pedidoDTO.setStatus(pedido.getStatus());
        pedidoDTO.setValorTotal(pedido.getValorTotal());
        pedidoDTO.setSubtotal(pedido.getSubTotal());

        pedidoDTO.setFrete(pedido.getFrete() != null ? 
            freteService.converterParaDTO(pedido.getFrete()) : null);

        // PAGAMENTO PRECISA SER PERSISTIDO NO DB
        // pedidoDTO.setPagamento();

        if(pedido.getEndereco() != null){
            EnderecoDTO enderecoDTO = new EnderecoDTO();
            Endereco endereco = pedido.getEndereco();
            enderecoDTO.setCep(endereco.getCep());
            enderecoDTO.setComplemento(endereco.getComplemento());
            enderecoDTO.setId(endereco.getId());
            enderecoDTO.setNumero(endereco.getNumero());
            pedidoDTO.setEndereco(enderecoDTO);
        } 
 
        // Converte os itens do pedido para DTOs
        for (ItemPedido item : pedido.getItens()) {
            ItemPedidoDTO itemDTO = new ItemPedidoDTO();
            itemDTO.setProdutoId(item.getProduto().getId());
            itemDTO.setPedidoId(pedido.getId());
            itemDTO.setQuantidade(item.getQuantidade());
            itemDTO.setPrecoUnitario(item.getPrecoUnitario());
            pedidoDTO.getItens().add(itemDTO);
        }
        
        return pedidoDTO;
    }
}
