'use client'

import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { CircleUser, Heart, LogOut, Logs, MapPin, Search, ShoppingCart, User, UserPen, UserX } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import Perfil from "./usuario/Perfil";
import EditarPerfil from "./usuario/EditarPerfil";
import InativarPerfil from "./usuario/InativarPerfil";
import Endereco from "./usuario/Endereco";
import AdicionarProduto from "./produto/AdicionarProduto";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { EditarPayload, editarUsuario, inativarAdministrador, inativarCliente, inativarFornecedor } from "@/service/usuario/userService";
import Image from "next/image";
import Link from "next/link";
import { Categoria } from "@/core";
import { getListaCategoria } from "@/service/categoria/categoria";

export default function Header () {

    const { role, user, logout } = useContext(AuthContext)
    const router = useRouter();

    // |=======| ESTADO DA BUSCA |=======|
    const [termoBusca, setTermoBusca] = useState("");

    // |+======| ESTADOS DOS DRAWERS E DIALOGS |=======|
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isDrawerPerfilOpen, setIsDrawerPerfilOpen] = useState(false);
    const [isDrawerEditarOpen, setisDrawerEditarOpen] = useState(false);
    const [isAlertDialogInativarOpen, setIsAlertDialogInativarOpen] = useState(false);
    const [isDrawerEnderecoOpen, setIsDrawerEnderecoOpen] = useState(false);
    const [isDrawerAddProdutoOpen, setIsDrawerAddProdutoOpen] = useState(false);

    // |=======| ESTADO DAS CATEGORIAS DO DROPDOWN |=======|
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [categoriaLoading, setCategoriaLoading] = useState(true);

    // |=======| USEEFFECT DO HEADER |=======|
    useEffect(() => {
        async function fetchCategorias() {
            try {
                const categoriaResponse = await getListaCategoria();
                setCategorias(categoriaResponse.data);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any){
                console.error("Erro ao buscar categorias:", error);
                toast.error(error.categoriaResponse?.data?.message || "Não foi possível carregar as categorias.");
            } finally {
                setCategoriaLoading(false);
            }
        }

        fetchCategorias();

    }, [])

    // |=======| FUNÇÃO PARA INATIVAR O PERFIL |=======|
    const handleInativar = async () => {
        if (!user || !role) {
            toast.error("Usuário não autenticado.");
            return;
        }

        try {
            switch (role) {
                case 'CLIENTE':
                    await inativarCliente(user.id);
                    break;
                case 'FORNECEDOR':
                    await inativarFornecedor(user.id);
                    break;
                case 'ADMINISTRADOR':
                    await inativarAdministrador(user.id);
                    break;
                default:
                    throw new Error("Tipo de usuário desconhecido.");
            }

            toast.success("Conta inativada com sucesso. Você será desconectado.");
            logout(); // Desloga o usuário
            router.push("/"); // Redireciona para a home
        
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            const mensagemErro = error.response?.data?.message || "Falha ao inativar a conta.";
            toast.error(mensagemErro);
            console.error("Erro ao inativar conta:", error);
        } finally {
            setIsAlertDialogInativarOpen(false); // Fecha o dialog independentemente do resultado
        }
    };


    const handleEditar = async (data: Partial<EditarPayload>) => {
        if (!user || !role) {
            toast.error("Usuário não autenticado.");
            return;
        }

        try {
            await editarUsuario(user.id, role, data);
            toast.success("Perfil atualizado com sucesso!");
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            const mensagemErro = error.response?.data?.message ||  "Falha ao atualizar o perfil.";
            toast.error(mensagemErro);
            console.error("Erro ao editar perfil:", error);
        }
    };
    
    const handleBusca = () => {
        if(!termoBusca.trim()) return;
        router.push(`/busca?nome=${encodeURIComponent(termoBusca.trim())}`);
    }

    return(
        <header className="flex flex-row items-center justify-center gap-12 w-full py-5 px-12 shadow-sm">
            <div>
                <Link href={"/"}>
                    <Image src={"/logo_no_bg-full.svg"} alt="omarket" width={100} height={100}></Image>
                </Link>
            </div>
            { role === "CLIENTE" && (
            <div className="flex flex-row gap-2 items-center justify-items-center">
                <div>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Logs className="cursor-pointer hover:scale-110 transition-all"/>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="center" className="w-48 bg-amber-50 border-green-200 text-emerald-900 ">
                            {categoriaLoading ? (
                                <p>Carregando...</p>
                            ) : (
                                categorias.map((categoria) => (
                                    <DropdownMenuItem key={categoria.id} className="cursor-pointer">{categoria.nome}</DropdownMenuItem>
                                ))
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div className="relative flex-grow w-full">
                    <Input type={"search"} placeholder="Busca" 
                        value={termoBusca} onChange={(e) => setTermoBusca(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") handleBusca();
                        }}
                        className="pl-4 pr-10 py-2 w-full rounded-lg"/>
                    <Button variant={"ghost"} size={"icon"} onClick={handleBusca}
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 h-8 w-8 cursor-pointer">
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
                        setIsDropdownOpen(false);
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

            <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
                <DropdownMenuTrigger asChild>
                    <CircleUser className="cursor-pointer hover:scale-110 transition-all" />
                </DropdownMenuTrigger>
                <DropdownMenuContent  align="start" className="max-w-40">
                    <DropdownMenuLabel className="flex flex-col">
                        <span className="text-foreground truncate text-sm font-medium">
                            Nome Sobrenome
                        </span>
                        <span className="text-muted-foreground truncate text-xs font-normal">
                            email@exemplo.com
                        </span>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator/>
                    <DropdownMenuGroup>
                        
                        <DropdownMenuItem className="cursor-pointer"
                            onClick={(e) => {
                                e.preventDefault();
                                setIsDrawerPerfilOpen(true);
                                setIsDropdownOpen(false);
                            }}>
                            <User/>
                            Perfil
                            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                        </DropdownMenuItem>
                        
                        <DropdownMenuItem className="cursor-pointer"
                            onClick={(e) => {
                                e.preventDefault();
                                setisDrawerEditarOpen(true);
                                setIsDropdownOpen(false);
                            }}>
                            <UserPen/>
                            Editar
                            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer"
                            onClick={(e) => {
                                e.preventDefault();
                                setIsAlertDialogInativarOpen(true);
                                setIsDropdownOpen(false);
                            }}>
                            <UserX/>
                            Inativar
                            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator/>
                    <DropdownMenuGroup>
                        <DropdownMenuItem onClick={(e) => {
                                e.preventDefault();
                                setIsDrawerEnderecoOpen(true);
                                setIsDropdownOpen(false);
                            }}>
                            <MapPin />
                            Endereço
                            <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator/>
                    <DropdownMenuGroup>
                        <DropdownMenuItem onClick={logout} className="cursor-pointer">
                            <LogOut/>
                            Logout
                            <DropdownMenuShortcut>⌘L</DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* DRAWERS E DIALOGS */}
            <Perfil isOpen={isDrawerPerfilOpen} onOpenChange={setIsDrawerPerfilOpen}/>
            <EditarPerfil isOpen={isDrawerEditarOpen} onOpenChange={setisDrawerEditarOpen} onSave={handleEditar}/>
            <InativarPerfil 
                isOpen={isAlertDialogInativarOpen} 
                onOpenChange={setIsAlertDialogInativarOpen}
                onConfirm={handleInativar} // Passando a função de inativação
            />
            <Endereco isOpen={isDrawerEnderecoOpen} onOpenChange={setIsDrawerEnderecoOpen}/>
            <AdicionarProduto isOpen={isDrawerAddProdutoOpen} onOpenChange={setIsDrawerAddProdutoOpen}/>
        </header>
    );
}
