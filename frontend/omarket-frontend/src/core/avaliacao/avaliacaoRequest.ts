import { Produto } from "../produto";
import { Cliente } from "../usuario";

export interface AvaliacaoRequest {
    cliente        : Cliente;
    produto        : Produto;
    comentario     : string;
    nota           : number;
    dataModificacao: string;
}