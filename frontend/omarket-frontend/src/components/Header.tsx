'use client'

import {
    DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger
} from "./ui/dropdown-menu";
import { CircleUser, Heart, LogOut, Logs, MapPin, Search, ShoppingCart, User, UserPen, UserX } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useContext, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import Perfil from "./usuario/Perfil";
import EditarPerfil, { PerfilFormData } from "./usuario/EditarPerfil";
import InativarPerfil from "./usuario/InativarPerfil";
import Endereco, { EnderecoFormData } from "./usuario/Endereco";
import AdicionarProduto from "./produto/AdicionarProduto";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { editarUsuario, inativarAdministrador, inativarCliente, inativarFornecedor } from "@/service/usuario/userService";
import { cadastrarEndereco, editarEndereco } from "@/service/endereco/enderecoService";
import { useUserProfile } from "@/hooks/useUserProfile";
import { Cliente, Fornecedor } from "@/core";

export default function Header() {
    const { role, user, logout } = useContext(AuthContext);
    const { profile, loading: loadingProfile } = useUserProfile();
    const router = useRouter();

    // Estados para controlar a visibilidade dos drawers/dialogs
    const [isSaving, setIsSaving] = useState(false);
    const [isDrawerPerfilOpen, setIsDrawerPerfilOpen] = useState(false);
    const [isDrawerEditarOpen, setisDrawerEditarOpen] = useState(false);
    const [isAlertDialogInativarOpen, setIsAlertDialogInativarOpen] = useState(false);
    const [isDrawerEnderecoOpen, setIsDrawerEnderecoOpen] = useState(false);
    const [isDrawerAddProdutoOpen, setIsDrawerAddProdutoOpen] = useState(false);

    // |======| LÓGICA DE INATIVAR O PERFIL |======|
    const handleInativar = async () => {
        if (!user || !role) return toast.error("Usuário não autenticado.");

        setIsSaving(true);
        try {
            switch (role) {
                case 'CLIENTE': await inativarCliente(user.id); break;
                case 'FORNECEDOR': await inativarFornecedor(user.id); break;
                case 'ADMINISTRADOR': await inativarAdministrador(user.id); break;
            }
            toast.success("Conta inativada com sucesso. Você será desconectado.");
            logout();
            router.push("/");
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Falha ao inativar a conta.");
        } finally {
            setIsSaving(false);
            setIsAlertDialogInativarOpen(false);
        }
    };

    // |======| LÓGICA DE SALVAR O PERFIL |======|
    const handleSaveProfile = async (data: PerfilFormData) => {
        if (!user || !role) return toast.error("Usuário não autenticado.");
        
        setIsSaving(true);
        try {
            const payload: any = { nome: data.nome, email: data.email, telefone: data.telefone };
            if (data.senha) {
                payload.senha = data.senha;
            }
            await editarUsuario(user.id, role, payload);
            toast.success("Perfil atualizado com sucesso!");
            setisDrawerEditarOpen(false);
            // refreshProfile(); // Futuramente, chame a função para recarregar os dados do perfil
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Falha ao atualizar o perfil.");
        } finally {
            setIsSaving(false);
        }
    };

    // |======| LÓGICA DE SALVAR O ENDEREÇO |======|
    const handleSaveAddress = async (data: EnderecoFormData) => {
        if (!user || !role || (role !== 'CLIENTE' && role !== 'FORNECEDOR')) {
            return toast.error("Apenas clientes e fornecedores podem ter um endereço.");
        }
        if (!data.cep || !data.numero) {
            return toast.error("CEP e Número são obrigatórios.");
        }
        
        setIsSaving(true);
        try {
            const addressPayload = { cep: data.cep, numero: Number(data.numero), complemento: data.complemento || '' };
            const userWithAddress = profile as Cliente | Fornecedor;
            const existingAddressId = userWithAddress?.endereco?.id;

            // 1. Salva ou atualiza o endereço primeiro
            const enderecoSalvo = existingAddressId
                ? await editarEndereco(existingAddressId, addressPayload)
                : await cadastrarEndereco(addressPayload);

            // 2. Associa o endereço ao usuário, se necessário
            // Se o endereço já existia e foi apenas editado, não precisamos re-associar.
            if (!existingAddressId) {
                // Criamos um payload que contém APENAS o enderecoDTO
                const payloadAssociacao = { 
                    enderecoDTO: { id: enderecoSalvo.data.id } 
                };
                await editarUsuario(user.id, role, payloadAssociacao as any);
            }

            toast.success("Endereço salvo com sucesso!");
            setIsDrawerEnderecoOpen(false);
            // refreshProfile(); // Futuramente, adicione uma função para recarregar os dados do perfil
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Falha ao salvar o endereço.");
        } finally {
            setIsSaving(false);
        }
    };
    
    return(
        <header className="flex flex-row items-center justify-center gap-12 w-full py-5 px-12 shadow-sm">
            {/* ... (resto do seu JSX do header, logo, etc.) ... */}
            <div>
                 <h1 className="text-2xl">omarket</h1>
             </div>
             { role === "CLIENTE" && (
              <div className="flex flex-row gap-2 items-center justify-items-center">
                  <div>
                      <DropdownMenu>
                          <DropdownMenuTrigger>
                              <Logs className="cursor-pointer hover:scale-110 transition-all"/>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="center" className="w-48 bg-amber-50 border-green-200 text-emerald-900 ">
                              <DropdownMenuItem className="cursor-pointer">Frutas Orgânicas</DropdownMenuItem>
                              <DropdownMenuItem className="cursor-pointer">Verduras Frescas</DropdownMenuItem>
                              <DropdownMenuItem className="cursor-pointer">Grãos e Cereais</DropdownMenuItem>
                              <DropdownMenuItem className="cursor-pointer">Produtos Lácteos</DropdownMenuItem>
                              <DropdownMenuItem className="cursor-pointer">Mel e Derivados</DropdownMenuItem>
                          </DropdownMenuContent>
                      </DropdownMenu>
                  </div>
                  <div className="relative flex-grow w-full">
                      <Input type={"search"} placeholder="Busca" className="pl-4 pr-10 py-2 w-full rounded-lg"/>
                      <Button variant={"ghost"} size={"icon"} className="absolute right-0 top-1/2 transform -translate-y-1/2 h-8 w-8 cursor-pointer">
                          <Search/>
                      </Button>
                  </div>
              </div>

             )}
                  
             { role === "CLIENTE" &&
               <div className="cursor-pointer hover:bg-gray-300 transition-all rounded-md p-1">
                   <p>Meus Pedidos</p>
               </div>
             } 
             { role === "FORNECEDOR" &&
                  <div className="flex flex-row gap-12">
                      <div className="cursor-pointer hover:bg-gray-300 transition-all rounded-md p-1">
                          <p>Meus Produtos</p>
                      </div>
                      <div onClick={(e) => {
                          e.preventDefault()
                          setIsDrawerAddProdutoOpen(true);
                      }}
                          className="cursor-pointer hover:bg-gray-300 transition-all rounded-md p-1">
                          <p>Adicionar Produto</p>
                      </div>
                  </div>
             }
              
             { role === "CLIENTE" &&
             <div className="flex flex-row gap-12">
                 <Heart className="cursor-pointer hover:scale-110 transition-all" />
                  <ShoppingCart className="cursor-pointer hover:scale-110 transition-all" />
             </div>
             }


            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <CircleUser className="cursor-pointer hover:scale-110 transition-all" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                    <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem onSelect={() => setIsDrawerPerfilOpen(true)}>
                            <User className="mr-2 h-4 w-4" /><span>Perfil</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => setisDrawerEditarOpen(true)}>
                            <UserPen className="mr-2 h-4 w-4" /><span>Editar Perfil</span>
                        </DropdownMenuItem>
                        {(role === 'CLIENTE' || role === 'FORNECEDOR') && (
                            <DropdownMenuItem onSelect={() => setIsDrawerEnderecoOpen(true)}>
                                <MapPin className="mr-2 h-4 w-4" /><span>Endereço</span>
                            </DropdownMenuItem>
                        )}
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onSelect={logout}>
                        <LogOut className="mr-2 h-4 w-4" /><span>Sair</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onSelect={() => setIsAlertDialogInativarOpen(true)} className="text-red-600 focus:text-red-600">
                        <UserX className="mr-2 h-4 w-4" /><span>Inativar Conta</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Componentes de Drawer/Dialog recebem as props necessárias */}
            <Perfil isOpen={isDrawerPerfilOpen} onOpenChange={setIsDrawerPerfilOpen} />
            <EditarPerfil
                isOpen={isDrawerEditarOpen}
                onOpenChange={setisDrawerEditarOpen}
                onSave={handleSaveProfile}
                profile={profile}
                isSaving={isSaving}
            />
            <Endereco
                isOpen={isDrawerEnderecoOpen}
                onOpenChange={setIsDrawerEnderecoOpen}
                onSave={handleSaveAddress}
                profile={profile}
                isSaving={isSaving}
            />
            <InativarPerfil
                isOpen={isAlertDialogInativarOpen}
                onOpenChange={setIsAlertDialogInativarOpen}
                onConfirm={handleInativar}
            />
            <AdicionarProduto isOpen={isDrawerAddProdutoOpen} onOpenChange={setIsDrawerAddProdutoOpen} />
        </header>
    );
}