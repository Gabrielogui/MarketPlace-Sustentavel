import { FiltroProduto, Produto } from "@/core/produto";
import api from "../api";
import { AxiosResponse } from "axios";

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

// |=======| GET PARA BUSCA DE PRODUTO |=======|
export async function buscaProduto(nome: string){
  return api.get<Produto[]>(`/produto/buscar/${nome}`);
}

// |=======| GET DO FILTRO DA BUSCA DO PRODUTO |=======|
export async function filtrarProduto (filtro: FiltroProduto): Promise<AxiosResponse<Produto[]>> {
  const params = new URLSearchParams();

  if (filtro.precoMin !== undefined) params.append("precoMin", filtro.precoMin.toString());
  if (filtro.precoMax !== undefined) params.append("precoMax", filtro.precoMax.toString());
  if (filtro.notaMin !== undefined)  params.append("notaMin", filtro.notaMin.toString());
  if (filtro.order)                  params.append("order", filtro.order);

  return api.get(`/produto/filtrar?${params.toString()}`);

}