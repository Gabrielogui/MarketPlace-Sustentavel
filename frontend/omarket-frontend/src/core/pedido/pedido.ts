import { ItemPedido } from "./itemPedido";

export interface Pedido {
    id: number;
    dataPedido: string;
    valorTotal: number;
    subtotal: number;
    itens: ItemPedido[];
    freteId: number;
    pagamentoId: number;
    enderecoId: number;
    usuarioId: number;

}