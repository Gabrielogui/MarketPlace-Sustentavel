
/* 
COMPONENTES PRONTOS QUE SERÃO UTILIZADOS NO MENU: 
 - DROPDOWNMENU = SERÁ USADO NO SÍMBOLO DE USUÁRIO PARA ABRIR AS OPÇÕES
 -
*/

import Image from "next/image";

export default function Header () {
    return(
        <header>
            <Image src={"/logo_no_bg.png"} alt="omarket" width={100} height={100}></Image>
        </header>
    );
}