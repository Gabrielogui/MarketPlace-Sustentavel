import { Administrador, Cliente, Fornecedor } from "@/core";
import api from "../api";

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