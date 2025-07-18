import { Endereco } from "../endereco";
import { Usuario } from "./usuario";

export interface Cliente extends Usuario {
    cpf: string;
    dataNascimento: string;
    enderecoDTO?: Endereco;
}