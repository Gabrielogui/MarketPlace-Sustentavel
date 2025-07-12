import { Carrinho, AdicionarItemPayload } from "@/core/carrinho";
import api from "../api";

/**
 
Adiciona um item ao carrinho do usuário autenticado.
@param payload - O objeto contendo o ID do produto e a quantidade.
@returns A promise com o carrinho atualizado.*/
export function adicionarItemAoCarrinho(payload: AdicionarItemPayload) {
  // A rota é /carrinho/itens e o método é POST, conforme o backend.
  // O token de autenticação será adicionado automaticamente pelo interceptor do 'api.ts'.
  return api.post<Carrinho>('/carrinho/itens', payload);
}