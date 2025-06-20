'use client'

import { Role } from "@/core/types";
import { Usuario } from "@/core/usuario/usuario";
import { fakeUsers, getMockToken } from "@/service/authMock";
import { jwtDecode } from "jwt-decode";
import { createContext, ReactNode, useEffect, useState } from "react";

type AuthContextType = {
  token: string | null;
  role: Role | null;
  user: Usuario | null;
  login: (token: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken]   = useState<string | null>(null);
  const [role, setRole]     = useState<Role | null>(null);
  const [user, setUser]     = useState<Usuario | null>(null);

  const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === 'true';

  useEffect(() => {
    if (USE_MOCK) {
      // Protótipo: já logado como CLIENTE
      const t = getMockToken('CLIENTE');
      setToken(t);
      setRole('CLIENTE');
      // fakeUsers.CLIENTE é um Cliente, que extende UsuarioBase
      setUser(fakeUsers.CLIENTE);
      return;
    }

    // Modo real: tenta carregar do localStorage
    const t = localStorage.getItem('token');
    if (!t) return;

    try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const payload: any = jwtDecode(t);
      const r: Role = payload.role || payload.tipoUsuario;
      setToken(t);
      setRole(r);

      // Monta um objeto mínimo de UsuarioBase
      const base: Usuario = {
        id: payload.id ?? 0,
        nome: payload.nome ?? '',
        email: payload.sub,
        telefone: payload.telefone ?? '',
        tipoUsuario: r,
        status: payload.status ?? 'ATIVO',
      };
      setUser(base);

    } catch {
      // token inválido
      logout();
    }
  }, []);

  function login(t: string) {
    localStorage.setItem('token', t);
    setToken(t);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const payload: any = jwtDecode(t);
    const r: Role = payload.role || payload.tipoUsuario;
    setRole(r);

    if (USE_MOCK) {
      // Se mock, pega o usuário completo
      setUser(fakeUsers[r]);
    } else {
      // Modo real: monta apenas UsuarioBase
      const usuario: Usuario = {
        id: payload.id ?? 0,
        nome: payload.nome ?? '',
        email: payload.sub,
        telefone: payload.telefone ?? '',
        tipoUsuario: r,
        status: payload.status ?? 'ATIVO',
      };
      setUser(usuario);
    }
  }

  function logout() {
    localStorage.removeItem('token');
    setToken(null);
    setRole(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ token, role, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}