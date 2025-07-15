import { Endereco, EnderecoPayload } from "@/core/endereco";
import api from "../api";

/**
 * Cadastra um novo endereço.
 */
export function cadastrarEndereco(data: EnderecoPayload) {
    return api.post<Endereco>('/endereco/cadastrar', data);
}

/**
 * Busca um endereço pelo seu ID.
 */
export function getEndereco(id: number) {
    return api.get<Endereco>(`/endereco/${id}`);
}

/**
 * Edita um endereço existente.
 */
export function editarEndereco(id: number, data: EnderecoPayload) {
    return api.put<Endereco>(`/endereco/${id}`, data);
}

/**
 * Deleta um endereço.
 */
export function deletarEndereco(id: number) {
    return api.delete(`/endereco/${id}`);
}