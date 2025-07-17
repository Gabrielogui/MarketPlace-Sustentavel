'use client';

import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '../context/AuthContext';
import { Role } from '../core/types';

interface GuardRouteProps {
  role: Role;
  children: React.ReactNode;
}

export function GuardRoute({ role: allowedRole, children }: GuardRouteProps) {
    const { token, role, initialized } = useContext(AuthContext);
    const router = useRouter();

    const [checked, setChecked] = useState(false); // só renderiza depois da checagem

    useEffect(() => {

        if(!initialized) return;
        console.log("GuardRoute token: ", token);
        if (!token) {
            // MANDAR PARA UMA FUTURA ROTA DE LOGIN
            router.replace('/login');
        } else if (role !== allowedRole) {
            router.replace('/') // DEFINIR PARA QUAL ROTA ELE VAI QUANDO NÃO TIVER AUTORIZADO -> router.replace('/unauthorized') ou '/' ou qualquer outra
        } else {
            setChecked(true); // só permite renderizar se tudo ok
        }
      }, [token, role, router, allowedRole]);

    if (!checked) return null; // evita piscar conteúdo indevido
    return <>{children}</>;
}
