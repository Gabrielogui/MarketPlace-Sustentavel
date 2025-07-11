import { Administrador, Cliente, Fornecedor } from "@/core";
import api from "../api";

export function getCliente(id: number) {
  return api.get<Cliente>(`/cliente/${id}`);
}

export function getFornecedor(id: number) {
  return api.get<Fornecedor>(`/fornecedor/${id}`);
}

export function getAdministrador(id: number) {
  return api.get<Administrador>(`/administrador/${id}`);
}