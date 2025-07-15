import { Endereco } from "./endereco";

export type EnderecoPayload = Omit<Endereco, 'id'>;

export type { Endereco }