package com.omarket.listener;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;
import org.springframework.web.server.ResponseStatusException;

import com.omarket.entity.Carrinho;
import com.omarket.entity.Cliente;
import com.omarket.entity.Usuario;
import com.omarket.event.ClienteCriadoEvent;
import com.omarket.repository.UsuarioRepository;

import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class CarrinhoListener {
    private final EntityManager entityManager;
    private final UsuarioRepository usuarioRepository;

    // Este método será executado AUTOMATICAMENTE sempre que um ClienteCriadoEvent for publicado
    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void onClienteCriado(ClienteCriadoEvent event) {
        Usuario clienteDoEvento = event.getCliente();
        System.out.println("Ouvindo evento: criando carrinho para o novo cliente " + clienteDoEvento.getId());

        Cliente clienteGerenciado = (Cliente) usuarioRepository.findById(clienteDoEvento.getId())
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, 
                "Cliente recém-criado não encontrado, não foi possível criar o carrinho."));
       
                // Se por acaso o cliente já tiver um carrinho (lógica defensiva), não faz nada.
        if (clienteGerenciado.getCarrinho() != null) {
            System.out.println("Cliente já possui um carrinho. Nenhuma ação necessária.");
            return;
        }

        Carrinho novoCarrinho = new Carrinho();
        novoCarrinho.setId(clienteGerenciado.getId());
        novoCarrinho.setCliente(clienteGerenciado);
        novoCarrinho.setDataModificacao(LocalDateTime.now());
        novoCarrinho.setSubtotal(BigDecimal.ZERO);
        novoCarrinho.setItens(new ArrayList<>());
        
        // Sincroniza o lado inverso da relação
        clienteGerenciado.setCarrinho(novoCarrinho);

        System.out.println("ANTES DE SALVAR O CLIENTE ATUALIZADO");
        
        // A MUDANÇA FINAL: Salve a entidade PAI (Cliente), que já está gerenciada.
        // O CascadeType.ALL cuidará de persistir o novo Carrinho.
        entityManager.persist(novoCarrinho);
        
        System.out.println("Carrinho criado com sucesso para o cliente " + clienteGerenciado.getId());
    }
}
