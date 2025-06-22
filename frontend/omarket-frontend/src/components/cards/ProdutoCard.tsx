import Image from "next/image";
import { Button } from "../ui/button";
import { Heart } from "lucide-react";

export default function ProdutoCard () {
    return(
        <div className="flex flex-row gap-2 hover:cursor-pointer hover:scale-110 transition-all">
            <div>
                <Image src={"https://picsum.photos/150/150"} alt="Produto" height={150} width={150}></Image>
            </div>
            <div className="flex flex-col justify-between">
                <div className="flex flex-col gap-1.5">
                    <h3 className="text-2xl font-semibold">Nome Produto</h3>
                    <p className="text-gray-500 font-semibold">Categoria</p>
                    <p className="text-gray-500 font-semibold">Preço</p>
                </div>
                <div className="flex flex-row gap-2 items-center">
                    <Button>Adicionar ao Carrinho</Button>
                    <Heart size={35} className="hover:text-red-500 transition-all"/>
                </div>
            </div>
        </div>
    );
}