import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Logs } from "lucide-react";
import Image from "next/image";

/* 
COMPONENTES PRONTOS QUE SERÃO UTILIZADOS NO MENU: 
 - DROPDOWNMENU = SERÁ USADO NO SÍMBOLO DE USUÁRIO PARA ABRIR AS OPÇÕES
 -
*/

export default function Header () {
    return(
        <header className="flex flex-row">
            <div>
                <Image src={"/logo_no_bg.png"} alt="omarket" width={100} height={100}></Image>
            </div>
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
            <div>

            </div>

        </header>
    );
}