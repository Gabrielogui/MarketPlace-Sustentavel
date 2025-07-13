import { Produto } from "@/core/produto";
import api from "../api";

// |=======| GET DA LISTA DE PRODUTOS |=======|
export async function getListaProduto() {
  return api.get<Produto[]>('/produto/listar');
}

// |=======| GET DE UM PRODUTO |=======|
export function getProduto(id: number) {
  return api.get<Produto>(`/produto/${id}`);
}