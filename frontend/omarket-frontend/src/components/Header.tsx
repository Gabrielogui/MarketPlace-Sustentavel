'use client'

import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { CircleUser, Heart, LogOut, Logs, Search, ShoppingCart, User, UserPen, UserX } from "lucide-react";
//import Image from "next/image";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useContext, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import Perfil from "./usuario/Perfil";
import EditarPerfil from "./usuario/EditarPerfil";
import InativarPerfil from "./usuario/InativarPerfil";

/* 
COMPONENTES PRONTOS QUE SERÃO UTILIZADOS NO MENU: 
 - DROPDOWNMENU = SERÁ USADO NO SÍMBOLO DE USUÁRIO PARA ABRIR AS OPÇÕES
 - INPUT = BUSCA
*/

export default function Header () {

    const { role } = useContext(AuthContext)

    // |======| SABER SE O DRAWER DO PERIFL E DE EDITAR E O ALERT DIALOG DE INATIVAR ESTÃO ABERTOS |======|
    // DROPDOWNMENU - SABER SE ESTÁ ABERTO  
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    // PERFIL - DRAWER
    const [isDrawerPerfilOpen, setIsDrawerPerfilOpen] = useState(false);
    // EDITAR - DRAWER
    const [isDrawerEditarOpen, setisDrawerEditarOpen] = useState(false);
    // INATIVAR - ALERTDIALOG
    const [isAlertDialogInativarOpen, setIsAlertDialogInativarOpen] = useState(false);

    

    return(
        <header className="flex flex-row items-center justify-center gap-12 w-full py-5 px-12 
             shadow-sm
        ">
            <div>
                {/*<Image src={"/logo_no_bg.png"} alt="omarket" width={100} height={100}></Image>*/}
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
                <div className="cursor-pointer hover:bg-gray-300 transition-all rounded-md p-1">
                    <p>Meus Produtos</p>
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
                        <DropdownMenuItem className="cursor-pointer">
                            <LogOut/>
                            Logout
                            <DropdownMenuShortcut>⌘L</DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>

                {/* DRAWER DE PERFIL E DE EDITAR PERFIL E ALERTDIALOG DE INATIVAR */}
                <Perfil isOpen={isDrawerPerfilOpen} onOpenChange={setIsDrawerPerfilOpen}/>
                <EditarPerfil isOpen={isDrawerEditarOpen} onOpenChange={setisDrawerEditarOpen}/>
                <InativarPerfil isOpen={isAlertDialogInativarOpen} onOpenChange={setIsAlertDialogInativarOpen} />

            </DropdownMenu>
            

        </header>
    );
}