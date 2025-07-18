export interface Produto {
    id: number;
    nome: string;
    descricao: string;
    estoque: number;
    status: 'ATIVO' | 'INATIVO';
    preco: number;
    categoriaId: number;
    fornecedorId: number;
    //imagens: string;
}