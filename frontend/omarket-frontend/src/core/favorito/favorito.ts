import { Produto } from "../produto"
import { Fornecedor } from "../usuario"

export interface Favorito {
    id        : number
    produtoDTO: Produto
    fornecedor: Fornecedor
}