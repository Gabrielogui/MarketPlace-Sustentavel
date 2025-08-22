import { Categoria } from "../categoria";
import { Fornecedor } from "../usuario";

export interface Produto {
    id: number;
    nome: string;
    descricao: string;
    estoque: number;
    status: 'ATIVO' | 'INATIVO';
    preco: number;
    categoriaId: Categoria;
    fornecedorId: Fornecedor;
    //imagens: string;
}