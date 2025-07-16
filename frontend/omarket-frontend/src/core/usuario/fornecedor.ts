import { Endereco } from "../endereco";
import { Usuario } from "./usuario";

export interface Fornecedor extends Usuario {
    cnpj: string;
    endereco?: Endereco;
}