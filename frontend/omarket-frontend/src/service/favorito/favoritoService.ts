import { Favorito } from "@/core";
import api from "../api";

// |=======| GET DA LISTA DE FAVORITOS POR CLIENTE |=======|
export async function getListaFavoritos(clienteId: number) {
    return api.get<Favorito[]>(`/favorito/${clienteId}`);
}