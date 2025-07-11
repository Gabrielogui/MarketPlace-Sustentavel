import api from "../api";

// |=======| INTERFACES DOS REQUESTS |=======|
export interface LoginPayload  { email: string; senha: string; }
export interface AuthResponse   { token: string; tipoUsuario: 'CLIENTE' | 'FORNECEDOR' | 'ADMINISTRADOR' }
export interface CadastroPayload {
    nome: string;
    email: string;
    senha: string;
    telefone: string;
    tipoUsuario: 'CLIENTE' | 'FORNECEDOR';
    cpf?: string;
    cnpj?: string;
    dataNascimento?: string | number;
}

// |=======| MÉTODOS COM AS ROTAS |=======|
export async function loginRequest(data: { email: string, senha: string }) {
    return await api.post<AuthResponse>("/auth/login", data);
};

export async function cadastrarRequest(data: CadastroPayload): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/cadastrar', data);
    return response.data;
}