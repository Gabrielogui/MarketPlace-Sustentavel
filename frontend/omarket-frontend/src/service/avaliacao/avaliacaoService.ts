import { Avaliacao } from "@/core";
import api from "../api";

// |=======| ADICIONAR AVALIACAO |=======|
export function adicionarAvaliacao (avaliacao: Avaliacao) {
    return api.post<Avaliacao>("/avaliacao/adicionar", avaliacao);
}