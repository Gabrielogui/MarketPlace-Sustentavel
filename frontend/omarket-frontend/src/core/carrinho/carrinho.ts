import { ItemCarrinho } from "./itemCarrinho";

export interface Carrinho {
    clienteId: number;
    dataModificacao: string;
    subtotal: number;
    itens: ItemCarrinho[];
}