import { AuthContext } from "@/context/AuthContext";
import { Administrador, Cliente, Fornecedor } from "@/core";
import { getAdministrador, getCliente, getFornecedor } from "@/service/usuario/userService";
//import { getAdministrador, getCliente, getFornecedor } from "@/service/usuario/userService";
import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";

export type UserProfile = Cliente | Fornecedor | Administrador;

export function useUserProfile() {
    const { role, user, initialized } = useContext(AuthContext);
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        console.log(user);
        // só dispara depois de inicializar o contexto
        if (!initialized || !user || user.id === 0 ) {
            
            if(initialized){
                setLoading(false);
            }
            return;
        }
        const fetchProfile = async () => {
            setLoading(true);
            setError(null);

            // 4. Monta a rota dinamicamente a partir do 'role' do usuário
            const userTypePath = role?.toLowerCase();
            if (!userTypePath) {
                setError("Tipo de usuário (role) não definido.");
                setLoading(false);
                return;
            }

            try {
                let response;
                switch (role) {
                    case "CLIENTE":
                        response = await getCliente(user.id);
                        break;
                    case "FORNECEDOR":
                        response = await getFornecedor(user.id);
                        break;
                    case "ADMINISTRADOR":
                        response = await getAdministrador(user.id);
                        break;
                    default:
                        throw new Error("Tipo de usuário desconhecido!");
                }
                setProfile(response.data);

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (err: any) {
                console.error("Erro ao carregar perfil:", err);
                const errorMessage = err.response?.data?.message || "Falha ao buscar perfil";
                setError(errorMessage);
                toast.error(errorMessage);
            } finally {
                setLoading(false);
            }

        };
    
        fetchProfile();
        
    }, [initialized, role, user]);

    return { profile, loading, error };
}