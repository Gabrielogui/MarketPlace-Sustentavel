import api from "../api";

// |=======| INTERFACES DOS REQUESTS |=======|
export interface LoginPayload  { email: string; senha: string; }
export interface AuthResponse   { token: string; }
export interface CadastroPayload {
    nome: string;
    email: string;
    senha: string;
    telefone: string;
    tipoUsuario: 'CLIENTE' | 'FORNECEDOR';
    cpf?: string;
    cnpj?: string;
    dataNascimento?: string;
}

// |=======| MÉTODOS COM AS ROTAS |=======|
export const loginRequest = (data: LoginPayload) => api.post<AuthResponse>('/auth/login', data);

export const cadastrarRequest = (data: CadastroPayload) => api.post<AuthResponse>('/auth/cadastrar', data);