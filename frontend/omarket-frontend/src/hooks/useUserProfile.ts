import { AuthContext } from "@/context/AuthContext";
import { Administrador, Cliente, Fornecedor } from "@/core";
import { getAdministrador, getCliente, getFornecedor } from "@/service/usuario/userService";
import { useContext, useEffect, useState } from "react";

export type UserProfile = Cliente | Fornecedor | Administrador;

export function useUserProfile() {
    const { role, user, initialized } = useContext(AuthContext);
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // só dispara depois de inicializar o contexto
        if (!initialized || !role || !user) return;
        setLoading(true);
        setError(null);

        const id = user.id;
        let call: Promise<{ data: UserProfile }>;

        switch (role) {
        case "CLIENTE":
            call = getCliente(id);
            break;
        case "FORNECEDOR":
            call = getFornecedor(id);
            break;
        case "ADMINISTRADOR":
            call = getAdministrador(id);
            break;
        default:
            setError("Role desconhecido");
            setLoading(false);
            return;
        }

        call
        .then((res) => {
            setProfile(res.data);
        })
        .catch((err) => {
            console.error("Erro ao carregar perfil:", err);
            setError(err.response?.data?.message || "Falha ao buscar perfil");
        })
        .finally(() => {
            setLoading(false);
        });
    }, [initialized, role, user]);

    return { profile, loading, error };
}