import { Avaliacao } from "@/core";
import api from "../api";

// |=======| ADICIONAR AVALIACAO |=======|
export function adicionarAvaliacao (avaliacao: Avaliacao) {
    return api.post<Avaliacao>("/avaliacao/adicionar", avaliacao);
}

// |=======| LISTAR AVALIAÇÕES POR PRODUTO |=======|
export function getListaAvaliacaoPorProduto (produtoId: number) {
    return api.get<Avaliacao[]>(`/avaliacao/listar/produto/${produtoId}`);
}