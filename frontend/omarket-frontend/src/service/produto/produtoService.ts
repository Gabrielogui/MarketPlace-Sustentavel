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

// |=======| POST DE UM PRODUTO |=======|
export async function cadastrarProduto(produto: Produto) {
  return api.post<Produto>('/produto/cadastrar', produto);
}

// |=======| PUT PARA EDITAR O PRODUTO |=======|
export async function editarProduto(produto: Produto, id: number) {
  return api.put<Produto>(`/produto/${id}`, produto);
}

// |=======| GET PARA LISTAR PRODUTOS  DE UM FORNECEDOR |=======|
export async function getListaProdutoPorFornecedor(fornecedorId: number) {
  return api.get<Produto[]>(`/produto/listar/fornecedor/${fornecedorId}`);
}

// |=======| PATCH PARA DESATIVAR O PRODUTO |=======|
export async function desativarProduto(id: number){
  return api.patch<Produto>(`/produto/${id}/desativar`);
}