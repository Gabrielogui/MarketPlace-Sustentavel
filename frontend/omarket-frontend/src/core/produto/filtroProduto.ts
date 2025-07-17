// |=======| INTERFACE PARA FILTRAR PRODUTO |=======|
export interface FiltroProduto {
    precoMin?: number;
    precoMax?: number;
    notaMin?: number;
    order?: "asc" | "desc";
}