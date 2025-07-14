import { Carrinho, AdicionarItemPayload } from "@/core/carrinho";
import api from "../api";

// |=======| ADICIONAR ITEM AO CARRINHO |=======|
export function adicionarItemAoCarrinho(payload: AdicionarItemPayload) {
  // A rota é /carrinho/itens e o método é POST, conforme o backend.
  // O token de autenticação será adicionado automaticamente pelo interceptor do 'api.ts'.
  return api.post<Carrinho>('/carrinho/itens', payload);
}

// |=======| GET O CARRINHO DO USUÁRIO |=======|
export function getMeuCarrinho() {
  return api.get<Carrinho>('/carrinho');
}

// |=======| REMOVER ITEM DO CARRINHO |=======|
export function removerItemCarrinho(produtoId: number){
  return api.delete<void>(`carrinho/itens/${produtoId}`);
}

// |=======| ATUALIZA A QUANTIDA DO ITEM DO CARRINHO |=======|
export function atualizarQuantidadeItemCarrinho(produtoId: number, quantidade: number) {
  return api.patch<Carrinho>(`/carrinho/itens/${produtoId}`, { quantidade });
}