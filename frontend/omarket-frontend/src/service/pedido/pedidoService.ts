import { Pedido } from '@/core';
import api from '../api';
import { AdicionarItemPayload } from '@/core/carrinho';

// |=======| POST PARA CRIAR UM PEDIDO A PARTIR DO CARRINHO |=======|
export async function criarPedido(itens: AdicionarItemPayload[]) {
    return api.post<Pedido>('/pedidos/criar', itens);
}