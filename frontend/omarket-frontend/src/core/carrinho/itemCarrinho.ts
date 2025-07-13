export interface ItemCarrinho {
    carrinhoId: number;
    produtoId: number;
    quantidade: number;
}

export interface AdicionarItemPayload{
    produtoId: number;
    quantidade: number;
}