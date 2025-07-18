import { Endereco } from "../endereco";
import { Frete } from "../frete";
import { Usuario } from "../usuario/usuario";
import { ItemPedido } from "./itemPedido";

export interface Pedido {
    id: number;
    status: string;
    dataPedido: string;
    valorTotal: number;
    subtotal: number;
    itens: ItemPedido[];
    frete: Frete | null;
    pagamento: null;
    endereco: Endereco | null;
    cliente: Usuario;

}