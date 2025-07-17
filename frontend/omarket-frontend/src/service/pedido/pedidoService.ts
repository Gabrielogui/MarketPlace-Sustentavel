import { Pedido } from '@/core';
import api from '../api';
import { AdicionarItemPayload } from '@/core/carrinho';

// |=======| POST PARA CRIAR UM PEDIDO A PARTIR DO CARRINHO |=======|
export async function criarPedido(itens: AdicionarItemPayload[]) {
    return api.post<Pedido>('/pedidos/criar', itens);
}

// |=======| GET DA LISTA DE PEDIDOS POR CLIENTE |=======|
export function getListaPedidoPorCliente(clienteId: number) {
    const id = clienteId;
    return api.get<Pedido[]>(`/pedidos/listar/cliente/${id}`);
}

// |=======| CANCELAR PEDIDO |=======|
export function cancelarPedido (idPedido: number) {
    return api.patch<Pedido>(`/pedidos/${idPedido}/cancelar`);
}