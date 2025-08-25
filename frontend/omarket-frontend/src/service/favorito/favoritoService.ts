// |=======| GET DA LISTA DE FAVORITOS |=======|
export async function getListaFavoritos() {
    return api.get<Favorito[]>('/produto/listar');
}