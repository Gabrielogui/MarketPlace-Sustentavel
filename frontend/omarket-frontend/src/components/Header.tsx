'use client'

import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { CircleUser, Heart, LogOut, Logs, Search, ShoppingCart, User, UserPen, UserX } from "lucide-react";
//import Image from "next/image";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

/* 
COMPONENTES PRONTOS QUE SERÃO UTILIZADOS NO MENU: 
 - DROPDOWNMENU = SERÁ USADO NO SÍMBOLO DE USUÁRIO PARA ABRIR AS OPÇÕES
 - INPUT = BUSCA
*/

export default function Header () {

    const { role } = useContext(AuthContext)

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
                        <DropdownMenuContent align="center" className="w-48 bg-amber-50 border-green-200 text-emerald-900 cursor-pointer">
                            <DropdownMenuItem>Frutas Orgânicas</DropdownMenuItem>
                            <DropdownMenuItem>Verduras Frescas</DropdownMenuItem>
                            <DropdownMenuItem>Grãos e Cereais</DropdownMenuItem>
                            <DropdownMenuItem>Produtos Lácteos</DropdownMenuItem>
                            <DropdownMenuItem>Mel e Derivados</DropdownMenuItem>
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

            <DropdownMenu>
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
                        <DropdownMenuItem>
                            <User/>
                            Perfil
                            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <UserPen/>
                            Editar
                            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <UserX/>
                            Inativar
                            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator/>
                    <DropdownMenuGroup>
                        <DropdownMenuItem>
                            <LogOut/>
                            Logout
                            <DropdownMenuShortcut>⌘L</DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
            

        </header>
    );
}