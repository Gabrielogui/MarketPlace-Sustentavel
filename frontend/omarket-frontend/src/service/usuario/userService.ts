import { Administrador, Cliente, Fornecedor } from "@/core";
import api from "../api";
import { Usuario } from "@/core/usuario/usuario";
import { Endereco } from "@/core/endereco";

// |=======| INTERFACE |=======|
export interface EditarPayload {
    id: number; // Adicionado o ID para ser usado na URL
    nome: string;
    email: string;
    senha?: string; // Senha é opcional na edição
    telefone: string;
    tipoUsuario: 'CLIENTE' | 'FORNECEDOR' | 'ADMINISTRADOR';
    cpf?: string;
    cnpj?: string;
    dataNascimento?: string | number;
    endereco?: Endereco;
}

// |=======| GET DE UM USUÁRIO |=======|
export function getCliente(id: number) {
  return api.get<Cliente>(`/cliente/${id}`);
}

export function getFornecedor(id: number) {
  return api.get<Fornecedor>(`/fornecedor/${id}`);
}

export function getAdministrador(id: number) {
  return api.get<Administrador>(`/administrador/${id}`);
}

// |=======| INATIVAR USUÁRIO |=======|
export function inativarCliente(id: number) {
  return api.patch<Cliente>(`/cliente/${id}/inativar`);
}

export function inativarFornecedor(id: number) {
  return api.patch<Fornecedor>(`/fornecedor/${id}/inativar`);
}

export function inativarAdministrador(id: number) {
  return api.patch<Administrador>(`/administrador/${id}/inativar`);
}

// |=======| EDITAR USUÁRIO |=======|
export function editarUsuario(id: number, role: 'CLIENTE' | 'FORNECEDOR' | 'ADMINISTRADOR', data: Partial<EditarPayload>) {
    const endpoint = role.toLowerCase();
    return api.put<Usuario>(`/${endpoint}/${id}`, data);
}