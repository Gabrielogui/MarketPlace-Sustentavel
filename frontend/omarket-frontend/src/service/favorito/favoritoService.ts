import { Favorito, FavoritoAdd } from "@/core";
import api from "../api";

// |=======| GET DA LISTA DE FAVORITOS POR CLIENTE |=======|
export async function getListaFavoritos(clienteId: number) {
    return api.get<Favorito[]>(`/favorito/${clienteId}`);
}

// |=======| POST PARA FAVORITAR PRODUTO |=======|
export async function favoritar(favorito: FavoritoAdd){
    return api.post<FavoritoAdd>('favorito/favoritar', favorito);
}

// |=======| DELETE PARA DESFAVORITAR UM PRODUTO |=======|
export async function desfavoritar(id: number) {
    return api.delete<string>(`/favorito/${id}`);
}