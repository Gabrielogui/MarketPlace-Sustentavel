export  interface Usuario {
    id: number;
    nome: string;
    email: string;
    telefone: string;
    tipoUsuario: 'CLIENTE' | 'FORNECEDOR' | 'ADMINISTRADOR';
    status: 'ATIVO' | 'INATIVO';
}