import { Administrador, Cliente, Fornecedor } from '@/core';
import { Role } from '../core/types';


// |=======| MAPA DE USUÁRIO PARA O PROTÓTIPO |=======|
export const fakeUsers: Record<Role, Cliente | Fornecedor | Administrador> = {
  CLIENTE: {
    id: 1,
    nome: 'Cliente Fake',
    email: 'cliente@ex.com',
    telefone: '99999-0000',
    tipoUsuario: 'CLIENTE',
    status: 'ATIVO',
    cpf: '000.000.000-00',
    dataNascimento: '2000-01-01',
  },
  FORNECEDOR: {
    id: 2,
    nome: 'Fornecedor Fake',
    email: 'fornecedor@ex.com',
    telefone: '99999-1111',
    tipoUsuario: 'FORNECEDOR',
    status: 'ATIVO',
    cnpj: '12.345.678/0001-99',
  },
  ADMINISTRADOR: {
    id: 3,
    nome: 'Admin Fake',
    email: 'admin@ex.com',
    telefone: '99999-2222',
    tipoUsuario: 'ADMINISTRADOR',
    status: 'ATIVO',
    
  },
};

// |=======| GERA UM "TOKEN" DE PROTÓTIPO |=======|
export function getMockToken(role: Role): string {
  console.log("role: ", role);
  // Serializamos um JSON simples e base64‑codificamos para simular um JWT:
  const header = btoa(JSON.stringify({ alg: 'none', typ: 'JWT' }));
  const payload = btoa(
    JSON.stringify({
      sub: fakeUsers[role].email,
      tipoUsuario: role,
      // exp fictício (timestamp futuro)
      exp: Math.floor(Date.now() / 1000) + 60 * 60, // VERIFICAR SE HÁ NECESSIDADE DEPOIS
    })
  );
  console.log("AuthMock token: ", `${header}.${payload}.token.falso`);
  // Em protótipo, sem assinatura (só “token.falso”)
  return `${header}.${payload}.token.falso`;
}