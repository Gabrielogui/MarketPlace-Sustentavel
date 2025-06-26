import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { CircleUser, Heart, Logs, Search, ShoppingCart } from "lucide-react";
//import Image from "next/image";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { DropdownMenuShortcut } from "./ui/dropdown-menu";

/* 
COMPONENTES PRONTOS QUE SERÃO UTILIZADOS NO MENU: 
 - DROPDOWNMENU = SERÁ USADO NO SÍMBOLO DE USUÁRIO PARA ABRIR AS OPÇÕES
 - INPUT = BUSCA
*/

export default function Header () {
    return(
        <header className="flex flex-row items-center justify-center gap-12 w-full py-5 px-12 
             shadow-sm
        ">
            <div>
                {/*<Image src={"/logo_no_bg.png"} alt="omarket" width={100} height={100}></Image>*/}
                <h1 className="text-2xl">omarket</h1>
            </div>
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

             <div className="cursor-pointer hover:bg-gray-300 transition-all rounded-md p-1">
                 <p>Meus Pedidos</p>
             </div>
            
            
            <Heart className="cursor-pointer hover:scale-110 transition-all" />
    
            <ShoppingCart className="cursor-pointer hover:scale-110 transition-all" />

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <CircleUser className="cursor-pointer hover:scale-110 transition-all" />
                </DropdownMenuTrigger>
                <DropdownMenuContent  align="start" className="w-40 bg-white rounded-md border-2 border-gray-300 cursor-pointer">
                    <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                    <DropdownMenuGroup>
                        <DropdownMenuItem>
                            Perfil
                            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            Editar
                            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            Inativar
                            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
            

        </header>
    );
}