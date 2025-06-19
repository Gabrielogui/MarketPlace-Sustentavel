import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { CircleUser, Heart, Logs, Search, ShoppingCart } from "lucide-react";
//import Image from "next/image";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

/* 
COMPONENTES PRONTOS QUE SERÃO UTILIZADOS NO MENU: 
 - DROPDOWNMENU = SERÁ USADO NO SÍMBOLO DE USUÁRIO PARA ABRIR AS OPÇÕES
 - INPUT = BUSCA
*/

export default function Header () {
    return(
        <header className="flex flex-row items-center justify-center gap-12 py-5 px-12 
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
                            <Logs/>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48 bg-amber-50 border-green-200 text-emerald-900">
                            <DropdownMenuItem>Frutas Orgânicas</DropdownMenuItem>
                            <DropdownMenuItem>Verduras Frescas</DropdownMenuItem>
                            <DropdownMenuItem>Grãos e Cereais</DropdownMenuItem>
                            <DropdownMenuItem>Produtos Lácteos</DropdownMenuItem>
                            <DropdownMenuItem>Mel e Derivados</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div className="relative flex-grow w-3xl">
                    <Input type={"search"} placeholder="Busca" className="pl-4 pr-10 py-2 w-full rounded-lg"/>
                    <Button variant={"ghost"} size={"icon"} className="absolute right-0 top-1/2 transform -translate-y-1/2 h-8 w-8">
                        <Search/>
                    </Button>
                </div>
            </div>

             <p>Meus Pedidos</p>
            
            
            <Heart/>
    
            <ShoppingCart/>

            <CircleUser/>
            

        </header>
    );
}